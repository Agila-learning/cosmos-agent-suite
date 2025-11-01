import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TeamChat } from "@/components/chat/TeamChat";

const Chat = () => {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] animate-fade-in">
        <TeamChat />
      </div>
    </DashboardLayout>
  );
};

export default Chat;
