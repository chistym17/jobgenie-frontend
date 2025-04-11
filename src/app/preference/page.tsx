"use client";
import { NextPage } from 'next';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import SelectPreferences from '../components/SelectPreferences';

interface UserPreferencesData {
    jobTitle: string[];
    location: string[];
    jobType: string[];
    experienceLevel: string[];
    salaryRange: string;
}

const PreferencesPage: NextPage = () => {
    const handleSubmit = (preferences: UserPreferencesData) => {
        console.log('Form submitted with preferences:', preferences);
    };

    return (
        <div>
            <Head>
                <title>Job Preferences | JobGenie</title>
                <meta name="description" content="Set your job preferences to find your ideal position" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Navbar />
                <SelectPreferences onSubmit={handleSubmit} />
            </main>
        </div>
    );
};

export default PreferencesPage;