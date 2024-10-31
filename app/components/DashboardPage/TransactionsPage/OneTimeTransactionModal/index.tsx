/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { BuyerInfo } from './BuyerInfo';
import { TransactionInfo } from './TransactionInfo';

interface Props {
  isActive: boolean;
  onClick: () => void;
  setOpenTransactionTypeModal: (isOpen: boolean) => void;
}

export function OneTimeTransactionModal({
  isActive,
  onClick,
  setOpenTransactionTypeModal,
}: Props) {
  // State to control which step of the form is displayed
  const [showTransactionInfo, setShowTransactionInfo] = useState(false);

  // Handler to move from BuyerInfo to TransactionInfo after validation
  const handleNext = () => {
    const formIsValid = true;
    if (formIsValid) {
      setShowTransactionInfo(true);
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <>
      {isActive && (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative w-[50%] p-5 bg-white rounded-2xl">
            <button
              type="button"
              className="absolute top-3 right-3 w-9 h-9 text-[#BA1A1A] bg-[#FFEDEA] text-sm rounded-full hover:bg-gray-200 hover:text-gray-900 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClick}
              aria-label="Close modal"
            >
              <IoMdClose />
            </button>
            <div className="flex items-center justify-center">
              <h1 className="text-[#006877] font-bold text-[35px]">
                One Time Transaction
              </h1>
            </div>
            <div className="flex justify-between w-full p-5">
              <div className="flex flex-col items-center">
                <span className="flex items-center justify-center w-9 h-9 text-sm text-white bg-[#006877] rounded-full">
                  1
                </span>
                <p className="font-bold">Buyer's Information</p>
              </div>
              <div className="flex flex-col items-center">
                <span
                  className={`flex items-center justify-center w-9 h-9 text-sm text-white rounded-full ${
                    showTransactionInfo ? 'bg-[#006877]' : 'bg-gray-300'
                  }`}
                >
                  2
                </span>
                <p className="font-bold">Transaction Information</p>
              </div>
            </div>
            <hr />
            {showTransactionInfo ? (
              <TransactionInfo />
            ) : (
              <BuyerInfo onNext={handleNext} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
