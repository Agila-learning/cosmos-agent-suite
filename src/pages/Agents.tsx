import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentList } from "@/components/agents/AgentList";
import { AgentFilters } from "@/components/agents/AgentFilters";
import { AddAgentDialog } from "@/components/agents/AddAgentDialog";

const Agents = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Agent Management</h1>
            <p className="text-muted-foreground">Manage your network of agents</p>
          </div>
          <AddAgentDialog />
        </div>
        
        <AgentFilters />
        <AgentList />
      </div>
    </DashboardLayout>
  );
};

export default Agents;
