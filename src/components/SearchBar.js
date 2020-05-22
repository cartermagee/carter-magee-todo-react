import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Search, X } from 'react-feather';
import { Form, Input } from './Form';

const SearchIconContainer = styled.div`
  position: absolute;
  padding: 0.5rem;
  right: 2rem;
  background: transparent;
`;

const SearchInput = styled(Input)`
  grid-column: 1 /-1;
`;

export default function SearchBar({ searchTerm = '', handleSearchInput }) {
  return (
    <Form top bottom>
      <SearchInput
        type="text"
        name="search input"
        id="search-input"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchInput}
      />
      <SearchIconContainer>
        {searchTerm.length ? <X /> : <Search />}
      </SearchIconContainer>
    </Form>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  handleSearchInput: PropTypes.func,
};
