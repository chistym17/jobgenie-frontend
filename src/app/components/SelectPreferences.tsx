// components/SelectPreferences.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, DollarSign, Zap, BarChart, Tag, ChevronDown, Check } from 'lucide-react';

interface UserPreferencesProps {
    onSubmit: (preferences: UserPreferencesData) => void;
}

interface UserPreferencesData {
    jobTitle: string[];
    location: string[];
    jobType: string[];
    experienceLevel: string[];
    salaryRange: string;
}

const SelectPreferences: React.FC<UserPreferencesProps> = ({ onSubmit }) => {
    const [jobTitle, setJobTitle] = useState<string[]>([]);
    const [location, setLocation] = useState<string[]>([]);
    const [jobType, setJobType] = useState<string[]>([]);
    const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
    const [salaryRange, setSalaryRange] = useState<string>('');

    const jobTitleOptions: string[] = [
        'Software Engineer',
        'Data Scientist',
        'Product Manager',
        'UI/UX Designer',
        'Marketing Manager',
        'Sales Representative',
        'Project Manager',
        'Content Writer'
    ];

    const locationOptions: string[] = [
        'Remote',
        'New York',
        'San Francisco',
        'London',
        'Berlin',
        'Singapore',
        'Sydney',
        'Toronto'
    ];

    const jobTypeOptions: string[] = [
        'Full-time',
        'Part-time',
        'Contract',
        'Internship',
        'Freelance'
    ];

    const experienceLevelOptions: string[] = [
        'Entry Level',
        'Mid Level',
        'Senior',
        'Manager',
        'Director'
    ];

    const salaryRangeOptions: string[] = [
        'Below $50k',
        '$50k - $100k',
        '$100k - $150k',
        '$150k - $200k',
        'Above $200k'
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'salaryRange') {
            setSalaryRange(value);
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'jobType') {
            setJobType([value]);
        } else if (name === 'experienceLevel') {
            setExperienceLevel([value]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            jobTitle,
            location,
            jobType,
            experienceLevel,
            salaryRange
        });
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                        Set Your Job Preferences
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-3">
                                    <Briefcase className="inline-block w-5 h-5 mr-2 text-blue-600" />
                                    Job Title
                                </label>
                                <div className="flex flex-col space-y-3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter job title"
                                            className="w-full px-4 py-3.5 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-900"
                                            value={jobTitle[0] || ''}
                                            onChange={(e) => setJobTitle([e.target.value])}
                                            onFocus={(e) => {
                                                if (jobTitle.includes(e.target.value)) {
                                                    setJobTitle(['']);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {jobTitleOptions.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setJobTitle([option]);
                                                    if (document.activeElement instanceof HTMLInputElement &&
                                                        document.activeElement.value === option) {
                                                        document.activeElement.value = '';
                                                    }
                                                }}
                                                className={`px-4 py-2.5 rounded-full text-sm transition-colors ${jobTitle.includes(option)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-3">
                                    <MapPin className="inline-block w-5 h-5 mr-2 text-blue-600" />
                                    Location
                                </label>
                                <div className="flex flex-col space-y-3">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter custom location"
                                            className="w-full px-4 py-3.5 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-gray-900"
                                            value={location[0] || ''}
                                            onChange={(e) => setLocation([e.target.value])}
                                            onFocus={(e) => {
                                                if (location.includes(e.target.value)) {
                                                    setLocation(['']);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {locationOptions.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setLocation([option]);
                                                    if (document.activeElement instanceof HTMLInputElement &&
                                                        document.activeElement.value === option) {
                                                        document.activeElement.value = '';
                                                    }
                                                }}
                                                className={`px-4 py-2.5 rounded-full text-sm transition-colors ${location.includes(option)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-3">
                                    <Calendar className="inline-block w-5 h-5 mr-2 text-blue-600" />
                                    Job Type
                                </label>
                                <select
                                    name="jobType"
                                    value={jobType[0] || ''}
                                    onChange={handleSelectChange}
                                    className="w-full px-4 py-3.5 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 bg-white text-gray-900"
                                >
                                    <option value="" disabled>Select job type</option>
                                    {jobTypeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-gray-700 mb-3">
                                    <BarChart className="inline-block w-5 h-5 mr-2 text-blue-600" />
                                    Experience Level
                                </label>
                                <select
                                    name="experienceLevel"
                                    value={experienceLevel[0] || ''}
                                    onChange={handleSelectChange}
                                    className="w-full px-4 py-3.5 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 bg-white text-gray-900"
                                >
                                    <option value="" disabled>Select experience level</option>
                                    {experienceLevelOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">
                                <DollarSign className="inline-block w-5 h-5 mr-2 text-blue-600" />
                                Salary Range
                            </label>
                            <select
                                name="salaryRange"
                                value={salaryRange}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3.5 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 bg-white text-gray-900"
                            >
                                <option value="" disabled>Select salary range</option>
                                {salaryRangeOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </motion.div>
    );
};

export default SelectPreferences;
