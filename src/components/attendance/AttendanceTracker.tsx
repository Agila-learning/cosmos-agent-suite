import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CheckCircle, XCircle, TrendingUp, Calendar as CalendarIcon, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const motivationalQuotes = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Your time is limited, don't waste it living someone else's life.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Strive not to be a success, but rather to be of value.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
];

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
  const [absentDialogOpen, setAbsentDialogOpen] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [leaveRequest, setLeaveRequest] = useState('');
  const [dailyQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const markAttendance = (status: 'present' | 'absent') => {
    if (!date) return;

    if (status === 'absent') {
      setAbsentDialogOpen(true);
      return;
    }

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

  const handleAbsentSubmit = () => {
    if (!date || !reason.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide a reason for absence',
        variant: 'destructive',
      });
      return;
    }

    const dateString = date.toISOString().split('T')[0];
    setAttendanceHistory([...attendanceHistory, { date: dateString, status: 'absent' }]);
    
    toast({
      title: 'Absence Recorded',
      description: `Marked absent for ${date.toLocaleDateString()} with reason: ${reason}`,
    });

    setReason('');
    setAbsentDialogOpen(false);
  };

  const handleLeaveRequest = () => {
    if (!date || !leaveRequest.trim()) {
      toast({
        title: 'Error',
        description: 'Please provide leave request details',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Leave Request Submitted',
      description: `Leave request for ${date.toLocaleDateString()} has been submitted for approval`,
    });

    setLeaveRequest('');
    setLeaveDialogOpen(false);
  };

  const presentDays = attendanceHistory.filter(r => r.status === 'present').length;
  const totalDays = attendanceHistory.length;
  const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Attendance Tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Daily Quote */}
          <div className="p-4 bg-gradient-primary text-white rounded-lg">
            <p className="text-sm italic">"{dailyQuote}"</p>
          </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => markAttendance('present')}
            className="bg-green-600 hover:bg-green-700 hover-scale"
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Present
          </Button>
          <Button
            onClick={() => markAttendance('absent')}
            variant="destructive"
            className="hover-scale"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Absent
          </Button>
        </div>

        <Button
          onClick={() => setLeaveDialogOpen(true)}
          variant="outline"
          className="w-full hover-scale"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Request Leave
        </Button>

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

    {/* Absent Reason Dialog */}
    <Dialog open={absentDialogOpen} onOpenChange={setAbsentDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark Absence</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please provide a reason for your absence on {date?.toLocaleDateString()}
          </p>
          <Textarea
            placeholder="Enter reason for absence..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setAbsentDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAbsentSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Leave Request Dialog */}
    <Dialog open={leaveDialogOpen} onOpenChange={setLeaveDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Leave</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Submit a leave request for {date?.toLocaleDateString()}
          </p>
          <Textarea
            placeholder="Enter leave request details (reason, duration, etc.)..."
            value={leaveRequest}
            onChange={(e) => setLeaveRequest(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setLeaveDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleLeaveRequest}>
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
};
