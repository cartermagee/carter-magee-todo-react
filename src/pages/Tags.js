import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Plus } from 'react-feather';

import Instructions from '../components/Instructions';
import Tag from '../components/Tag';

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
`;

const AddNewTagBtn = styled.button.attrs({
  type: 'button',
})`
  align-items: center;
  background: none;
  border-radius: 50px;
  color: inherit;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 30px;
`;

export default function Tags({
  cancelEditing = false,
  tags = [],
  addNewRef,
  deleteTag,
  confirmUpdateTagName,
}) {
  return (
    <TagsContainer>
      {!tags.length ? (
        <Instructions
          add
          text="OOPS no more tags! please add some tags below!"
        />
      ) : (
        <>
          {tags.map((tagName) => (
            <Tag
              key={tagName}
              tagName={tagName}
              deleteTag={deleteTag}
              confirmUpdateTagName={confirmUpdateTagName}
              cancelEditing={cancelEditing}
            />
          ))}
          <AddNewTagBtn onClick={() => addNewRef.current.focus()}>
            <Plus />
          </AddNewTagBtn>
        </>
      )}
    </TagsContainer>
  );
}

Tags.propTypes = {
  cancelEditing: PropTypes.bool.isRequired,
  tags: PropTypes.array,
  addNewRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  deleteTag: PropTypes.func.isRequired,
  confirmUpdateTagName: PropTypes.func.isRequired,
};
