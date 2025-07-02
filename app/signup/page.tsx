"use client"
import { useState } from "react";
import { Heart } from "lucide-react";

export default function SignupPage() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex">
      {/* Left: Illustration/Brand */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-pink-500 via-purple-500 to-rose-400 text-white p-12 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/20 rounded-full p-6 mb-6 shadow-lg">
            <Heart className="h-16 w-16 text-pink-200" />
          </div>
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight drop-shadow-lg">Welcome to AfyaSasa</h1>
          <p className="text-lg text-pink-100 mb-8 text-center max-w-xs">AI-powered ovarian cyst prediction and care for every woman, everywhere.</p>
          <img src="/placeholder-user.jpg" alt="Welcome" className="rounded-2xl shadow-xl w-64 h-64 object-cover border-4 border-white/30" />
        </div>
      </div>
      {/* Right: Auth Card */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-pink-100">
          <div className="flex justify-center mb-6">
            <button
              className={`px-6 py-2 rounded-l-lg font-semibold transition-colors ${tab === 'login' ? 'bg-pink-500 text-white' : 'bg-pink-50 text-pink-500'}`}
              onClick={() => setTab('login')}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-r-lg font-semibold transition-colors ${tab === 'signup' ? 'bg-pink-500 text-white' : 'bg-pink-50 text-pink-500'}`}
              onClick={() => setTab('signup')}
            >
              Sign Up
            </button>
          </div>
          {/* Google Auth Placeholder */}
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold py-2 rounded-lg shadow mb-6 hover:from-pink-600 hover:to-rose-500 transition">
            <svg className="h-5 w-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.7 30.77 0 24 0 14.82 0 6.71 5.82 2.69 14.09l7.98 6.2C12.13 13.13 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.03l7.19 5.59C43.99 37.13 46.1 31.3 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.99 16.09 0 19.92 0 24c0 4.08.99 7.91 2.69 12.24l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.48 0 11.92-2.15 15.89-5.85l-7.19-5.59c-2.01 1.35-4.59 2.15-8.7 2.15-6.44 0-11.87-3.63-14.33-8.79l-7.98 6.2C6.71 42.18 14.82 48 24 48z"/></g></svg>
            Continue with Google
          </button>
          {/* Auth Form */}
          <form className="space-y-5">
            {tab === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-1">Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="Your Name" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="you@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-1">Password</label>
              <input type="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400" placeholder="Password" />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold py-2 rounded-lg shadow hover:from-pink-600 hover:to-rose-500 transition">
              {tab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
          {tab === 'login' && (
            <p className="text-sm text-center text-gray-500 mt-4">
              Don't have an account?{' '}
              <button className="text-pink-600 font-semibold hover:underline" onClick={() => setTab('signup')}>Sign Up</button>
            </p>
          )}
          {tab === 'signup' && (
            <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{' '}
              <button className="text-pink-600 font-semibold hover:underline" onClick={() => setTab('login')}>Login</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 