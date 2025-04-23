
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
  variant = 'default',
  className
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'warning':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'danger':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-white border-gray-100';
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-amber-100 text-amber-600';
      case 'danger':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-violet-100 text-violet-600';
    }
  };

  const getChangeClasses = () => {
    if (!change) return 'text-gray-500';
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-500';
  };

  return (
    <Card className={cn('border shadow-sm overflow-hidden', getVariantClasses(), className)}>
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn('p-2 rounded-full', getIconClasses())}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="text-2xl font-bold">{value}</div>
        {(change !== undefined || changeLabel) && (
          <p className={cn("text-xs flex items-center", getChangeClasses())}>
            {change !== undefined && (
              <span>{change > 0 ? '↑' : change < 0 ? '↓' : '−'} {Math.abs(change)}%</span>
            )}
            {changeLabel && <span className="ml-1 text-gray-500">{changeLabel}</span>}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
