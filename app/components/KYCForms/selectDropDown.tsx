import styles from './index.module.scss';
import { MdArrowDropDown } from 'react-icons/md';
import { useState } from 'react';

interface SelectProps {
  placeholder: string;
  options: string[];
}

export const SelectDropDown = ({ placeholder, options }: SelectProps) => {
  const [dropDownActive, setDropDownActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);

  return (
    <div className={styles.selectContainer}>
      <div
        className={dropDownActive ? styles.activeSelect : styles.selectInput}
      >
        {selectedValue}
        <MdArrowDropDown
          className={styles.icon}
          onClick={() => setDropDownActive(!dropDownActive)}
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
