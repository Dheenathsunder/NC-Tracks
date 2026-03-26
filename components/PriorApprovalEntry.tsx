'use client';

import { useState } from 'react';
import Header from './Header';

interface PriorApprovalEntryProps {
  onSelectPayer: (payer: string, healthPlan: string, paType: string) => void;
}

export default function PriorApprovalEntry({ onSelectPayer }: PriorApprovalEntryProps) {
  const [payer, setPayer] = useState('');
  const [healthPlan, setHealthPlan] = useState('');
  const [paType, setPAType] = useState('');

  const healthPlans = ['NCXTX', 'NCXXI'];
  const paTypes = [
    'DENTAL',
    'DME',
    'EARLY EXAM',
    'EXC. TO LE',
    'HEARING AI',
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
      onSelectPayer(payer, healthPlan, paType);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-4 text-sm text-gray-600">
          <a href="#" className="text-blue-600 hover:underline">
            Home
          </a>
          {' › '}
          <span className="text-gray-800 font-semibold">Prior Approval Request</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Prior Approval Request</h1>
        <p className="text-red-600 text-sm mb-6">* indicates a required field</p>

        <div className="max-w-2xl mx-auto bg-white border-l-4 border-[#1B3E66] rounded p-8">
          <div className="space-y-6">
            {/* Payer Selection */}
            <div className="pb-6 border-b border-gray-300">
              <h3 className="text-[#1B3E66] font-bold uppercase text-sm mb-6 pb-3 border-b-2 border-gray-300">
                Prior Approval Request Type
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-bold">*</span>
                <label className="text-gray-700 font-semibold text-sm">Please Select A Payer:</label>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payer"
                    value="DHB"
                    checked={payer === 'DHB'}
                    onChange={(e) => setPayer(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">DHB</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payer"
                    value="DPH"
                    checked={payer === 'DPH'}
                    onChange={(e) => setPayer(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700">DPH</span>
                </label>
              </div>
            </div>

            {/* Health Plan Selection */}
            <div className="pb-6 border-b border-gray-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-bold">*</span>
                <label htmlFor="healthPlan" className="text-gray-700 font-semibold text-sm">
                  Health Plan:
                </label>
              </div>
              <select
                id="healthPlan"
                value={healthPlan}
                onChange={(e) => setHealthPlan(e.target.value)}
                className="border border-gray-400 rounded px-3 py-2 text-gray-700 w-full max-w-xs"
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
            <div className="pb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-bold">*</span>
                <label htmlFor="paType" className="text-gray-700 font-semibold text-sm">
                  PA Type:
                </label>
              </div>
              <select
                id="paType"
                value={paType}
                onChange={(e) => setPAType(e.target.value)}
                className="border border-gray-400 rounded px-3 py-2 text-gray-700 w-full max-w-xs"
              >
                <option value="">Choose</option>
                {paTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!payer || !healthPlan || !paType}
                className="bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white px-8 py-2 rounded font-semibold transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
