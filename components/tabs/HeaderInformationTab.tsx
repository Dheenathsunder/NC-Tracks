'use client';

import { useState } from 'react';

const FAKE_RECIPIENT_DATA: Record<string, any> = {
  '948723863S': {
    recipientLastName: 'STRICKLAND',
    recipientFirstName: 'RACHEAL',
    address1: '667 NEWPORT RD',
    address2: '',
    city: 'FAYETTEVILLE',
    state: 'NC',
    zipCode: '28314-0000',
    gender: 'FEMALE',
    dateOfBirth: '9/21/1989',
  },
};

const FAKE_BILLING_DATA: Record<string, any> = {
  '1982362018': {
    address: '4251 RAMSEY ST',
    lastNameOrg: 'ALLES & ASSOCIATES NORTH CAROLINA',
    address1: '4251 RAMSEY ST',
    address2: 'STE 8&9',
    city: 'FAYETTEVILLE',
    state: 'NC',
    zipCode: '28311-2130',
    phone: '9107160105',
    fax: '9102928872',
    taxonomyCode: '193200000X - Multi-Specialty',
  },
};

interface HeaderInformationTabProps {
  formData: any;
  setFormData: (data: any) => void;
  fieldErrors?: Record<string, string>;
}

export default function HeaderInformationTab({
  formData,
  setFormData,
  fieldErrors = {},
}: HeaderInformationTabProps) {
  const [recipientId, setRecipientId] = useState('');
  const [billingNpi, setBillingNpi] = useState('');

  const handleRecipientConfirm = () => {
    if (recipientId && FAKE_RECIPIENT_DATA[recipientId]) {
      const data = FAKE_RECIPIENT_DATA[recipientId];
      setFormData({
        ...formData,
        recipientId,
        recipientLastName: data.recipientLastName,
        recipientFirstName: data.recipientFirstName,
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
      });
    }
  };

  const handleBillingValidate = () => {
    if (billingNpi && FAKE_BILLING_DATA[billingNpi]) {
      const data = FAKE_BILLING_DATA[billingNpi];
      setFormData({
        ...formData,
        billingNpi,
        billingAddress: data.address,
        billingLastNameOrg: data.lastNameOrg,
        billingAddress1: data.address1,
        billingAddress2: data.address2,
        billingCity: data.city,
        billingState: data.state,
        billingZipCode: data.zipCode,
        billingPhone: data.phone,
        billingFax: data.fax,
        taxonomyCode: data.taxonomyCode,
        billingTaxonomyCode: data.taxonomyCode,
      });
    }
  };

  const errClass = (key: string) =>
    fieldErrors[key] ? 'border-red-600 ring-1 ring-red-500' : 'border-gray-400';

  return (
    <div className="space-y-6">
      <p className="text-red-600 text-sm font-semibold">
        * indicates a required field. Confirm recipient and billing (when applicable) before continuing.
      </p>
      {/* Payer and PA Type Display */}
      <div className="bg-gray-200 px-4 py-3 rounded flex justify-between border border-gray-400">
        <div>
          <span className="font-semibold">Payer:</span>
          <span className="ml-2 font-bold">{formData.payer || 'DHB'}</span>
        </div>
        <div>
          <span className="font-semibold">PA Type:</span>
          <span className="ml-2 font-bold">{formData.paType || 'DENTAL'}</span>
        </div>
      </div>

      {/* Recipient Section */}
      <div className="border border-gray-400 rounded p-6 bg-white">
        <h3 className="text-[#1B3E66] font-bold uppercase text-sm mb-6 pb-3 border-b-2 border-gray-300">
          Recipient
        </h3>

        <div className="bg-white border border-gray-300 rounded p-4 mb-6">
          <h4 className="text-[#1B3E66] font-semibold text-sm mb-4">Recipient Information</h4>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              <span className="text-red-600">*</span> Recipient ID:
            </label>
            <input
              type="text"
              value={recipientId}
              onChange={(e) => {
                const v = e.target.value;
                setRecipientId(v);
                setFormData({ ...formData, recipientId: v });
              }}
              className={`border rounded px-3 py-2 w-full ${errClass('recipient')}`}
              placeholder=""
            />
            {fieldErrors.recipient && (
              <p className="text-red-600 text-sm mt-1 font-medium">{fieldErrors.recipient}</p>
            )}
          </div>

          {/* Recipient Details - Read Only */}
          {formData.recipientLastName && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">Last Name:</label>
                  <div className="font-bold text-gray-800">{formData.recipientLastName}</div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">First Name:</label>
                  <div className="font-bold text-gray-800">{formData.recipientFirstName}</div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-1">Address1:</label>
                <div className="font-bold text-gray-800">{formData.address1}</div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-1">Address2:</label>
                <div className="font-bold text-gray-800">{formData.address2 || ''}</div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">City:</label>
                  <div className="font-bold text-gray-800">{formData.city}</div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">State:</label>
                  <div className="font-bold text-gray-800">{formData.state}</div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">ZIP Code:</label>
                  <div className="font-bold text-gray-800">{formData.zipCode}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">Gender:</label>
                  <div className="font-bold text-gray-800">{formData.gender}</div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold text-sm mb-1">Date of Birth:</label>
                  <div className="font-bold text-gray-800">{formData.dateOfBirth}</div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleRecipientConfirm}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {!formData.recipientLastName && recipientId && (
            <button
              type="button"
              onClick={handleRecipientConfirm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-sm"
            >
              Confirm
            </button>
          )}
        </div>
      </div>

      {/* Billing Provider Section */}
      <div className="border border-gray-400 rounded p-6 bg-white">
        <h3 className="text-[#1B3E66] font-bold uppercase text-sm mb-6 pb-3 border-b-2 border-gray-300">
          Billing Provider
        </h3>

        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.billingProviderSame || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billingProviderSame: e.target.checked,
                })
              }
              className="w-4 h-4"
            />
            <span className="text-gray-700 text-sm">Billing provider is the same as the requesting provider</span>
          </label>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                <span className="text-red-600">*</span> NPI:
              </label>
              <input
                type="text"
                value={billingNpi}
                onChange={(e) => {
                  const v = e.target.value;
                  setBillingNpi(v);
                  setFormData({ ...formData, billingNpi: v });
                }}
                placeholder="1982362018"
                className={`border rounded px-3 py-2 w-full ${errClass('billingNpi')}`}
              />
              {fieldErrors.billingNpi && (
                <p className="text-red-600 text-sm mt-1 font-medium">{fieldErrors.billingNpi}</p>
              )}
            </div>
            <div className="text-gray-500 font-semibold text-sm">or</div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                <span className="text-red-600">*</span> Atypical Id:
              </label>
              <input
                type="text"
                className={`border rounded px-3 py-2 w-full ${errClass('atypical')}`}
              />
            </div>
            <button
              type="button"
              onClick={handleBillingValidate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-sm h-10"
            >
              Validate
            </button>
          </div>
          {(fieldErrors.billing || fieldErrors.billingTaxonomy) && (
            <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 space-y-1">
              {fieldErrors.billing && <p>{fieldErrors.billing}</p>}
              {fieldErrors.billingTaxonomy && <p>{fieldErrors.billingTaxonomy}</p>}
            </div>
          )}

          {formData.billingLastNameOrg && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1 text-sm">Last Name / Org:</label>
                <div className="font-bold text-gray-800">{formData.billingLastNameOrg}</div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  <span className="text-red-600">*</span> Address:
                </label>
                <select className="border border-gray-400 rounded px-3 py-2 w-full">
                  <option value="">{formData.billingAddress1}</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Address1:</label>
                  <div className="font-bold text-gray-800">{formData.billingAddress1}</div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Address2:</label>
                  <div className="font-bold text-gray-800">{formData.billingAddress2}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">City:</label>
                  <div className="font-bold text-gray-800">{formData.billingCity}</div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">State:</label>
                  <div className="font-bold text-gray-800">{formData.billingState}</div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">ZIP Code:</label>
                  <div className="font-bold text-gray-800">{formData.billingZipCode}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Phone:</label>
                  <div className="font-bold text-gray-800">{formData.billingPhone}</div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1 text-sm">Fax:</label>
                  <div className="font-bold text-gray-800">{formData.billingFax}</div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  <span className="text-red-600">*</span> Taxonomy Code:
                </label>
                <select
                  value={formData.billingTaxonomyCode || formData.taxonomyCode || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      billingTaxonomyCode: e.target.value,
                    })
                  }
                  className={`border rounded px-3 py-2 w-full ${errClass('billingTaxonomy')}`}
                >
                  <option value="">Choose</option>
                  <option value="193200000X - Multi-Specialty">193200000X - Multi-Specialty</option>
                  <option value="193400000X - Single Specialty">193400000X - Single Specialty</option>
                </select>
                {fieldErrors.billingTaxonomy && (
                  <p className="text-red-600 text-sm mt-1 font-medium">
                    {fieldErrors.billingTaxonomy}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
