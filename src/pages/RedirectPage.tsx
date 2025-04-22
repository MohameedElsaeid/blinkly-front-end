import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import BaseHttpClient from '@/lib/base-http-client';

export default function RedirectPage() {
    const {id} = useParams<{ id: string }>();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!id) return setError(true);

        const client = BaseHttpClient.getInstance();

        client.getAxiosInstance()
            .get<{ target: string }>(`/${id}`)
            .then(res => {
                window.location.replace(res.data.target);
            })
            .catch(() => {
                setError(true);
            });
    }, [id]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-2">🔗 Link not found</h1>
                    <p className="text-gray-600">This short link doesn't exist or has expired.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-xl font-medium mb-2">Redirecting you...</h1>
                <div className="animate-pulse text-gray-600">Please wait a moment</div>
            </div>
        </div>
    );
}
