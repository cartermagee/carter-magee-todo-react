import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { Plus, X } from 'react-feather';

import Editable from './Editable';

import { tagBackground } from '../style-utils/theme';

const TagContainer = styled(animated.span)`
  align-items: center;
  background: ${tagBackground};
  border-radius: 50px;
  color: #fff;
  display: grid;
  font-size: ${({ small }) => (small ? '14px' : 'inherit')};
  grid-template-columns: auto 1fr;
  height: fit-content;
  justify-items: center;
  margin: 5px;
  max-width: calc(100% / 3.5);
  min-width: 128px;
  padding: 3px 3px 3px 8px;
  & span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & svg {
    height: ${({ small }) => (small ? '14px' : '20px')};
    width: ${({ small }) => (small ? '14px' : '20px')};
  }
`;
const TagButton = styled.button.attrs({
  type: 'button',
})`
  background: none;
  color: inherit;
  display: grid;
  justify-items: center;
  justify-self: end;
  margin: auto 0;
`;

export default function Tag({
  add = false,
  assigned = false,
  cancelEditing = false,
  small = false,
  tagName = '' || null,
  addNewAttribute,
  confirmUpdateTagName,
  confirmDeleteAttribute,
  toggleNewEmptyTag,
  handleAssign,
  animatedStyle,
  handleRemoveAttribute,
}) {
  const handleDelete = () => {
    if (small) return handleRemoveAttribute(tagName, 'tags');
    confirmDeleteAttribute(tagName, 'tags');
  };

  return (
    <TagContainer style={animatedStyle} small={small ? 1 : 0}>
      <Editable
        add={add}
        cancelEditing={cancelEditing}
        small={small}
        text={tagName}
        type="tags"
        addNewAttribute={addNewAttribute}
        updateFunction={confirmUpdateTagName}
        toggleNewEmptyTag={toggleNewEmptyTag}
      />
      <TagButton small={small}>
        {small && !assigned ? (
          <Plus onClick={() => handleAssign(tagName, 'tags')} />
        ) : (
          <X onClick={handleDelete} />
        )}
      </TagButton>
    </TagContainer>
  );
}

Tag.propTypes = {
  add: PropTypes.bool,
  assigned: PropTypes.bool,
  cancelEditing: PropTypes.bool,
  small: PropTypes.bool,
  tagName: PropTypes.string.isRequired,
  animatedStyle: PropTypes.object,
  addNewAttribute: PropTypes.func,
  confirmDeleteAttribute: PropTypes.func,
  toggleNewEmptyTag: PropTypes.func,
  handleAssign: PropTypes.func,
  confirmUpdateTagName: PropTypes.func,
  handleRemoveAttribute: PropTypes.func,
};
