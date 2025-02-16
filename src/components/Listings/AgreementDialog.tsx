"use client";

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface AgreementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agreement: string | null;
  loading: boolean;
}

export const AgreementDialog = ({ isOpen, onClose, agreement, loading }: AgreementDialogProps) => {
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
          >
            Reject
          </button>
          <button 
            className="bg-primary text-darkmode px-6 py-2 rounded-lg hover:bg-opacity-90"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}; 