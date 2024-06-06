import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { data } from './mock';
import { SelectDropDown } from './selectDropDown';

interface FormCompleteProps {
  id: number;
  title: string;
  text: string;
}
interface PersonalFormProps {
  onclick: () => void;
}

export const PersonalForm = ({ onclick }: PersonalFormProps) => {
  const FormCompletionCard = ({ id, title, text }: FormCompleteProps) => {
    return (
      <div
        className={id != 1 ? styles.formComplete : styles.formActive}
        key={id}
      >
        <div className={styles.number}>{`0${id}`}</div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{text}</div>
        </div>
        <IoIosArrowForward className={styles.icon} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Link href={'/'} className={styles.heading}>
          ForteScrow
        </Link>
        <div className={styles.completionCards}>
          {data.map((item) => (
            <FormCompletionCard
              id={item.id}
              title={item.title}
              text={item.text}
              key={item.id}
            />
          ))}
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.skip} onClick={onclick}>
          Skip
        </div>
        <div className={styles.headerContainer}>
          <div className={styles.title}>Personal Information</div>
          <div className={styles.text}>
            {`Let’s get to know you, it’s the whole point of KYC 😏`}
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label>Full Name</label>
            <input type="text" placeholder="Micah Tom" required />
          </div>
          <div className={styles.inputContainer}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address..."
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Gender</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Male', 'Female']}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Date of Birth</label>
            <input type="date" />
          </div>
          <div className={styles.inputContainer}>
            <label>Country</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Algeria', 'Nigeria', 'Tinusia']}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>State of Residence</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Abuja', 'Lagos', 'Imo', 'Nigeria', 'Tinusia']}
            />
          </div>
          <div className={styles.inputLongest}>
            <label>Home Address</label>
            <input type="text" placeholder="House ABC, No 123..." required />
          </div>
          <div className={styles.inputContainer}>
            <label>Means of Identification</label>
            <input type="text" />
          </div>
          <div className={styles.inputContainer}>
            <label>National Identification Number (NIN)</label>
            <input type="number" placeholder="Enter phone number..." />
          </div>
        </div>
        <div className={styles.submit} onClick={onclick}>
          Proceed (1/3)
        </div>
      </div>
    </div>
  );
};
