import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { X } from 'react-feather';

import { tagBackground } from '../style-utils/theme';

import Editable from './Editable';

const TagContainer = styled.span`
  align-items: center;
  background: ${tagBackground};
  border-radius: 50px;
  color: #fff;
  display: grid;
  grid-template-columns: auto 1fr;
  height: fit-content;
  justify-items: center;
  margin: 5px;
  max-width: calc(100% / 3.5);
  padding: 3px 3px 3px 8px;
  & span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const DeleteBtn = styled.button.attrs({
  type: 'button',
})`
  background: none;
  color: inherit;
  height: 24px;
  width: 24px;
`;

export default function Tag({
  cancelEditing = false,
  tagName = '',
  confirmUpdateTagName,
  deleteTag,
}) {
  const confirmDelete = () => {
    console.log({ tagName });
    // if (
    //   window.confirm(
    //     'Are you sure you wish to delete this tag? Deleting this will also remove it from any list items to which it is assigned.'
    //   )
    // ) {
    //   console.log(`deleting: ${tagName}`);
    //   deleteTag(tagName);
    // }
    deleteTag(tagName);
  };

  return (
    <TagContainer>
      <Editable
        text={tagName}
        saveFunction={confirmUpdateTagName}
        cancelEditing={cancelEditing}
      />
      <DeleteBtn onClick={confirmDelete}>
        <X />
      </DeleteBtn>
    </TagContainer>
  );
}

Tag.propTypes = {
  cancelEditing: PropTypes.bool.isRequired,
  tagName: PropTypes.string.isRequired,
  deleteTag: PropTypes.func.isRequired,
  confirmUpdateTagName: PropTypes.func.isRequired,
};
