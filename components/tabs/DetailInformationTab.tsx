'use client';

import { useEffect, useState } from 'react';

const TOOTH_OPTIONS = ['Choose', ...Array.from({ length: 32 }, (_, i) => String(i + 1))];

interface DetailInformationTabProps {
  formData: any;
  setFormData: (data: any) => void;
  fieldErrors?: Record<string, string>;
}

const defaultLineItems = () => [
  {
    lineNum: 1,
    procCode: 'D4341',
    codeType: 'ADA CODE',
    areaOfCavity: 'UL-QUAD',
    tooth: '14',
    requestedBeginDate: '2026-03-03',
  },
];

export default function DetailInformationTab({
  formData,
  setFormData,
  fieldErrors = {},
}: DetailInformationTabProps) {
  const [lineItems, setLineItems] = useState(formData.lineItems?.length ? formData.lineItems : defaultLineItems());

  useEffect(() => {
    setFormData((prev: any) =>
      prev.lineItems?.length ? prev : { ...prev, lineItems }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddLineItem = () => {
    const newLineItem = {
      lineNum: lineItems.length + 1,
      procCode: 'D4341',
      codeType: 'ADA COD',
      areaOfCavity: 'Choose',
      tooth: '',
      requestedBeginDate: '',
    };
    setLineItems([...lineItems, newLineItem]);
  };

  const handleRemoveLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleLineItemChange = (index: number, field: string, value: string) => {
    const updated = [...lineItems];
    updated[index][field] = value;
    setLineItems(updated);
    setFormData({ ...formData, lineItems: updated });
  };

  const detailSummary = [
    fieldErrors.group,
    fieldErrors.npi,
    fieldErrors.locatorCode,
    fieldErrors.detailTaxonomy,
    fieldErrors.lineItems,
  ].filter(Boolean);

  const errClass = (key: string) =>
    fieldErrors[key] ? 'border-red-600 ring-1 ring-red-500' : 'border-gray-400';

  return (
    <div className="space-y-6">
      {detailSummary.length > 0 && (
        <div
          className="rounded border border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="alert"
        >
          <p className="font-semibold mb-1">Please correct the following before continuing:</p>
          <ul className="list-disc list-inside space-y-0.5">
            {detailSummary.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

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

      {/* Base Information Section */}
      <div className="border border-gray-400 rounded p-6 bg-white">
        <h3 className="text-[#1B3E66] font-bold uppercase text-sm mb-6 pb-3 border-b-2 border-gray-300">
          Base Information
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                <span className="text-red-600">*</span>
                Account Information:
              </label>
              <select
                value={formData.accountInfo || 'Long'}
                onChange={(e) => setFormData({ ...formData, accountInfo: e.target.value })}
                className="w-full border border-gray-400 rounded px-3 py-2 text-gray-700"
              >
                <option value="Long">Long</option>
                <option value="Short">Short</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                <span className="text-red-600">*</span>
                Group:
              </label>
              <select
                value={formData.group || ''}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className={`w-full border rounded px-3 py-2 text-gray-700 ${errClass('group')}`}
              >
                <option value="">Choose</option>
                <option value="111207:1982362">111207:1982362</option>
              </select>
              {fieldErrors.group && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.group}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                <span className="text-red-600">*</span>
                NPI / Atypical ID:
              </label>
              <select
                value={formData.npi || ''}
                onChange={(e) => setFormData({ ...formData, npi: e.target.value })}
                className={`w-full border rounded px-3 py-2 text-gray-700 ${errClass('npi')}`}
              >
                <option value="">Choose</option>
                <option value="1982362018">1982362018</option>
              </select>
              {fieldErrors.npi && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.npi}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                <span className="text-red-600">*</span>
                Locator Code:
              </label>
              <select
                value={formData.locatorCode || ''}
                onChange={(e) => setFormData({ ...formData, locatorCode: e.target.value })}
                className={`w-full border rounded px-3 py-2 text-gray-700 ${errClass('locatorCode')}`}
              >
                <option value="">Choose</option>
                <option value="4251 RAMSEY ST">4251 RAMSEY ST</option>
              </select>
              {fieldErrors.locatorCode && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.locatorCode}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
                <span className="text-red-600">*</span>
                Taxonomy Code:
              </label>
              <select
                value={formData.taxonomyCode || ''}
                onChange={(e) => setFormData({ ...formData, taxonomyCode: e.target.value })}
                className={`w-full border rounded px-3 py-2 text-gray-700 ${errClass('detailTaxonomy')}`}
              >
                <option value="">Choose</option>
                <option value="193200000X - Multi-Specialty">193200000X - Multi-Specialty</option>
              </select>
              {fieldErrors.detailTaxonomy && (
                <p className="text-red-600 text-xs mt-1 font-medium">{fieldErrors.detailTaxonomy}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Basic Line Item Information */}
      <div className="border border-gray-400 rounded p-6 bg-white">
        <h3 className="text-[#1B3E66] font-bold uppercase text-sm mb-6 pb-3 border-b-2 border-gray-300">
          Basic Line Item Information
        </h3>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border border-gray-400">
              <th className="border border-gray-400 px-3 py-2 text-left text-sm font-semibold">Line #</th>
              <th className="border border-gray-400 px-3 py-2 text-left text-sm font-semibold">
                <span className="text-red-600">*</span> Proc Code
              </th>
              <th className="border border-gray-400 px-3 py-2 text-left text-sm font-semibold">Code Type</th>
              <th className="border border-gray-400 px-3 py-2 text-left text-sm font-semibold">
                <span className="text-red-600">*</span> Area of Cavity
              </th>
              <th className="border border-gray-400 px-3 py-2 text-left text-sm font-semibold">
                <span className="text-red-600">*</span> Tooth
              </th>
              <th className="border border-gray-400 px-3 py-2 text-left text-sm font-semibold">
                <span className="text-red-600">*</span> Requested Begin Date
              </th>
              <th className="border border-gray-400 px-3 py-2 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, idx) => (
              <tr key={idx} className="border border-gray-400 hover:bg-gray-50">
                <td className="border border-gray-400 px-3 py-2 text-sm">{idx === 0 ? item.lineNum : 'New'}</td>
                <td className="border border-gray-400 px-3 py-2 text-sm align-top">
                  <input
                    type="text"
                    value={item.procCode}
                    onChange={(e) => handleLineItemChange(idx, 'procCode', e.target.value)}
                    className={`border rounded px-2 py-1 w-full ${errClass(`line_${idx}_procCode`)}`}
                  />
                  {fieldErrors[`line_${idx}_procCode`] && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors[`line_${idx}_procCode`]}</p>
                  )}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm">
                  <select
                    value={item.codeType}
                    onChange={(e) => handleLineItemChange(idx, 'codeType', e.target.value)}
                    className="border border-gray-400 rounded px-2 py-1 w-full"
                  >
                    <option value="ADA CODE">ADA CODE</option>
                    <option value="ADA COD">ADA COD</option>
                  </select>
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm align-top">
                  <select
                    value={item.areaOfCavity}
                    onChange={(e) => handleLineItemChange(idx, 'areaOfCavity', e.target.value)}
                    className={`border rounded px-2 py-1 w-full ${errClass(`line_${idx}_area`)}`}
                  >
                    <option value="Choose">Choose</option>
                    <option value="LEFT">LEFT</option>
                    <option value="LL-QUAD">LL-QUAD</option>
                    <option value="LR-QUAD">LR-QUAD</option>
                    <option value="MANDIBULAR">MANDIBULAR</option>
                    <option value="MAXILLARY">MAXILLARY</option>
                    <option value="ORAL-CAVITY">ORAL-CAVITY</option>
                    <option value="RIGHT">RIGHT</option>
                    <option value="UL-QUAD">UL-QUAD</option>
                    <option value="UR-QUAD">UR-QUAD</option>
                  </select>
                  {fieldErrors[`line_${idx}_area`] && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors[`line_${idx}_area`]}</p>
                  )}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm align-top">
                  <select
                    value={item.tooth}
                    onChange={(e) => handleLineItemChange(idx, 'tooth', e.target.value)}
                    className={`border rounded px-2 py-1 w-full ${errClass(`line_${idx}_tooth`)}`}
                  >
                    {TOOTH_OPTIONS.map((opt) => (
                      <option key={opt} value={opt === 'Choose' ? '' : opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {fieldErrors[`line_${idx}_tooth`] && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors[`line_${idx}_tooth`]}</p>
                  )}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-sm align-top">
                  <input
                    type="date"
                    value={item.requestedBeginDate}
                    onChange={(e) => handleLineItemChange(idx, 'requestedBeginDate', e.target.value)}
                    className={`border rounded px-2 py-1 w-full ${errClass(`line_${idx}_date`)}`}
                  />
                  {fieldErrors[`line_${idx}_date`] && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors[`line_${idx}_date`]}</p>
                  )}
                </td>
                <td className="border border-gray-400 px-3 py-2 text-center">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLineItem(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleAddLineItem}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm"
          >
            Add Line Item
          </button>
        </div>
      </div>
    </div>
  );
}
