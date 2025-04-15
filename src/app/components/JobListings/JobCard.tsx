import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Job {
    id: number;
    title: string;
    company: string;
    source: string;
    date: string;
    url: string;
}
export default function JobCard({ job }: { job: Job }) {
    const [isHovered, setIsHovered] = useState(false);

    const formattedDate = () => {
        try {
            const postDate = new Date(job.date);
            return formatDistanceToNow(postDate, { addSuffix: true });
        } catch (e) {
            return job.date;
        }
    };

    return (
        <div
            className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-xl transform -translate-y-1' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center text-blue-700 font-bold">
                        {job.company.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-500">{formattedDate()}</span>
                </div>

                <h3 className="font-bold text-xl text-blue-900 mb-2">{job.title}</h3>
                <p className="text-gray-700 font-medium mb-2">{job.company}</p>

                <div className="flex items-center text-gray-500 text-sm mb-6">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                    <span>{job.source}</span>
                </div>

                <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-lg transition-all duration-200"
                >
                    View Job
                </a>
            </div>
        </div>
    );
}
