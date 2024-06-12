import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { BiCircleThreeQuarter } from 'react-icons/bi';
import '../../../styles/main.css';
import Link from 'next/link';

export function DashboardPage() {
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  return (
    <div className="flex h-screen bg-gray-100 font-space-grotesk">
      {/* sidebar */}
      <div className="w-64 shadow text-black flex-shrink-0">
        <Link href={'/'}>
          <div className="p-4 text-center font-bold text-xl text-[#006877]">
            Fortescrow
          </div>
        </Link>

        <nav className="mt-4 ">
          <div className="w-full flex items-center text-white my-2 mx-4  cursor-pointer">
            <div className="justify-center items-center p-2 rounded-lg bg-[#006877]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718109979/overview_neolyk.png"
                alt="overview"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 bg-[#006877] rounded-lg">
              <a href="#">Overview</a>
            </div>
          </div>

          <div className="w-[85%] flex items-center text-white my-2 mx-4  cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg bg-[#D5F7FF]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718110406/transactions_jb0otx.png"
                alt="overview"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center text-[#008396] p-2  rounded-lg">
              <a href="#">Transactions</a>
            </div>
          </div>
          <div className="w-[85%] flex items-center text-white my-2 mx-4  cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718110406/wallet_famhul.png"
                alt="overview"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
              <a href="#">Wallet</a>
            </div>
          </div>
          <div className="w-[85%] flex items-center text-white my-2 mx-4  cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718110406/market_wdkpyu.png"
                alt="overview"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
              <a href="#">Marketplace</a>
            </div>
          </div>
          <div className="w-[85%] flex items-center text-white my-2 mx-4  cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718110406/inbox_h6udy4.png"
                alt="overview"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
              <a href="#">Inbox</a>
            </div>
          </div>
          <div className="w-[85%] flex items-center text-white my-2 mx-4  cursor-pointer hover:bg-[#D5F7FF] hover:rounded-lg">
            <div className="justify-center items-center p-2 rounded-lg text-[#008396]">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718110406/disputes_ljiyf6.png"
                alt="overview"
                className="w-[25px]"
              />
            </div>
            <div className="w-[70%] justify-center items-center p-2 text-[#008396] rounded-lg">
              <a href="#">Disputes</a>
            </div>
          </div>
        </nav>
        <div className="flex justify-center items-center p-2 rounded-lg">
          <img
            src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718110827/QR-invite_mqor7p.png"
            alt="overview"
            className="w-[50%]"
          />
        </div>
      </div>

      {/* <!-- Main Content --> */}
      <div className="flex flex-col flex-grow">
        {/* <!-- Header --> */}
        <header className="bg-white  p-4 flex justify-between items-center">
          <div className="flex flex-col text-[#948F94] text-sm">
            <h1 className="text-xl font-semibold">Overview</h1>
            <p>Hi Micah, Welcome to ForteScrow 🤗</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-[#9ED49C4D]  rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718185963/deposit_pp1hcp.png"
                alt="wallet-deposit"
                className="w-[30px]"
              />
              <button className=" text-[#39693C] px-4 py-2">Deopsit</button>
            </div>
            <div className="flex items-center justify-center bg-[#FFDAD64D]  rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718186305/money-remove-02_bxuqnu.png"
                alt="wallet-deposit"
                className="w-[30px]"
              />
              <button className=" text-[#410002] px-4 py-2">Withdraw</button>
            </div>
            <div className="flex items-center justify-center bg-custom-gradient text-white text-sm  rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718186692/wallet-submit_yinv7s.png"
                alt="wallet-deposit"
                className="w-[30px]"
              />
              <button className="px-4 py-2">Connect Wallet</button>
            </div>
            <div className="flex items-center justify-center p-2 bg-[#FFDAD64D]  text-white text-sm  rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718186779/notification-03_mhrjle.png"
                alt="wallet-deposit"
                className="w-[20px]"
              />
            </div>
            <div className="flex items-center justify-center p-2  text-white text-sm  rounded-full">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1718188298/man_zlajzs.png"
                alt="wallet-deposit"
                className="w-[40px]"
              />
            </div>
          </div>
        </header>

        {/* <!-- Content --> */}
        <main className="flex-grow p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Welcome to the Dashboard
            </h2>
            <p className="text-gray-700">
              This is where your main content will go.
            </p>
          </div>
        </main> 
      </div>
    </div>
  );
}
