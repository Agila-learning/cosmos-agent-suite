import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

const messages = [
  { id: 1, sender: "Priya Sharma", message: "Welcome to the team!", time: "10:30 AM", isOwn: false },
  { id: 2, sender: "You", message: "Thank you! Excited to be here.", time: "10:32 AM", isOwn: true },
  { id: 3, sender: "Amit Patel", message: "Don't forget to complete your KYC", time: "11:15 AM", isOwn: false },
];

export const TeamChat = () => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      // Handle send logic
      setNewMessage("");
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-card">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-foreground">Team Chat</h2>
        <p className="text-sm text-muted-foreground">Connected with your network</p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
            <Avatar className="h-10 w-10">
              <AvatarFallback className={msg.isOwn ? "bg-gradient-primary text-white" : "bg-muted"}>
                {msg.sender.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
              <span className="text-xs text-muted-foreground mb-1">{msg.sender}</span>
              <div className={`p-3 rounded-lg ${msg.isOwn ? 'bg-gradient-primary text-white' : 'bg-muted text-foreground'}`}>
                <p className="text-sm">{msg.message}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend} className="bg-gradient-primary">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
