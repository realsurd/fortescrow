import { MdKeyboardArrowRight } from 'react-icons/md';

export function TransactionInfo() {
  return (
    <div className="flex flex-col p-4 md:p-5 text-center">
      <div className="mt-2">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col w-[45%]">
            <label htmlFor="role" className="flex justify-start">
              Item to be sold
            </label>
            <input
              id="buyer-name"
              type="text"
              placeholder="Item"
              className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-3 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
            />
          </div>

          <div className="w-[10%]">
            <label htmlFor="buyer-phone" className="flex flex-start">
              Quantity
            </label>
            <input
              id="buyer-phone"
              type="number"
              placeholder="2"
              className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-3 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
            />
          </div>
          <div className="flex flex-col w-[45%]">
            <label htmlFor="buyer-phone" className="flex flex-start">
              Total Cost
            </label>
            <input
              id="buyer-phone"
              type="number"
              placeholder="NGN 0.00"
              className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-3 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
            />
            <p className="flex justify-end text-[#28A745] text-[13px]">
              Balance: 808,273.00
            </p>
          </div>
        </div>

        <div className=" w-full">
          <label htmlFor="buyer-name" className="flex flex-start">
            Product Link (optional)
          </label>
          <input
            id="product-link"
            type="text"
            placeholder="Input Link"
            className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-3 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
          />
        </div>

        <div className="flex flex-wrap gap-4 py-6">
          <div className="w-full md:w-[48%]">
            <label htmlFor="start-date" className="flex flex-start">
              Start Date
            </label>
            <input
              id="Start Date"
              type="date"
              placeholder="Select One"
              className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-3 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
            />
          </div>
          <div className="w-full md:w-[48%]">
            <label htmlFor="end-date" className="flex flex-start">
              End Date
            </label>
            <input
              id="End Date"
              type="date"
              placeholder="Select One"
              className="border text-[13px] border-gray-300 mt-1 mb-2 rounded-md py-3 px-3 w-full bg-gray-50 focus:outline-none focus:border-[#A4EEFF] focus:ring-1 focus:ring-[#A4EEFF]"
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="buyer-email" className="flex flex-start">
            Describe the expected item (Color, Shape, Size)
          </label>
          <textarea
            name="Item  Description"
            placeholder="Description..."
            className="flex flex-start rounded-md w-full "
          ></textarea>
        </div>

        <div className="flex items-center justify-center w-full mt-10">
          <button className="flex items-center justify-center font-bold w-full p-3 text-sm text-white rounded-md bg-custom-gradient">
            Create New Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
