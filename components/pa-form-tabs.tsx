'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  validateRouteAttachments,
  validateRouteDetail,
  validateRouteHeader,
} from '@/lib/pa-validation';
import { generatePriorAuthCode } from '@/lib/prior-auth-code';
import { HeaderInformationTab } from '@/components/tabs/header-information-tab';
import { DetailInformationTab } from '@/components/tabs/detail-information-tab';
import { AttachmentsTab } from '@/components/tabs/attachments-tab';

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

interface PAFormTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

type TabId = 'header' | 'detail' | 'attachments';

export function PAFormTabs({ activeTab, setActiveTab, formData, setFormData }: PAFormTabsProps) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!Object.keys(fieldErrors).length) return;
    const fd = formData as unknown as Record<string, unknown>;
    const refreshed =
      activeTab === 'header'
        ? validateRouteHeader(fd).errors
        : activeTab === 'detail'
          ? validateRouteDetail(fd).errors
          : validateRouteAttachments(fd).errors;
    const same =
      Object.keys(refreshed).length === Object.keys(fieldErrors).length &&
      Object.entries(refreshed).every(([k, v]) => fieldErrors[k] === v);
    if (!same) {
      setFieldErrors(refreshed);
    }
  }, [activeTab, formData, fieldErrors]);

  const tryGoToTab = (target: TabId) => {
    const order: Record<TabId, number> = { header: 0, detail: 1, attachments: 2 };
    const cur = order[activeTab as TabId] ?? 0;
    const next = order[target];
    if (next <= cur) {
      setFieldErrors({});
      setActiveTab(target);
      return;
    }

    const fd = formData as unknown as Record<string, unknown>;

    if (activeTab === 'header') {
      const h = validateRouteHeader(fd);
      if (!h.ok) {
        setFieldErrors(h.errors);
        return;
      }
      if (target === 'detail') {
        setFieldErrors({});
        setActiveTab('detail');
        return;
      }
      const d = validateRouteDetail(fd);
      if (!d.ok) {
        setFieldErrors(d.errors);
        setActiveTab('detail');
        return;
      }
      setFieldErrors({});
      setActiveTab('attachments');
      return;
    }

    if (activeTab === 'detail') {
      const d = validateRouteDetail(fd);
      if (!d.ok) {
        setFieldErrors(d.errors);
        return;
      }
      setFieldErrors({});
      setActiveTab('attachments');
    }
  };

  const handleSubmit = () => {
    const fd = formData as unknown as Record<string, unknown>;
    const h = validateRouteHeader(fd);
    if (!h.ok) {
      setFieldErrors(h.errors);
      setActiveTab('header');
      return;
    }
    const d = validateRouteDetail(fd);
    if (!d.ok) {
      setFieldErrors(d.errors);
      setActiveTab('detail');
      return;
    }
    const a = validateRouteAttachments(fd);
    if (!a.ok) {
      setFieldErrors(a.errors);
      setActiveTab('attachments');
      return;
    }
    setFieldErrors({});
    const priorAuthCode = generatePriorAuthCode();
    router.push(`/pa-summary?code=${encodeURIComponent(priorAuthCode)}`);
  };

  const tabs = [
    { id: 'header' as const, label: 'Header Information' },
    { id: 'detail' as const, label: 'Detail Information' },
    { id: 'attachments' as const, label: 'Attachments' },
  ];

  return (
    <div className="bg-white rounded shadow">
      <div className="flex border-b border-gray-300 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => tryGoToTab(tab.id)}
            className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        <div className="bg-gray-100 rounded px-4 py-3 mb-6 flex justify-between items-center border border-gray-300">
          <div>
            <span className="font-semibold text-gray-700">Payer: </span>
            <span className="font-bold text-gray-900">{formData.payer}</span>
            <span className="ml-12 font-semibold text-gray-700">PA Type: </span>
            <span className="font-bold text-gray-900">{formData.paType}</span>
          </div>
        </div>

        {activeTab === 'header' && (
          <HeaderInformationTab
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        )}

        {activeTab === 'detail' && (
          <DetailInformationTab
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        )}

        {activeTab === 'attachments' && (
          <AttachmentsTab
            formData={formData}
            setFormData={setFormData}
            fieldErrors={fieldErrors}
          />
        )}

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-300">
          <div>
            {activeTab !== 'header' && (
              <button
                type="button"
                onClick={() => tryGoToTab(activeTab === 'attachments' ? 'detail' : 'header')}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-8 rounded cursor-pointer"
              >
                Back
              </button>
            )}
          </div>
          {activeTab === 'header' && (
            <button
              type="button"
              onClick={() => tryGoToTab('detail')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded cursor-pointer"
            >
              Next
            </button>
          )}
          {activeTab === 'detail' && (
            <button
              type="button"
              onClick={() => tryGoToTab('attachments')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded cursor-pointer"
            >
              Next
            </button>
          )}
          {activeTab === 'attachments' && (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-8 rounded cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
