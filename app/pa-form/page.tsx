import { Suspense } from 'react';
import { NCTracksHeader } from '@/components/nc-tracks-header';
import { Navigation } from '@/components/navigation';
import { PAFormContent } from '@/components/PAFormContent';

export default function PAForm() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NCTracksHeader />
      <Navigation currentPage="prior-approval" />
      <Suspense fallback={<div className="container mx-auto py-8 px-4">Loading...</div>}>
        <PAFormContent />
      </Suspense>

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
