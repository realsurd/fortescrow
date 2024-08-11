import styles from './index.module.scss';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { data } from './mock';
import { SelectDropDown } from './selectDropDown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useNotify } from '@/hooks';
import { useKYCActions } from '@/features/kyc/actions/kyc.action';

interface FormCompleteProps {
  id: number;
  title: string;
  text: string;
}
interface FormProps {
  nin: number;
  fullName: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  country: string;
  state: string;
  homeAddress: string;
}

interface CountriesProps{
  id: number;
  name: string;
  code: string;
  phone_code: string;
}

const initialState: FormProps = {
  nin: 0,
  fullName: '',
  email: '',
  gender: 'Select one',
  dateOfBirth: '',
  country: '',
  state: '',
  homeAddress: '',
};

export const PersonalForm = () => {
  const router = useRouter();
  const [personalForm, setPersonalForm] = useState<FormProps>(initialState);
  const [gender, setGender] = useState('Select one');
  const [country, setCountry] = useState('Select one');
  const[countries, setCountries] = useState<CountriesProps[]>([]);
  const [state, setState] = useState('Select one');
  const [MeansOfId, setMeansOfId] = useState('Select one');
  const {notify} = useNotify();
  const {getCountries} = useKYCActions();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e: any) => {
    setPersonalForm({ ...personalForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      personalForm.nin ||
      personalForm.dateOfBirth ||
      personalForm.email ||
      personalForm.fullName ||
      personalForm.homeAddress ||
      personalForm.state != '' && gender || country || state || MeansOfId != 'select one'
    ) {
      
      console.log('data successfully subitted');
      notify.success('data successfully subitted')
      console.log({fullName: personalForm.fullName, email: personalForm.email, address: personalForm.homeAddress, dob: personalForm.dateOfBirth, gender, state, country, MeansOfId, nin: personalForm.nin});
      router.push('/nextofkin');
    }else{
      notify.error('fill all details')
    }
  };

  const fetchCountries = async () => {
    setLoading(true);

    const response = await getCountries();

    if(response?.error){
      setLoading(true);
      notify.error('Error fetching countires, check your network');
    }else{
      setLoading(false);
      setCountries(response);
    }
  }

  console.log(countries)
  const next =()=>{
    router.push('/nextofkin');
    console.log({fullName: personalForm.fullName, email: personalForm.email, address: personalForm.homeAddress, dob: personalForm.dateOfBirth, gender, state, country, MeansOfId, nin: personalForm.nin});
  }

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
  const countriesNames = countries?.map(obj => obj.name);
  console.log(countriesNames);

  const countryId = [...countries]?.filter((obj)=> obj.name === country);
  const [countryObj] = [...countryId]
  console.log(countryId);
  console.log(countryObj?.id);

  useEffect(()=>{
    fetchCountries();
  },[])
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
        <div className={styles.skip} onClick={() => router.push('/dashboard')}>
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
            <input
              type="text"
              placeholder="Micah Tom"
              required
              name={'fullName'}
              value={personalForm.fullName}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              name={'email'}
              value={personalForm.email}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Gender</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Male', 'Female']}
              value={gender}
              onChange={(val)=> setGender(val)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Date of Birth</label>
            <input
              type="date"
              name={'dateOfBirth'}
              value={personalForm.dateOfBirth}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Country</label>
            <SelectDropDown
              placeholder="Select one.."
              options={countriesNames}
              value={country}
              onChange={(val)=> setCountry(val)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>State of Residence</label>
            <SelectDropDown
              placeholder="Select one.."
              options={['Abuja', 'Lagos', 'Imo', 'Nigeria', 'Tinusia']}
              value={state}
              onChange={(val)=> setState(val)}
            />
          </div>
          <div className={styles.inputLongest}>
            <label>Home Address</label>
            <input
              type="text"
              placeholder="House ABC, No 123..."
              required
              name={'homeAddress'}
              value={personalForm.homeAddress}
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Means of Identification</label>
            <SelectDropDown
              placeholder="Select one"
              options={['NIN', 'Passport']}
              value={MeansOfId}
              onChange={(val)=> setMeansOfId(val)}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>National Identification Number (NIN)</label>
            <input
              type="number"
              placeholder="Enter phone number..."
              name={'nin'}
              value={personalForm.nin}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className={styles.submit} onClick={next}>
          Proceed (1/3)
        </div>
      </div>
    </div>
  );
};
