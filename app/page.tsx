'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import HomePage from '@/components/HomePage';
import PriorApprovalEntry from '@/components/PriorApprovalEntry';
import PARequestForm from '@/components/PARequestForm';
import SuccessPage from '@/components/SuccessPage';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState<'home' | 'entry' | 'form' | 'success'>('home');
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (searchParams.get('pa') === 'entry') {
      setCurrentPage('entry');
      setFormData({});
      router.replace('/', { scroll: false });
    }
  }, [searchParams, router]);

  const handleSelectPayer = (payer: string, healthPlan: string, paType: string) => {
    setFormData({
      payer,
      healthPlan,
      paType,
    });
    setCurrentPage('form');
  };

  const handleSubmit = (data: any) => {
    setFormData(data);
    setCurrentPage('success');
  };

  const handleBackHome = () => {
    setCurrentPage('home');
    setFormData({});
  };

  const handleNewPA = () => {
    setCurrentPage('entry');
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'entry' && <PriorApprovalEntry onSelectPayer={handleSelectPayer} />}
      {currentPage === 'form' && <PARequestForm initialData={formData} onSubmit={handleSubmit} />}
      {currentPage === 'success' && (
        <SuccessPage data={formData} onNewPA={handleNewPA} onBackHome={handleBackHome} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <HomeContent />
    </Suspense>
  );
}
