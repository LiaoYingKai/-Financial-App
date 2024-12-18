import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface FormCalendarProps {
  value: Date;
  onChange: (date?: Date) => void;
  label: string;
}

const FormCalendar: React.FC<FormCalendarProps> = ({
  value,
  onChange,
  label,
}) => (
  <FormItem className="flex items-center gap-2 space-y-0">
    <FormLabel className="flex-shrink-0 w-24">{label}</FormLabel>
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] pl-3 text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  </FormItem>
);

export default FormCalendar;
