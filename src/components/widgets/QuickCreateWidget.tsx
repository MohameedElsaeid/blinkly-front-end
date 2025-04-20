
import React from 'react';
import CreateLinkForm from '../dashboard/CreateLinkForm';
import { Widget } from '@/types/dashboard';

interface QuickCreateWidgetProps {
  widget: Widget;
}

const QuickCreateWidget: React.FC<QuickCreateWidgetProps> = ({ widget }) => {
  return <CreateLinkForm />;
};

export default QuickCreateWidget;
