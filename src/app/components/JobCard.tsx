import { useState } from 'react';
import { motion } from 'framer-motion';


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


interface JobCardProps {
    job: Job;
    selected: boolean;
    onSelect: (job: Job) => void;
}

export default function JobCard({ job, selected, onSelect }: JobCardProps) {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
        if (!selected) {
            onSelect(job);
        }
    };

    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${selected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
            onClick={() => onSelect(job)}
        >
            <div className="flex justify-between">
                <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                        {job.logo ? (
                            <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-md object-cover" />
                        ) : (
                            <div className="h-12 w-12 bg-blue-100 text-blue-800 rounded-md flex items-center justify-center font-bold text-xl">
                                {job.company.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.matchScore >= 85 ? 'bg-green-100 text-green-800' :
                        job.matchScore >= 70 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {job.matchScore}% Match
                    </span>
                </div>
            </div>

            <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                </div>
                <div>•</div>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {job.type}
                </div>
            </div>

            <p className="text-gray-700 mt-3">{job.shortDescription}</p>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="mt-3 pt-3 border-t text-gray-700">
                    <p className="font-medium mb-2">Why this job matches your profile:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {job.matchReasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            <div className="mt-4 flex justify-between">
                <div className="flex space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand();
                        }}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{expanded ? "Hide details" : "Why this job?"}</span>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                        }}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Show more like this</span>
                    </button>
                </div>
                <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md transition-colors font-medium">
                    Apply Now
                </button>
            </div>
        </motion.div>
    );
}