// Test file to verify Copilot integration with FlairAi context
// This file demonstrates how Copilot should understand our patterns

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// Copilot should suggest proper FlairAi patterns based on our context files

// Example 1: Database connection following FlairAi patterns
const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
);

// Example 2: FlareBot data type (Copilot should know this from context)
interface FlareBot {
    id: string;
    user_id: string;
    name: string;
    personality: string;
    voice: 'Charon' | 'Aoede' | 'Fenrir' | 'Kore' | 'Leda' | 'Orus' | 'Puck' | 'Zephyr';
    knowledge_base: string;
    body_color: string;
    is_active: boolean;
    settings: Record<string, any>;
    created_at: string;
}

// Example 3: Database query with proper error handling
export async function fetchUserFlareBots(userId: string): Promise<FlareBot[]> {
    try {
        const { data, error } = await supabase
            .from('flarebots')
            .select('*')
            .eq('user_id', userId)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            // Handle missing table gracefully (FlairAi pattern)
            if (error.code === '42P01') {
                console.warn('Flarebots table does not exist. Please run database setup.');
                return [];
            }
            throw error;
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching FlareBots:', error);
        return [];
    }
}

// Example 4: React component following FlairAi patterns
export default function FlareBotVoiceSelector() {
    const [selectedVoice, setSelectedVoice] = useState<FlareBot['voice']>('Charon');
    const [isLoading, setIsLoading] = useState(false);

    // Copilot should suggest proper voice options based on our context
    const voiceOptions: FlareBot['voice'][] = [
        'Charon', 'Aoede', 'Fenrir', 'Kore', 'Leda', 'Orus', 'Puck', 'Zephyr'
    ];

    const handleVoiceChange = async (voice: FlareBot['voice']) => {
        setIsLoading(true);
        try {
            // Update FlareBot voice following FlairAi patterns
            const { error } = await supabase
                .from('flarebots')
                .update({ voice })
                .eq('user_id', 'current_user_id')
                .eq('is_active', true);

            if (error) throw error;

            setSelectedVoice(voice);
        } catch (error) {
            console.error('Error updating voice:', error);
            // Show user-friendly error message
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="voice-selector">
            <label htmlFor="voice-select">FlareBot Voice:</label>
            <select
                id="voice-select"
                value={selectedVoice}
                onChange={(e) => handleVoiceChange(e.target.value as FlareBot['voice'])}
                disabled={isLoading}
            >
                {voiceOptions.map((voice) => (
                    <option key={voice} value={voice}>
                        {voice}
                    </option>
                ))}
            </select>
            {isLoading && <span>Updating voice...</span>}
        </div>
    );
}

// Example 5: Zustand store following FlairAi patterns
import { create } from 'zustand';

interface VoiceState {
    volume: number;
    isRecording: boolean;
    currentVoice: FlareBot['voice'];
    setVolume: (volume: number) => void;
    toggleRecording: () => void;
    setVoice: (voice: FlareBot['voice']) => void;
}

export const useVoice = create<VoiceState>((set) => ({
    volume: 0,
    isRecording: false,
    currentVoice: 'Charon',
    setVolume: (volume) => set({ volume }),
    toggleRecording: () => set((state) => ({ isRecording: !state.isRecording })),
    setVoice: (currentVoice) => set({ currentVoice }),
}));

/*
 * This file tests that GitHub Copilot understands:
 * ✅ FlairAi database schema and table structure
 * ✅ Proper error handling patterns (42P01 for missing tables)
 * ✅ TypeScript types for FlareBot entities
 * ✅ Supabase client usage patterns
 * ✅ React component structure with hooks
 * ✅ Zustand state management patterns
 * ✅ Voice type constraints and options
 * ✅ Accessibility considerations (labels, ids)
 * ✅ Loading states and error handling
 * ✅ Environment variable usage
 */
