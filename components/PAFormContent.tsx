'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PAFormTabs } from '@/components/pa-form-tabs';

export function PAFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('header');
  const [formData, setFormData] = useState({
    payer: searchParams.get('payer') || '',
    paType: searchParams.get('type') || '',
    healthPlan: searchParams.get('plan') || '',
    // Recipient info
    recipientId: '',
    recipientLastName: '',
    recipientFirstName: '',
    recipientAddress1: '',
    recipientAddress2: '',
    recipientCity: '',
    recipientState: '',
    recipientZip: '',
    recipientGender: '',
    recipientDOB: '',
    // Base info
    accountInfo: '',
    group: '',
    locatorCode: '',
    npiAtypicalId: '',
    taxonomyCode: '',
    // Billing provider
    billingProviderSame: false,
    billingNpi: '',
    billingAddress: '',
    billingLastName: '',
    billingFirstName: '',
    billingTaxonomyCode: '',
    // Line items
    lineItems: [
      {
        id: 1,
        lineNum: 1,
        procCode: '',
        codeType: 'ADA CODE',
        areaCavity: 'Choose',
        tooth: 'Choose',
        requestDate: '',
      },
    ],
    // Attachments
    hasAttachments: false,
    attachments: [],
  });

  return (
    <main className="container mx-auto py-8 px-4">
      <PAFormTabs activeTab={activeTab} setActiveTab={setActiveTab} formData={formData} setFormData={setFormData} />
    </main>
  );
}
