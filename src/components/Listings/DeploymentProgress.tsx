"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface Step {
  title: string;
  description: string;
  status: 'waiting' | 'loading' | 'completed' | 'failed';
}

interface DeploymentProgressProps {
  steps: Step[];
  currentStep: number;
  deploymentStatus?: 'success' | 'failed' | null;
}

export const DeploymentProgress = ({ steps, currentStep, deploymentStatus }: DeploymentProgressProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      {steps.map((step, index) => (
        <div key={step.title} className="relative mb-8 last:mb-0">
          <div className="flex items-center">
            <div className="relative">
              {step.status === 'loading' ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 text-primary"
                >
                  <Loader2 className="w-8 h-8" />
                </motion.div>
              ) : step.status === 'completed' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 text-green-500"
                >
                  <CheckCircle className="w-8 h-8" />
                </motion.div>
              ) : step.status === 'failed' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 text-red-500"
                >
                  <XCircle className="w-8 h-8" />
                </motion.div>
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-muted" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-white">{step.title}</h3>
              <p className="text-sm text-muted">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="absolute left-4 top-8 -ml-px h-full w-0.5 bg-muted" />
          )}
        </div>
      ))}
      
      {deploymentStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          {deploymentStatus === 'success' ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 text-green-500"
            >
              <CheckCircle className="w-12 h-12" />
              <span className="text-xl font-medium">Transaction Completed Successfully!</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 text-red-500"
            >
              <XCircle className="w-12 h-12" />
              <span className="text-xl font-medium">Transaction Failed</span>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}; 