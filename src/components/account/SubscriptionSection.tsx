
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Subscription } from '@/types/user';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CreditCard, ExternalLink } from 'lucide-react';

interface SubscriptionSectionProps {
  subscription: Subscription;
}

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ subscription }) => {
  const startDate = new Date(subscription.startDate);
  const formattedStartDate = format(startDate, 'MMMM d, yyyy');
  
  const getPlanNameDisplay = () => {
    return subscription.plan.name.charAt(0).toUpperCase() + subscription.plan.name.slice(1).toLowerCase();
  };

  const getPlanStatusColor = () => {
    switch (subscription.status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Subscription</CardTitle>
        <CardDescription>
          Manage your subscription plan and billing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{getPlanNameDisplay()} Plan</h3>
            <p className="text-sm text-muted-foreground">
              {subscription.plan.billingFrequency === 'monthly' ? 'Billed monthly' : 'Billed yearly'}
            </p>
          </div>
          <Badge variant="outline" className={getPlanStatusColor()}>
            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
          </Badge>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Start date</span>
            <span>{formattedStartDate}</span>
          </div>
          {subscription.endDate && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">End date</span>
              <span>{format(new Date(subscription.endDate), 'MMMM d, yyyy')}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Auto-renew</span>
            <span>{subscription.autoRenew ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Price</span>
            <span>{subscription.plan.price === 0 ? 'Free' : `$${subscription.plan.price.toFixed(2)}`}</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Features included:</h4>
          <ul className="space-y-1">
            {subscription.plan.features.split('\n').map((feature, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="mr-2 text-primary">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link to="/pricing">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Plans
          </Link>
        </Button>
        {subscription.plan.name !== 'FREE' && (
          <Button asChild className="w-full sm:w-auto">
            <Link to="/dashboard/billing">
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Billing
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionSection;
