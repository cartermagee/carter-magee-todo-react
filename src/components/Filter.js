import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Plus, X } from 'react-feather';
import {
  textColor,
  inputBackground,
  tagBackground,
} from '../style-utils/theme';
import ColorIndicator from './colors/ColorIndicator';

const FiltersContainer = styled.div`
  background: ${inputBackground};
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 4;
`;

const FilterControlsContainer = styled.div`
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.4);
  color: ${textColor};
  display: grid;
  grid-template-columns: 5fr 1fr;
  height: 30px;
  justify-items: start;
  width: 100%;
`;
const TabContainer = styled.div`
  align-items: center;
  background: ${inputBackground};
  border-bottom: 1px solid rgba(100, 100, 100, 0.4);
  display: flex;
  height: 30px;
  justify-content: space-around;
  margin: 0 3px;
  padding: 2px;
  &.active {
    border-radius: 5px 5px 0 0;
    border-top: 1px solid rgba(100, 100, 100, 0.4);
    border-right: 1px solid rgba(100, 100, 100, 0.4);
    border-bottom: none;
    border-left: 1px solid rgba(100, 100, 100, 0.4);
  }
`;

const FilterToggleBtn = styled.button.attrs({
  type: 'button',
})`
  align-items: center;
  background: inherit;
  color: inherit;
  display: flex;
  justify-content: space-around;
  width: fit-content;
  z-index: 4;
`;
const MainToggle = styled(FilterToggleBtn)`
  justify-self: center;
`;

const FilterSelectorContainer = styled.div`
  border-bottom: 1px solid rgba(100, 100, 100, 0.4);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-column: 1 /-1;
  max-height: 80px;
  padding: 3px 0;
  overflow-y: scroll;
  width: 100%;
`;

const TagSelector = styled.button.attrs({
  type: 'button',
})`
  align-items: center;
  background: ${tagBackground};
  border-radius: 50px;
  color: #fff;
  display: flex;
  justify-content: center;
  margin: 3px;
  max-width: 100px;
  padding: 1px 5px;
`;

const TagName = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Options = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const NoneSelected = styled.div`
  align-items: center;
  border: 1px solid ${textColor};
  border-radius: 5px;
  display: flex;
  font-size: 10px;
  height: 20px;
  justify-content: center;
  margin: 0 3px;
`;
const ClearBtn = styled.button.attrs({
  type: 'button',
})`
  background: none;
  color: ${textColor};
  font-size: 10px;
  height: 20px;
  width: 30px;
`;

function Filter({
  tags,
  colors,
  filterByColor,
  filterByTags,
  clearAllFilters,
}) {
  const [open, setOpen] = useState(false);
  const [openColors, setOpenColors] = useState(true);
  const [openTags, setOpenTags] = useState(false);
  const [selectedColor, setSelectedColor] = useState('none');
  const [selectedTags, setSelectedTags] = useState([]);
  const [unSelectedTags, setUnSelectedTags] = useState([]);

  useEffect(() => {
    setUnSelectedTags(tags.filter((tag) => !selectedTags.includes(tag)));
    return () => {
      setUnSelectedTags([]);
    };
  }, [selectedTags, tags]);

  const toggleOpen = () => {
    if (selectedColor !== 'none' || selectedTags) clearAllFilters();
    setOpen(!open);
  };

  const showColors = () => {
    if (openTags) setOpenTags(false);
    setOpenColors(true);
  };

  const showTags = () => {
    if (openColors) setOpenColors(false);
    setOpenTags(true);
  };

  const handleTagSelect = (selectedTag) => {
    const filterTags = [...selectedTags, selectedTag];
    setSelectedTags(filterTags);
    filterByTags(filterTags);
  };

  const handleRemoveTagFilter = (selectedTag) => {
    const filterTags = [...selectedTags].filter((tag) => tag !== selectedTag);

    setSelectedTags(filterTags);
    filterByTags(filterTags);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    filterByColor(color);
  };

  const handleClearColor = () => {
    setSelectedColor('none');
    clearAllFilters();
  };

  const handleClearTags = () => {
    setSelectedTags([]);
    setUnSelectedTags(tags);
    clearAllFilters();
  };

  return (
    <FiltersContainer>
      <FilterControlsContainer>
        <Options>
          {open && (
            <TabContainer className={openColors && 'active'}>
              <FilterToggleBtn onClick={showColors}>
                <p>Color</p>
              </FilterToggleBtn>
              {openColors && (
                <Options>
                  {selectedColor === 'none' ? (
                    <NoneSelected>(none)</NoneSelected>
                  ) : (
                    <ColorIndicator color={selectedColor} />
                  )}
                  <ClearBtn onClick={handleClearColor}>clear</ClearBtn>
                </Options>
              )}
            </TabContainer>
          )}
          {open && (
            <TabContainer className={openTags && 'active'}>
              <FilterToggleBtn
                className={openTags && 'active'}
                onClick={showTags}
              >
                <p>Tags</p>
              </FilterToggleBtn>
              {openTags && (
                <Options>
                  {selectedTags.map((tag) => (
                    <TagSelector
                      key={tag}
                      onClick={() => handleRemoveTagFilter(tag)}
                    >
                      <TagName>{tag}</TagName>
                      <X width={16} />
                    </TagSelector>
                  ))}
                  <ClearBtn onClick={handleClearTags}>clear</ClearBtn>
                </Options>
              )}
            </TabContainer>
          )}
        </Options>
        <MainToggle onClick={toggleOpen}>
          <p>Filters</p>
          {/* <FilterIcon /> */}
        </MainToggle>
      </FilterControlsContainer>
      {open && (
        <FilterSelectorContainer>
          {openColors && (
            <>
              {colors.map((color) => (
                <ColorIndicator
                  filter
                  key={color}
                  color={color}
                  handleColorSelect={handleColorSelect}
                />
              ))}
              <ColorIndicator
                filter
                color=""
                handleColorSelect={handleColorSelect}
              />
              <ClearBtn onClick={handleClearColor}>clear</ClearBtn>
            </>
          )}
          {openTags &&
            unSelectedTags.map((tag) => (
              <TagSelector key={tag} onClick={() => handleTagSelect(tag)}>
                <TagName>{tag}</TagName>
                <Plus width={16} />
              </TagSelector>
            ))}
        </FilterSelectorContainer>
      )}
    </FiltersContainer>
  );
}

Filter.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  filterByColor: PropTypes.func.isRequired,
  filterByTags: PropTypes.func.isRequired,
  clearAllFilters: PropTypes.func.isRequired,
};

export default Filter;
