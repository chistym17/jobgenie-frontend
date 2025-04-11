"use client"
import React from 'react';
import { Settings, Upload, Search, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkflowSection = () => {
  const steps = [
    {
      icon: <Settings className="text-blue-600" size={24} />,
      title: "Set Your Preferences",
      description: "Define your ideal job criteria including role, industry, location, salary range, and work arrangement.",
      delay: 0.1
    },
    {
      icon: <Upload className="text-purple-600" size={24} />,
      title: "Upload Your Resume",
      description: "Submit your CV for AI analysis to highlight strengths and identify areas for improvement.",
      delay: 0.2
    },
    {
      icon: <Search className="text-indigo-600" size={24} />,
      title: "Discover Opportunities",
      description: "JobGenie scans multiple job boards and company websites to find positions that match your criteria.",
      delay: 0.3
    },
    {
      icon: <MessageCircle className="text-green-600" size={24} />,
      title: "Get AI Guidance",
      description: "Chat with our AI assistant for personalized advice, application tips, and interview preparation.",
      delay: 0.4
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
          >
            How JobGenie Works
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Our streamlined process helps you find, analyze, and apply to jobs that perfectly match your skills and preferences.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100"
            >
              <motion.div
                className="p-3 bg-white rounded-lg shadow-sm inline-block mb-4"
              >
                {step.icon}
              </motion.div>
              <motion.h3
                className="text-xl font-semibold text-gray-800 mb-3"
              >
                {step.title}
              </motion.h3>
              <motion.p
                className="text-gray-600"
              >
                {step.description}
              </motion.p>
              <motion.div
                className="mt-4 flex items-center"
              >
                <motion.div
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold"
                >
                  {index + 1}
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block h-0.5 flex-1 bg-gradient-to-r from-blue-200 to-transparent ml-2"
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href="#job-search"
            className="inline-flex items-center justify-center py-3 px-6 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Job Search Journey
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkflowSection;
