import React, { useState, useCallback } from 'react';
import { UserIcon, SpinnerIcon } from './Icons';

// Base URL for the Django backend API
// Ensure this is correct for your environment (e.g., http://localhost:8000 for local dev)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const LoginPage = ({ onSuccessfulRegistration }) => {

  const [formData, setFormData] = useState({
    email: '',
    discordId: '',
    referralSource: '',
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredData, setRegisteredData] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email ID is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email ID is invalid.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setSubmissionStatus('submitting');
    setSubmissionMessage('');
    try {
      const dataToRegister = { ...formData };
      const response = await fetch(`${API_BASE_URL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: dataToRegister.email,
            discord_id: dataToRegister.discordId, // Match Django model field name
            referral_source: dataToRegister.referralSource
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmissionStatus('success');
        setSubmissionMessage(responseData.message || 'Registration successful! Welcome aboard.');
        setIsRegistered(true);
        setRegisteredData(dataToRegister);
        setFormData({ email: '', discordId: '', referralSource: '' });
        setErrors({});
        if (onSuccessfulRegistration) {
          onSuccessfulRegistration();
        }
      } else {
        setSubmissionStatus('error');
        setSubmissionMessage(responseData.detail || responseData.message || 'An unknown error occurred.');
      }
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage('Failed to connect to the server. Please try again later.');
      console.error('Submission error:', error);
    }
  }, [formData, onSuccessfulRegistration, errors]); // Added errors to dependency for completeness if validate relies on it indirectly through setErrors

  return (
    <div className="bg-slate-800/80 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-500 ease-in-out border border-slate-700">
      {isRegistered && registeredData ? (
        <div className="text-gray-100">
          <div className="flex flex-col items-center mb-6">
            <UserIcon className="w-16 h-16 text-green-400 mb-3" />
            <h2 className="text-3xl font-bold text-center">Registration Complete!</h2>
            {submissionMessage && submissionStatus === 'success' && (
              <p className="mt-3 text-center text-sm text-green-300 bg-green-500/20 px-3 py-1.5 rounded-md">
                {submissionMessage}
              </p>
            )}
          </div>
          <div className="space-y-4 bg-slate-700/60 p-6 rounded-lg shadow-inner">
            <div>
              <p className="text-sm font-medium text-gray-300">Email ID:</p>
              <p className="text-lg text-purple-300 break-all">{registeredData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Discord ID:</p>
              <p className="text-lg text-purple-300 break-all">{registeredData.discordId}</p>
            </div>
            {registeredData.referralSource && (
              <div>
                <p className="text-sm font-medium text-gray-300">Heard about us from:</p>
                <p className="text-lg text-purple-300 break-words">{registeredData.referralSource}</p>
              </div>
            )}
          </div>
          <p className="mt-8 text-center text-gray-300">
            Thank you for pre-registering. We'll keep you updated!
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center mb-6">
            <UserIcon className="w-16 h-16 text-purple-400 mb-3" />
            <h2 className="text-3xl font-bold text-gray-100 text-center">Pre-Register Now</h2>
            <p className="text-gray-300 mt-2 text-center">
              Enter your details to get early access and updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email ID <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-slate-700 border ${errors.email ? 'border-red-500' : 'border-slate-600'} text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:shadow-md focus:shadow-purple-500/30 transition duration-150 ease-in-out sm:text-sm placeholder-gray-400`}
                placeholder="you@example.com"
                aria-describedby="email-error"
                disabled={submissionStatus === 'submitting'}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p id="email-error" className="mt-1 text-xs text-red-400" role="alert">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="discordId" className="block text-sm font-medium text-gray-200 mb-1">
                Discord ID <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                name="discordId"
                id="discordId"
                value={formData.discordId}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-slate-700 border ${errors.discordId ? 'border-red-500' : 'border-slate-600'} text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:shadow-md focus:shadow-purple-500/30 transition duration-150 ease-in-out sm:text-sm placeholder-gray-400`}
                placeholder="yourusername#1234"
                aria-describedby="discordId-error"
                disabled={submissionStatus === 'submitting'}
                aria-invalid={!!errors.discordId}
              />
              {errors.discordId && <p id="discordId-error" className="mt-1 text-xs text-red-400" role="alert">{errors.discordId}</p>}
            </div>

            <div>
              <label htmlFor="referralSource" className="block text-sm font-medium text-gray-200 mb-1">
                Where did you hear about us? <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <textarea
                name="referralSource"
                id="referralSource"
                rows={3}
                value={formData.referralSource || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 text-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:shadow-md focus:shadow-purple-500/30 transition duration-150 ease-in-out sm:text-sm placeholder-gray-400"
                placeholder="e.g., A friend, Social Media, Event..."
                disabled={submissionStatus === 'submitting'}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-400 transition-all duration-150 ease-in-out disabled:bg-slate-500 disabled:cursor-not-allowed hover:scale-105 active:scale-100 active:bg-purple-800"
              >
                {submissionStatus === 'submitting' ? (
                  <>
                    <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Submitting...
                  </>
                ) : (
                  'Pre-Register'
                )}
              </button>
            </div>
          </form>

          {submissionMessage && submissionStatus === 'error' && (
            <div className={`mt-6 p-3 rounded-md text-sm text-center bg-red-500/30 text-red-300 border border-red-500`} role="alert">
              {submissionMessage}
            </div>
          )}
        </>
      )}
      <p className="mt-6 text-xs text-gray-400 text-center">
        🚀 You're now part of something big. We'll keep you updated — no spam, just magic.
      </p>
    </div>
  );
};

export default LoginPage;