
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CampaignSourceData {
  source: string;
  clicks: number;
  conversions: number;
  value: number;
}

interface CampaignSourceTableProps {
  data: CampaignSourceData[];
}

const CampaignSourceTable: React.FC<CampaignSourceTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">Conversions</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.source}</TableCell>
              <TableCell className="text-right">{item.clicks.toLocaleString()}</TableCell>
              <TableCell className="text-right">{item.conversions.toLocaleString()}</TableCell>
              <TableCell className="text-right">${item.value.toLocaleString()}</TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignSourceTable;
