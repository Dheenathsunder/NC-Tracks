'use client';

import { Suspense, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { NCTracksHeader } from '@/components/nc-tracks-header';
import { Navigation } from '@/components/navigation';
import { generatePriorAuthCode } from '@/lib/prior-auth-code';

function PASummaryContent() {
  const searchParams = useSearchParams();
  const priorAuthCode = useMemo(
    () => searchParams.get('code') || generatePriorAuthCode(),
    [searchParams]
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <NCTracksHeader />
      <Navigation currentPage="prior-approval" />

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded shadow p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Prior Approval Request Submitted</h1>
            <p className="text-lg text-green-600 font-semibold">✓ Your request has been successfully submitted.</p>
          </div>

          <div className="bg-green-50 border border-green-300 rounded p-6 mb-8">
            <h2 className="text-xl font-bold text-green-900 mb-4">Submission Confirmation</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Prior Auth Code:</span> {priorAuthCode}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Submitted Date:</span> {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Status:</span> <span className="text-green-600 font-bold">Under Review</span>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-300 rounded p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">What Happens Next?</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Your request is now being processed by our review team</li>
              <li>You can check the status of your request in the Prior Approval Inquiry section</li>
              <li>You will receive notification via email when a decision has been made</li>
              <li>The typical review time is 3-5 business days for standard requests</li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-300 rounded p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/pa-entry"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded text-center"
              >
                Submit Another PA Request
              </Link>
              <button className="inline-block bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded text-center cursor-pointer">
                Check Request Status
              </button>
              <Link
                href="/"
                className="inline-block bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded text-center"
              >
                Return to Portal Home
              </Link>
              <button className="inline-block bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded text-center cursor-pointer">
                Contact NC Tracks Help
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 rounded p-6">
            <h3 className="font-bold text-yellow-900 mb-2">Important Note</h3>
            <p className="text-gray-700 text-sm">
              Please retain this confirmation for your records. You will need the Request ID to track your submission.
              For questions about your request, please contact NC Tracks Help or your account representative.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-700 text-gray-300 text-center py-4 mt-8">
        <div className="container mx-auto text-xs space-y-1">
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Legal</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Accessibility</a>
            <a href="#" className="hover:text-white">Contact Us</a>
            <a href="#" className="hover:text-white">System Requirements</a>
            <a href="#" className="hover:text-white">Report Fraud</a>
          </div>
          <p className="text-gray-500">NC Department of Health and Human Services</p>
        </div>
      </footer>
    </div>
  );
}

export default function PASummary() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100" />}>
      <PASummaryContent />
    </Suspense>
  );
}
