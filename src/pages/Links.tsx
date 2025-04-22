import React from 'react';
import {useQuery} from '@tanstack/react-query';
import httpClient from '@/lib/http-client';
import LinksTable from '@/components/links/LinksTable';
import {LinksResponse} from '@/types/link';
import {Card} from '@/components/ui/card';
import DashboardLayout from '@/layouts/DashboardLayout';
import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

const Links = () => {
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();

    const {data, isLoading} = useQuery<LinksResponse>({
        queryKey: ['links', page],
        queryFn: () => httpClient.get(`/api/links?page=${page}&limit=10`),
    });

    const handleViewLink = (id: string) => {
        navigate(`/dashboard/links/${id}`);
    };

    return (
        <DashboardLayout>
            <div className="px-4 md:px-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Links</h1>
                        <p className="text-muted-foreground">Manage your shortened links</p>
                    </div>
                    <Button onClick={() => navigate('/dashboard/create-link')}>
                        <Plus className="mr-2 h-4 w-4"/>
                        Create Link
                    </Button>
                </div>

                <Card className="p-0">
                    <LinksTable
                        links={data?.links || []}
                        pagination={data?.pagination}
                        isLoading={isLoading}
                        onPageChange={setPage}
                        onViewLink={handleViewLink}
                    />
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Links;
