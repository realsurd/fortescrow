import { GoArrowUpRight } from 'react-icons/go';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { FaQuoteLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';
import { useNotify } from '@/hooks';
import { useSignUpActions } from '@/features/signup/actions/signup.action';
import { ThreeDots } from 'react-loader-spinner';

export function SignUpPage() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { registerUser } = useSignUpActions();

  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;

  const { notify } = useNotify();

  const style = {
    color: '#E5EFFF',
    fontSize: '3em',
  };

  const isEmpty =
    !firstName ||
    !lastName ||
    !password ||
    !confirmPassword ||
    !country ||
    !email ||
    !phone
      ? true
      : false;
  const passwordsMatches = password === confirmPassword ? true : false;
  const handleSubmit = async () => {
    setLoading(true);

    if (isEmpty) {
      notify.error('Fill all details');
      setLoading(false);
      return;
    }
    if (!isEmpty && !passwordsMatches) {
      notify.error('Passwords does not match');
      setLoading(false);
      return;
    }
    if (!isEmpty && passwordsMatches) {
      //get the data
      const registeredData = {
        first_name: firstName,
        last_name: lastName,
        password,
        email,
        user_type: 'Business',
      };
      const Data = {
        firstName,
        lastName,
        phone,
        email,
        country,
        password,
        confirmPassword,
      };

      console.log(Data), console.log(registeredData);

      //send the data to the api endpoint
      const response = await registerUser(registeredData);

      if (response.error) {
        notify.error(response.error?.toString() || 'Network error');
        setLoading(false);
        return;
      } else {
        setLoading(false);
        //clear off the input fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCountry('');
        setPhone('');
        //success notification
        notify.success('User successfully signed up.');
      }
    }
  };

  return (
    <div className="flex justify-between font-space-grotesk items-start w-full h-[100vh] mb-10 overflow-y-auto">
      <div className="w-[45%] min-h-[100vh] bg-cover bg-center relative">
        <Link href={'/'}>
          <h1 className="text-center m-3 flex bg-white justify-center items-center font-bold text-[#006877]">
            ForteScrow
          </h1>
        </Link>

        <div className="bg-diagonal-gradient w-full min-h-[100vh]">
          <img
            src="https://res.cloudinary.com/dlinprg6k/image/upload/v1715559930/fort-background_jyso4x.jpg"
            alt="Background"
            className="w-full h-screen object-cover absolute opacity-10"
          />
          <div className="flex w-full">
            <div className="flex flex-col justify-start items-start w-full mt-2 mr-5 mb-2 ml-5 p-3 leading-3">
              <div className="mb-1 flex justify-center items-center font-space-grotesk">
                <div className=" flex flex-col">
                  <div className="flex items-center">
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#FFF] rounded-full font-bold text-[#615D61]">
                      01
                    </h1>
                    <p className="ml-4 text-[14px] text-black font-bold">
                      Sign up
                    </p>
                  </div>
                  <p className="ml-12 text-[12px] text-[#615D61]">
                    Successfully create an account
                  </p>
                </div>
              </div>

              <div className="mb-1 flex justify-center items-center font-space-grotesk">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#FFF] rounded-full font-bold text-[#615D61]">
                      02
                    </h1>
                    <p className="ml-4 text-[14px] text-black font-bold">
                      Initiate Transaction
                    </p>
                  </div>
                  <p className="ml-12 text-[12px] text-[#615D61]">
                    Deposit and initiate a <br />
                    transaction between you and <br />
                    the seller.
                  </p>
                </div>
              </div>

              <div className="mb-1 flex justify-center items-center font-space-grotesk">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#FFF] rounded-full font-bold text-[#615D61]">
                      03
                    </h1>
                    <p className="ml-4 text-[14px] text-black font-bold">
                      Seller’s Delivery
                    </p>
                  </div>
                  <p className="ml-12 text-[12px] text-[#615D61]">
                    Seller delivers on their end of <br />
                    the agreement
                  </p>
                </div>
              </div>

              <div className="mb-1 flex justify-center items-center font-space-grotesk">
                <div className=" flex flex-col">
                  <div className="flex items-center">
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#FFF] rounded-full font-bold text-[#615D61]">
                      04
                    </h1>
                    <p className="ml-4 text-[14px] text-black font-bold">
                      Buyer’s Confirmation
                    </p>
                  </div>
                  <p className="ml-12 text-[12px] text-[#615D61]">
                    Buyer reviews and confirms the <br />
                    delivery
                  </p>
                </div>
              </div>

              <div className="mb-1 flex justify-center items-center font-space-grotesk">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#FFF] rounded-full font-bold text-[#615D61]">
                      05
                    </h1>
                    <p className="ml-4 text-[14px] text-black font-bold">
                      Escrow Payout
                    </p>
                  </div>
                  <p className="ml-12 text-[12px] text-[#615D61]">
                    Escrow makes payment to the <br /> seller once confirmation
                    is <br />
                    complete.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="justify-center text-[10px] items-center font-space-grotesk bg-[#FFF] mx-10 rounded-md p-10">
            <div className=" flex items-center">
              <FaQuoteLeft style={style} />
            </div>
            <p className="mt-5 text-[12px] text-[#333333]">
              {` "As a seller, ForteScrow has been a game-changer for me. I no
              longer have to deal with the stress of fraudulent buyers or
              chargebacks. Thanks to ForteScrow, I can focus on growing my
              business without worrying about payment issues."`}
            </p>
            <hr className="mt-5 w-full" />
            <div className="flex w-full mt-2">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716248132/Image_jjq2xo.png"
                width={50}
                className="w-10 h-10 my-2 rounded-full border border-custom-orange"
              />
              <div className="ml-2 my-2">
                <p className="ml-2 text-[12px] font-bold">John Anderson</p>
                <p className="flex ml-2 mt-1 text-[10px]">Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign up */}
      <div className="w-full md:w-[100%] mx-20 my-[70px] font-inter">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-[#333333]">Sign Up</h1>
          <p className="text-sm m-2 text-[#4C4C4C]">
            Join our community today!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mx-auto my-5 w-full md:w-[70%]">
          <div className="flex flex-col md:flex-row mb-5 w-full">
            <div className="flex justify-between w-full md:w-[50%] mr-0 md:mr-10 flex-col">
              <label htmlFor="first-name" className="text-[12px] font-semibold">
                First Name
              </label>
              <input
                type="text"
                className="h-10 border text-[13px] border-gray-300 mt-1 rounded-md p-7 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] focus:shadow-sm focus:shadow-white"
                placeholder="Micha"
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] mt-5 md:mt-0">
              <label
                htmlFor="last-name"
                className="text-[12px] font-semibold text-[#333333]"
              >
                Last Name
              </label>
              <input
                type="text"
                className="h-10 border text-[13px] border-gray-300 mt-1 rounded-md p-7 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] focus:shadow-sm focus:shadow-white"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e: any) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="text-[12px] m-1 font-semibold text-[#333333]"
            >
              Email
            </label>
            <input
              type="email"
              className="h-10 border text-[13px] border-gray-300 mt-1 mb-2 rounded-md p-7 w-full bg-gray-50 focus:outline-none focus:border-[#006877] focus:ring-1 focus:ring-[#006877] focus:shadow-sm focus:shadow-white"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row mb-5 w-full">
            <div className="flex justify-between w-full md:w-[50%] mr-0 md:mr-10 flex-col">
              <label htmlFor="country" className="text-[12px] font-semibold">
                Country
              </label>
              <input
                type="text"
                className="h-10 border text-[13px]  border-gray-300 mt-1 rounded-md p-4 w-full bg-gray-50 focus:outline-none focus:border-[#006877] focus:ring-1 focus:ring-[#006877] focus:shadow-sm focus:shadow-white"
                placeholder="Select Country"
                value={country}
                onChange={(e: any) => setCountry(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] mt-5 md:mt-0">
              <label
                htmlFor="phone-number"
                className="text-[12px] text-[#333333] font-semibold"
              >
                Phone Number
              </label>
              <input
                type="text"
                className="h-10 border text-[13px] mt-1 border-gray-300 rounded-md p-7 w-full bg-gray-50 focus:outline-none focus:border-[#006877] focus:ring-1 focus:ring-[#006877] focus:shadow-sm focus:shadow-white"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e: any) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-5 w-full">
            <div className="flex justify-between w-full md:w-[50%] mr-0 md:mr-10 flex-col">
              <label
                htmlFor="password"
                className="text-[12px] text-black font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                className="h-10 border text-[13px] border-gray-300  mt-1 rounded-md p-7 w-full bg-gray-50 focus:outline-none focus:border-[#006877] focus:ring-1 focus:ring-[#006877] focus:shadow-sm focus:shadow-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full md:w-[50%] mt-5 md:mt-0">
              <label
                htmlFor="confirm-password"
                className="text-[12px] text-[#333333] font-semibold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="h-10 border text-[13px] border-gray-300 mt-1 rounded-md p-4 w-full bg-gray-50 focus:outline-none focus:border-[#006877] focus:ring-1 focus:ring-[#006877] focus:shadow-sm focus:shadow-white"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full mb-5">
            <div className="flex items-center">
              <input type="checkbox" id="terms" name="terms" />
              <p className="text-sm ml-2">
                I agree with <span className="underline">Terms of Use</span> and{' '}
                <span className="underline">Privacy Policy</span>
              </p>
            </div>
          </div>

          <div className="w-full">
            <button
              className="p-3 border w-full items-center bg-custom-gradient text-white rounded-md"
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
              {loading ? `Signing Up...` : `Sign Up`}
            </button>

            <p className="flex justify-end items-center font-inter text-[#4C4C4C] text-sm">
              Already have an account?
              <Link href={'/login'}>
                <span className="flex items-center ml-2 justify-center">
                  Login <GoArrowUpRight className="w-5" />
                </span>
              </Link>
            </p>
          </div>
          <div className="w-full m-3">
            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="mx-4 text-sm text-[#4C4C4C]">OR</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-[50%]">
          <div className="flex items-center align-center justify-center">
            <div className="flex items-center justify-center ml-[160px] p-3 w-[100px] bg-[#F7FAFF] rounded-md">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716163547/googleLogo_knrnzk.png"
                width={50}
                className="w-[30px]"
              />
            </div>
          </div>
          <div className="flex items-center align-center justify-center">
            <div className="flex items-center justify-center ml-[50px] p-3 w-[100px] bg-[#F7FAFF] rounded-md">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716171724/fb_logo_edu1b5.png"
                width={50}
                className="w-[50px]"
              />
            </div>
          </div>

          <div className="flex items-center align-center justify-center">
            <div className="flex items-center justify-center ml-[50px] p-3 w-[100px] bg-[#F7FAFF] rounded-md">
              <img
                src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716172290/twitter_logo_w0bp6d.png"
                width={50}
                className="w-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
