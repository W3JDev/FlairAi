
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useState, FormEvent } from 'react';
import {
  Agent,
  AGENT_COLORS,
  INTERLOCUTOR_VOICE,
  INTERLOCUTOR_VOICES,
} from '../lib/presets/agents';
import Modal from './Modal';
import c from 'classnames';
import { useAgent, useUI } from '../lib/state';

export default function EditAgent() {
  const { current: agent, updateAgent, loading } = useAgent();
  const { setShowAgentEdit } = useUI();
  const [formState, setFormState] = useState<Partial<Agent>>({});

  useEffect(() => {
    if (agent) {
      setFormState({ ...agent });
    }
  }, [agent]);

  if (!agent) {
    return null; // Or a loading spinner
  }

  function handleFormChange(adjustments: Partial<Agent>) {
    setFormState(prev => ({ ...prev, ...adjustments }));
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    await updateAgent(agent.id, formState);
    setShowAgentEdit(false);
  }

  function onClose() {
    setShowAgentEdit(false);
  }

  return (
    <Modal onClose={onClose}>
      <form className="editAgent" onSubmit={handleSave}>
        {/* Form Fields Section */}
        <div>
          <div>
            <input
              className="largeInput"
              type="text"
              placeholder="Name"
              value={formState.name || ''}
              onChange={e => handleFormChange({ name: e.target.value })}
              aria-label="Agent Name"
              required
            />
          </div>
          <div>
            <label htmlFor="agent-personality">Personality</label>
            <textarea
              id="agent-personality"
              value={formState.personality || ''}
              onChange={e => handleFormChange({ personality: e.target.value })}
              rows={7}
              placeholder="How should I act? What’s my purpose? How would you describe my personality?"
            />
          </div>
          <div>
            <label htmlFor="agent-knowledge-base">Knowledge Base</label>
            <textarea
              id="agent-knowledge-base"
              value={formState.knowledgeBase || ''}
              onChange={e => handleFormChange({ knowledgeBase: e.target.value })}
              rows={10}
              placeholder="Provide the knowledge base for your agent. This can be a product catalog, a list of frequently asked questions, or a set of standard operating procedures."
            />
          </div>
        </div>

        {/* Visuals & Voice Section */}
        <div>
          <div>
            <ul className="colorPicker" role="radiogroup" aria-label="Agent Body Color">
              {AGENT_COLORS.map((color, i) => (
                <li
                  key={i}
                  className={c({ active: color === formState.bodyColor })}
                  role="radio"
                  aria-checked={color === formState.bodyColor}
                  tabIndex={0}
                  onClick={() => handleFormChange({ bodyColor: color })}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFormChange({ bodyColor: color }); }}
                  style={{ outline: 'none' }}
                >
                  <button
                    type="button"
                    style={{ backgroundColor: color }}
                    aria-label={`Set color to ${color}`}
                    tabIndex={-1}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="voicePicker">
            <label htmlFor="agent-voice-select">Voice</label>
            <select
              id="agent-voice-select"
              value={formState.voice}
              onChange={e => handleFormChange({ voice: e.target.value as INTERLOCUTOR_VOICE })}
            >
              {INTERLOCUTOR_VOICES.map(voice => (
                <option key={voice} value={voice}>
                  {voice}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="button primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
