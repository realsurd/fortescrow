import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { data } from './mock';
import { SelectDropDown } from './selectDropDown';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface FormCompleteProps {
  id: number;
  title: string;
  text: string;
}
interface PersonalFormProps {
  onclick: () => void;
}

export const NextoFKinForm = ({ onclick }: PersonalFormProps) => {
  const FormCompletionCard = ({ id, title, text }: FormCompleteProps) => {
    return (
      <div
        className={id != 2 ? styles.formComplete : styles.formActive}
        key={id}
      >
        <div className={styles.number}>{`0${id}`}</div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{text}</div>
        </div>

        {id == 1 ? (
          <IoCheckmarkCircle className={styles.checked} />
        ) : (
          <IoIosArrowForward className={styles.icon} />
        )}
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
        <div className={styles.headerContainer}>
          <div className={styles.title}>Next of Kin</div>
          <div className={styles.text}>{`Who to contact...`}</div>
        </div>
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label>First Name</label>
            <input type="text" placeholder="Tom" required />
          </div>
          <div className={styles.inputContainer}>
            <label>Last Name</label>
            <input type="text" placeholder="Last Name.." required />
          </div>
          <div className={styles.inputContainer}>
            <label>Gender</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Male', 'Female']}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Relationship with Next of kin</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Mother', 'Father', 'Brother', 'Sister']}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Phone Number</label>
            <input type="number" placeholder="Enter phone number..." />
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
        </div>
        <div className={styles.submit} onClick={onclick}>
          Proceed (2/3)
        </div>
      </div>
    </div>
  );
};
