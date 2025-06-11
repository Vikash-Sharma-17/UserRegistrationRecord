import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from '../components/LoginPage';

const TYPING_WORDS = ["COMING SOON"];
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const HomePage = () => {
  const [registeredUserCount, setRegisteredUserCount] = useState(0);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  const fetchUserCount = useCallback(async () => {
    setIsLoadingCount(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/count/`);
      if (response.ok) {
        const data = await response.json();
        setRegisteredUserCount(data.count);
      } else {
        console.error('Failed to fetch user count, status:', response.status);
        setRegisteredUserCount(0); // Fallback or handle error appropriately
      }
    } catch (error) {
      console.error('Error fetching user count:', error);
      setRegisteredUserCount(0); // Fallback
    }
    setIsLoadingCount(false);
  }, []);

  useEffect(() => {
    fetchUserCount();
  }, [fetchUserCount]);

  const handleSuccessfulRegistration = useCallback(() => {
    fetchUserCount(); // Re-fetch count after successful registration
  }, [fetchUserCount]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1000;

  useEffect(() => {
    let typingTimeoutId;

    if (isPaused) {
      typingTimeoutId = setTimeout(() => {
        setIsPaused(false);
        if (!isDeleting) {
          setIsDeleting(true);
        } else {
          setIsDeleting(false);
          setCurrentCharIndex(0);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % TYPING_WORDS.length);
        }
      }, pauseDuration);
    } else if (isDeleting) {
      if (currentCharIndex > 0) {
        typingTimeoutId = setTimeout(() => {
          setAnimatedText(TYPING_WORDS[currentWordIndex].substring(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        }, deletingSpeed);
      } else {
        setIsPaused(true);
      }
    } else {
      if (currentCharIndex < TYPING_WORDS[currentWordIndex].length) {
        typingTimeoutId = setTimeout(() => {
          setAnimatedText(TYPING_WORDS[currentWordIndex].substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, typingSpeed);
      } else {
        setIsPaused(true);
      }
    }
    return () => clearTimeout(typingTimeoutId);
  }, [animatedText, currentCharIndex, currentWordIndex, isDeleting, isPaused]);

  return (
    <>
      {/* Styles are in globals.css and LandingPage specific styles here via JSX style tag */}
      <style jsx global>{`
        body { /* Ensure Exo 2 is primary for the whole page if not overridden by Tailwind */
          font-family: 'Exo 2', 'Inter', sans-serif;
        }
        .animated-gradient-bg {
          background-size: 200% 200%;
          animation: flowGradient 20s ease infinite;
        }
        .typed-text-effect {
          text-shadow: 0 0 8px rgba(196, 181, 253, 0.3); /* purple-300 with low alpha */
        }
        .blinking-cursor {
          display: inline-block;
          color: #C4B5FD; /* Tailwind purple-300 */
          animation: blink-caret 0.9s step-end infinite;
          font-weight: normal; /* Prevent cursor from becoming too bold due to h1 styling */
        }
        /* Keyframes (flowGradient, blink-caret) are in tailwind.config.js so they are globally available */
      `}</style>
      <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-black via-indigo-900 to-black text-white p-4 animated-gradient-bg selection:bg-purple-500 selection:text-white">
        <div className="flex flex-col items-center justify-center text-center flex-grow pt-16 md:pt-24">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-wider text-gray-100 min-h-[1.2em] md:min-h-[1.5em] flex items-center justify-center"
            style={{ fontFamily: "'Exo 2', sans-serif" }} /* Explicitly set font for h1 */
            aria-live="polite"
          >
            <span className="typed-text-effect">{animatedText}</span>
            <span className="blinking-cursor ml-1 md:ml-2">|</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-gray-300 font-light max-w-2xl">
            An <span className="text-purple-400 font-medium">epic new dimension</span> is about to unfold. Get ready to plug in!
          </p>
          <p className="mt-6 text-2xl md:text-3xl font-semibold">
            Join <span className={`text-purple-300 font-bold ${!isLoadingCount ? 'animate-pulse' : ''}`}>
              {isLoadingCount ? '---' : registeredUserCount.toLocaleString()}
            </span> Others Already Pre-Registered!
          </p>
          <p className="mt-4 text-lg text-gray-400 max-w-xl">
            Be among the first to explore. Pre-register below for exclusive updates, early access, and special launch bonuses.
          </p>
        </div>

        <div className="w-full max-w-xl mb-8 mt-12 md:mt-16 px-2">
          <LoginPage onSuccessfulRegistration={handleSuccessfulRegistration} />
        </div>
        <footer className="text-center py-6 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} GamersThing. All rights reserved. Prepare for launch!
        </footer>
      </div>
    </>
  );
};

export default HomePage;