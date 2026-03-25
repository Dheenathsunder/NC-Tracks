'use client';

import { useState } from 'react';

interface LineItem {
  id: number;
  lineNum: number;
  procCode: string;
  codeType: string;
  areaCavity: string;
  tooth: string;
  requestDate: string;
}

interface Attachment {
  id: number;
  type: string;
  code: string;
  control: string;
  supplement: string;
  file?: File;
}

interface FormData {
  payer: string;
  paType: string;
  healthPlan: string;
  recipientId: string;
  recipientLastName: string;
  recipientFirstName: string;
  recipientAddress1: string;
  recipientAddress2: string;
  recipientCity: string;
  recipientState: string;
  recipientZip: string;
  recipientGender: string;
  recipientDOB: string;
  accountInfo: string;
  group: string;
  locatorCode: string;
  npiAtypicalId: string;
  taxonomyCode: string;
  billingProviderSame: boolean;
  billingNpi: string;
  billingAddress: string;
  billingLastName: string;
  billingFirstName: string;
  billingTaxonomyCode: string;
  lineItems: LineItem[];
  hasAttachments: boolean;
  attachments: Attachment[];
}

interface HeaderTabProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  fieldErrors?: Record<string, string>;
}

// Fake recipient data mapping
const recipientDataMap: Record<string, any> = {
  '948723863S': {
    lastName: 'STRICKLAND',
    firstName: 'RACHEAL',
    address1: '667 NEWPORT RD',
    address2: '',
    city: 'FAYETTEVILLE',
    state: 'NC',
    zip: '28314-0000',
    gender: 'FEMALE',
    dob: '9/21/1989',
  }
};

