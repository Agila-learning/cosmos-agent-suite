import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const revenueData = [
  { month: 'Jan', revenue: 45000, target: 50000 },
  { month: 'Feb', revenue: 52000, target: 50000 },
  { month: 'Mar', revenue: 48000, target: 50000 },
  { month: 'Apr', revenue: 61000, target: 55000 },
  { month: 'May', revenue: 55000, target: 55000 },
  { month: 'Jun', revenue: 67000, target: 60000 },
];

const agentPerformanceData = [
  { name: 'Priya Sharma', sales: 85, applications: 42 },
  { name: 'Amit Patel', sales: 72, applications: 38 },
  { name: 'Raj Kumar', sales: 68, applications: 35 },
  { name: 'Neha Singh', sales: 91, applications: 48 },
  { name: 'Vikram Reddy', sales: 78, applications: 40 },
];

const levelDistribution = [
  { name: 'Diamond', value: 12, color: 'hsl(var(--diamond))' },
  { name: 'Gold', value: 34, color: 'hsl(var(--gold))' },
  { name: 'Silver', value: 110, color: 'hsl(var(--silver))' },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--muted-foreground))",
  },
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
  applications: {
    label: "Applications",
    color: "hsl(var(--gold))",
  },
};

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between animate-scale-in">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive insights into your network performance</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-scale border-l-4 border-l-primary transition-all animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold">₹3.28M</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">12.5%</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-primary rounded-lg animate-pulse">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale border-l-4 border-l-gold transition-all animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Agents</p>
                  <p className="text-3xl font-bold">156</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">8.2%</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-gold rounded-lg animate-pulse" style={{ animationDelay: '0.1s' }}>
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale border-l-4 border-l-accent transition-all animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Performance</p>
                  <p className="text-3xl font-bold">78.4%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">5.1%</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-600 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }}>
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale border-l-4 border-l-destructive transition-all animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Growth Rate</p>
                  <p className="text-3xl font-bold">24.7%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">2.3%</span>
                  </div>
                </div>
                <div className="p-3 bg-green-600 rounded-lg animate-pulse" style={{ animationDelay: '0.3s' }}>
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:inline-flex">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle>Revenue vs Target</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle>Top Agent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" angle={-45} textAnchor="end" height={100} />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="applications" fill="hsl(var(--gold))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-4">
            <Card className="shadow-card animate-fade-in">
              <CardHeader>
                <CardTitle>Agent Level Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={levelDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {levelDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
