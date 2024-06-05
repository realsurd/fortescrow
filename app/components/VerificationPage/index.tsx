import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { useState } from 'react';
import styles from './index.module.scss';

export function VerificationPage() {
  // const [activeDropDown, setActiveDropDown] = useState(false);
  // const [activeDropDownTwo, setActiveDropDownTwo] = useState(false);
  // const [openSideNav, setOpenSideNav] = useState(false);

  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  return (
    <div className="flex max-w-full items-center justify-center m-10">
      <div className="max-w-full border shadow-lg mt-20 rounded-lg">
        <div className="m-[50px] items-center">
          <h1 className="text-center font-bold text-2xl mb-2 text-[#006877] font-lexend">
            Verification
          </h1>
          <p className="text-sm text-center leading-6 text-[#615D61] font-avenir">
            A six digit code has been sent via SMS to your number that ends with
            <span className="font-semibold">*5499</span>. <br /> Kindly confirm
            and provide the code in the input field below.{' '}
          </p>
        </div>
        <form className="px-4  m-10">
          <div className="flex justify-center gap-2 mb-6">
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength="1"
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
          </div>
          <div className="flex flex-col justify-center">
            <button
              className="w-full bg-custom-gradient text-white font-space-grotesk font-bold py-2 px-4 rounded-md"
              type="button"
            >
              Verify OTP
            </button>
            <p className="flex justify-end items-center m-2 font-lexend text-[#4C4C4C] text-[12px]">
              Didn’t receive an OTP?
              <span className="text-[#006877] font-bold">Resend OTP</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
