import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Edit, QrCode, TrendingUp, Play, Pause} from 'lucide-react';

interface Link {
    id: string;
    alias: string;
    clicks: number;
    trend: number;
    status: 'active' | 'paused';
}

interface LinkCardProps {
    link: Link;
    onEdit: () => void;
    onToggle: () => void;
}

const LinkCard: React.FC<LinkCardProps> = ({link, onEdit, onToggle}) => {
    return (
        <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className={`h-1 w-full ${link.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}/>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="font-medium truncate">{link.alias}</h3>
                        <div className="flex items-center gap-2 mt-1">
              <span
                  className={`px-2 py-0.5 rounded-full text-xs ${link.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {link.status}
              </span>
                            <span className="text-xs text-muted-foreground">blinkly.com/{link.alias}</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                    <div>
                        <p className="text-xs text-muted-foreground">Total Clicks</p>
                        <p className="text-xl font-bold">{link.clicks.toLocaleString()}</p>
                    </div>
                    <div className={`flex items-center ${link.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="text-sm font-medium">
              {link.trend > 0 ? '+' : ''}{link.trend}%
            </span>
                        {link.trend > 0 ? (
                            <TrendingUp className="h-4 w-4 ml-1"/>
                        ) : (
                            <TrendingUp className="h-4 w-4 ml-1 rotate-180"/>
                        )}
                    </div>
                </div>

                <div className="flex gap-2 mt-4">
                    <Button className="flex-1" variant="outline" size="sm" onClick={onEdit}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Edit
                    </Button>
                    <Button className="flex-1" variant="outline" size="sm" onClick={onToggle}>
                        {link.status === 'active' ? (
                            <>
                                <Pause className="h-4 w-4 mr-2"/>
                                Pause
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4 mr-2"/>
                                Activate
                            </>
                        )}
                    </Button>
                    <Button className="w-9" variant="outline" size="sm">
                        <QrCode className="h-4 w-4"/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default LinkCard;
