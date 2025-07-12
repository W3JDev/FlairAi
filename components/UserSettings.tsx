/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from './Modal';
import { useUI, useUser, User } from '@/lib/state';
import { useState, useEffect } from 'react';

export default function UserSettings() {
  const {
    username,
    name,
    gender,
    role,
    interests,
    languagePreference,
    yearOfBirth,
    raceNationality,
    info, // Kept for now, can be merged or removed later
    setUsername,
    setName,
    setGender,
    setRole,
    setInterests,
    setLanguagePreference,
    setYearOfBirth,
    setRaceNationality,
    setInfo,
  } = useUser();
  const { setShowUserConfig } = useUI();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validate form: username, name (full name), and gender are mandatory
    if (username && name && gender) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [username, name, gender]);

  function updateClient() {
    // Ensure user knows that closing the modal saves the settings
    // For now, it saves on change, and this just closes.
    setShowUserConfig(false);
  }

  return (
    <Modal onClose={() => {
      // Only allow closing if mandatory fields are filled
      if (isFormValid) {
        setShowUserConfig(false);
      } else {
        // Optionally, provide feedback that mandatory fields are missing
        // For now, just prevent closing. A toast/message would be better.
        alert('Please fill in all required fields: Username, Your Full Name, and Gender.');
      }
    }}>
      <div className="userSettings">
        <h2>Welcome! Let's get you set up.</h2>
        <p>
          Please provide some information to personalize your AI training experience.
          Fields marked with <span className="mandatory-asterisk">*</span> are required.
        </p>

        <form
          onSubmit={e => {
            e.preventDefault();
            if (isFormValid) {
              updateClient();
            }
          }}
        >
          <div>
            <label htmlFor="user-username">Username <span className="mandatory-asterisk">*</span></label>
            <input
              id="user-username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="e.g., SuperServer77"
              required
            />
            <small>A unique username for the app.</small>
          </div>

          <div>
            <label htmlFor="user-name">Your Full Name <span className="mandatory-asterisk">*</span></label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g., Alex Doe"
              required
            />
            <small>The AI will address you by this name.</small>
          </div>

          <div>
            <label htmlFor="user-gender">Gender <span className="mandatory-asterisk">*</span></label>
            <select
              id="user-gender"
              value={gender}
              onChange={e => setGender(e.target.value as User['gender'])}
              required
            >
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label htmlFor="user-role">Your Role in the Restaurant</label>
            <select
              id="user-role"
              value={role}
              onChange={e => setRole(e.target.value as User['role'])}
            >
              <option value="" disabled>Select your role (Optional)</option>
              <option value="server">Server / Waitstaff</option>
              <option value="host_hostess">Host / Hostess</option>
              <option value="bartender">Bartender</option>
              <option value="manager">Manager / Supervisor</option>
              <option value="owner">Owner</option>
              <option value="trainee">Trainee / New Hire</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="user-year-of-birth">Year of Birth</label>
            <input
              id="user-year-of-birth"
              type="number"
              value={yearOfBirth}
              onChange={e => setYearOfBirth(e.target.value)}
              placeholder="e.g., 1995 (Optional)"
              min="1920"
              max={new Date().getFullYear() - 16} // Assuming min age 16
            />
          </div>

          <div>
            <label htmlFor="user-language-preference">Preferred Speaking Language with AI</label>
            <select
              id="user-language-preference"
              value={languagePreference}
              onChange={e => setLanguagePreference(e.target.value as User['languagePreference'])}
            >
              <option value="en">English (Default)</option>
              <option value="ms">Bahasa Malaysia</option>
              <option value="zh-MY">Malaysian Chinese (Mandarin)</option>
              <option value="ta-MY">Malaysian Tamil</option>
              <option value="my">Myanmar</option>
              <option value="bn">Bengali</option>
              <option value="other">Other (Specify in Interests)</option>
            </select>
          </div>

          <div>
            <label htmlFor="user-interests">Interests / Training Focus</label>
            <textarea
              id="user-interests"
              rows={3}
              value={interests}
              onChange={e => setInterests(e.target.value)}
              placeholder="e.g., Upselling desserts, wine knowledge, handling complaints, practicing Bahasa Malaysia service phrases (Optional)"
            />
            <small>Helps tailor AI interactions and future features.</small>
          </div>
          
          <div>
            <label htmlFor="user-race-nationality">Race / Nationality (Optional)</label>
            <input
              id="user-race-nationality"
              type="text"
              value={raceNationality}
              onChange={e => setRaceNationality(e.target.value)}
              placeholder="e.g., Malaysian, Chinese, Indian, etc."
            />
          </div>

          <div>
            <label htmlFor="user-info">Other Info (Original field, review if needed)</label>
            <textarea
              id="user-info"
              rows={2}
              value={info}
              onChange={e => setInfo(e.target.value)}
              placeholder="Any other brief notes about you for the AI? (Optional)"
            />
          </div>

          <button type="submit" className="button primary" disabled={!isFormValid}>
            Let’s go!
          </button>
          {!isFormValid && <p className="error-message">Please fill in all required fields.</p>}
        </form>
      </div>
    </Modal>
  );
}
