'use client';

import Header from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Message Center for IdealDental Fayetteville</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-300 rounded p-6">
              <h2 className="text-2xl font-bold text-[#0066CC] mb-6">Announcements</h2>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> Nov 26, 2019, 12:00:00 AM
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Attention:</strong> All Providers
                </p>

                <p className="text-sm text-gray-700 leading-relaxed">
                  The Health Insurance Marketplace at HealthCare.gov serves people who don't get health coverage from Medicaid, Medicare or their job. Factsheets on the Marketplace are available in English and Spanish to post in your locations. North Carolinians seeking in-person assistance with enrollment can visit the NC Navigator Consortium to find a local application assister or call the toll-free NC Navigator Helpline at 1-855-733-3711.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <button className="bg-[#5B8AC5] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#4A7AB0]">
                  Welcome
                </button>
                <button className="bg-[#7AB04D] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#6A9F3D]">
                  Provider Training
                </button>
                <button className="bg-[#5B8AC5] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#4A7AB0]">
                  Office Administrators
                </button>
                <button className="bg-[#5B8AC5] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#4A7AB0]">
                  Enrollment
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-300 rounded p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {[
                  'CCNC/CA (Managed Care)',
                  'Department of Health and Human Services',
                  'Division of Health Service Regulation',
                  'Division of Health Benefits',
                  'DHB (Health Check)',
                  'DMH/DD/SAS',
                  'Division of Public Health',
                  'Office of Rural Health',
                  'Provider Training',
                ].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#0066CC] hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-700 text-gray-400 text-center py-3 mt-12 text-xs border-t border-gray-600">
        <p>NC Department | © 2024 All rights reserved</p>
      </footer>
    </div>
  );
}
