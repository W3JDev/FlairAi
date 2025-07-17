
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from '../../components/Modal';
import { useUI, useUser } from '../lib/state';
import type { Profile } from '../lib/state';
import { useState, useEffect, FormEvent } from 'react';

export default function UserSettings() {
  const { profile, updateProfile, loading } = useUser();
  const { setShowUserConfig } = useUI();
  const [formState, setFormState] = useState<Partial<Profile>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormState({
        username: profile.username || '',
        name: profile.name || '',
        gender: profile.gender || '',
        role: profile.role || '',
        interests: profile.interests || '',
        languagePreference: profile.languagePreference || 'en',
        yearOfBirth: profile.yearOfBirth || '',
        raceNationality: profile.raceNationality || '',
        info: profile.info || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    // Validate form: username, name, and gender are mandatory
    if (formState.username && formState.name && formState.gender) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formState]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    // user-year-of-birth -> yearOfBirth
    const key = id.replace('user-', '').replace(/-(\w)/g, (_, letter) => letter.toUpperCase());
    setFormState(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    await updateProfile(formState);
    setShowUserConfig(false);
  };

  const handleClose = () => {
    if (!profile?.name || !profile?.gender) {
       alert('Please fill in Your Full Name and Gender to continue.');
       return;
    }
    setShowUserConfig(false);
  }

  if (!profile) return null; // Or a loading indicator

  return (
    <Modal onClose={handleClose}>
      <div className="userSettings">
        <h2>Welcome! Let's get you set up.</h2>
        <p>
          Please provide some information to personalize your AI training experience.
          Fields marked with <span className="mandatory-asterisk">*</span> are required.
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="user-username">Username <span className="mandatory-asterisk">*</span></label>
            <input
              id="user-username"
              type="text"
              value={formState.username || ''}
              onChange={handleChange}
              placeholder="e.g., SuperServer77"
              required
              disabled // Username is set at signup and cannot be changed here
            />
            <small>Your unique username (cannot be changed).</small>
          </div>

          <div>
            <label htmlFor="user-name">Your Full Name <span className="mandatory-asterisk">*</span></label>
            <input
              id="user-name"
              type="text"
              value={formState.name || ''}
              onChange={handleChange}
              placeholder="e.g., Alex Doe"
              required
            />
            <small>The AI will address you by this name.</small>
          </div>

          <div>
            <label htmlFor="user-gender">Gender <span className="mandatory-asterisk">*</span></label>
            <select
              id="user-gender"
              value={formState.gender || ''}
              onChange={handleChange}
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
              value={formState.role || ''}
              onChange={handleChange}
            >
              <option value="">Select your role (Optional)</option>
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
              value={formState.yearOfBirth || ''}
              onChange={handleChange}
              placeholder="e.g., 1995 (Optional)"
              min="1920"
              max={new Date().getFullYear() - 16} // Assuming min age 16
            />
          </div>

          <div>
            <label htmlFor="user-language-preference">Preferred Speaking Language with AI</label>
            <select
              id="user-language-preference"
              value={formState.languagePreference || 'en'}
              onChange={handleChange}
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
              value={formState.interests || ''}
              onChange={handleChange}
              placeholder="e.g., Upselling desserts, wine knowledge, handling complaints, practicing Bahasa Malaysia service phrases (Optional)"
            />
            <small>Helps tailor AI interactions and future features.</small>
          </div>

          <div>
            <label htmlFor="user-race-nationality">Race / Nationality (Optional)</label>
            <input
              id="user-race-nationality"
              type="text"
              value={formState.raceNationality || ''}
              onChange={handleChange}
              placeholder="e.g., Malaysian, Chinese, Indian, etc."
            />
          </div>

          <div>
            <label htmlFor="user-info">Other Info (Original field, review if needed)</label>
            <textarea
              id="user-info"
              rows={2}
              value={formState.info || ''}
              onChange={handleChange}
              placeholder="Any other brief notes about you for the AI? (Optional)"
            />
          </div>

          <button type="submit" className="button primary" disabled={!isFormValid || loading}>
            {loading ? 'Saving...' : 'Save & Close'}
          </button>
          {!isFormValid && <p className="error-message">Please fill in all required fields.</p>}
        </form>
      </div>
    </Modal>
  );
}
