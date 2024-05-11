import '../styles/global.scss';
import '../styles/main.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
} from '@txnlab/use-wallet';
import { Toaster } from 'react-hot-toast';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { PeraWalletConnect } from '@perawallet/connect';
import { DaffiWalletConnect } from '@daffiwallet/connect';
import algosdk from 'algosdk';

export default function App({ Component, pageProps }: AppProps) {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.EXODUS },
      { id: PROVIDER_ID.KIBISIS },
    ],
    nodeConfig: {
      network: 'testnet',
      nodeServer: 'https://testnet-api.algonode.cloud',
    },
    algosdkStatic: algosdk,
  });

  return (
    <WalletProvider value={providers}>
      <RecoilRoot>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Toaster />
          <Component {...pageProps} />
        </SnackbarProvider>
      </RecoilRoot>
    </WalletProvider>
  );
}
