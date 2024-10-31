/* eslint-disable react/no-unescaped-entities */
import { MdKeyboardArrowRight } from 'react-icons/md';

interface BuyerInfoProps {
  onNext: () => void;
}

export function BuyerInfo({ onNext }: BuyerInfoProps) {
  return (
    <div className="flex flex-col p-4 md:p-5 text-center">
      <div className="mt-10">
        <div className="flex flex-col">
          <label htmlFor="role" className="flex justify-start my-2">
            Your Role
          </label>
          <select
            id="role"
            name="role"
            className="w-[50%] py-5 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF] sm:text-sm"
            defaultValue=""
          >
            <option value="" disabled>
              Select one ...
            </option>
            <option value="sender">Sender</option>
            <option value="receiver">Receiver</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-4 py-6">
          <div className="flex flex-col w-full md:w-[48%]">
            <label htmlFor="buyer-name" className="flex flex-start">
              Buyer's Name
            </label>
            <input
              id="buyer-name"
              type="text"
              placeholder="Tom"
              className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-2 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
            />
          </div>
          <div className="flex flex-col w-full md:w-[48%]">
            <label htmlFor="buyer-phone" className="flex flex-start">
              Buyer's Phone Number
            </label>
            <input
              id="buyer-phone"
              type="number"
              placeholder="+124 Enter Phone Number..."
              className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-2 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="buyer-email" className="flex flex-start">
            Buyer's Email Address
          </label>
          <input
            id="buyer-email"
            type="email"
            placeholder="e.g buyer@gmail.com"
            className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-2 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
          />
        </div>

        <div className="flex items-center justify-center w-full mt-10">
          <button
            className="flex items-center justify-center font-bold w-full p-3 text-sm text-white rounded-md bg-custom-gradient"
            onClick={onNext}
          >
            Next <MdKeyboardArrowRight className="ml-1 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
