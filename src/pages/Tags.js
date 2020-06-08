import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Plus } from 'react-feather';

import Instructions from '../components/Instructions';
import Tag from '../components/Tag';
import { useOnEscapeClose } from '../helpers/useOnEscapeClose';
import { useOnNOpen } from '../helpers/useOnNOpen';

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

function Tags({
  cancelEditing = false,
  tags = [],
  addNewAttribute,
  confirmDeleteAttribute,
  confirmUpdateTagName,
}) {
  const [showEmptyTag, setShowEmptyTag] = useState(false);

  const toggleNewEmptyTag = useCallback(() => {
    setShowEmptyTag(!showEmptyTag);
  }, [showEmptyTag]);

  const escFunction = useCallback(() => {
    setShowEmptyTag(false);
  }, []);

  useOnEscapeClose(() => escFunction());
  useOnNOpen(() => setShowEmptyTag(true));

  return (
    <TagsContainer>
      {!tags.length ? (
        <Instructions add text="OOPS no more tags! add some new tags below!" />
      ) : (
        <>
          {tags.map((tagName) => (
            <Tag
              key={tagName}
              tagName={tagName}
              confirmDeleteAttribute={confirmDeleteAttribute}
              confirmUpdateTagName={confirmUpdateTagName}
              cancelEditing={cancelEditing}
            />
          ))}
          {showEmptyTag && (
            <Tag
              add
              tagName=""
              addNewAttribute={addNewAttribute}
              cancelEditing={cancelEditing}
              toggleNewEmptyTag={toggleNewEmptyTag}
            />
          )}
          <AddNewTagBtn onClick={toggleNewEmptyTag}>
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
  addNewAttribute: PropTypes.func.isRequired,
  confirmDeleteAttribute: PropTypes.func.isRequired,
  confirmUpdateTagName: PropTypes.func.isRequired,
};

export default Tags;
// export default memo(
//   Tags,
//   (prevProps, nextProps) =>
//     prevProps.cancelEditing === nextProps.cancelEditing &&
//     prevProps.tags === nextProps.tags
// );
