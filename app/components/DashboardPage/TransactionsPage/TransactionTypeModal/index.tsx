import React from 'react';
import { IoMdClose } from 'react-icons/io';

interface Props {
  isActive: boolean;
  onClick: () => void;
  setOpenTransactionTypeModal: () => void;
}

export function TransactionTypeModal({
  isActive,
  onClick,
  setOpenTransactionTypeModal,
}: Props) {
  return (
    <>
      {isActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClick}
            >
              <IoMdClose />
            </button>
            <div className="p-4 md:p-5 text-center">
              <h1 className="text-[#714BA4]">Transaction Type</h1>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Create a transaction for...
              </h3>
              <button
                onClick={setOpenTransactionTypeModal}
                type="button"
                className="bg-[#F8EDFF] pt-[100px] m-2 pb-3 px-10 text-[#714BA4] font-medium rounded-lg text-sm inline-flex items-center text-center"
              >
                One Time
              </button>
              <button
                onClick={onClick}
                type="button"
                className="bg-[#FFEFCF] pt-[100px] m-2 pb-3 px-10 text-[#755B00] font-medium rounded-lg text-sm inline-flex items-center text-center"
              >
                Milestone
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
