'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const playClickSound = () => {
    const audio = new Audio('/sounds/click.mp3');
    audio.play().catch(() => {});
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push('/chat');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b11] flex items-center justify-center p-4">
      {/* Glow Effect Box */}
      <div className="w-full max-w-md bg-[#0d141e]/90 border border-emerald-500/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
        
        {/* Lamp Visual Animation */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-2 h-10 bg-emerald-500/50"></div>
          <div className="w-16 h-10 bg-emerald-600 rounded-b-2xl shadow-[0_0_35px_#10b981]"></div>
          <div className="w-24 h-24 mt-2 rounded-full border-2 border-emerald-400/40 flex items-center justify-center bg-emerald-950/20">
            {/* Robot Face / Eye Interaction */}
            <span className="text-3xl">{showPassword ? '🫣' : '🤖'}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-1">
          MEKBOT<span className="text-emerald-400">AI</span>
        </h2>
        <p className="text-xs text-gray-400 text-center mb-6">Sign in to illuminate your path</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full bg-[#16202c] text-white pl-10 pr-4 py-2.5 rounded-xl border border-gray-700 focus:border-emerald-500 focus:outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              className="w-full bg-[#16202c] text-white pl-10 pr-10 py-2.5 rounded-xl border border-gray-700 focus:border-emerald-500 focus:outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
              onClick={() => {
                playClickSound();
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-gray-900 font-bold rounded-xl hover:opacity-90 active:scale-95 transition shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            {loading ? 'AUTHENTICATING...' : 'SIGN IN →'}
          </button>
        </form>
      </div>
    </div>
  );
}
