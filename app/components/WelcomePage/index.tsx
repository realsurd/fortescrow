import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import styles from './index.module.scss';
import Link from 'next/link';

export function WelcomePage() {
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div className={styles.textContainer}>
            <div className={styles.heading}>welcome aboard</div>
            <div className={styles.author}>micah tom</div>
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
        <button className={styles.button}>Proceed to KYC</button>
      </div>
    </div>
  );
}
