import { useRouter } from 'next/router';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { useDashboardActions } from '@/features/dashboard/actions/dashboard.action';
import { useNotify } from '@/hooks';

export function WelcomePage() {
  const { width } = useWindowDimensions();
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const { getUsers } = useDashboardActions();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState<any>();

  const { notify } = useNotify();

  const emailId = localStorage.getItem('emailId');

  const fetchUsers = async () => {
    setLoading(true);

    const response = await getUsers();

    if (response?.error) {
      notify.error('Network issues');
      setLoading(false);
      return;
    } else {
      setLoading(false);
      setUsers(response);
      setUser(response?.filter((item: any) => item?.email === emailId));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.textContainer}>
            <div className={styles.heading}>welcome aboard</div>
            <div className={styles.author}>
              {loading
                ? `...`
                : `${user?.[0].first_name} ${user?.[0].last_name}`}
            </div>
          </div>

          <div className={styles.paragraph}>
            <div className={styles.text}>
              {`Thank you for signing up! To ensure security, please complete your
              KYC verification process. Follow the steps in your dashboard to
              provide necessary documentation. Once completed, you'll unlock full
              access to ForteScrow's features. Need help? `}
            </div>
            <div className={styles.text}>Contact our support team.</div>
            <div className={styles.text}>Again, welcome aboard!</div>
          </div>
        </div>
        <button className={styles.button} onClick={() => push('/dashboard')}>
          Proceed to Dashboard
        </button>
      </div>
    </div>
  );
}
