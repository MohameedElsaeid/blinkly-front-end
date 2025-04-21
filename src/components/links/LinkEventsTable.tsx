
import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClickEvent } from '@/types/link';

interface LinkEventsTableProps {
  events: ClickEvent[];
}

const LinkEventsTable: React.FC<LinkEventsTableProps> = ({ events }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Device</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Referrer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{format(new Date(event.timestamp), 'PPpp')}</TableCell>
            <TableCell>
              {event.userDevice.xPlatform} ({event.userDevice.xScreenWidth}x
              {event.userDevice.xScreenHeight})
            </TableCell>
            <TableCell>
              {event.geoCity && event.geoCountry
                ? `${event.geoCity}, ${event.geoCountry}`
                : 'Unknown'}
            </TableCell>
            <TableCell className="max-w-[200px] truncate">
              {event.referer || 'Direct'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LinkEventsTable;
