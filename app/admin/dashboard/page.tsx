'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminDashboard() {
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'site_logo')
        .single();
      if (data) setLogoUrl(data.value);
    }
    fetchSettings();
  }, []);

  const handleUpdateLogo = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: 'site_logo', value: logoUrl, updated_at: new Date().toISOString() });

    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else alert('Logo updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white p-8">
      <h1 className="text-3xl font-bold text-red-500 mb-6">MEKBOTAI - Admin Console</h1>
      <div className="bg-[#14141e] border border-gray-800 p-6 rounded-2xl max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Website Logo Management</h2>
        
        <label className="block text-sm text-gray-400 mb-2">Logo Image URL</label>
        <input
          type="text"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          className="w-full bg-[#1e1e2d] border border-gray-700 rounded-lg p-3 text-white mb-4 focus:outline-none focus:border-red-500"
        />

        {logoUrl && (
          <div className="mb-4">
            <span className="text-xs text-gray-400 block mb-1">Preview:</span>
            <img src={logoUrl} alt="Logo Preview" className="h-16 object-contain rounded bg-black/40 p-2 border border-gray-800" />
          </div>
        )}

        <button
          onClick={handleUpdateLogo}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-lg font-bold active:scale-95 transition"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
