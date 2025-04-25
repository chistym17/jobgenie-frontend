import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface JobDetailsModalProps {
  job: Partial<{
    title: string;
    company: string;
    location: string;
    salary?: string;
    job_type?: string;
    match_score?: string;
    stack?: string;
    description?: string;
    key_requirements?: string;
    bonus_skills?: string;
    how_to_apply?: string;
    application_deadline?: string;
    direct_link?: string;
  }> | null;
  isOpen: boolean;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1, backdropFilter: 'blur(6px)' },
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
};

const modalVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, y: 30, scale: 0.96 }
};

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/30 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-10 border border-blue-100"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col gap-3">
              {job.title && <h2 className="text-2xl font-bold text-blue-700 mb-1">{job.title}</h2>}
              <div className="flex items-center gap-2 mb-2">
                {job.company && <span className="text-gray-700 font-medium">{job.company}</span>}
                {job.location && <span className="text-xs bg-blue-100 text-blue-700 rounded px-2 py-0.5 ml-2">{job.location}</span>}
                {job.salary && <span className="text-xs bg-green-100 text-green-700 rounded px-2 py-0.5 ml-2">{job.salary}</span>}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {job.job_type && <span className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-0.5">{job.job_type}</span>}
                {job.match_score && <span className="text-xs bg-yellow-100 text-yellow-800 rounded px-2 py-0.5">Match: {job.match_score}</span>}
                {job.stack && <span className="text-xs bg-indigo-100 text-indigo-700 rounded px-2 py-0.5">{job.stack}</span>}
              </div>
              {job.description && <div className="text-gray-700"><b>Description:</b> {job.description}</div>}
              {job.key_requirements && <div className="text-gray-700"><b>Key Requirements:</b> {job.key_requirements}</div>}
              {job.bonus_skills && <div className="text-gray-700"><b>Bonus Skills:</b> {job.bonus_skills}</div>}
              {job.how_to_apply && <div className="text-gray-700"><b>How to Apply:</b> {job.how_to_apply}</div>}
              {job.application_deadline && <div className="text-gray-500 text-xs">Deadline: {job.application_deadline}</div>}
              {job.direct_link && (
                <a
                  href={job.direct_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Direct Link
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JobDetailsModal;
