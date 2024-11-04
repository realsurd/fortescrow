import { TransactionPage } from '@/components/DashboardPage/TransactionsPage';
import { AuthWrapper } from '@/components/shared/AuthWrapper';

export function Transaction() {
  return (
    <AuthWrapper>
      <TransactionPage />
    </AuthWrapper>
  );
}