export function HeaderInformationTab({
  formData,
  setFormData,
  fieldErrors = {},
}: HeaderTabProps) {
  const [recipientIdInput, setRecipientIdInput] = useState('');

  const errClass = (key: string) =>
    fieldErrors[key] ? 'border-red-600 ring-1 ring-red-500' : 'border-gray-400';

  const handleConfirmRecipient = () => {
    if (!recipientIdInput.trim()) return;

    const recipientData = recipientDataMap[recipientIdInput.toUpperCase()] || {
      lastName: 'SAMPLE',
      firstName: 'PATIENT',
      address1: '123 MAIN ST',
      address2: '',
      city: 'RALEIGH',
      state: 'NC',
      zip: '27601-0000',
      gender: 'MALE',
      dob: '1/15/1985',
    };

    setFormData({
      ...formData,
      recipientId: recipientIdInput,
      recipientLastName: recipientData.lastName,
      recipientFirstName: recipientData.firstName,
      recipientAddress1: recipientData.address1,
      recipientAddress2: recipientData.address2,
      recipientCity: recipientData.city,
      recipientState: recipientData.state,
      recipientZip: recipientData.zip,
      recipientGender: recipientData.gender,
      recipientDOB: recipientData.dob,
    });
    setRecipientIdInput('');
  };

  return (
    <div className="space-y-6">
      <p className="text-red-600 text-sm font-semibold">
        * indicates a required field. Complete this section before clicking Next.
      </p>
      {(fieldErrors.recipient || fieldErrors.billing || fieldErrors.billingNpi) && (
        <div className="rounded border border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {fieldErrors.recipient && <p className="font-medium">{fieldErrors.recipient}</p>}
          {fieldErrors.billingNpi && <p className="font-medium">{fieldErrors.billingNpi}</p>}
          {fieldErrors.billing && <p className="font-medium">{fieldErrors.billing}</p>}
          {fieldErrors.billingTaxonomy && <p className="font-medium">{fieldErrors.billingTaxonomy}</p>}
        </div>
      )}

      {/* Recipient Information Section */}
      <div className="bg-white border border-gray-300 rounded p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-6 pb-4 border-b border-gray-300 uppercase">
          RECIPIENT
        </h3>
        
        <div className="space-y-4 mb-6">
          <label className="block">
            <span className="text-xs font-bold text-blue-900 mb-2 block">Recipient Information</span>
          </label>
          
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="text-red-600">*</span> Recipient ID:
              </label>
              <input
                type="text"
                value={recipientIdInput}
                onChange={(e) => {
                  const v = e.target.value;
                  setRecipientIdInput(v);
                  setFormData({ ...formData, recipientId: v });
                }}
                placeholder="Enter Recipient ID"
                className={`w-full px-3 py-2 border rounded text-gray-700 ${errClass('recipient')}`}
              />
              {fieldErrors.recipient && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.recipient}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleConfirmRecipient}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>

        {/* Auto-filled fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name:</label>
            <div className="text-gray-900 font-bold py-2">{formData.recipientLastName || ''}</div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">First Name:</label>
            <div className="text-gray-900 font-bold py-2">{formData.recipientFirstName || ''}</div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Address1:</label>
          <div className="text-gray-900 font-bold py-2">{formData.recipientAddress1 || ''}</div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Address2:</label>
          <div className="text-gray-900 font-bold py-2">{formData.recipientAddress2 || ''}</div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">City:</label>
            <div className="text-gray-900 font-bold py-2">{formData.recipientCity || ''}</div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">State:</label>
            <div className="text-gray-900 font-bold py-2">{formData.recipientState || ''}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Gender:</label>
            <div className="text-gray-900 font-bold py-2">{formData.recipientGender || ''}</div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">ZIP Code:</label>
            <div className="text-gray-900 font-bold py-2">{formData.recipientZip || ''}</div>
          </div>
        </div>

        <div className="mt-6 text-right">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth:</label>
          <div className="text-gray-900 font-bold py-2">{formData.recipientDOB || ''}</div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleConfirmRecipient}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded border border-gray-500 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Billing Provider Section */}
      <div className="bg-white border border-gray-300 rounded p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-6 pb-4 border-b border-gray-300 uppercase">
          BILLING PROVIDER
        </h3>

        <div className="space-y-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.billingProviderSame}
              onChange={(e) => setFormData({...formData, billingProviderSame: e.target.checked})}
              className="w-4 h-4"
            />
            <span className="ml-3 text-gray-700">Billing provider is the same as the requesting provider</span>
          </label>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-300 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-600">*</span> NPI:
            </label>
            <input
              type="text"
              value={formData.billingNpi}
              onChange={(e) => setFormData({...formData, billingNpi: e.target.value})}
              className={`w-full px-3 py-2 border rounded text-gray-700 ${errClass('billingNpi')}`}
            />
            {fieldErrors.billingNpi && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.billingNpi}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              if (formData.billingNpi === '1982362018') {
                setFormData({
                  ...formData,
                  billingLastName: 'ALLES & ASSOCIATES NORTH CAROLINA',
                  billingFirstName: '',
                  billingAddress: '4251 RAMSEY ST',
                  billingTaxonomyCode: '193200000X - Multi-Specialty',
                });
              }
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded border border-gray-500 cursor-pointer whitespace-nowrap"
          >
            Validate
          </button>
        </div>
        {(fieldErrors.billing || fieldErrors.billingTaxonomy) && (
          <div className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            {fieldErrors.billing && <p>{fieldErrors.billing}</p>}
            {fieldErrors.billingTaxonomy && <p>{fieldErrors.billingTaxonomy}</p>}
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">or</div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <span className="text-red-600">*</span> Address:
            </label>
            <input
              type="text"
              value={formData.billingAddress}
              className="w-full px-3 py-2 border border-gray-400 rounded text-gray-700 bg-gray-100"
              disabled
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name:</label>
              <input
                type="text"
                value={formData.billingLastName}
                className="w-full px-3 py-2 border border-gray-400 rounded text-gray-700 bg-gray-100"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">First Name:</label>
              <input
                type="text"
                value={formData.billingFirstName}
                className="w-full px-3 py-2 border border-gray-400 rounded text-gray-700 bg-gray-100"
                disabled
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              <span className="text-red-600">*</span> Taxonomy Code:
            </label>
            <input
              type="text"
              value={formData.billingTaxonomyCode}
              className="w-full px-3 py-2 border border-gray-400 rounded text-gray-700 bg-gray-100"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}
