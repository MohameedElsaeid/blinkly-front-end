import React from 'react';
import {Button} from '@/components/ui/button';
import {Save} from 'lucide-react';

interface Props {
    isCreating: boolean;
    onReset: () => void;
}

const FormActions: React.FC<Props> = ({isCreating, onReset}) => (
    <div className="flex justify-end gap-2">
        <Button
            type="button"
            variant="outline"
            onClick={onReset}
        >
            Reset
        </Button>
        <Button type="submit" disabled={isCreating}>
            {isCreating ? "Creating..." : "Create Dynamic Link"}
            <Save className="ml-2 h-4 w-4"/>
        </Button>
    </div>
);

export default FormActions;

