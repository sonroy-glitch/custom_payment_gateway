'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

const Page = () => {
  let timeout;
  const router = useRouter();
const [loading,setLoading]=useState(false)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [passcode, setPasscode] = useState('');
  const [message, setMessage] = useState('');

 
  const debounce = (setter) => (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setter(value);
    }, 1000);
  };


  const run = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        name,
        email,
        phone,
        passcode,
      });

      if (response.status === 200) {
        setMessage('Signup Success');
        setLoading(false);
        router.push('/auth/dashboard');
      } else {
        setMessage('Issue with signing up. Try again.');
        setLoading(false);

      }
    } catch (error) {
      setMessage('Something went wrong.');
      setLoading(false);

    }
  };

  return (
    <main className="flex flex-col items-center p-6 min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={run}>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => debounce(setName)(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => debounce(setEmail)(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Phone Number"
            onChange={(e) => debounce(setPhone)(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="passcode" className="text-sm font-medium mb-1">
            Passcode
          </label>
          <input
            id="passcode"
            type="password"
            placeholder="Passcode"
            onChange={(e) => debounce(setPasscode)(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {loading?
        <ClipLoader color="red" size={25} />
        :<button
        type="submit"
        className="bg-blue-500 text-white font-medium py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Sign Up
      </button>}
        
        {message && <div className="mt-2 text-center text-sm">{message}</div>}
      </form>
    </main>
  );
};

export default Page;
