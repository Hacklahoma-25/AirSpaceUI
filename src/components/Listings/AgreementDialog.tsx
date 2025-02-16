"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface AgreementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agreement: string | null;
  loading: boolean;
  nft: {
    token_id: number;
    contract_address: string;
  } | null;
}

export const AgreementDialog = ({ isOpen, onClose, agreement, loading, nft }: AgreementDialogProps) => {
  const [approvalLoading, setApprovalLoading] = useState(false);

  const handleApprove = async () => {
    if (!nft) return;
    
    setApprovalLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze_deployment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyer_address: "0x676AB843E8aDd6363779409Ee5057f4a26F46F59",
          seller_address: "0x9A7C3F4E27D625dA2dE8F4B1239A9B4635A4C6B9",
          contract_id: nft.contract_address,
          tokens: nft.token_id
        }),
      });

      if (!response.ok) {
        throw new Error('Deployment analysis failed');
      }

      const data = await response.json();
      console.log('Deployment analysis successful:', data);
      onClose();
    } catch (error) {
      console.error('Error during deployment analysis:', error);
    } finally {
      setApprovalLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark_grey rounded-3xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-24 font-medium">Legal Agreement</h2>
          <button 
            onClick={onClose}
            className="text-muted hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {loading ? (
          <div className="text-white text-center py-8">Loading agreement...</div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{agreement || ''}</ReactMarkdown>
          </div>
        )}
        
        <div className="mt-8 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="bg-deepSlate text-white px-6 py-2 rounded-lg hover:bg-opacity-80"
            disabled={approvalLoading}
          >
            Reject
          </button>
          <button 
            onClick={handleApprove}
            className="bg-primary text-darkmode px-6 py-2 rounded-lg hover:bg-opacity-90"
            disabled={approvalLoading}
          >
            {approvalLoading ? 'Processing...' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
}; 