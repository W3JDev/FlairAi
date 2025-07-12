
import { create } from 'zustand';
import { User as AuthUser } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import {
  Agent,
  AuraAssist,
  ProfessorEtiquette,
  CountessCouture,
  CulinaryCometShane,
  Penny,
  ChallengingCustomerAgent,
  InquisitiveFoodieAgent,
  MenuKnowledgeAssistantAgent,
  BahasaMalaysiaTrainerAgent,
  ChineseMalaysianTrainerAgent,
  TamilMalaysianTrainerAgent,
  MyanmarTrainerAgent,
  BengaliTrainerAgent,
  createNewAgent
} from './presets/agents';

// Database types
export type Profile = {
  id: string;
  username?: string;
  name?: string;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer_not_to_say' | '';
  role?: 'server' | 'host_hostess' | 'bartender' | 'manager' | 'owner' | 'trainee' | 'other' | '';
  interests?: string;
  languagePreference?: 'en' | 'ms' | 'zh-MY' | 'ta-MY' | 'my' | 'bn' | 'other' | '';
  yearOfBirth?: string;
  raceNationality?: string;
  info?: string;
};

export type Flarebot = {
  id: string; // uuid
  user_id: string; // uuid
  name: string;
  personality: string;
  body_color: string;
  voice: Agent['voice'];
  menu_description: string;
};


/**
 * User Store
 */
type UserState = {
  profile: Profile | null;
  loading: boolean;
  profileComplete: boolean;
  initializeUser: (user: AuthUser) => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useUser = create<UserState>((set, get) => ({
  profile: null,
  loading: true,
  profileComplete: false,
  initializeUser: async (user: AuthUser) => {
    set({ loading: true });
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        set({ profile: data, profileComplete: !!(data.name && data.gender) });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      set({ loading: false });
    }
  },
  updateProfile: async (updates: Partial<Profile>) => {
    const { profile } = get();
    if (!profile) return;

    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', profile.id)
        .select()
        .single();
      
      if (error) throw error;

      if (data) {
        set({ profile: data, profileComplete: !!(data.name && data.gender) });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ profile: null, profileComplete: false });
    // Reset other stores if necessary
    useAgent.getState().reset();
  },
}));


/**
 * Agent Store
 */
type AgentState = {
  current: Agent;
  availablePresets: Agent[];
  availablePersonal: Agent[];
  loading: boolean;
  initializeAgents: (userId: string) => Promise<void>;
  setCurrent: (agent: Agent | string) => void;
  addAgent: (agentData?: Partial<Agent>) => Promise<void>;
  updateAgent: (agentId: string, adjustments: Partial<Agent>) => Promise<void>;
  reset: () => void;
};

const initialAgentState = {
  current: AuraAssist,
  availablePresets: [
    AuraAssist, ProfessorEtiquette, CountessCouture, CulinaryCometShane,
    Penny, ChallengingCustomerAgent, InquisitiveFoodieAgent, MenuKnowledgeAssistantAgent,
    BahasaMalaysiaTrainerAgent, ChineseMalaysianTrainerAgent, TamilMalaysianTrainerAgent,
    MyanmarTrainerAgent, BengaliTrainerAgent,
  ],
  availablePersonal: [],
  loading: false,
};

export const useAgent = create<AgentState>((set, get) => ({
  ...initialAgentState,

  initializeAgents: async (userId: string) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('flarebots')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      
      const personalAgents: Agent[] = data.map(dbAgent => ({
        id: dbAgent.id,
        name: dbAgent.name,
        personality: dbAgent.personality || '',
        bodyColor: dbAgent.body_color || '#58A6FF',
        voice: dbAgent.voice,
        menuDescription: dbAgent.menu_description || '',
      }));

      set({ availablePersonal: personalAgents });

    } catch (error) {
      console.error('Error fetching personal agents:', error);
    } finally {
      set({ loading: false });
    }
  },

  setCurrent: (agentOrId: Agent | string) => {
    const { availablePersonal, availablePresets } = get();
    if (typeof agentOrId === 'string') {
      const agent = [...availablePersonal, ...availablePresets].find(a => a.id === agentOrId);
      if (agent) set({ current: agent });
    } else {
      set({ current: agentOrId });
    }
  },

  addAgent: async (agentData?: Partial<Agent>) => {
    const user = useUser.getState().profile;
    if (!user) return;
    set({ loading: true });

    const newAgent = createNewAgent(agentData);
    
    try {
      const { data, error } = await supabase
        .from('flarebots')
        .insert({
          id: newAgent.id,
          user_id: user.id,
          name: newAgent.name,
          personality: newAgent.personality,
          body_color: newAgent.bodyColor,
          voice: newAgent.voice,
          menu_description: newAgent.menuDescription,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        const addedAgent: Agent = {
          id: data.id,
          name: data.name,
          personality: data.personality || '',
          bodyColor: data.body_color || '#58A6FF',
          voice: data.voice,
          menuDescription: data.menu_description || '',
        };
        set(state => ({
          availablePersonal: [...state.availablePersonal, addedAgent],
          current: addedAgent,
        }));
      }
    } catch (error) {
      console.error('Error adding agent:', error);
    } finally {
      set({ loading: false });
    }
  },

  updateAgent: async (agentId: string, adjustments: Partial<Agent>) => {
    // Presets cannot be updated in the DB
    if (get().availablePresets.some(p => p.id === agentId)) {
        const agent = get().availablePresets.find(a => a.id === agentId)!;
        const updatedAgent = { ...agent, ...adjustments };
         set(state => ({
            availablePresets: state.availablePresets.map(a =>
                a.id === agentId ? updatedAgent : a
            ),
            current: state.current.id === agentId ? updatedAgent : state.current,
        }));
        return;
    }

    set({ loading: true });
    try {
      const dbUpdatePayload = {
        name: adjustments.name,
        personality: adjustments.personality,
        body_color: adjustments.bodyColor,
        voice: adjustments.voice,
        menu_description: adjustments.menuDescription,
      };

      const { data, error } = await supabase
        .from('flarebots')
        .update(dbUpdatePayload)
        .eq('id', agentId)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const updatedAgent: Agent = {
          id: data.id,
          name: data.name,
          personality: data.personality || '',
          bodyColor: data.body_color || '#58A6FF',
          voice: data.voice,
          menuDescription: data.menu_description || '',
        };

        set(state => ({
          availablePersonal: state.availablePersonal.map(a =>
            a.id === agentId ? updatedAgent : a
          ),
          current: state.current.id === agentId ? updatedAgent : state.current,
        }));
      }
    } catch (error) {
      console.error('Error updating agent:', error);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => set(initialAgentState),
}));

/**
 * UI Store
 */
type UIState = {
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean;
  setShowAgentEdit: (show: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  showUserConfig: false, // Default to false, logic in App.tsx will show it if profile is incomplete
  setShowUserConfig: (show: boolean) => set({ showUserConfig: show }),
  showAgentEdit: false,
  setShowAgentEdit: (show: boolean) => set({ showAgentEdit: show }),
}));
