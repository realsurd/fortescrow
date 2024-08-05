import styles from './index.module.scss';
import { MdArrowDropDown } from 'react-icons/md';
import { useEffect, useState } from 'react';

interface SelectProps {
  placeholder: string;
  options: string[];
  value?: any;
  onChange?: (val:string) => any;
}

export const SelectDropDown = ({
  placeholder,
  options,
  value,
  onChange = () => null,
}: SelectProps) => {
  const [dropDownActive, setDropDownActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);
  
  return (
    <div className={styles.selectContainer}>
      <div
        className={dropDownActive ? styles.activeSelect : styles.selectInput}
        onClick={() => setDropDownActive(!dropDownActive)}
      >
        {selectedValue}
        <MdArrowDropDown
          className={styles.icon}
        />
      </div>
      {dropDownActive && (
        <div className={styles.options}>
          <option
            value={placeholder}
            onClick={() => {
              setSelectedValue(placeholder);
              setDropDownActive(!dropDownActive);
            }}
          >
            {placeholder}
          </option>
          {options.map((item, index) => (
            <option
              key={index}
              value={item}
              onClick={() => {
                setSelectedValue(item);
                setDropDownActive(!dropDownActive);
                onChange(item)
              }}
            >
              {item}
            </option>
          ))}
        </div>
      )}
    </div>
  );
};
