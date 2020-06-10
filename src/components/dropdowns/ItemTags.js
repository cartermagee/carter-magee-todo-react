import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ChevronUp, Plus } from 'react-feather';

import { textColor, inputBackground } from '../../style-utils/theme';
import Tag from '../Tag';

const MainContainer = styled.div`
  background: ${inputBackground};
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  border-top: 1px solid rgba(100, 100, 100, 0.2);
  color: ${textColor};
  justify-items: center;
  width: 100%;
  will-change: height, opacity;
  z-index: 4;
`;

const CloseBtn = styled.button.attrs({
  type: 'button',
})`
  background: none;
  color: ${textColor};
  grid-column: 3;
  height: 25px;
  width: 25px;
`;
const TitleContainer = styled.div`
  align-items: center;
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: 1fr 4fr 1fr;
  justify-items: center;
  width: 100%;
`;
const Title = styled.title`
  border-bottom: 1px solid;
  display: grid;
  font-size: 1rem;
  grid-column: 2;
  padding-bottom: 5px;
  text-align: center;
  width: 75%;
`;

const Expander = styled.div`
  align-items: center;
  background: ${inputBackground};
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  border-top: 1px solid rgba(100, 100, 100, 0.2);
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const ExpandBtn = styled.button`
  background: transparent;
  color: inherit;
`;
function ItemTags({
  open = false,
  itemTags = [],
  tags = [],
  toggle,
  confirmUpdateTagName,
  handleAssign,
  handleRemoveAttribute,
  history,
}) {
  const [unusedTags, setUnusedTags] = useState([]);

  useEffect(() => {
    setUnusedTags(tags.filter((tag) => !itemTags.includes(tag)));
    return () => {
      setUnusedTags([]);
    };
  }, [itemTags, tags]);

  return (
    <>
      {open && (
        <MainContainer>
          <TitleContainer>
            <Title>Tags</Title>
            <CloseBtn onClick={toggle}>
              <ChevronUp />
            </CloseBtn>
          </TitleContainer>
          <Expander>
            {itemTags.map((tagName) => (
              <Tag
                assigned
                small
                key={tagName}
                tagName={tagName}
                confirmUpdateTagName={confirmUpdateTagName}
                handleRemoveAttribute={handleRemoveAttribute}
              />
            ))}
            <ExpandBtn onClick={() => history.push('tags')}>
              <Plus />
            </ExpandBtn>
          </Expander>
          <TitleContainer>
            <Title>add more tags</Title>
          </TitleContainer>
          <Expander>
            {unusedTags.map((tagName) => (
              <Tag
                small
                key={tagName}
                tagName={tagName}
                handleAssign={handleAssign}
                handleRemoveAttribute={handleRemoveAttribute}
              />
            ))}
          </Expander>
        </MainContainer>
      )}
    </>
  );
}

ItemTags.propTypes = {
  open: PropTypes.bool.isRequired,
  itemTags: PropTypes.arrayOf(PropTypes.string),
  tags: PropTypes.arrayOf(PropTypes.string),
  toggle: PropTypes.func.isRequired,
  confirmUpdateTagName: PropTypes.func.isRequired,
  handleAssign: PropTypes.func.isRequired,
  handleRemoveAttribute: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default withRouter(ItemTags);
