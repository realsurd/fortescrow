import React from 'react';
import { BackgroundOverlay } from '../../shared/BackgroundOverlay';
import styles from './index.module.scss';
import { useWallet } from '@txnlab/use-wallet';

interface Props {
  isActive: boolean;
  onclick: () => any;
}

export function ConnectWalletModal({ isActive, onclick }: Props) {
  const { providers } = useWallet();

  return (
    <>
      <BackgroundOverlay visible={isActive} onClose={onclick}>
        <div className={styles['card']}>
          <div className={styles['heading-section']}>
            <div className={styles['title']}>Connect a Wallet</div>
            <div className={styles['text']}>Supported wallets</div>
          </div>
          <div className={styles['options']}>
            {providers?.map((provider, index) => (
              <div
                className={styles['bar']}
                key={index}
                onClick={provider.connect}
              >
                <img
                  src={provider.metadata.icon}
                  alt={`${provider.metadata.name} icon`}
                />
                {provider.metadata.name}
              </div>
            ))}
          </div>
        </div>
      </BackgroundOverlay>
    </>
  );
}
