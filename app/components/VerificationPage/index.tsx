import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import Link from 'next/link';
import styles from './index.module.scss';

export function VerificationPage() {
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  return (
    <div className="relative">
      {isMobile && (
        <img
          src="https://res.cloudinary.com/dlinprg6k/image/upload/v1715559930/fort-background_jyso4x.jpg"
          alt="Background"
          className="w-full t-0 min-h-screen object-cover absolute opacity-20"
        />
      )}
      {isMobile && (
        <Link href={'/'}>
          <h1 className="mt-10 flex justify-center items-center font-bold text-[#006877] text-3xl font-space-grotesk">
            ForteScrow
          </h1>
        </Link>
      )}
      <div className="relative flex max-w-full items-center justify-center m-5">
        <div className="max-w-full border shadow-2xl mt-20 rounded-3xl bg-white">
          <div className="m-[50px] items-center">
            <h1 className="text-center font-bold text-2xl mb-2 text-[#006877] font-lexend">
              Verification
            </h1>
            <p className="w-[250px] text-center md:w-full text-sm md:text-center text-[#b58985] font-avenir">
              A six digit code has been sent via SMS to your number that ends
              with
              <span className="font-semibold">*5499</span>.Kindly <br /> confirm
              and provides the code in the input field below.{' '}
            </p>
          </div>

          <form className="px-4 m-10">
            <div className="flex justify-center gap-2 mb-6">
              <input
                className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
              <input
                className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
              <input
                className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
              <input
                className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
              <input
                className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
              <input
                className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
              />
            </div>
            <div className="flex flex-col justify-center">
              <button
                className="w-full bg-custom-gradient text-white font-space-grotesk font-bold p-5 md:p-4 rounded-lg"
                type="button"
              >
                Verify OTP
              </button>
              <p className="flex justify-end items-center mt-3 font-lexend text-[#B3B3B3] text-[12px]">
                Didn’t receive an OTP?
                <span className="text-[#006877] font-bold">Resend OTP</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
