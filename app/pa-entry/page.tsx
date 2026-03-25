'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NCTracksHeader } from '@/components/nc-tracks-header';
import { Navigation } from '@/components/navigation';

export default function PAEntry() {
  const router = useRouter();
  const [payer, setPayer] = useState('DHB');
  const [healthPlan, setHealthPlan] = useState('');
  const [paType, setPAType] = useState('');

  const healthPlans = [
    'NCXTX',
    'NCXXI',
  ];

  const paTypes = [
    'DENTAL',
    'DME',
    'EARLY EXAM',
    'EXC. TO LE',
    'HEARING AID',
    'HOME HLTH',
    'HOSPICE',
    'LTC - NF',
    'LTC - SH',
    'MEDICAL',
    'OOS - AMBU',
    'OOS SURGER',
    'ORTHODONTI',
    'OUT OF STA',
    'PDN',
    'PHARMACY',
    'SURGERY',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (payer && healthPlan && paType) {
      router.push(`/pa-form?payer=${payer}&plan=${healthPlan}&type=${paType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NCTracksHeader />
      <Navigation currentPage="prior-approval" />

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded shadow">
          <div className="p-6 border-b border-gray-300">
            <h1 className="text-2xl font-bold text-gray-800">Prior Approval Request</h1>
            <p className="text-sm text-red-600 mt-2">* indicates a required field</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="bg-gray-50 border border-gray-300 rounded p-6 mb-6">
              <h2 className="text-base font-bold text-gray-800 mb-6 pb-4 border-b border-gray-300">
                PRIOR APPROVAL REQUEST TYPE
              </h2>

              {/* Payer Selection */}
              <div className="mb-8">
                <label className="block font-bold text-gray-700 mb-3">
                  <span className="text-red-600">*</span> Please Select A Payer:
                </label>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payer"
                      value="DHB"
                      checked={payer === 'DHB'}
                      onChange={(e) => setPayer(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-gray-700">DHB</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="payer"
                      value="DPH"
                      checked={payer === 'DPH'}
                      onChange={(e) => setPayer(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-gray-700">DPH</span>
                  </label>
                </div>
              </div>

              {/* Health Plan Selection */}
              <div className="mb-8">
                <label className="block font-bold text-gray-700 mb-3">
                  <span className="text-red-600">*</span> Health Plan:
                </label>
                <select
                  value={healthPlan}
                  onChange={(e) => setHealthPlan(e.target.value)}
                  className="px-4 py-2 border border-gray-400 rounded bg-white text-gray-700 font-semibold cursor-pointer"
                >
                  <option value="">Choose</option>
                  {healthPlans.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>

              {/* PA Type Selection */}
              <div className="mb-8">
                <label className="block font-bold text-gray-700 mb-3">
                  <span className="text-red-600">*</span> PA Type:
                </label>
                <select
                  value={paType}
                  onChange={(e) => setPAType(e.target.value)}
                  className="px-4 py-2 border border-gray-400 rounded bg-white text-gray-700 font-semibold cursor-pointer"
                >
                  <option value="">Choose</option>
                  {paTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-8 rounded cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
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
