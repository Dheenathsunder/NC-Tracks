'use client';

import { useState } from 'react';

interface BasicLineItemSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function BasicLineItemSection({
  formData,
  setFormData,
}: BasicLineItemSectionProps) {
  const [lineItems, setLineItems] = useState([
    {
      lineNumber: 1,
      procCode: 'D4341',
      codeType: 'ADA COD',
      areaOfCavity: 'UL-QUAD',
      tooth: '',
      requestedBeginDate: '03/03/2026',
    },
  ]);

  const cavityAreas = [
    'Choose',
    'LEFT',
    'LL-QUAD',
    'LR-QUAD',
    'MANDIBULAR',
    'MAXILLARY',
    'ORAL-CAVITY',
    'RIGHT',
    'UL-QUAD',
    'UR-QUAD',
  ];

  const handleLineItemChange = (index: number, field: string, value: string) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
    setFormData({ ...formData, lineItems: updated });
  };

  const handleAddLineItem = () => {
    const newLineItem = {
      lineNumber: lineItems.length + 1,
      procCode: '',
      codeType: 'ADA COD',
      areaOfCavity: '',
      tooth: '',
      requestedBeginDate: new Date().toLocaleDateString('en-US'),
    };
    setLineItems([...lineItems, newLineItem]);
  };

  return (
    <div className="border border-gray-400 rounded-lg p-4 bg-gray-50">
      <h3 className="text-sm font-bold text-[#1B3E66] mb-4 pb-2 border-b border-gray-300 uppercase tracking-wide">
        Basic Line Item Information
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-3 py-2 text-left text-xs font-semibold">Line #</th>
              <th className="px-3 py-2 text-left text-xs font-semibold">Proc Code</th>
              <th className="px-3 py-2 text-left text-xs font-semibold">Code Type</th>
              <th className="px-3 py-2 text-left text-xs font-semibold">Area of Cavity</th>
              <th className="px-3 py-2 text-left text-xs font-semibold">Tooth</th>
              <th className="px-3 py-2 text-left text-xs font-semibold">
                <span className="text-red-600">*</span> Requested Begin Date
              </th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-3 py-3">{item.lineNumber}</td>
                <td className="px-3 py-3">
                  <input
                    type="text"
                    value={item.procCode}
                    onChange={(e) => handleLineItemChange(index, 'procCode', e.target.value)}
                    className="w-20 border border-gray-400 rounded px-2 py-1 text-sm"
                  />
                </td>
                <td className="px-3 py-3">
                  <select
                    value={item.codeType}
                    onChange={(e) => handleLineItemChange(index, 'codeType', e.target.value)}
                    className="border border-gray-400 rounded px-2 py-1 text-sm"
                  >
                    <option value="ADA COD">ADA COD</option>
                    <option value="CPT">CPT</option>
                  </select>
                </td>
                <td className="px-3 py-3">
                  <select
                    value={item.areaOfCavity}
                    onChange={(e) => handleLineItemChange(index, 'areaOfCavity', e.target.value)}
                    className="border border-gray-400 rounded px-2 py-1 text-sm"
                  >
                    {cavityAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-3">
                  <select className="border border-gray-400 rounded px-2 py-1 text-sm">
                    <option value="">Choose</option>
                  </select>
                </td>
                <td className="px-3 py-3">
                  <input
                    type="date"
                    value={item.requestedBeginDate}
                    onChange={(e) =>
                      handleLineItemChange(index, 'requestedBeginDate', e.target.value)
                    }
                    className="border border-gray-400 rounded px-2 py-1 text-sm w-32"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lineItems.length < 10 && (
        <button
          type="button"
          onClick={handleAddLineItem}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold"
        >
          Add Line Item
        </button>
      )}
    </div>
  );
}
