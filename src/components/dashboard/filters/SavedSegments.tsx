import React from 'react';
import {Card, CardContent} from "@/components/ui/card";

const SavedSegments = () => {
    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Saved Segments</h3>
            <div className="space-y-2">
                <Card className="p-2 cursor-pointer hover:bg-muted/50">
                    <CardContent className="p-0">
                        <p className="text-sm font-medium">High-Value Campaign</p>
                        <p className="text-xs text-muted-foreground">UTM Source: Newsletter</p>
                    </CardContent>
                </Card>
                <Card className="p-2 cursor-pointer hover:bg-muted/50">
                    <CardContent className="p-0">
                        <p className="text-sm font-medium">EU Traffic</p>
                        <p className="text-xs text-muted-foreground">Region: Europe</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SavedSegments;
