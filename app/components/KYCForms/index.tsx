import { useState } from 'react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import styles from './index.module.scss';
import Link from 'next/link';
import { PersonalForm } from './personalForm';
import { NextoFKinForm } from './nextOfKinForm';
import { SettlementForm } from './SettlementForm';

export function KYCForm() {
  const { width } = useWindowDimensions();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [firstFormCompleted, setFirstFormCompleted] = useState(false);
  const [secondFormCompleted, setSecondFormCompleted] = useState(false);
  const isMobile = width ? width < 768 : false;

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleStepOneChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const handleStepTwoChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const handleStepThreeChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const toggleFirstFormFilled = () => {
    setFirstFormCompleted(true);
  };

  const toggleSecondFormFilled = () => {
    setFirstFormCompleted(false);
    setSecondFormCompleted(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Submit form data to API or handle it as needed
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalForm onSubmit={handleStepOneChange} onclick={nextStep} />
        );
      case 2:
        return <NextoFKinForm onSubmit={nextStep} />;
      case 3:
        return <SettlementForm />;
      default:
        return (
          <PersonalForm onSubmit={handleStepOneChange} onclick={nextStep} />
        );
    }
  };

  return <>{renderStep()}</>;
}
