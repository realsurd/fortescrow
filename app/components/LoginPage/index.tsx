import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { GoArrowUpRight } from 'react-icons/go';
import { FaQuoteLeft } from 'react-icons/fa';
import '../../../styles/main.css';
import Link from 'next/link';
import { useState } from 'react';
import { useNotify } from '@/hooks';
import { useRouter } from 'next/router';
import { useLoginActions } from '@/features/login/actions/login.action';
import { ThreeDots } from 'react-loader-spinner';

export function LoginPage() {
  const { width } = useWindowDimensions();
  const isMobile = width ? width < 768 : false;
  const { push } = useRouter();

  const style = {
    color: '#E5EFFF',
    fontSize: '3em',
  };

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { signInUser } = useLoginActions();

  const { notify } = useNotify();

  const isEmpty = !email || !password ? true : false;

  const handleSubmit = async () => {
    setLoading(true);

    if (isEmpty) {
      notify.error('Fill all details');
      setLoading(false);
      return;
    }

    const loginData = {
      email,
      password,
    };

    console.log(loginData);

    //send the data to the api endpoint
    const response = await signInUser(loginData);

    if(response.error){
      notify.error('Invalid Login Credentials');
      setLoading(false);
      return;
    } else {
      setLoading(false);
      //clear off the input fields
      setEmail('');
      setPassword('');
      //success notification
      notify.success('User successfully signed in.');
      //pushes user to the next page
      push('/personalform');
    }
  };

  return (
    <div className="flex justify-between font-space-grotesk items-start w-full h-[100vh] mb-10 overflow-y-auto">
      <div className="hidden md:block w-[45%] min-h-[100vh] bg-cover bg-center relative">
        <Link href={'/'}>
          <h1 className="text-center m-3 flex bg-white justify-center items-center font-bold text-[#006877]">
            ForteScrow
          </h1>
        </Link>

        <div className="bg-diagonal-gradient w-full min-h-[100vh]">
          <img
            src="https://res.cloudinary.com/dlinprg6k/image/upload/v1715559930/fort-background_jyso4x.jpg"
            alt="Background"
            className="w-full h-screen object-cover absolute opacity-20"
          />
          <div className="flex w-full">
            <div className="flex flex-col justify-start items-start w-full mt-2 mr-5 mb-2 ml-5 p-3 leading-3">
              <div className="mb-1 flex justify-center items-center font-space-grotesk">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#f5f5f5] rounded-full font-bold text-[#615D61]">
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
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#F5F5F5] rounded-full font-bold text-[#615D61]">
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
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#F5F5F5] rounded-full font-bold text-[#615D61]">
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
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#F5F5F5] rounded-full font-bold text-[#615D61]">
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
                    <h1 className="w-8 h-8 flex justify-center text-sm items-center bg-[#F5F5F5] rounded-full font-bold text-[#615D61]">
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
              {`"As a seller, ForteScrow has been a game-changer for me. I no
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

      {/* Login */}
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
          <div className="flex flex-col justify-center items-center text-center my-5 md:my-0">
            <h1 className="font-bold font-space-grotesk text-3xl text-[#006877] md:text-[#333333]">
              Login
            </h1>
            <p className="text-sm font-avenir w-[250px] md:w-full text-center m-2 text-[#4C4C4C]">
              Welcome back! Please log in to access your account.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center mx-auto my-5 md:w-[70%]">
            <div className="flex flex-col w-full mb-2">
              <label
                htmlFor="email"
                className="text-[15px] m-1 text-[#333333] font-bold "
              >
                Email
              </label>
              <input
                type="email"
                className="h-10 border text-[13px] border-gray-300 mt-1 rounded-lg p-9 md:p-7 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] focus:shadow-sm focus:shadow-white"
                placeholder="Userexample@gmail.com"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col mb-5 w-full">
              <div className="flex justify-between w-full md:w-full mr-0 md:mr-10 flex-col">
                <label
                  htmlFor="password"
                  className="text-[15px] text-black font-bold "
                >
                  Password
                </label>
                <input
                  type="password"
                  className="h-10 border text-[13px] border-gray-300 mt-1 rounded-lg p-9 md:p-7 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] focus:shadow-sm focus:shadow-white"
                  placeholder="Enter your password"
                />
                <p className="flex justify-end items-end font-inter text-[#4C4C4C] text-sm  my-2">
                  Forgot Password?
                </p>
              </div>
            </div>

            <div className="w-full mb-5">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  className="p-4 rounded-md bg-white border-[#FFDAD6] shadow-sm"
                />
                <p className="text-sm ml-2">Remember me</p>
              </div>
            </div>

            <div className="w-full">
              <button className="p-5 border w-full items-center bg-custom-gradient text-white rounded-md">
                Login
              </button>
              <p className="flex justify-end items-center font-inter text-[#4C4C4C] text-sm mt-3">
                {`Don't have an account?`}
                <Link href={'/signup'}>
                  <span className="flex items-center ml-2 justify-center">
                    Sign Up <GoArrowUpRight className="w-5" />
                  </span>
                </Link>
              </p>
            </div>
            <div className="w-full m-3">
              <div className="my-5 flex items-center">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="mx-4 text-sm text-[#4C4C4C]">OR</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center  mx-[50px] md:w-[50%] md:mx-[300px]">
            <div className="flex items-center align-center justify-between">
              <div className="flex items-center justify-center p-4 mr-5 bg-[#F7FAFF] rounded-md">
                <img
                  src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716163547/googleLogo_knrnzk.png"
                  width={80}
                  className="w-[40px] md:w-[40px]"
                />
              </div>

              <div className="flex items-center align-center justify-center">
                <div className="flex items-center justify-center p-4 mr-5 bg-[#F7FAFF] rounded-md">
                  <img
                    src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716171724/fb_logo_edu1b5.png"
                    width={80}
                    className="w-[70px] md:w-[70px]"
                  />
                </div>
              </div>

              <div className="flex items-center align-center justify-center">
                <div className="flex items-center justify-center p-4  bg-[#F7FAFF] rounded-md">
                  <img
                    src="https://res.cloudinary.com/dlinprg6k/image/upload/v1716172290/twitter_logo_w0bp6d.png"
                    width={80}
                    className="w-[70px] md:w-[70px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
