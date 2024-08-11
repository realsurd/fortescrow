import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import Link from 'next/link';
import styles from './index.module.scss';
import { ThreeDots } from 'react-loader-spinner';
import { useNotify } from '@/hooks';
import { useVerifyActions } from '@/features/verification/actions/verification.action';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function VerificationPage() {
  const [firstNum, setFirstNum] = useState<string>();
  const [secNum, setSecNum] = useState<string>();
  const [thirdNum, setThirdNum] = useState<string>();
  const [lastNum, setLastNum] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;
  const { notify } = useNotify();
  const { push } = useRouter();

  const { VerfiyUserOTP, getUserOTP } = useVerifyActions();

  const isEmpty = !firstNum || !secNum || !thirdNum || !lastNum ? true : false;

  const handleSubmit = async () => {
    setLoading(true);

    if (isEmpty) {
      setLoading(false);
      notify.error('Fill all Otp codes');
      return;
    } else {
      const otpArr = [firstNum, secNum, thirdNum, lastNum];
      const joinedArr = otpArr.join('');
      const finalOtp = Number(joinedArr);
      console.log(joinedArr);

      const response = await VerfiyUserOTP(finalOtp);

      if (response?.error) {
        setLoading(false);
        notify.error('email already verified or OTP does not exist');
        return;
      } else {
        setLoading(false);
        notify.success('email already verified successfully, proceed to login');
        setTimeout(() => push('/login'), 2000);
      }
    }
  };

  return (
    <div className="flex max-w-full items-center justify-center m-10">
      <div className="max-w-full border shadow-lg mt-20 rounded-lg">
        <div className="m-[50px] items-center">
          <h1 className="text-center font-bold text-2xl mb-2 text-[#006877] font-lexend">
            Verification
          </h1>
          <p className="text-sm text-center leading-6 text-[#615D61] font-avenir">
            A four digit code has been sent via SMS to your number that ends
            with
            <span className="font-semibold">*5499</span>. <br /> Kindly confirm
            and provide the code in the input field below.{' '}
          </p>
        </div>
        <form className="px-4  m-10">
          <div className="flex justify-center gap-2 mb-6">
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={firstNum}
              onChange={(e: any) => setFirstNum(e.target.value)}
            />
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={secNum}
              onChange={(e: any) => setSecNum(e.target.value)}
            />
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={thirdNum}
              onChange={(e: any) => setThirdNum(e.target.value)}
            />
            <input
              className="w-12 font-bold text-[#615D61] text-2xl font-space-grotesk h-12 text-center border-[#AFAAAE] rounded-md shadow-sm focus:border-[#A4EEFF] focus:ring-[#A4EEFF]"
              type="text"
              maxLength={1}
              pattern="[0-9]"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={lastNum}
              onChange={(e: any) => setLastNum(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center">
            <button
              className="w-full bg-custom-gradient text-white font-space-grotesk font-bold py-2 px-4 rounded-md"
              type="button"
              onClick={handleSubmit}
            >
              {loading && (
                <ThreeDots
                  visible={true}
                  height="20"
                  width="80"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              )}
              {loading ? `Verifying OTP...` : `Verify OTP`}
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
