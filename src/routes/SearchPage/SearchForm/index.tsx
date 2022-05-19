import { ChangeEvent, FormEvent, KeyboardEvent, useState } from 'react';

import { SearchIcon } from 'assets/svgs';
import { useAppDispatch, useAppSelector } from 'hooks';
import { searchIndexActions, getSearchIndex } from 'states/searchIndex';
import { searchValueActions, getSearchValue } from 'states/searchValue';
import { IItem } from 'types/disease.d';

import styles from './SearchForm.module.scss';

interface IProps {
  data: IItem[];
}

const SearchForm = ({ data }: IProps) => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(getSearchValue);
  const searchIndex = useAppSelector(getSearchIndex);

  const [test, setTest] = useState<boolean>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (test) return;

    dispatch(searchValueActions.setSearchValue(e.currentTarget.value));
    dispatch(searchIndexActions.resetIndex());
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      dispatch(searchIndexActions.decreaseIndex(data.length));
      setTest(true);
    }
    if (e.key === 'ArrowDown') {
      dispatch(searchIndexActions.increaseIndex(data.length));
      setTest(true);
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
      setTest(false);
    }
  };

  const selectedValue = searchIndex !== -1 && searchValue && data.length ? data[searchIndex].sickNm : searchValue;

  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
      <div className={styles.searchInput}>
        <SearchIcon />
        <input
          type='text'
          placeholder='질환명을 입력해주세요'
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={selectedValue}
        />
      </div>
      <button type='submit'>검색</button>
    </form>
  );
};

export default SearchForm;
