import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CheckCircle, XCircle, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent';
}

export const AttendanceTracker = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();
  const { user } = useAuth();
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([
    { date: '2024-03-01', status: 'present' },
    { date: '2024-03-02', status: 'present' },
    { date: '2024-03-03', status: 'absent' },
    { date: '2024-03-04', status: 'present' },
  ]);

  const markAttendance = (status: 'present' | 'absent') => {
    if (!date) return;

    const dateString = date.toISOString().split('T')[0];
    const existingIndex = attendanceHistory.findIndex(record => record.date === dateString);

    if (existingIndex >= 0) {
      const newHistory = [...attendanceHistory];
      newHistory[existingIndex] = { date: dateString, status };
      setAttendanceHistory(newHistory);
    } else {
      setAttendanceHistory([...attendanceHistory, { date: dateString, status }]);
    }

    toast({
      title: 'Attendance Marked',
      description: `You have been marked ${status} for ${date.toLocaleDateString()}`,
    });
  };

  const presentDays = attendanceHistory.filter(r => r.status === 'present').length;
  const totalDays = attendanceHistory.length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-primary" />
          Attendance Tracker
        </CardTitle>
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
            className="flex-1 bg-green-600 hover:bg-green-700 hover-scale"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Present
          </Button>
          <Button
            onClick={() => markAttendance('absent')}
            variant="destructive"
            className="flex-1 hover-scale"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Absent
          </Button>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current Month</span>
            <Badge variant="outline" className="font-bold">
              {presentDays}/{totalDays} days
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Attendance Rate</span>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-bold text-green-600">{attendancePercentage}%</span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Recent History</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {attendanceHistory.slice(-5).reverse().map((record, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm p-2 bg-muted/30 rounded">
                <span>{new Date(record.date).toLocaleDateString()}</span>
                <Badge variant={record.status === 'present' ? 'default' : 'destructive'}>
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
