'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Page = () => {
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  let timeout;

  // Clear the message after 7 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const debounce = (setter)=>(value)=>{
    clearTimeout(timeout);
    timeout=setTimeout(() => {
      setter(value)
    }, 1000);
  }
 
  
  const run = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/signin', {
        email,
        passcode,
      });

      if (response.status === 200) {
        setMessage('Signin Success');
        router.push('/auth/dashboard');
      }
      else{
        setMessage('Wrong email or password')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col gap-6 w-80 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center">Sign In</h1>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => debounce(setEmail)(e.target.value)}
          className="p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Passcode"
          onChange={(e) => debounce(setPasscode)(e.target.value)}
          className="p-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={run}
          className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
        {message && <div className="text-center text-white">{message}</div>}
        <div className="text-center text-gray-400">
          New to Paytm?{' '}
          <button
            onClick={() => router.push('/auth/signup')}
            className="text-blue-500 underline hover:text-blue-400"
          >
            Signup
          </button>
          {message}
        </div>
      </div>
    </div>
  );
};

export default Page;
