import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from '@/contexts/NotificationContext';

export const AddAgentDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: 'silver',
    location: '',
    business: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Agent Added',
      description: `${formData.name} has been successfully added to your network.`,
    });

    addNotification({
      title: 'New Agent Added',
      message: `${formData.name} has been successfully added to your network`,
      type: 'success'
    });

    setOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      level: 'silver',
      location: '',
      business: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Agent</DialogTitle>
          <DialogDescription>
            Add a new agent to your network. Fill in the required details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input 
                id="phone" 
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Agent Level *</Label>
              <Select 
                value={formData.level}
                onValueChange={(value) => setFormData({...formData, level: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input 
              id="location" 
              placeholder="Mumbai, Maharashtra"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business">Business Background</Label>
            <Input 
              id="business" 
              placeholder="Previous work experience"
              value={formData.business}
              onChange={(e) => setFormData({...formData, business: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary">
              Add Agent
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
