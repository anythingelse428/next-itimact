import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from '../styles/toggle-switch/ToggleSwitch.module.css';
export default function ToggleSwitch({
  handleClick,
  checkedIco,
  uncheckedIco,
  value,
}) {
  const [isChecked, setIsChecked] = useState(value || false);
  useEffect(() => {
    handleClick(isChecked);
  }, [isChecked]);
  return (
    <div className={styles['toggle-switch']}>
      <input
        className={styles['toggle-switch__input']}
        type='checkbox'
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}
      />
      <span className={styles['toggle-switch__thumb']}>
        <div className={`${styles['--unchecked']} ${styles['thumb-ico']}`}>
          <FontAwesomeIcon icon={uncheckedIco} fontSize={20} color='#dbbaa0' />
        </div>
        <div className={`${styles['--checked']} ${styles['thumb-ico']}`}>
          <FontAwesomeIcon icon={checkedIco} fontSize={20} color='#a0bbdb' />
        </div>
      </span>
    </div>
  );
}
