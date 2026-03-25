'use client';

import { useEffect, useState, type MutableRefObject } from 'react';
import type { AttachmentDraft } from '@/lib/pa-validation';

interface AttachmentsTabProps {
  formData: any;
  setFormData: (data: any) => void;
  attachmentDraftRef?: MutableRefObject<AttachmentDraft | null>;
  fieldErrors?: Record<string, string>;
}

export default function AttachmentsTab({
  formData,
  setFormData,
  attachmentDraftRef,
  fieldErrors = {},
}: AttachmentsTabProps) {
  const [hasAttachments, setHasAttachments] = useState(true);
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      type: 'BITEWING',
      transmissionCode: 'UPLOAD',
      controlNumber: '1',
      supplement: 'BW and PA.pdf',
    },
    {
      id: 2,
      type: 'CHRT NOTES',
      transmissionCode: 'UPLOAD',
      controlNumber: '2',
      supplement: 'CHART NOTES AND PERIO CHART.pdf',
    },
    {
      id: 3,
      type: 'PANO',
      transmissionCode: 'UPLOAD',
      controlNumber: '3',
      supplement: 'Pano.pdf',
    },
  ]);

  const attachmentTypes = ['BITEWING', 'CHRT NOTES', 'PANO', 'X-RAY', 'CLINICAL PHOTO'];

  const handleAddAttachment = () => {
    const newAttachment = {
      id: attachments.length + 1,
      type: '',
      transmissionCode: 'UPLOAD',
      controlNumber: (attachments.length + 1).toString(),
      supplement: '',
    };
    setAttachments([...attachments, newAttachment]);
  };

  const handleRemoveAttachment = (id: number) => {
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  const handleAttachmentChange = (
    id: number,
    field: string,
    value: string
  ) => {
    setAttachments(
      attachments.map((att) => (att.id === id ? { ...att, [field]: value } : att))
    );
  };

  const handleFileUpload = (id: number, file: File) => {
    handleAttachmentChange(id, 'supplement', file.name);
  };

  useEffect(() => {
    if (!attachmentDraftRef) return;
    attachmentDraftRef.current = {
      hasAttachments,
      attachments: attachments.map((a) => ({
        id: a.id,
        type: a.type,
        transmissionCode: a.transmissionCode,
        controlNumber: a.controlNumber,
        supplement: a.supplement,
      })),
    };
  }, [hasAttachments, attachments, attachmentDraftRef]);

  const attErrClass = (key: string) =>
    fieldErrors[key] ? 'border-red-600 ring-1 ring-red-500' : 'border-gray-400';

  const attachmentSummary = [
    fieldErrors.attachments,
    ...attachments.flatMap((_, i) =>
      ['type', 'tx', 'control', 'supplement'].map((k) => fieldErrors[`attachment_${i}_${k}`])
    ),
  ].filter(Boolean);

  return (
    <div className="space-y-6">
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

      {/* Approval Request Attachments */}
      <div className="border border-gray-400 rounded p-6 bg-white">
        <h3 className="text-[#1B3E66] font-bold uppercase text-sm mb-6 pb-3 border-b-2 border-gray-300">
          Approval Request Attachments
        </h3>

        <p className="text-red-600 text-sm font-semibold mb-4">
          * indicates a required field. Complete all required items before submitting.
        </p>

        {attachmentSummary.length > 0 && (
          <div
            className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            <p className="font-semibold mb-1">Please fix the following:</p>
            <ul className="list-disc list-inside space-y-0.5">
              {[...new Set(attachmentSummary)].map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-1 text-gray-700 font-semibold mb-3 text-sm">
              <span className="text-red-600">*</span>
              Does this Approval request have any attachments?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasAttachments"
                  checked={hasAttachments}
                  onChange={() => setHasAttachments(true)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasAttachments"
                  checked={!hasAttachments}
                  onChange={() => setHasAttachments(false)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
          </div>

          {hasAttachments && (
            <div>
              <div className="bg-blue-100 border-l-4 border-blue-500 p-3 mb-4 text-sm text-blue-900">
                Please enter up to 10 file attachments below not to exceed 25 megabyte total.
              </div>

              {/* Attachments Table */}
              <div className="overflow-x-auto border border-gray-400 rounded">
                <table className="w-full border-collapse">
                  <thead className="bg-[#2B5A8F] text-white">
                    <tr>
                      <th className="border border-gray-400 px-3 py-2 text-left text-xs font-bold w-10"></th>
                      <th className="border border-gray-400 px-3 py-2 text-left text-xs font-bold">
                        <span className="text-red-300">*</span> Attachment Type
                      </th>
                      <th className="border border-gray-400 px-3 py-2 text-left text-xs font-bold">
                        <span className="text-red-300">*</span> Transmission Code
                      </th>
                      <th className="border border-gray-400 px-3 py-2 text-left text-xs font-bold">
                        <span className="text-red-300">*</span> Attachment Control #
                      </th>
                      <th className="border border-gray-400 px-3 py-2 text-left text-xs font-bold">
                        Attachment Supplement
                      </th>
                      <th className="border border-gray-400 px-3 py-2 text-left text-xs font-bold w-32"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {attachments.map((attachment, index) => (
                      <tr
                        key={attachment.id}
                        className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                      >
                        <td className="border border-gray-400 px-3 py-2 text-center text-gray-600">📎</td>
                        <td className="border border-gray-400 px-3 py-2 align-top">
                          <select
                            value={attachment.type}
                            onChange={(e) =>
                              handleAttachmentChange(attachment.id, 'type', e.target.value)
                            }
                            className={`w-full border rounded px-2 py-1 text-sm bg-white ${attErrClass(`attachment_${index}_type`)}`}
                          >
                            <option value="">Choose</option>
                            {attachmentTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          {fieldErrors[`attachment_${index}_type`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {fieldErrors[`attachment_${index}_type`]}
                            </p>
                          )}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 align-top">
                          <select
                            value={attachment.transmissionCode}
                            onChange={(e) =>
                              handleAttachmentChange(
                                attachment.id,
                                'transmissionCode',
                                e.target.value
                              )
                            }
                            className={`w-full border rounded px-2 py-1 text-sm bg-white ${attErrClass(`attachment_${index}_tx`)}`}
                          >
                            <option value="UPLOAD">UPLOAD</option>
                            <option value="OTHER">OTHER</option>
                          </select>
                          {fieldErrors[`attachment_${index}_tx`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {fieldErrors[`attachment_${index}_tx`]}
                            </p>
                          )}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 align-top">
                          <input
                            type="text"
                            value={attachment.controlNumber}
                            onChange={(e) =>
                              handleAttachmentChange(
                                attachment.id,
                                'controlNumber',
                                e.target.value
                              )
                            }
                            className={`w-full border rounded px-2 py-1 text-sm ${attErrClass(`attachment_${index}_control`)}`}
                          />
                          {fieldErrors[`attachment_${index}_control`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {fieldErrors[`attachment_${index}_control`]}
                            </p>
                          )}
                        </td>
                        <td className="border border-gray-400 px-3 py-2 text-sm text-gray-700 align-top">
                          <span className="block min-h-[1.5rem]">{attachment.supplement}</span>
                          {fieldErrors[`attachment_${index}_supplement`] && (
                            <p className="text-red-600 text-xs mt-1">
                              {fieldErrors[`attachment_${index}_supplement`]}
                            </p>
                          )}
                        </td>
                        <td className="border border-gray-400 px-3 py-2">
                          <div className="flex gap-2 justify-center">
                            <label className="text-blue-600 hover:text-blue-800 cursor-pointer text-xs font-semibold whitespace-nowrap">
                              Upload File
                              <input
                                type="file"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleFileUpload(attachment.id, e.target.files[0]);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            {attachments.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveAttachment(attachment.id)}
                                className="text-red-600 hover:text-red-800 text-xs"
                              >
                                Clear
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {attachments.length < 10 && (
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddAttachment}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm font-semibold"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
