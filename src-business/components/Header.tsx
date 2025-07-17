
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';
import { Agent } from '@/lib/presets/agents';
import { useAgent, useUI, useUser } from '../lib/state';
import c from 'classnames';
import { useEffect, useState } from 'react';

export default function Header() {
  const { setShowUserConfig, setShowAgentEdit } = useUI();
  const { profile, signOut } = useUser();
  const { current, setCurrent, availablePresets, availablePersonal, addAgent } = useAgent();
  const { disconnect } = useLiveAPIContext();
  const [showRoomList, setShowRoomList] = useState(false);

  useEffect(() => {
    const closeMenu = () => setShowRoomList(false);
    if (showRoomList) {
      window.addEventListener('click', closeMenu);
    }
    return () => window.removeEventListener('click', closeMenu);
  }, [showRoomList]);

  function changeAgent(agent: Agent | string) {
    disconnect();
    setCurrent(agent);
  }

  async function addNewFlarebot() {
    disconnect();
    await addAgent(); // addAgent now creates and saves a new agent to DB
    setShowAgentEdit(true);
  }

  return (
    <header onClick={(e) => e.stopPropagation()}>
      <div className="roomInfo">
        <div className="roomName">
          <button onClick={() => setShowRoomList(!showRoomList)}>
            <h1 className={c({ active: showRoomList })}>
              {current?.name || 'Loading...'}
              <span className="icon">arrow_drop_down</span>
            </h1>
          </button>

          {/* Do not allow editing presets */}
          {!availablePresets.some(p => p.id === current?.id) && (
            <button
              onClick={() => setShowAgentEdit(true)}
              className="button createButton"
            >
              <span className="icon">edit</span> Edit Flarebot
            </button>
          )}
        </div>

        <div className={c('roomList', { active: showRoomList })}>
          <div>
            <h3>Presets</h3>
            <ul>
              {availablePresets
                .map(agent => (
                  <li
                    key={agent.id}
                    className={c({ active: agent.id === current?.id })}
                  >
                    <button onClick={() => changeAgent(agent)}>
                      {agent.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h3>Your Flarebots</h3>
            <ul>
              {availablePersonal.length ? (
                availablePersonal.map(agent => (
                  <li key={agent.id} className={c({ active: agent.id === current?.id })}>
                    <button onClick={() => changeAgent(agent.id)}>{agent.name}</button>
                  </li>
                ))
              ) : (
                <p>None yet. Create one!</p>
              )}
            </ul>
            <button
              className="newRoomButton"
              onClick={addNewFlarebot}
            >
              <span className="icon">add</span>New Flarebot
            </button>
          </div>
        </div>
      </div>

      <div className="flex" style={{alignItems: 'center', gap: '15px'}}>
        <button
          className="userSettingsButton"
          onClick={() => setShowUserConfig(true)}
        >
          {profile?.name || profile?.username || 'Your name'}
          <span className="icon">tune</span>
        </button>
        <button
            onClick={() => signOut()}
            className="button"
            title="Sign Out"
          >
            <span className="icon">logout</span>
        </button>
      </div>
    </header>
  );
}
