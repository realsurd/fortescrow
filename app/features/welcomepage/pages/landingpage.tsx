import { WelcomePage } from '@/components/WelcomePage';
import { AuthWrapper } from '@/components/shared/AuthWrapper';

export function Welcome() {
  return (
    <AuthWrapper>
      <WelcomePage />
    </AuthWrapper>
  );
}
