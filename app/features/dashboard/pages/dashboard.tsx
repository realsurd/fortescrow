import { DashboardPage } from '@/components/DashboardPage';
import { AuthWrapper } from '@/components/shared/AuthWrapper';

export function Dashboard() {
  return (
    <AuthWrapper>
      <DashboardPage />
    </AuthWrapper>
  );
}
