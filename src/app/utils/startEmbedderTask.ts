/**
 * Triggers the precomputation of resume embeddings for a given user email
 * @param userEmail - The email of the user whose resume embeddings need to be computed
 * @returns Promise containing the task ID and message
 */
export async function startEmbedderTask(userEmail: string): Promise<{ task_id: string; message: string }> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORKER_URL}/precompute-embedding`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: userEmail }),
        });

        if (!response.ok) {
            throw new Error('Failed to start embedding computation');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error starting embedding task:', error);
        throw error;
    }
} 