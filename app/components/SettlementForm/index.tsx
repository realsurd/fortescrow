import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { BsCheckLg } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import '../../../styles/main.css';
import Link from 'next/link';

export function SettlementForm() {
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  return (
    <div className="flex justify-between font-space-grotesk w-full mb-10 overflow-y-auto">
      <div className="hidden md:block bg-[#F7FAFF] items-start w-[342px] min-h-[100vh]  shadow-lg ">
        <div className="m-10 min-h-[100vh] bg-cover bg-center relative">
          <Link href={'/'}>
            <h1 className="flex justify-center font-bold text-[#006877] text-[35px]">
              ForteScrow
            </h1>
          </Link>
          <div className="flex items-center mx-[40px] my-[40px] w-full">
            <h1 className="text-[12px] mr-3 text-[#999999]">01</h1>
            <div className="flex flex-col font-inter">
              <h5 className="text-sm">Personal Information</h5>
              <p className="text-[13px] mr-2 text-[#999999]">
                Lets get to know you...
              </p>
            </div>
            <div className="ml-[25px]">
              <BsCheckLg className="bg-[#00b300] p-1 text-white text-[20px]  rounded-full" />
            </div>
          </div>

          <div className="flex items-center mx-[40px] my-[40px] w-full">
            <h1 className="text-[12px] mr-3 text-[#999999]">02</h1>
            <div className="flex flex-col font-inter">
              <h5 className="text-sm">Next of Kin</h5>
              <p className="text-[13px] mr-2 text-[#999999]">
                Who should we contact?
              </p>
            </div>
            <div className="ml-[10px]">
              <BsCheckLg className="bg-[#00b300] p-1 text-white text-[20px]  rounded-full" />
            </div>
          </div>

          <div className="flex items-center mx-[40px] my-[40px] w-full">
            <h1 className="text-[12px] mr-3 text-[#999999]">03</h1>
            <div className="flex flex-col font-inter">
              <h5 className="text-sm">Settlement Arrangements</h5>
              <p className="text-[13px] mr-2 text-[#999999]">
                Tell us about yourself
              </p>
            </div>
            <div className="ml-[10px]">
              <MdKeyboardArrowRight className="p-1 text-[35px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Procedure */}
      <div
        className={`w-full min-h-screen ${
          isMobile ? 'bg-diagonal-gradients' : 'bg-white'
        } flex flex-col items-center justify-center`}
      >
        {isMobile && (
          <Link href={'/'}>
            <h1 className="mt-10 flex justify-center items-center font-bold text-[#006877] text-3xl font-space-grotesk">
              ForteScrow
            </h1>
          </Link>
        )}
        <div className="font-space-grotesk w-[100%] min-h-screen p-4 rounded-tl-3xl rounded-tr-3xl md:w-[100%] mx-5 my-[40px] bg-[#F0F0F0] md:bg-white">
          <div className="flex m-7 flex-col justify-center items-center">
            <h1 className="text-red-500 md:hidden">Slider Here</h1>
            <h1 className="font-bold text-3xl text-[#006877]">
              Payment Procedures
            </h1>
            <p className="text-sm m-2 text-[#615D61]">
              How do you wish to Receive Payments?
            </p>
          </div>

          <div className="flex flex-col w-full">
            <form className="">
              <div className="mt-2 flex flex-col w-full font-inter">
                <label
                  htmlFor="payment-method"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Payment Method
                </label>
                <select
                  id="payment-method"
                  name="payment-method"
                  className="block w-full py-5 md:py-2 px-3 border border-gray-300 bg-white rounded-md shadow-smfocus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] focus:shadow-sm focus:shadow-white sm:text-sm"
                >
                  <option value="" disabled selected>
                    Select one ...
                  </option>
                  <option value="fiat">Fiat</option>
                  <option value="algo-crypto">Crypto (Algo)</option>
                </select>
              </div>

              <div className="mt-2 flex flex-col w-full font-inter">
                <label
                  htmlFor="text"
                  className="text-[12px] font-medium m-1 text-black"
                >
                  Bank Verification Number (BVN)
                </label>
                <input
                  type="text"
                  className="h-10 border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-8 md:py-4 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] focus:shadow-sm focus:shadow-white"
                  placeholder="Enter BVN"
                />
              </div>

              <div className="mt-2 flex flex-col w-full font-inter">
                <label
                  htmlFor="payment-method"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Bank
                </label>
                <select
                  id="payment-method"
                  name="payment-method"
                  className="block w-full py-5 md:py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] focus:shadow-sm focus:shadow-white sm:text-sm"
                >
                  <option value="" disabled selected>
                    Select one ...
                  </option>
                  <option value="fiat">Access Bank Plc</option>
                  <option value="algo-crypto">Fidelity Bank Plc</option>
                  <option value="fiat">First City Monument Bank Limited</option>
                  <option value="algo-crypto">
                    First Bank of Nigeria Limited
                  </option>
                  <option value="fiat">
                    Guaranty Trust Holding Company Plc
                  </option>
                  <option value="algo-crypto">Wema Bank Plc</option>
                  <option value="fiat">United Bank for Africa Plc</option>
                  <option value="algo-crypto">Zenith Bank Plc</option>
                  <option value="fiat">Opay</option>
                  <option value="algo-crypto">
                    Moniepoint Microfinance Bank
                  </option>
                </select>
              </div>

              <div className="mt-2 flex flex-col w-full font-inter">
                <label
                  htmlFor="text"
                  className="text-[12px] font-medium m-1 text-black flex justify-between"
                >
                  Account Number
                  <h1 className="text-[#948F94]">
                    Account Name:{' '}
                    <span className="text-[#28A745]">Searching.</span>
                  </h1>
                </label>
                <input
                  type="text"
                  className="h-10 border text-[13px] border-gray-300 mt-1 mb-2 rounded-md p-8 md:p-4 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] focus:shadow-sm focus:shadow-white"
                  placeholder="Enter Account Number ...."
                />
              </div>

              <div className="w-full mt-5">
                <button className="p-5 md:p-3 border w-full items-center bg-custom-gradient text-white text-sm rounded-md">
                  Submit {'( 3 / 3 )'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// return (
//     <form className="max-w-sm mx-auto">
//       <label
//         htmlFor="countries"
//         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//       >
//         Select an option
//       </label>
//       <select
//         id="countries"
//         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       >
//         <option selected>Choose a country</option>
//         <option value="US">United States</option>
//         <option value="CA">Canada</option>
//         <option value="FR">France</option>
//         <option value="DE">Germany</option>
//       </select>
//     </form>
//   );
