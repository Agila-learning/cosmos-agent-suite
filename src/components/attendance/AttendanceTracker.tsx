import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const AttendanceTracker = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const { user } = useAuth();

  const markAttendance = (status: 'present' | 'absent') => {
    toast({
      title: 'Attendance Marked',
      description: `You have been marked ${status} for ${date?.toLocaleDateString()}`,
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Mark Attendance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        <div className="flex gap-3">
          <Button
            onClick={() => markAttendance('present')}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Present
          </Button>
          <Button
            onClick={() => markAttendance('absent')}
            variant="destructive"
            className="flex-1"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Absent
          </Button>
        </div>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Current month attendance: <span className="font-bold text-foreground">22/25 days</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
