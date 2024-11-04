import { useWindowDimensions } from '../../../hooks/useWindowDimensions';
import { BiCircleThreeQuarter } from 'react-icons/bi';
import Link from 'next/link';
import { useWallet } from '@txnlab/use-wallet';
import { useEffect, useState } from 'react';
import { ConnectWalletModal } from '../connectModal';
import { useNotify } from '@/hooks';
import { FaSearch } from 'react-icons/fa';
import { TransactionTypeModal } from './TransactionTypeModal';
import { OneTimeTransactionModal } from './OneTimeTransactionModal';
import { useDashboardActions } from '@/features/dashboard/actions/dashboard.action';

export function TransactionPage() {
  const { width } = useWindowDimensions();
  const [connectWalletModal, setConnectWalletModal] = useState(false);
  const { activeAddress, providers } = useWallet();
  const { notify } = useNotify();
  const [transactionTypeModal, setTransactionTypeModal] = useState(false);
  const [oneTimeTransactionModal, setOneTimeTransactionModal] = useState(false);

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

  const setOpenTransactionTypeModal = () => {
    setTransactionTypeModal(true);
  };
  const closeTransactionTypeModal = () => {
    setTransactionTypeModal(false);
  };
  const openTransactionTypeModal = () => setTransactionTypeModal(true);

  const openOneTimeTransactionModal = () => {
    setOneTimeTransactionModal(true);
    closeTransactionTypeModal(); // Close the TransactionTypeModal when OneTimeTransactionModal opens
  };

  const closeOneTimeTransactionModal = () => setOneTimeTransactionModal(false);

  const isMobile = width ? width < 768 : false;

  return (
    <div className="flex w-full h-[100vh] overflow-y-auto bg-gray-100 font-space-grotesk">
      {transactionTypeModal && (
        <TransactionTypeModal
          isActive={transactionTypeModal}
          onClick={closeTransactionTypeModal}
          setOpenTransactionTypeModal={openOneTimeTransactionModal} // Pass the function to open OneTimeTransactionModal
        />
      )}

      {oneTimeTransactionModal && (
        <OneTimeTransactionModal
          isActive={oneTimeTransactionModal}
          onClick={closeOneTimeTransactionModal}
          setOpenTransactionTypeModal={setOneTimeTransactionModal} // To control closing or opening it as needed
        />
      )}
      {/* Wallet Modal */}
      {connectWalletModal && (
        <ConnectWalletModal
          isActive={activeAddress ? false : true}
          onclick={clearConnectModal}
        />
      )}

      {/* Sidebar */}
      <div className="w-[20%] shadow text-black bg-white h-screen">
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
            <Link
              href="/dashboard"
              className="w-[70%] justify-center items-center p-2 text-[#006877] rounded-lg"
            >
              Overview
            </Link>
          </div>

          <div className="w-[85%] flex items-center text-white my-2 mx-4 cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2  rounded-lg">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729643031/arrow-data-transfer-diagonal_yjjmly.png"
                alt="transactions"
                className="w-[25px]"
              />
            </div>
            <Link
              href="/transaction"
              className="w-[70%] justify-center items-center bg-[#008396] p-2 text-white rounded-lg"
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
        <header className="w-full p-4 flex justify-between items-center">
          <div className="flex flex-col text-[#948F94] text-sm">
            <h1 className="text-xl font-semibold">Transaction</h1>
            <p>Keep track of your transactions</p>
          </div>

          <div className="flex gap-2 items-center">
            <div className="w-full">
              <div className="w-full flex justify-between items-center relative">
                <FaSearch className="absolute left-3 text-gray-500" />
                <input
                  type="text"
                  className="w-full bg-[#E1E1E14D] rounded-full pl-10 py-2"
                  placeholder="Search...."
                />
              </div>
            </div>

            <div className="flex items-center justify-center p-4 bg-[#F3F0EF] text-white text-sm rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718186779/notification-03_mhrjle.png"
                alt="notification"
                className="w-[30px]"
              />
            </div>
            <div className="flex items-center justify-center p-4 text-white text-sm rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718188298/man_zlajzs.png"
                alt="user-avatar"
                className="w-[60px]"
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-col">
          <div className="flex justify-between items-center gap-4">
            <div className="w-full h-[150px] bg-white rounded-md">
              <div className="flex justify-between">
                <div className="p-3">
                  <p className="text-[#615D61]">Total Balance</p>
                  <h1 className="text-[#322F33] font-bold font-space-grotesk text-[20px]">
                    NGN 0.00
                  </h1>
                  <div className="mt-4 gap-2 text-[#948F94] font-avenir text-sm flex justify-between items-center">
                    <p>Updated 5secs ago</p>
                    <img
                      src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729737943/reload_q5oi6s.png"
                      alt="reload"
                      className="w-[10px] h-5"
                    />
                  </div>
                </div>
                <div className="p-3">
                  <img
                    src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729737551/Vector_1_oyq2xg.png"
                    alt="balance-graph"
                    className="w-[150px]"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[150px] bg-white rounded-md">
              <div className="w-full flex justify-between">
                <div className="p-3 w-full">
                  <div className="w-full flex justify-between">
                    <p className="text-[#615D61]">Cash in</p>
                    <div className="flex text-[#948F94]">
                      <p>Last 30 Days</p>
                      <img
                        src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729738858/arrow-right-01_yrgbad.png"
                        alt="arrow-down"
                        className="w-[30px]"
                      />
                    </div>
                  </div>
                  <h1 className="text-[#322F33] font-bold font-space-grotesk text-[20px]">
                    NGN 0.00
                  </h1>
                  <div className="mt-4 gap-2 text-[#28A745] font-avenir text-sm flex justify-between items-center">
                    <p>See Transactional History</p>
                    <img
                      src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729738347/Vector_2_l08xhi.png"
                      alt="reload"
                      className="w-[10px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[150px] bg-white rounded-md">
              <div className="w-full flex justify-between">
                <div className="p-3 w-full">
                  <div className="w-full flex justify-between">
                    <p className="text-[#615D61]">Cash out</p>
                    <div className="flex text-[#948F94]">
                      <p>Last 30 Days</p>
                      <img
                        src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729738858/arrow-right-01_yrgbad.png"
                        alt="arrow-down"
                        className="w-[30px]"
                      />
                    </div>
                  </div>
                  <h1 className="text-[#322F33] font-bold font-space-grotesk text-[20px]">
                    NGN 0.00
                  </h1>
                  <div className="mt-4 gap-2 text-[#28A745] font-avenir text-sm flex justify-between items-center">
                    <p>See Transactional History</p>
                    <img
                      src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729738347/Vector_2_l08xhi.png"
                      alt="reload"
                      className="w-[10px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* transaction body */}
          <div className="mt-10 w-full h-screen flex flex-col p-3 bg-white rounded-lg">
            <div className="flex justify-between items-center w-full">
              <div className="text-[#948F94] text-sm font-bold">
                <h1>Transaction History</h1>
              </div>
              <div className="flex justify-between gap-2 items-center">
                <div className="flex-grow flex justify-between items-center relative">
                  <FaSearch className="absolute left-3 text-gray-500" />
                  <input
                    type="text"
                    className="w-full bg-[#E1E1E14D] rounded-full pl-10 py-2"
                    placeholder="Search...."
                  />
                </div>
                <div className="flex items-center justify-end text-[#948F94] w-auto ml-4">
                  <img
                    src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729822284/Frame_14_1_e3wbz8.png"
                    alt="sortby"
                    className="w-[50px]"
                  />
                  <p>Sort By</p>
                </div>
              </div>
            </div>

            {/* transaction details */}
            <div className="mt-2 w-full h-full border border-[#EAECF0] flex flex-col rounded-lg">
              <div className="w-full h-10 bg-[#E1E1E14D] rounded-tr-lg rounded-tl-lg text-sm font-space-grotesk ">
                <div className=" w-[85%] flex justify-between items-center">
                  <div className="flex items-center p-2 text-[#344054]">
                    <p>Name</p>
                    <img
                      src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729824689/chevron-v_kgiy13.png"
                      alt="select"
                      className="w-[20px]"
                    />
                  </div>
                  <div className="flex items-center p-2 text-[#344054]">
                    <p>Item</p>
                  </div>
                  <div className="flex items-center p-2 text-[#344054]">
                    <p>Amount</p>
                  </div>
                  <div className="flex items-center p-2 text-[#344054]">
                    <p>Date/Time</p>
                    <img
                      src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729824689/chevron-v_kgiy13.png"
                      alt="select"
                      className="w-[20px]"
                    />
                  </div>
                  <div className="flex items-center p-2 text-[#344054]">
                    <p>Status</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mt-[120px]">
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1729825213/Group_1_owvyq5.png"
                  alt="chart"
                  className="w-[300px]"
                />

                <div className="mt-10 flex flex-col text-center items-center">
                  <h1 className="text-[#948F94] font-bold text-[25px]">
                    No recent transactions found
                  </h1>
                  <button
                    className="text-[#28A745] font-avenir text-[20px]"
                    onClick={openTransactionTypeModal}
                  >
                    Start Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
