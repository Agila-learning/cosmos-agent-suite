import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KYCForm } from "@/components/kyc/KYCForm";

const KYC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">KYC Verification</h1>
          <p className="text-muted-foreground">Complete your KYC verification to unlock all features.</p>
        </div>
        
        <KYCForm />
      </div>
    </DashboardLayout>
  );
};

export default KYC;
