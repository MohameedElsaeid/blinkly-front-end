
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import httpClient from "@/lib/http-client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

// Define time series data type
interface TimeSeriesData {
  date: string;
  clicks: number;
  uniqueVisitors: number;
}

// Sample data - would be replaced with API data
const generateSampleData = (): TimeSeriesData[] => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Generate some random data with an upward trend
    const base = 800 + i * 30;
    const randomFactor = Math.random() * 400 - 200;
    const clicks = Math.max(100, Math.round(base + randomFactor));
    
    data.push({
      date: format(currentDate, 'MMM dd'),
      clicks: clicks,
      uniqueVisitors: Math.round(clicks * 0.7),
    });
  }
  
  return data;
};

const TimeSeriesChart = () => {
  const isMobile = useIsMobile();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [metric, setMetric] = useState("clicks");
  
  // Sample data fetch with loading state
  const { data, isLoading } = useQuery<TimeSeriesData[]>({
    queryKey: ['timeSeriesData', dateRange, metric],
    queryFn: () => {
      // This would be an actual API call in production
      return new Promise<TimeSeriesData[]>(resolve => {
        setTimeout(() => {
          resolve(generateSampleData());
        }, 600);
      });
    },
  });

  const displayMetrics = {
    clicks: "Clicks",
    uniqueVisitors: "Unique Visitors",
    conversionRate: "Conversion Rate",
  };

  // Function to format tick values based on data length and mobile state
  const formatXAxisTick = (value: string, index: number): string => {
    if (isMobile && data && data.length > 15) {
      return index % 3 === 0 ? value : '';
    }
    return value;
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all">
      <CardHeader className="px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center">
        <CardTitle className="text-lg sm:text-xl mb-3 sm:mb-0">Click Performance</CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
          
          <div className="w-full sm:w-auto">
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-full sm:w-[180px] h-9">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(displayMetrics).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-0 pb-4 pt-0 h-[300px] sm:h-[320px]">
        {isLoading ? (
          <div className="px-6 h-full flex items-center justify-center">
            <div className="w-full space-y-4">
              <Skeleton className="h-[240px] w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        ) : (
          <ChartContainer
            config={{
              clicks: {
                label: "Clicks",
                color: "#0fa0ce",
              },
              uniqueVisitors: {
                label: "Unique Visitors",
                color: "#9b87f5",
              },
            }}
            className="h-full px-4"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 10,
                  left: isMobile ? 0 : 10,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  padding={{ left: 20, right: 20 }}
                  tick={{ fontSize: 12 }}
                  tickFormatter={formatXAxisTick}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background p-2 border rounded shadow-lg">
                          <p className="text-sm font-medium">{label}</p>
                          {payload.map((entry) => (
                            <p 
                              key={entry.dataKey} 
                              className="text-sm" 
                              style={{ color: entry.color }}
                            >
                              {entry.name}: {entry.value.toLocaleString()}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={metric}
                  stroke="#0fa0ce"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

// Date Range Picker Component
interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onChange }) => {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className="w-full sm:w-[280px] justify-start text-left"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TimeSeriesChart;
