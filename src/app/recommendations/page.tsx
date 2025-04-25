"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import JobDetailsModal from '../components/JobDetailsModal';
import ChatWidget from '../components/ChatWidget';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export interface WSJob {
    title: string;
    company: string;
    location: string;
    job_type?: string;
    salary?: string;
    posted_date?: string;
    application_deadline?: string;
    key_requirements?: string;
    bonus_skills?: string;
    stack?: string;
    description?: string;
    how_to_apply?: string;
    direct_link?: string;
    match_score?: string;
    matchReasons?: string[];

}



export default function Home() {
    const [jobs, setJobs] = useState<WSJob[]>([]);
    const [selectedJob, setSelectedJob] = useState<WSJob | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/recommendations');
        ws.onopen = () => {
            ws.send(JSON.stringify({ email: 'demouser17@gmail.com' }));
        };
        ws.onmessage = (event) => {
            try {
                const job = JSON.parse(event.data);
                if (job && job.title && job.company) {
                    setJobs((prev) => [...prev, job]);
                    setLoading(false);
                }
            } catch { }
        };
        ws.onerror = () => setLoading(false);
        return () => ws.close();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>JobGenie - Smart Recommendations</title>
                <meta name="description" content="AI-powered job recommendations" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-3/4"
                    >
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Your Recommendations</h2>
                            </div>
                            {loading ? (
                                <div className="space-y-4">Loading...</div>
                            ) : (
                                <div className="space-y-6">
                                    {jobs.map((job, idx) => (
                                        <div key={idx} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                                                <div className="text-gray-600">{job.company}</div>
                                                <div className="text-gray-500 text-sm">{job.location}</div>
                                                {job.match_score && (
                                                    <div className="mt-1 text-xs inline-block bg-yellow-100 text-yellow-800 rounded px-2 py-0.5 font-semibold">
                                                        Match Score: {job.match_score}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                                                {job.how_to_apply && (
                                                    <a href={job.direct_link || '#'} target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-blue-600 text-white rounded text-sm text-center">Apply</a>
                                                )}
                                                <button
                                                    className="px-3 py-1 bg-gray-200 rounded text-sm text-gray-800"
                                                    onClick={() => { setSelectedJob(job); setModalOpen(true); }}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full md:w-1/3 flex flex-col"
                    >
                        <div className="h-96 md:h-[32rem]">
                            <ChatWidget selectedJob={selectedJob} />
                        </div>
                    </motion.div>
                </div>
                <JobDetailsModal job={selectedJob} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            </main>
        </div>
    );
}