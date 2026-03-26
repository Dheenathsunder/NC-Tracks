'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [showPAMenu, setShowPAMenu] = useState(false);

  const tabs = [
    'Eligibility',
    'Prior Approval',
    'Claims',
    'Referral',
    'Code Search',
    'Enrollment',
    'Payment',
    'Consent Forms',
    'Training',
  ];

  return (
    <>
      {/* Top Header */}
      <header className="bg-[#1B3E66] px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            NC<span className="text-red-500">TRACKS</span>
          </div>
          <div className="flex items-center gap-4 text-white text-sm">
            <span>🔒 Welcome, <strong>IdealDental Fayetteville</strong>. (<button className="text-blue-200 hover:text-white underline">Log out</button>)</span>
            <input type="text" placeholder="" className="px-3 py-1 rounded text-gray-700 text-sm w-40" />
            <a href="#" className="text-blue-200 hover:text-white underline">| NCTracks Help</a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-[#5B8AC5] px-8 py-0 shadow">
        <div className="max-w-7xl mx-auto flex gap-0 relative">
          {tabs.map((tab) =>
            tab === 'Prior Approval' ? (
              <div
                key={tab}
                className="relative"
                onMouseEnter={() => setShowPAMenu(true)}
                onMouseLeave={() => setShowPAMenu(false)}
              >
                <button
                  type="button"
                  className="px-4 py-3 text-white font-semibold transition border-b-4 border-white bg-[#4A7AB0]"
                  aria-expanded={showPAMenu}
                  aria-haspopup="menu"
                  onClick={() => setShowPAMenu((open) => !open)}
                >
                  {tab}
                </button>

                {showPAMenu && (
                  <div
                    className="absolute top-full left-0 bg-[#3D5F8F] text-white shadow-lg z-10 min-w-full"
                    role="menu"
                  >
                    <Link
                      href="/?pa=entry"
                      className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap"
                      role="menuitem"
                      onClick={() => setShowPAMenu(false)}
                    >
                      PA Entry
                    </Link>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    PA Inquiry
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    Eyeglass Service History
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    Refraction History Confirmation
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    Dental Benefit Limitation
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    PA Draft Search
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    Physician Fluoride Varnish Limitation
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    DME/O&P Service History
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    CAP Respite Service History
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    EVV History Search
                  </button>
                  <button className="block w-full text-left px-6 py-3 hover:bg-[#2B5A8F] whitespace-nowrap">
                    Prescribing Provider Reviews
                  </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                key={tab}
                type="button"
                className="px-4 py-3 text-white font-semibold border-b-4 border-transparent hover:bg-[#4A7AB0] transition"
              >
                {tab}
              </button>
            ),
          )}
        </div>
      </nav>
    </>
  );
}
