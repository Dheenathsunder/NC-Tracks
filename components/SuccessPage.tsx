'use client';

import Header from './Header';

interface SuccessPageProps {
  data: any;
  onNewPA: () => void;
  onBackHome: () => void;
}

export default function SuccessPage({ data, onNewPA, onBackHome }: SuccessPageProps) {
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

        <div className="bg-green-50 border-4 border-green-400 rounded-lg p-12 text-center">
          <div className="mb-6">
            <div className="text-6xl text-green-600 mb-4">✓</div>
            <h1 className="text-4xl font-bold text-green-700 mb-2">Success!</h1>
          </div>

          <p className="text-lg text-gray-700 mb-8">
            Your Prior Approval Request has been successfully submitted.
          </p>

          <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 inline-block max-w-md">
            <h3 className="font-bold text-gray-800 mb-4">Submission Details</h3>
            <div className="space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Payer:</span>
                <span className="font-semibold">{data.payer || ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">PA Type:</span>
                <span className="font-semibold">{data.paType || ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Health Plan:</span>
                <span className="font-semibold">{data.healthPlan || ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prior Auth Code:</span>
                <span className="font-semibold">{data.priorAuthCode || ''}</span>
              </div>
              {data.recipientId && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipient ID:</span>
                  <span className="font-semibold">{data.recipientId}</span>
                </div>
              )}
              {data.recipientLastName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-semibold">
                    {data.recipientLastName}, {data.recipientFirstName}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={onNewPA}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
            >
              Submit Another PA Request
            </button>
            <button
              onClick={onBackHome}
              className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-bold transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
