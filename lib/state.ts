/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import { Agent, AuraAssist, ProfessorEtiquette, CountessCouture, CulinaryCometShane, Penny, ChallengingCustomerAgent, InquisitiveFoodieAgent, MenuKnowledgeAssistantAgent, BahasaMalaysiaTrainerAgent, ChineseMalaysianTrainerAgent, TamilMalaysianTrainerAgent, MyanmarTrainerAgent, BengaliTrainerAgent } from './presets/agents';

/**
 * User
 */
export type User = {
  username?: string; // Mandatory
  name?: string; // Full Name - Mandatory
  gender?: 'male' | 'female' | 'non-binary' | 'prefer_not_to_say' | ''; // Mandatory
  role?: 'server' | 'host_hostess' | 'bartender' | 'manager' | 'owner' | 'trainee' | 'other' | '';
  interests?: string; // Training focus
  languagePreference?: 'en' | 'ms' | 'zh-MY' | 'ta-MY' | 'my' | 'bn' | 'other' | '';
  yearOfBirth?: string; // Store as string for input flexibility, convert to number if needed
  raceNationality?: string;
  info?: string; // Original generic info, can be repurposed or phased out
};

export const useUser = create<
  {
    setUsername: (username: string) => void;
    setName: (name: string) => void;
    setGender: (gender: User['gender']) => void;
    setRole: (role: User['role']) => void;
    setInterests: (interests: string) => void;
    setLanguagePreference: (language: User['languagePreference']) => void;
    setYearOfBirth: (year: string) => void;
    setRaceNationality: (race: string) => void;
    setInfo: (info: string) => void; // Kept for now
  } & User
>(set => ({
  username: '',
  name: '',
  gender: '',
  role: '',
  interests: '',
  languagePreference: 'en',
  yearOfBirth: '',
  raceNationality: '',
  info: '',
  setUsername: username => set({ username }),
  setName: name => set({ name }),
  setGender: gender => set({ gender }),
  setRole: role => set({ role }),
  setInterests: interests => set({ interests }),
  setLanguagePreference: languagePreference => set({ languagePreference }),
  setYearOfBirth: yearOfBirth => set({ yearOfBirth }),
  setRaceNationality: raceNationality => set({ raceNationality }),
  setInfo: info => set({ info }),
}));

/**
 * Agents
 */
function getAgentById(id: string) {
  const { availablePersonal, availablePresets } = useAgent.getState();
  return (
    availablePersonal.find(agent => agent.id === id) ||
    availablePresets.find(agent => agent.id === id)
  );
}

export const useAgent = create<{
  current: Agent;
  availablePresets: Agent[];
  availablePersonal: Agent[];
  setCurrent: (agent: Agent | string) => void;
  addAgent: (agent: Agent) => void;
  update: (agentId: string, adjustments: Partial<Agent>) => void;
}>(set => ({
  current: AuraAssist, // AuraAssist is the new default
  availablePresets: [
    AuraAssist, // AuraAssist is first
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
  ],
  availablePersonal: [],

  addAgent: (agent: Agent) => {
    set(state => ({
      availablePersonal: [...state.availablePersonal, agent],
      current: agent,
    }));
  },
  setCurrent: (agent: Agent | string) =>
    set({ current: typeof agent === 'string' ? getAgentById(agent) : agent }),
  update: (agentId: string, adjustments: Partial<Agent>) => {
    let agent = getAgentById(agentId);
    if (!agent) return;
    const updatedAgent = { ...agent, ...adjustments };
    set(state => ({
      availablePresets: state.availablePresets.map(a =>
        a.id === agentId ? updatedAgent : a
      ),
      availablePersonal: state.availablePersonal.map(a =>
        a.id === agentId ? updatedAgent : a
      ),
      current: state.current.id === agentId ? updatedAgent : state.current,
    }));
  },
}));

/**
 * UI
 */
export const useUI = create<{
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean;
  setShowAgentEdit: (show: boolean) => void;
}>(set => ({
  showUserConfig: true, // Start with user config shown to enforce mandatory fields
  setShowUserConfig: (show: boolean) => set({ showUserConfig: show }),
  showAgentEdit: false,
  setShowAgentEdit: (show: boolean) => set({ showAgentEdit: show }),
}));
