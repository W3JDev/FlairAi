/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useRef } from 'react';
import {
  Agent,
  AGENT_COLORS,
  INTERLOCUTOR_VOICE,
  INTERLOCUTOR_VOICES,
} from '@/lib/presets/agents';
import Modal from './Modal';
import c from 'classnames';
import { useAgent, useUI } from '@/lib/state';

export default function EditAgent() {
  const agent = useAgent(state => state.current);
  const updateAgent = useAgent(state => state.update);
  const nameInput = useRef(null);
  const { setShowAgentEdit } = useUI();

  function onClose() {
    setShowAgentEdit(false);
  }

  function updateCurrentAgent(adjustments: Partial<Agent>) {
    updateAgent(agent.id, adjustments);
  }

  return (
    <Modal onClose={() => onClose()}>
      <div className="editAgent">
        <div>
          <form onSubmit={e => e.preventDefault()}>
            <div>
              <input
                className="largeInput"
                type="text"
                placeholder="Name"
                value={agent.name}
                onChange={e => updateCurrentAgent({ name: e.target.value })}
                ref={nameInput}
                aria-label="Agent Name"
              />
            </div>

            <div>
              <label htmlFor="agent-personality">Personality</label>
              <textarea
                id="agent-personality"
                value={agent.personality}
                onChange={e =>
                  updateCurrentAgent({ personality: e.target.value })
                }
                rows={7}
                placeholder="How should I act? Whatʼs my purpose? How would you describe my personality?"
              />
            </div>

            <div>
              <label htmlFor="agent-menu-description">Restaurant Menu &amp; Procedures</label>
              <textarea
                id="agent-menu-description"
                value={agent.menuDescription || ''}
                onChange={e =>
                  updateCurrentAgent({ menuDescription: e.target.value })
                }
                rows={10}
                placeholder="Describe your menu items, prices, ingredients, special offers, and any standard operating procedures for customer interaction, upselling, etc."
              />
            </div>
          </form>
        </div>

        <div>
          <div>
            <ul className="colorPicker" role="radiogroup" aria-label="Agent Body Color">
              {AGENT_COLORS.map((color, i) => (
                <li
                  key={i}
                  className={c({ active: color === agent.bodyColor })}
                  role="radio"
                  aria-checked={color === agent.bodyColor}
                  tabIndex={color === agent.bodyColor ? 0 : -1}
                  onClick={() => updateCurrentAgent({ bodyColor: color })}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') updateCurrentAgent({ bodyColor: color }); }}
                  style={{ outline: 'none' }} 
                >
                  <button
                    style={{ backgroundColor: color }}
                    aria-label={`Set color to ${color}`}
                    tabIndex={-1} // Button inside list item handles interaction
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="voicePicker">
            <label htmlFor="agent-voice-select">Voice</label>
            <select
              id="agent-voice-select"
              value={agent.voice}
              onChange={e => {
                updateCurrentAgent({
                  voice: e.target.value as INTERLOCUTOR_VOICE,
                });
              }}
            >
              {INTERLOCUTOR_VOICES.map(voice => (
                <option key={voice} value={voice}>
                  {voice}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
}
