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

interface AttachmentsTabProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  fieldErrors?: Record<string, string>;
}

const attachmentTypes = [
  'BITEWING',
  'CHRT NOTES',
  'PANO',
  'X-RAY',
  'PHOTO',
  'OTHER',
];

const transmissionCodes = ['UPLOAD', 'EMAIL', 'FAX'];

export function AttachmentsTab({
  formData,
  setFormData,
  fieldErrors = {},
}: AttachmentsTabProps) {
  const errClass = (key: string) =>
    fieldErrors[key] ? 'border-red-600 ring-1 ring-red-500' : 'border-gray-400';
  const handleAttachmentChange = (index: number, field: string, value: any) => {
    const newAttachments = [...formData.attachments];
    newAttachments[index] = { ...newAttachments[index], [field]: value };
    setFormData({ ...formData, attachments: newAttachments });
  };

  const handleAddAttachment = () => {
    const newAttachment: Attachment = {
      id: Date.now(),
      type: '',
      code: '',
      control: '',
      supplement: '',
      file: undefined,
    };
    setFormData({
      ...formData,
      attachments: [...formData.attachments, newAttachment],
    });
  };

  const handleRemoveAttachment = (index: number) => {
    const newAttachments = formData.attachments.filter((_, i) => i !== index);
    setFormData({ ...formData, attachments: newAttachments });
  };

  const attSummary = [
    fieldErrors.attachments,
    ...formData.attachments.flatMap((_, i) =>
      ['type', 'code', 'control', 'supplement'].map((k) => fieldErrors[`attachment_${i}_${k}`])
    ),
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Approval Request Attachments */}
      <div className="bg-white border border-gray-300 rounded p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-6 pb-4 border-b border-gray-300 uppercase">
          APPROVAL REQUEST ATTACHMENTS
        </h3>

        <p className="text-red-600 text-sm font-semibold mb-4">
          * indicates a required field. If you choose Yes, each attachment row must be complete before
          Submit.
        </p>

        {attSummary.length > 0 && (
          <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p className="font-semibold mb-1">Please fix the following:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {[...new Set(attSummary)].map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6">
          <label className="block font-bold text-gray-700 mb-3">
            <span className="text-red-600">*</span> Does this Approval request have any attachments?
          </label>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="hasAttachments"
                checked={formData.hasAttachments}
                onChange={() => setFormData({ ...formData, hasAttachments: true })}
                className="w-4 h-4"
              />
              <span className="ml-2 text-gray-700">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="hasAttachments"
                checked={!formData.hasAttachments}
                onChange={() => setFormData({ ...formData, hasAttachments: false })}
                className="w-4 h-4"
              />
              <span className="ml-2 text-gray-700">No</span>
            </label>
          </div>
        </div>

        {formData.hasAttachments && (
          <>
            <div className="bg-blue-50 border border-blue-300 rounded p-4 mb-6">
              <p className="text-sm text-blue-900 font-semibold">
                Please enter up to 10 file attachments below not to exceed 25 megabyte total.
              </p>
            </div>

            {/* Attachments Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="px-4 py-3 text-left text-xs font-bold"></th>
                    <th className="px-4 py-3 text-left text-xs font-bold">
                      <span className="text-red-600">*</span> Attachment Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold">
                      <span className="text-red-600">*</span> Transmission Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold">
                      <span className="text-red-600">*</span> Attachment Control #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold">Attachment Supplement</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.attachments.map((attachment, idx) => (
                    <tr key={attachment.id} className="bg-gray-50 border-b border-gray-300">
                      <td className="px-4 py-3">
                        <span className="text-gray-500">📎</span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <select
                          value={attachment.type}
                          onChange={(e) => handleAttachmentChange(idx, 'type', e.target.value)}
                          className={`px-3 py-2 border rounded text-sm cursor-pointer ${errClass(`attachment_${idx}_type`)}`}
                        >
                          {attachmentTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        {fieldErrors[`attachment_${idx}_type`] && (
                          <p className="text-red-600 text-xs mt-1">
                            {fieldErrors[`attachment_${idx}_type`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <select
                          value={attachment.code}
                          onChange={(e) => handleAttachmentChange(idx, 'code', e.target.value)}
                          className={`px-3 py-2 border rounded text-sm cursor-pointer ${errClass(`attachment_${idx}_code`)}`}
                        >
                          {transmissionCodes.map((code) => (
                            <option key={code} value={code}>
                              {code}
                            </option>
                          ))}
                        </select>
                        {fieldErrors[`attachment_${idx}_code`] && (
                          <p className="text-red-600 text-xs mt-1">
                            {fieldErrors[`attachment_${idx}_code`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <input
                          type="text"
                          value={attachment.control}
                          onChange={(e) => handleAttachmentChange(idx, 'control', e.target.value)}
                          className={`w-24 px-3 py-2 border rounded text-sm ${errClass(`attachment_${idx}_control`)}`}
                        />
                        {fieldErrors[`attachment_${idx}_control`] && (
                          <p className="text-red-600 text-xs mt-1">
                            {fieldErrors[`attachment_${idx}_control`]}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-gray-800 min-h-[1.25rem]">
                            {attachment.supplement || '—'}
                          </span>
                          {fieldErrors[`attachment_${idx}_supplement`] && (
                            <p className="text-red-600 text-xs">
                              {fieldErrors[`attachment_${idx}_supplement`]}
                            </p>
                          )}
                          <div className="flex gap-2 flex-wrap">
                            <label className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-4 rounded text-xs cursor-pointer">
                              Upload File
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) handleAttachmentChange(idx, 'supplement', f.name);
                                }}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => handleRemoveAttachment(idx)}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Add new attachment row button */}
                  <tr>
                    <td colSpan={5} className="px-4 py-3 bg-gray-50 border-b border-gray-300">
                      <button
                        type="button"
                        onClick={handleAddAttachment}
                        className="text-blue-600 hover:text-blue-800 underline text-sm font-semibold cursor-pointer"
                      >
                        + Add Additional Attachment
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
