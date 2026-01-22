"use client";
import Render from "@repo/ui/render";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaHome, FaWallet, FaStore, FaExchangeAlt } from "react-icons/fa";

export default function Home() {
  const [data, setData] = useState(null);
  const [state, setState] = useState("home");
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/home");
        setData(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function signout() {
    localStorage.removeItem("user");
    const response = await axios.get("http://localhost:3000/api/signout");
    if (response.status === 200) {
      router.push("/");
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Topbar */}
      <div className="bg-blue-600 text-white flex items-center justify-between px-6 py-4 shadow-md">
        <div className="text-lg font-bold">Paytm</div>
        <div className="flex gap-4 items-center">
          {data ? (
            <div className="flex gap-4 items-center">
              <span className="font-medium">Welcome, {data.name}</span>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={signout}
              >
                Signout
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={() => router.push("/auth/signin")}
            >
              Signin
            </button>
          )}
          <div
            className="text-sm cursor-pointer"
            onClick={() => setState("wallet")}
          >
            Wallet - Rs. <span className="font-medium">{data?.balance}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1">
        {/* Left Sidebar */}
        <nav className="w-1/4 bg-gray-100 flex flex-col gap-4 py-6 px-4 shadow-md md:w-1/5 lg:w-1/6">
          <button
            className="flex items-center gap-2 text-left hover:bg-gray-200 rounded py-2 px-3"
            onClick={() => setState("home")}
          >
            <FaHome /> Home
          </button>
          <button
            className="flex items-center gap-2 text-left hover:bg-gray-200 rounded py-2 px-3"
            onClick={() => setState("merchant")}
          >
            <FaStore /> Merchant Payment
          </button>
          <button
            className="flex items-center gap-2 text-left hover:bg-gray-200 rounded py-2 px-3"
            onClick={() => setState("p2p")}
          >
            <FaExchangeAlt /> P2P Transfer
          </button>
          <button
            className="flex items-center gap-2 text-left hover:bg-gray-200 rounded py-2 px-3"
            onClick={() => setState("withdraw")}
          >
            <FaWallet /> Withdraw Balance
          </button>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
          <Render type={state} />
        </div>
      </div>
    </main>
  );
}
