import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Award, 
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface CommissionData {
  month: string;
  baseCommission: number;
  tierBonus: number;
  performanceBonus: number;
  total: number;
  change: number;
}

const mockCommissionData: CommissionData[] = [
  { month: "March 2024", baseCommission: 45000, tierBonus: 15000, performanceBonus: 8000, total: 68000, change: 12.5 },
  { month: "February 2024", baseCommission: 42000, tierBonus: 12000, performanceBonus: 6500, total: 60500, change: 8.3 },
  { month: "January 2024", baseCommission: 38000, tierBonus: 10000, performanceBonus: 5800, total: 53800, change: -5.2 },
  { month: "December 2023", baseCommission: 40000, tierBonus: 11000, performanceBonus: 6000, total: 57000, change: 15.7 },
];

const Commission = () => {
  const [selectedMonth, setSelectedMonth] = useState("March 2024");
  
  const currentData = mockCommissionData.find(d => d.month === selectedMonth) || mockCommissionData[0];
  const totalEarnings = mockCommissionData.reduce((sum, data) => sum + data.total, 0);
  const avgMonthly = totalEarnings / mockCommissionData.length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in p-4 sm:p-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Commission Tracking</h1>
          <p className="text-muted-foreground text-sm sm:text-base">View your earnings breakdown by month, tier, and bonus structure</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-scale animate-scale-in">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-primary rounded-lg flex-shrink-0">
                  <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-lg sm:text-2xl font-bold truncate">₹{totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-600 rounded-lg flex-shrink-0">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Avg Monthly</p>
                  <p className="text-lg sm:text-2xl font-bold truncate">₹{avgMonthly.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-gold rounded-lg flex-shrink-0">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Current Month</p>
                  <p className="text-lg sm:text-2xl font-bold truncate">₹{currentData.total.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600 rounded-lg flex-shrink-0">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">Growth Rate</p>
                  <div className="flex items-center gap-1">
                    <p className="text-lg sm:text-2xl font-bold truncate">
                      {currentData.change > 0 ? '+' : ''}{currentData.change}%
                    </p>
                    {currentData.change > 0 ? (
                      <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Month Selector */}
        <Card className="animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Commission Breakdown</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">View detailed breakdown by month</p>
              </div>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockCommissionData.map((data) => (
                    <SelectItem key={data.month} value={data.month}>
                      {data.month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Current Month Breakdown */}
        <Card className="hover-scale animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-lg sm:text-xl">{currentData.month}</span>
              <Badge className={`${currentData.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs sm:text-sm`}>
                {currentData.change > 0 ? '+' : ''}{currentData.change}% from previous month
              </Badge>
            </CardTitle>
            <CardDescription>Detailed commission breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover-scale">
                <div>
                  <p className="font-medium text-sm sm:text-base">Base Commission</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Standard sales commission</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold">₹{currentData.baseCommission.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover-scale">
                <div>
                  <p className="font-medium text-sm sm:text-base">Tier Bonus</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Level-based incentive</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-primary">₹{currentData.tierBonus.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover-scale">
                <div>
                  <p className="font-medium text-sm sm:text-base">Performance Bonus</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Target achievement bonus</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold text-green-600">₹{currentData.performanceBonus.toLocaleString()}</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-primary text-white rounded-lg shadow-glow">
                <div>
                  <p className="font-bold text-base sm:text-lg">Total Commission</p>
                  <p className="text-xs sm:text-sm text-white/90">Sum of all components</p>
                </div>
                <p className="text-2xl sm:text-3xl font-bold">₹{currentData.total.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Historical Data */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Commission History</CardTitle>
            <CardDescription>Last 4 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCommissionData.map((data, index) => (
                <div 
                  key={data.month} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover-scale bg-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-2 sm:mb-0">
                    <p className="font-medium text-sm sm:text-base">{data.month}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Base: ₹{data.baseCommission.toLocaleString()} + 
                      Tier: ₹{data.tierBonus.toLocaleString()} + 
                      Perf: ₹{data.performanceBonus.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <p className="text-lg sm:text-xl font-bold">₹{data.total.toLocaleString()}</p>
                    <Badge className={`${data.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs`}>
                      {data.change > 0 ? '+' : ''}{data.change}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Commission;
