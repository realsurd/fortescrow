import { ReactNode } from 'react';
import styles from './index.module.scss';

interface BackgroundOverlayProps {
  children?: ReactNode;
  visible?: boolean;
  onClose?: () => any;
}

export function BackgroundOverlay({
  children = <></>,
  visible = true,
  onClose = () => null,
}: BackgroundOverlayProps) {
  return visible ? (
    <div className={styles['wrapper']}>
      <div className={styles['overlay']} onClick={onClose}></div>
      {children}
    </div>
  ) : null;
}
