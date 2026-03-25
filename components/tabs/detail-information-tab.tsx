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

interface DetailTabProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  fieldErrors?: Record<string, string>;
}

export function DetailInformationTab({
  formData,
  setFormData,
  fieldErrors = {},
}: DetailTabProps) {
  const areaCavityOptions = ['Choose', 'LEFT', 'LL-QUAD', 'LR-QUAD', 'MANDIBULAR', 'MAXILLARY', 'ORAL-CAVITY', 'RIGHT', 'UL-QUAD', 'UR-QUAD'];
  const toothOptions = ['Choose', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32'];

  const handleLineItemChange = (index: number, field: string, value: string) => {
    const newLineItems = [...formData.lineItems];
    newLineItems[index] = { ...newLineItems[index], [field]: value };
    setFormData({ ...formData, lineItems: newLineItems });
  };

  const handleAddLineItem = () => {
    const newLineNum = formData.lineItems.length + 1;
    const newLineItem: LineItem = {
      id: Date.now(),
      lineNum: newLineNum,
      procCode: '',
      codeType: 'ADA CODE',
      areaCavity: 'Choose',
      tooth: 'Choose',
      requestDate: new Date().toISOString().slice(0, 10),
    };
    setFormData({ ...formData, lineItems: [...formData.lineItems, newLineItem] });
  };

  const errClass = (key: string) =>
    fieldErrors[key] ? 'border-red-600 ring-1 ring-red-500' : 'border-gray-400';

  const baseSummary = [
    fieldErrors.accountInfo,
    fieldErrors.npiAtypicalId,
    fieldErrors.group,
    fieldErrors.taxonomyCode,
    fieldErrors.locatorCode,
    fieldErrors.lineItems,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <p className="text-red-600 text-sm font-semibold">
        * indicates a required field. Complete all required fields before continuing.
      </p>
      {baseSummary.length > 0 && (
        <div className="rounded border border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold mb-1">Please correct the following:</p>
          <ul className="list-disc list-inside space-y-0.5">
            {[...new Set(baseSummary)].map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Base Information */}
      <div className="bg-white border border-gray-300 rounded p-6">
        <h3 className="text-sm font-bold text-blue-900 mb-6 pb-4 border-b border-gray-300 uppercase">
          BASE INFORMATION
        </h3>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-600">*</span> Account Information:
            </label>
            <select
              value={formData.accountInfo}
              onChange={(e) => setFormData({...formData, accountInfo: e.target.value})}
              className={`w-full px-3 py-2 border rounded text-gray-700 cursor-pointer ${errClass('accountInfo')}`}
            >
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>
            {fieldErrors.accountInfo && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.accountInfo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-600">*</span> NPI / Atypical ID:
            </label>
            <select
              value={formData.npiAtypicalId}
              onChange={(e) => setFormData({...formData, npiAtypicalId: e.target.value})}
              className={`w-full px-3 py-2 border rounded text-gray-700 cursor-pointer ${errClass('npiAtypicalId')}`}
            >
              <option value="">Choose</option>
              <option value="1982362018">1982362018</option>
            </select>
            {fieldErrors.npiAtypicalId && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.npiAtypicalId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-600">*</span> Group:
            </label>
            <select
              value={formData.group}
              onChange={(e) => setFormData({...formData, group: e.target.value})}
              className={`w-full px-3 py-2 border rounded text-gray-700 cursor-pointer ${errClass('group')}`}
            >
              <option value="">Choose</option>
              <option value="111207:1982362">111207:1982362</option>
            </select>
            {fieldErrors.group && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.group}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-600">*</span> Taxonomy Code:
            </label>
            <select
              value={formData.taxonomyCode}
              onChange={(e) => setFormData({...formData, taxonomyCode: e.target.value})}
              className={`w-full px-3 py-2 border rounded text-gray-700 cursor-pointer ${errClass('taxonomyCode')}`}
            >
              <option value="">Choose</option>
              <option value="193200000X">193200000X - Multi-Specialty</option>
              <option value="193400000X">193400000X - Single Specialty</option>
            </select>
            {fieldErrors.taxonomyCode && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.taxonomyCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-600">*</span> Locator Code:
            </label>
            <select
              value={formData.locatorCode}
              onChange={(e) => setFormData({...formData, locatorCode: e.target.value})}
              className={`w-full px-3 py-2 border rounded text-gray-700 cursor-pointer ${errClass('locatorCode')}`}
            >
              <option value="">Choose</option>
              <option value="4251">4251 RAMSEY ST</option>
            </select>
            {fieldErrors.locatorCode && (
              <p className="text-red-600 text-xs mt-1">{fieldErrors.locatorCode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Line Item Information */}
      <div className="bg-white border border-gray-300 rounded p-6">
        <h3 className="text-sm font-bold text-white bg-blue-900 mb-4 p-3 rounded flex items-center gap-2">
          <span>−</span> BASIC LINE ITEM INFORMATION
        </h3>

        <table className="w-full mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 border border-gray-300">Line #</th>
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 border border-gray-300">Proc Code</th>
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 border border-gray-300">Code Type</th>
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 border border-gray-300">Area of Cavity</th>
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 border border-gray-300">Tooth</th>
              <th className="px-4 py-2 text-left text-xs font-bold text-red-600 border border-gray-300">Requested Begin Date</th>
            </tr>
          </thead>
          <tbody>
            {formData.lineItems.map((item, idx) => (
              <tr key={item.id}>
                <td className="px-4 py-2 text-sm border border-gray-300 bg-gray-50">{idx + 1}</td>
                <td className="px-4 py-2 border border-gray-300 align-top">
                  <input
                    type="text"
                    value={item.procCode}
                    onChange={(e) => handleLineItemChange(idx, 'procCode', e.target.value)}
                    placeholder="D4341"
                    className={`w-full px-2 py-1 border rounded text-sm ${errClass(`line_${idx}_procCode`)}`}
                  />
                  {fieldErrors[`line_${idx}_procCode`] && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors[`line_${idx}_procCode`]}</p>
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <select
                    value={item.codeType}
                    onChange={(e) => handleLineItemChange(idx, 'codeType', e.target.value)}
                    className="w-full px-2 py-1 border border-gray-400 rounded text-sm cursor-pointer"
                  >
                    <option value="ADA CODE">ADA CODE</option>
                    <option value="CDT CODE">CDT CODE</option>
                  </select>
                </td>
                <td className="px-4 py-2 border border-gray-300 align-top">
                  <select
                    value={item.areaCavity}
                    onChange={(e) => handleLineItemChange(idx, 'areaCavity', e.target.value)}
                    className={`w-full px-2 py-1 border rounded text-sm cursor-pointer ${errClass(`line_${idx}_area`)}`}
                  >
                    {areaCavityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {fieldErrors[`line_${idx}_area`] && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors[`line_${idx}_area`]}</p>
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300 align-top">
                  <select
                    value={item.tooth}
                    onChange={(e) => handleLineItemChange(idx, 'tooth', e.target.value)}
                    className={`w-full px-2 py-1 border rounded text-sm cursor-pointer ${errClass(`line_${idx}_tooth`)}`}
                  >
                    {toothOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {fieldErrors[`line_${idx}_tooth`] && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors[`line_${idx}_tooth`]}</p>
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300 align-top">
                  <input
                    type="date"
                    value={item.requestDate}
                    onChange={(e) => handleLineItemChange(idx, 'requestDate', e.target.value)}
                    className={`w-full px-2 py-1 border rounded text-sm ${errClass(`line_${idx}_date`)}`}
                  />
                  {fieldErrors[`line_${idx}_date`] && (
                    <p className="text-red-600 text-xs mt-1">{fieldErrors[`line_${idx}_date`]}</p>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={6} className="px-4 py-2 border border-gray-300 bg-gray-50">
                <button
                  type="button"
                  onClick={handleAddLineItem}
                  className="text-blue-600 hover:text-blue-800 underline text-sm font-semibold cursor-pointer"
                >
                  + Add New Line Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Health Care Services Delivery Information */}
        <div className="mt-6 pt-6 border-t border-gray-300">
          <h4 className="text-sm font-bold text-gray-700 mb-4 pb-2 border-b border-gray-300">
            Health Care Services Delivery Information
          </h4>

          <p className="text-sm text-blue-700 mb-4 p-3 bg-blue-50 border border-blue-300 rounded">
            Please provide the following additional information.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Tooth Surface</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-700">(M)esial</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-700">(O)cclusal</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-700">(I)ncisial</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Tooth Surface (continued)</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-700">(D)istal</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-700">(F)acial</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-700">(B)uccal</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="ml-2 text-sm text-gray-700">(L)ingual</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">ServiceUnits:</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-400 rounded text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Unit Type:</label>
              <select className="w-full px-3 py-2 border border-gray-400 rounded text-sm cursor-pointer">
                <option>Choose</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Frequency:</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-400 rounded text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Frequency Period:</label>
              <select className="w-full px-3 py-2 border border-gray-400 rounded text-sm cursor-pointer">
                <option>Choose</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Modifier(s):</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <input key={i} type="text" className="w-12 px-2 py-2 border border-gray-400 rounded text-sm" placeholder={`${i}:`} />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Duration Type:</label>
              <select className="w-full px-3 py-2 border border-gray-400 rounded text-sm cursor-pointer">
                <option>Choose</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Place of Service:</label>
            <select className="w-full px-3 py-2 border border-gray-400 rounded text-sm cursor-pointer">
              <option>Choose</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-bold text-gray-700 mb-2">Duration:</label>
            <input type="text" className="w-32 px-3 py-2 border border-gray-400 rounded text-sm" />
          </div>

          <div className="mt-6 flex items-center">
            <input type="checkbox" className="w-4 h-4" />
            <span className="ml-3 text-sm text-gray-700">Rendering provider is the same as the billing provider</span>
          </div>

          <div className="flex justify-end mt-6">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded border border-gray-500 cursor-pointer">
              Validate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
