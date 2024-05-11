import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useState } from 'react';
import styles from './index.module.scss';

export function SignUpPage() {
  // const [activeDropDown, setActiveDropDown] = useState(false);
  // const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  // const [openSideNav, setOpenSideNav] = useState(false);

  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  return <div className={styles['container']}>Sign Up Page</div>;
}
