'use client';

import { useState } from 'react';
import { fakeBillingProviderData } from '@/lib/fakeData';

interface BillingProviderSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function BillingProviderSection({
  formData,
  setFormData,
}: BillingProviderSectionProps) {
  const [npiInput, setNpiInput] = useState('');
  const [showBillingForm, setShowBillingForm] = useState(false);

  const handleValidateBilling = () => {
    const data = fakeBillingProviderData[npiInput];
    if (data) {
      setFormData({
        ...formData,
        billingNPI: npiInput,
        billingAddress: data.address,
        billingLastName: data.lastName,
        billingFirstName: data.firstName,
        billingAddress1: data.address1,
        billingAddress2: data.address2,
        billingCity: data.city,
        billingState: data.state,
        billingZip: data.zip,
        billingTaxonomyCode: data.taxonomyCode,
        billingPhone: data.phone,
        billingFax: data.fax,
      });
      setShowBillingForm(true);
      setNpiInput('');
    }
  };

  return (
    <div className="border border-gray-400 rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-bold text-[#1B3E66] mb-4 pb-2 border-b border-gray-300 uppercase tracking-wide">
        Billing Provider
      </h3>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.billingIsSame || false}
              onChange={(e) => setFormData({ ...formData, billingIsSame: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">Billing provider is the same as the requesting provider</span>
          </label>
          <button
            type="button"
            onClick={handleValidateBilling}
            disabled={!npiInput && !showBillingForm}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded font-semibold ml-auto"
          >
            Validate
          </button>
        </div>

        {!showBillingForm ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
                  <span className="text-red-600">*</span>
                  NPI:
                </label>
                <input
                  type="text"
                  value={npiInput}
                  onChange={(e) => setNpiInput(e.target.value)}
                  placeholder="1982362018"
                  className="w-full border border-gray-400 rounded px-3 py-2"
                />
              </div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Address:</label>
                <select className="w-full border border-gray-400 rounded px-3 py-2 text-sm">
                  <option value={formData.billingAddress}>{formData.billingAddress}</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
                  <span className="text-red-600">*</span>
                  Taxonomy Code:
                </label>
                <select
                  value={formData.billingTaxonomyCode || ''}
                  onChange={(e) => setFormData({ ...formData, billingTaxonomyCode: e.target.value })}
                  className="w-full border border-gray-400 rounded px-3 py-2 text-sm"
                >
                  <option value="">Choose</option>
                  <option value="193200000X - Multi-Specialty">193200000X - Multi-Specialty</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600">Last Name:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.billingLastName}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Address1:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.billingAddress1}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Address2:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.billingAddress2}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">City:</label>
                <p className="text-sm font-semibold text-gray-900">{formData.billingCity}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">State:</label>
                <p className="text-sm font-semibold text-gray-900">{formData.billingState}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">ZIP Code:</label>
                <p className="text-sm font-semibold text-gray-900">{formData.billingZip}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Phone:</label>
                <p className="text-sm font-semibold text-gray-900">{formData.billingPhone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Fax:</label>
                <p className="text-sm font-semibold text-gray-900">{formData.billingFax}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
