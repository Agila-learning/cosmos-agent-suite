import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const initialMessages = [
  { id: 1, sender: "Priya Sharma", message: "Welcome to the team!", time: "10:30 AM", isOwn: false, online: true },
  { id: 2, sender: "You", message: "Thank you! Excited to be here.", time: "10:32 AM", isOwn: true, online: true },
  { id: 3, sender: "Amit Patel", message: "Don't forget to complete your KYC", time: "11:15 AM", isOwn: false, online: true },
  { id: 4, sender: "Neha Singh", message: "Great performance this month! 🎉", time: "2:45 PM", isOwn: false, online: false },
  { id: 5, sender: "You", message: "Thanks! Looking forward to achieving our targets together.", time: "2:50 PM", isOwn: true, online: true },
];

export const TeamChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: user?.name || "You",
        message: newMessage,
        time: timeString,
        isOwn: true,
        online: true
      }]);
      setNewMessage("");
    }
  };

  const onlineUsers = messages.filter(m => !m.isOwn && m.online).length;

  return (
    <Card className="h-full flex flex-col shadow-card border-primary/20">
      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              Team Chat
              <Badge variant="outline" className="text-xs">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1 animate-pulse" />
                {onlineUsers} online
              </Badge>
            </h2>
            <p className="text-sm text-muted-foreground">Connected with your network</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 h-[500px]" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div 
              key={msg.id} 
              className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''} animate-slide-in`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarFallback className={msg.isOwn ? "bg-gradient-primary text-white" : "bg-gradient-to-br from-muted to-muted-foreground/20"}>
                    {msg.sender.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {msg.online && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                )}
              </div>
              <div className={`flex flex-col ${msg.isOwn ? 'items-end' : 'items-start'} max-w-[70%]`}>
                <span className="text-xs text-muted-foreground mb-1">{msg.sender}</span>
                <div className={`p-3 rounded-lg shadow-sm ${
                  msg.isOwn 
                    ? 'bg-gradient-primary text-white rounded-br-none' 
                    : 'bg-card border border-border text-foreground rounded-bl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/30">
        <div className="flex gap-2 mb-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Smile className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="border-primary/20 focus-visible:ring-primary"
          />
          <Button 
            onClick={handleSend} 
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
