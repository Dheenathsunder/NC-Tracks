'use client';

import { useRef, useState } from 'react';
import type { AttachmentDraft } from '@/lib/pa-validation';
import {
  validateSpaAttachments,
  validateSpaDetail,
  validateSpaHeader,
} from '@/lib/pa-validation';
import Header from './Header';
import HeaderInformationTab from './tabs/HeaderInformationTab';
import DetailInformationTab from './tabs/DetailInformationTab';
import AttachmentsTab from './tabs/AttachmentsTab';

interface PARequestFormProps {
  initialData: any;
  onSubmit: (data: any) => void;
}

type TabId = 'header' | 'detail' | 'attachments';

export default function PARequestForm({ initialData, onSubmit }: PARequestFormProps) {
  const [activeTab, setActiveTab] = useState<TabId>('header');
  const [formData, setFormData] = useState({
    payer: initialData.payer,
    paType: initialData.paType,
    healthPlan: initialData.healthPlan,
    ...initialData,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const attachmentDraftRef = useRef<AttachmentDraft | null>(null);

  const tryGoToTab = (target: TabId) => {
    const order: Record<TabId, number> = { header: 0, detail: 1, attachments: 2 };
    const cur = order[activeTab];
    const next = order[target];
    if (next <= cur) {
      setFieldErrors({});
      setActiveTab(target);
      return;
    }

    if (activeTab === 'header') {
      const h = validateSpaHeader(formData as Record<string, unknown>);
      if (!h.ok) {
        setFieldErrors(h.errors);
        return;
      }
      if (target === 'detail') {
        setFieldErrors({});
        setActiveTab('detail');
        return;
      }
      const d = validateSpaDetail(formData as Record<string, unknown>);
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
      const d = validateSpaDetail(formData as Record<string, unknown>);
      if (!d.ok) {
        setFieldErrors(d.errors);
        return;
      }
      setFieldErrors({});
      setActiveTab('attachments');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const h = validateSpaHeader(formData as Record<string, unknown>);
    if (!h.ok) {
      setFieldErrors(h.errors);
      setActiveTab('header');
      return;
    }
    const d = validateSpaDetail(formData as Record<string, unknown>);
    if (!d.ok) {
      setFieldErrors(d.errors);
      setActiveTab('detail');
      return;
    }
    const a = validateSpaAttachments(
      formData as Record<string, unknown>,
      attachmentDraftRef.current
    );
    if (!a.ok) {
      setFieldErrors(a.errors);
      setActiveTab('attachments');
      return;
    }
    setFieldErrors({});
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-4 text-sm text-gray-600">
          <a href="#" className="text-blue-600 hover:underline">
            Home
          </a>
          {' > '}
          <span className="text-gray-800">Prior Approval Request</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Prior Approval Request</h1>
        <p className="text-red-600 text-sm mb-6">* indicates a required field</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tabs */}
          <div className="border-b border-gray-300">
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => tryGoToTab('header')}
                className={`pb-3 px-4 font-semibold border-b-4 transition ${
                  activeTab === 'header'
                    ? 'border-gray-800 text-gray-800'
                    : 'border-transparent text-blue-600 hover:text-gray-800'
                }`}
              >
                Header Information
              </button>
              <button
                type="button"
                onClick={() => tryGoToTab('detail')}
                className={`pb-3 px-4 font-semibold border-b-4 transition ${
                  activeTab === 'detail'
                    ? 'border-gray-800 text-gray-800'
                    : 'border-transparent text-blue-600 hover:text-gray-800'
                }`}
              >
                Detail Information
              </button>
              <button
                type="button"
                onClick={() => tryGoToTab('attachments')}
                className={`pb-3 px-4 font-semibold border-b-4 transition ${
                  activeTab === 'attachments'
                    ? 'border-gray-800 text-gray-800'
                    : 'border-transparent text-blue-600 hover:text-gray-800'
                }`}
              >
                Attachments
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
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
                attachmentDraftRef={attachmentDraftRef}
                fieldErrors={fieldErrors}
              />
            )}
          </div>

          <div className="flex justify-end">
            {activeTab === 'header' && (
              <button
                type="button"
                onClick={() => tryGoToTab('detail')}
                className="bg-[#1B3E66] hover:bg-[#0F2540] text-white px-8 py-2 rounded font-semibold transition"
              >
                Next
              </button>
            )}
            {activeTab === 'detail' && (
              <button
                type="button"
                onClick={() => tryGoToTab('attachments')}
                className="bg-[#1B3E66] hover:bg-[#0F2540] text-white px-8 py-2 rounded font-semibold transition"
              >
                Next
              </button>
            )}
            {activeTab === 'attachments' && (
              <button
                type="submit"
                className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-2 rounded font-semibold transition"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
