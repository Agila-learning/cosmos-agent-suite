import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AgentList } from "@/components/agents/AgentList";
import { AgentFilters } from "@/components/agents/AgentFilters";
import { AddAgentDialog } from "@/components/agents/AddAgentDialog";
import { AgentTreeView } from "@/components/agents/AgentTreeView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Agents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

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
        
        <Tabs defaultValue="grid" className="w-full">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="tree">Tree View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="space-y-6">
            <AgentFilters 
              onSearchChange={setSearchQuery}
              onLevelChange={setLevelFilter}
              onLocationChange={setLocationFilter}
            />
            <AgentList 
              searchQuery={searchQuery}
              levelFilter={levelFilter}
              locationFilter={locationFilter}
            />
          </TabsContent>
          
          <TabsContent value="tree">
            <AgentTreeView />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Agents;
