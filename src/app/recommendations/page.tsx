"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import JobCard from '../components/JobCard';
import ChatWidget from '../components/ChatWidget';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { jobs } from '../data/samplejobs';

export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    type: string;
    matchScore: number;
    shortDescription: string;
    matchReasons: string[];
    logo: string | null;
}


export default function Home() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
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
                    {/* Left Side - Recommendations Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-3/4"
                    >
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Your Recommendations</h2>
                                <div className="flex space-x-2">
                                    <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                        <span>Filter</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                        </svg>
                                        <span>Sort</span>
                                    </button>
                                </div>
                            </div>

                            {loading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="animate-pulse rounded-lg border p-4">
                                            <div className="flex space-x-4">
                                                <div className="h-12 w-12 bg-gray-200 rounded"></div>
                                                <div className="flex-1 space-y-2">
                                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                                </div>
                                            </div>
                                            <div className="mt-3 space-y-2">
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {jobs.slice(0, showAll ? jobs.length : 5).map((job) => (
                                        <JobCard
                                            key={job.id}
                                            job={job}
                                            selected={selectedJob?.id === job.id}
                                            onSelect={() => setSelectedJob(job)}
                                        />
                                    ))}
                                    {jobs.length > 5 && !showAll && (
                                        <div className="flex justify-center mt-4">
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                                                onClick={() => setShowAll(true)}
                                            >
                                                View More
                                            </button>
                                        </div>
                                    )}
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
            </main>
        </div>
    );
}