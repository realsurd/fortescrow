import { useState } from 'react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { data } from './mock';
import { SelectDropDown } from './selectDropDown';
import { PersonalForm } from './personalForm';
import { NextoFKinForm } from './nextOfKinForm';
import { SettlementForm } from './SettlementForm';

export function KYCForm() {
  const { width } = useWindowDimensions();
  const [firstFormCompleted, setFirstFormCompleted] = useState(false);
  const [secondFormCompleted, setSecondFormCompleted] = useState(false);
  const isMobile = width ? width < 768 : false;

  const toggleFirstFormFilled = () => {
    setFirstFormCompleted(true);
  };

  const toggleSecondFormFilled = () => {
    setFirstFormCompleted(false);
    setSecondFormCompleted(true);
  };

  if (firstFormCompleted) {
    return <NextoFKinForm onclick={toggleSecondFormFilled} />;
  } else if (secondFormCompleted) {
    return <SettlementForm />;
  } else {
    return <PersonalForm onclick={toggleFirstFormFilled} />;
  }
}
