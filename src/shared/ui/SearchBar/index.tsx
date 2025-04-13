import React from "react";
import styles from './index.module.scss';

export const SearchBar: React.FC = () => {
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Поиск по задачам"
                className={styles.input}
            />
        </div>
    );
};