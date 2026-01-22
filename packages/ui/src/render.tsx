"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Render = ({ type }) => {
  let timeout;
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState("");
  const [passcode, setPasscode] = useState("");

  const debounce = (setter) => (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setter(value);
    }, 1000);
  };

  async function run() {
  const primary = JSON.parse(localStorage.getItem("user"));

    try {
      const data = await axios.post("http://localhost:3000/api/payment/p2p", {
        phone,
        passcode,
        senderEmail: primary.email,
      });

      if (data.status === 200) {
        router.push(
          `http://localhost:5173/p2p/?amt=${amount}&&recipient=${phone}&&token=${data.data.token}`
        );
      } else {
        alert("There is some kind of issue");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred. Please try again.");
    }
  }
  async function deposit() {
  const primary = JSON.parse(localStorage.getItem("user"));

    try {
      const data = await axios.post("http://localhost:3000/api/payment/wallet", {
        walletId:primary.id,
        passcode,
        senderEmail: primary.email,
      });

      if (data.status === 200) {
        router.push(
          `http://localhost:5173/?amt=${amount}&&recipient="paytm wallet"&&token=${data.data.token}`
        );
      } else {
        alert("There is some kind of issue");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred. Please try again.");
    }
  }

  if (type === "p2p") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <div className="p-6 bg-white rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            P2P Transfer
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => debounce(setPhone)(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Amount"
              onChange={(e) => debounce(setAmount)(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Passcode"
              onChange={(e) => debounce(setPasscode)(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={run}
            >
              Send Money
            </button>
          </div>
        </div>
      </div>
    );
  } else if (type === "wallet") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <div className="p-6 bg-white rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            Wallet Deposit
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Passcode"
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={deposit}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
    );
  }
  else if(type=='withdraw'){
    
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
              Wallet Withdraw
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Passcode"
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={deposit}
              >
                Withdraw to Bank
              </button>
            </div>
          </div>
        </div>
    )
  }

  return null;
};

export default Render;
