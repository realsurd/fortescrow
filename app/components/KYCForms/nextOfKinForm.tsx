import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { data } from './mock';
import { SelectDropDown } from './selectDropDown';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface FormCompleteProps {
  id: number;
  title: string;
  text: string;
}
interface FormProps {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  phone: string;
  relationship: string;
  state: string;
  homeAddress: string;
}

const initialState: FormProps = {
  firstName: '',
  lastName: '',
  relationship: '',
  gender: 'Male',
  phone: '',
  state: '',
  homeAddress: '',
};

export const NextoFKinForm = () => {
  const [gender, setGender] = useState('select one');
  const [relationship, setRelationship] = useState('select one');
  const [state, setState] = useState('select one');

  const router = useRouter();
  const [personalForm, setPersonalForm] = useState<FormProps>(initialState);
  const handleOnChange = (e: any) => {
    setPersonalForm({ ...personalForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      personalForm.firstName ||
      personalForm.lastName ||
      personalForm.phone ||
      personalForm.gender ||
      personalForm.homeAddress ||
      personalForm.state != ''
    ) {
      console.log('data successfully subitted');
      router.push('/bankform');
    }
  };
  const next = () => {
    router.push('/bankform');
    console.log({
      firstName: personalForm.firstName,
      lastName: personalForm.lastName,
      relationship,
      gender,
      state,
      phone: personalForm.phone,
      address: personalForm.homeAddress,
    });
  };
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
            <input
              type="text"
              placeholder="Tom"
              required
              name={'firstName'}
              value={personalForm.firstName}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name.."
              name={'lastName'}
              value={personalForm.lastName}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Gender</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Male', 'Female']}
              value={gender}
              onChange={(val) => setGender(val)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Relationship with Next of kin</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Mother', 'Father', 'Brother', 'Sister']}
              value={relationship}
              onChange={(val) => setRelationship(val)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="Enter phone number..."
              name={'phone'}
              value={personalForm.phone}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>State of Residence</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Abuja', 'Lagos', 'Imo', 'Nigeria', 'Tinusia']}
              value={state}
              onChange={(val) => setState(val)}
            />
          </div>
          <div className={styles.inputLongest}>
            <label>Home Address</label>
            <input
              type="text"
              placeholder="House ABC, No 123..."
              name={'homeAddress'}
              value={personalForm.homeAddress}
              onChange={handleOnChange}
              required
            />
          </div>
        </div>
        <div className={styles.submit} onClick={next}>
          Proceed (2/3)
        </div>
      </div>
    </div>
  );
};
