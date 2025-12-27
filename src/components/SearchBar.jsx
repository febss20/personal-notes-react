import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext.jsx';



function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { t } = useLanguage();

  const onSearchHandler = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchParams({ keyword: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={t('search.placeholder')}
        value={keyword}
        onChange={onSearchHandler}
      />
    </div>
  );
}

export default SearchBar;