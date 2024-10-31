import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { BiCircleThreeQuarter } from 'react-icons/bi';
import '../../../styles/main.css';
import Link from 'next/link';
import { useWallet } from '@txnlab/use-wallet';
import { useState } from 'react';
import { ConnectWalletModal } from './connectModal';
import { useNotify } from '@/hooks';

export function DashboardPage() {
  const { width } = useWindowDimensions();
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const { activeAddress, providers } = useWallet();
  const { notify } = useNotify();

  const disconnectWallet = () => {
    providers?.forEach((provider) => provider.disconnect());
  };

  const clearConnectModal = () => {
    setConnectWalletModal(false);
  };

  const connectWalletMessage = () => {
    setTimeout(() => {
      notify.info(`Please Connect Your Wallet`);
    }, 1500);
  };

  const toggleConnectWallet = () => {
    setConnectWalletModal(!connectWalletModal);
  };

  const isMobile = width ? width < 768 : false;

  return (
    <div className="flex w-full h-[100vh] overflow-y-auto bg-gray-100 font-space-grotesk">
      {/* Wallet Modal */}
      {connectWalletModal && (
        <ConnectWalletModal
          isActive={activeAddress ? false : true}
          onclick={clearConnectModal}
        />
      )}

      {/* Sidebar */}
      <div className="w-[20%] shadow text-black min-h-screen">
        <div className="p-3">
          <Link href={'/'}>
            <div className="p-4 font-bold text-xl text-[#006877]">
              Fortescrow
            </div>
            <div className="w-full border-b-2 border-[#006877]"></div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="w-full h-[100vh] mt-4">
          <div className="w-full flex items-center text-white my-1 mx-4 cursor-pointer">
            <div className="justify-center items-center p-2 rounded-lg">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729826284/pie-chart_yv4nhb.png"
                alt="overview"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 bg-[#006877] rounded-lg">
              <a href="#">Overview</a>
            </div>
          </div>

          {/* Additional Navigation Items */}
          <div className="w-[85%] flex items-center text-white my-2 mx-4 cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729643031/arrow-data-transfer-diagonal_yjjmly.png"
                alt="transactions"
                className="w-[25px]"
              />
            </div>
            <Link
              href="/transaction"
              className="w-[70%] justify-center items-center text-[#008396] p-2 rounded-lg"
            >
              Transactions
            </Link>
          </div>

          <div className="w-[85%] flex items-center text-white my-2 mx-4 cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718110406/wallet_famhul.png"
                alt="wallet"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
              <a href="#">Wallet</a>
            </div>
          </div>

          <div className="w-[85%] flex items-center text-white my-2 mx-4 cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729643142/store-01_hdlmam.png"
                alt="marketplace"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
              <a href="#">Marketplace</a>
            </div>
          </div>

          <div className="w-[85%] flex items-center text-white my-2 mx-4 cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729644157/message-02_ardyp8.png"
                alt="inbox"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
              <a href="#">Inbox</a>
            </div>
          </div>

          <div className="w-[85%] flex items-center text-white my-2 mx-4 cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729644444/Frame_47_3_jhmkt9.png"
                alt="disputes"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
              <a href="#">Disputes</a>
            </div>
          </div>

          <div className="w-full mt-[150px]">
            <div className="w-[85%] flex items-center text-white my-2 mx-4 cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
              <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729646945/Frame_47_4_j7rs0t.png"
                  alt="settings"
                  className="w-[25px]"
                />
              </div>
              <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
                <a href="#">Settings</a>
              </div>
            </div>
            <div className="w-[85%] flex items-center text-white my-2 mx-4 cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
              <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729648937/Frame_47_5_horqlw.png"
                  alt="settings"
                  className="w-[25px]"
                />
              </div>
              <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
                <a href="#">Help Center</a>
              </div>
            </div>
            <div className="flex justify-center items-center p-2 rounded-lg">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718110827/QR-invite_mqor7p.png"
                alt="qr-code"
                className="w-[100%]"
              />
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col flex-grow p-10">
        <header className="p-4 flex justify-between items-center">
          <div className="flex flex-col text-[#948F94] text-sm">
            <h1 className="text-xl font-semibold">Overview</h1>
            <p>Hi Micah, Welcome to ForteScrow 🤗</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-custom-gradient text-white text-sm rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718186692/wallet-submit_yinv7s.png"
                alt="wallet-deposit"
                className="w-[30px]"
              />
              <button
                className="px-4 py-2"
                onMouseEnter={() => {
                  !activeAddress && connectWalletMessage();
                }}
                onClick={() => {
                  activeAddress ? disconnectWallet() : toggleConnectWallet();
                }}
              >
                {activeAddress
                  ? `${activeAddress?.substring(
                      0,
                      3,
                    )}...${activeAddress?.substring(55)}`
                  : ` Connect Wallet`}
              </button>
            </div>
            <div className="flex items-center justify-center p-2 bg-[#FFDAD64D] text-white text-sm rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718186779/notification-03_mhrjle.png"
                alt="notification"
                className="w-[20px]"
              />
            </div>
            <div className="flex items-center justify-center p-2 text-white text-sm rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718188298/man_zlajzs.png"
                alt="user-avatar"
                className="w-[40px]"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-col">
          <div className="flex justify-between items-center gap-4">
            <div className="shadow-md">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729642711/fiat_balance_uh2rqo.png"
                alt="fiat-balance"
              />
            </div>
            <div className="shadow-md">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729642711/algo_balance_tu4p0o.png"
                alt="algo-balance"
              />
            </div>
            <div className="shadow-md">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729642711/algo_balance_tu4p0o.png"
                alt="algo-balance"
              />
            </div>
          </div>

          <div className="flex justify-between items-start gap-4 mt-[50px]">
            <div className="shadow-md">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729645225/Basic_Bar_Chart_knjhxt.png"
                alt="bar-chart"
              />
            </div>
            <div className="shadow-md">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729645225/Basic_Bar_Chart_knjhxt.png"
                alt="bar-chart"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
