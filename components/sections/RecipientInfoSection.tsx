'use client';

import { useState } from 'react';
import { fakeRecipientData } from '@/lib/fakeData';

interface RecipientInfoSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function RecipientInfoSection({
  formData,
  setFormData,
}: RecipientInfoSectionProps) {
  const [recipientIdInput, setRecipientIdInput] = useState('');
  const [showRecipientForm, setShowRecipientForm] = useState(false);

  const handleConfirmRecipient = () => {
    const data = fakeRecipientData[recipientIdInput];
    if (data) {
      setFormData({
        ...formData,
        recipientId: recipientIdInput,
        recipientLastName: data.lastName,
        recipientFirstName: data.firstName,
        recipientAddress1: data.address1,
        recipientAddress2: data.address2,
        recipientCity: data.city,
        recipientState: data.state,
        recipientZip: data.zip,
        recipientGender: data.gender,
        recipientDOB: data.dob,
      });
      setShowRecipientForm(true);
      setRecipientIdInput('');
    }
  };

  return (
    <div className="border border-gray-400 rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-bold text-[#1B3E66] mb-4 pb-2 border-b border-gray-300 uppercase tracking-wide">
        Recipient
      </h3>

      {!showRecipientForm ? (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-700">Recipient Information</h4>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
                <span className="text-red-600">*</span>
                Recipient ID:
              </label>
              <input
                type="text"
                value={recipientIdInput}
                onChange={(e) => setRecipientIdInput(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2"
                placeholder="Enter Recipient ID"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleConfirmRecipient}
                disabled={!recipientIdInput}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Recipient ID:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.recipientId}</p>
            </div>
            <div></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Last Name:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.recipientLastName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">First Name:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.recipientFirstName}</p>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600">Address1:</label>
            <p className="text-sm font-semibold text-gray-900">{formData.recipientAddress1}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Address2:</label>
            <p className="text-sm font-semibold text-gray-900">{formData.recipientAddress2 || '-'}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">City:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.recipientCity}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">State:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.recipientState}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">ZIP Code:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.recipientZip}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Gender:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.recipientGender}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Date of Birth:</label>
              <p className="text-sm font-semibold text-gray-900">{formData.recipientDOB}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowRecipientForm(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-sm"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
