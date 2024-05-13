import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useState } from 'react';
import styles from './index.module.scss';
import Link from 'next/link';

export function LandingPage() {
  // const [activeDropDown, setActiveDropDown] = useState(false);
  // const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  // const [openSideNav, setOpenSideNav] = useState(false);

  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  return (
    <div className={styles['container']}>
      <div className={styles['hero-section']}>
        {!isMobile && (
          <div className={styles['desktop-header']}>
            <Link className={styles['logo']} href={'/'}>
              ForteScrow
            </Link>
            <div className={styles['tabs']}>
              <Link className={styles['tab-active']} href={'/'}>
                Home
              </Link>
              <Link className={styles['tab']} href={'/'}>
                Careers
              </Link>
              <Link className={styles['tab']} href={'/'}>
                About
              </Link>
              <Link className={styles['tab']} href={'/'}>
                Security
              </Link>
            </div>

            <div className={styles['buttons']}>
              <Link className={styles['signup']} href={'/signup'}>
                Sign Up
              </Link>
              <Link className={styles['login']} href={'/login'}>
                Login
              </Link>
            </div>
          </div>
        )}
        <div className={styles['inner-hero']}>
          <div className={styles['left-container']}>
            <div className={styles['inner']}>
              <div className={styles['tag']}>
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1715630368/Icon_b9zhst.png"
                  alt="tag"
                />
                Secure Escrow Services for Safe Transactions
              </div>
              <div className={styles['heading-text']}>
                Empowering Trust, Securing Transactions: <span>ForteScrow</span>
                , Your Ultimate Escrow Partner
              </div>
              <div className={styles['body-text']}>
                Welcome to the future of secure transactions. With our advanced
                escrow services, your transactions are safeguarded, and your
                peace of mind is assured.
              </div>
            </div>
            <div className={styles['btn-container']}>
              <div className={styles['btn-get-started']}>get started</div>
              <div className={styles['btn-learn-more']}>learn more</div>
            </div>
          </div>
          <div className={styles['right-container']}>
            <img
              src="https://res.cloudinary.com/dlinprg6k/image/upload/v1715569235/Frame_1618868130_ovifvc.png"
              alt="hero-image"
            />
            <div className={styles['txn-container']}>
              <div className={styles['title']}>Your Transactions</div>
            </div>
          </div>
        </div>
      </div>
      {/* end of Hero section */}
      <div className={styles['partners']}>partners section</div>
    </div>
  );
}
