import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Search, X } from 'react-feather';

import { Form, Input } from './Form';

const SearchIconContainer = styled.div`
  background: transparent;
  padding: 0.5rem;
  position: absolute;
  right: 2rem;
`;

const SearchInput = styled(Input)`
  grid-column: 1 /-1;
`;
const ClearInputVal = styled(X)`
  cursor: pointer;
`;

function SearchBar({ searchTerm = '', handleSearchInput, clearInput }) {
  return (
    <Form top bottom onSubmit={(e) => e.preventDefault()}>
      <SearchInput
        type="text"
        name="search input"
        id="search-input"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchInput}
        onBlur={clearInput}
      />
      <SearchIconContainer>
        {searchTerm.length ? (
          <ClearInputVal onClick={clearInput} />
        ) : (
          <Search />
        )}
      </SearchIconContainer>
    </Form>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  handleSearchInput: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
};

export default memo(
  SearchBar,
  (prevProps, nextProps) => prevProps.searchTerm === nextProps.searchTerm
);
