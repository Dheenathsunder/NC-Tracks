'use client';

import Image from 'next/image';

export function NCTracksHeader() {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-20 h-16">
            <div className="w-20 h-16 bg-white rounded-lg p-1 flex items-center justify-center">
              <svg viewBox="0 0 100 80" className="w-full h-full">
                {/* NC State shape simplified */}
                <path d="M 10 20 L 70 20 L 80 40 L 70 60 L 10 60 Q 5 40 10 20" fill="#1B3E66" stroke="#1B3E66" strokeWidth="1"/>
                {/* NC Text */}
                <text x="25" y="55" fontSize="32" fontWeight="bold" fill="#E74C3C" fontFamily="Arial">NC</text>
              </svg>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold opacity-90">NC TRACKS</p>
            <p className="text-xs opacity-75">Provider Portal</p>
          </div>
        </div>

        {/* Welcome Message and Search */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold">
              🔒 Welcome, <span className="font-bold">IdealDental Fayetteville</span>. (<a href="#" className="hover:underline">Log out</a>)
            </p>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder=""
                className="px-3 py-1 rounded text-gray-800 text-sm w-32"
              />
              <button className="bg-white/20 hover:bg-white/30 p-1 rounded">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          <a href="#" className="text-sm hover:underline whitespace-nowrap">
            | NC Tracks Help
          </a>
        </div>
      </div>
    </header>
  );
}
