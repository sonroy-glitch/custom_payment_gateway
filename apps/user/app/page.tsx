'use client'
import Image from 'next/image';
import {useEffect} from 'react'
import {redirect} from "next/navigation"
import {useRouter} from "next/navigation"
export default  function Landing() {
  const router=useRouter()

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('user'));
  if(user?.email){
    redirect('/auth/dashboard')
  }
  }, [])
  
  
  var data =  "https://picsum.photos/1920/1080"
  return (
    <div className="relative bg-blue-50 min-h-screen overflow-hidden">
      {/* Watermark Section */}
      <div className="absolute inset-0 flex justify-center items-center opacity-30 pointer-events-none z-0">
        <div className="flex w-full">
          {/* Random Watermark Image 1 */}
          <img
          src={data} // Random full-width image
          alt="Watermark Image"
          layout="fill"
          objectfit="cover"
          quality={50}
        />
         
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold text-blue-700">Venmo</h1>
          <div className="flex space-x-4">
            <button className="text-blue-700 font-medium" onClick={()=>{router.push('/auth/signin')}}>Log in</button>
            <button className="border px-4 py-1 rounded-lg text-blue-700 border-blue-700">
              Merchant login
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-12">
          {/* Text Section */}
          <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fast, safe <br /> social payments
            </h2>
            <p className="text-gray-700 mb-6">
              Pay, get paid, grow a business, and more. Join the tens of millions
              of people on Venmo.
            </p>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800">
              Get Venmo
            </button>
          </div>

        
        </main>
      </div>
    </div>
  );
}
