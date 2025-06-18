import { FC, ChangeEvent } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar: FC<Props> = ({ value, onChange }) => {
  return (
    <div className={clsx(styles.searchBar)}>
      <input
        type="text"
        placeholder="Поиск по задачам"
        className={clsx(styles.input)}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
