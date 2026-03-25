'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { NCTracksHeader } from '@/components/nc-tracks-header';
import { Navigation } from '@/components/navigation';
import { PAFormTabs } from '@/components/pa-form-tabs';

export default function PAForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('header');
  const [formData, setFormData] = useState({
    payer: searchParams.get('payer') || 'DHB',
    paType: searchParams.get('type') || 'DENTAL',
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
    accountInfo: 'long',
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
        procCode: 'D4341',
        codeType: 'ADA CODE',
        areaCavity: 'UL-QUAD',
        tooth: '14',
        requestDate: new Date().toISOString().slice(0, 10),
      },
    ],
    // Attachments
    hasAttachments: false,
    attachments: [],
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <NCTracksHeader />
      <Navigation currentPage="prior-approval" />

      <main className="container mx-auto py-8 px-4">
        <PAFormTabs activeTab={activeTab} setActiveTab={setActiveTab} formData={formData} setFormData={setFormData} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-700 text-gray-300 text-center py-4 mt-8">
        <div className="container mx-auto text-xs space-y-1">
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Legal</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Accessibility</a>
            <a href="#" className="hover:text-white">Contact Us</a>
            <a href="#" className="hover:text-white">System Requirements</a>
            <a href="#" className="hover:text-white">Report Fraud</a>
          </div>
          <p className="text-gray-500">NC Department of Health and Human Services</p>
        </div>
      </footer>
    </div>
  );
}
