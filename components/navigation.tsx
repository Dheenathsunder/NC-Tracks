'use client';

import Link from 'next/link';

interface NavigationProps {
  currentPage: string;
}

export function Navigation({ currentPage }: NavigationProps) {
  const navItems = [
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'prior-approval', label: 'Prior Approval' },
    { id: 'claims', label: 'Claims' },
    { id: 'referral', label: 'Referral' },
    { id: 'code-search', label: 'Code Search' },
    { id: 'enrollment', label: 'Enrollment' },
    { id: 'payment', label: 'Payment' },
    { id: 'consent-forms', label: 'Consent Forms' },
    { id: 'training', label: 'Training' },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center">
        {/* Provider Portal Label */}
        <div className="flex items-center px-6 py-0 border-r border-blue-500">
          <span className="text-sm font-bold whitespace-nowrap">Provider Portal</span>
          <div className="absolute left-6 top-12 w-12 h-4 bg-blue-600 transform -skew-x-12"></div>
        </div>

        {/* Navigation Items */}
        <div className="flex gap-0 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`px-6 py-4 font-semibold text-sm hover:bg-blue-700 transition-colors border-r border-blue-500 whitespace-nowrap ${
                currentPage === item.id ? 'bg-blue-700' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white text-gray-700 px-6 py-2 text-sm border-b border-gray-200">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span>Prior Approval Request</span>
      </div>
    </nav>
  );
}
