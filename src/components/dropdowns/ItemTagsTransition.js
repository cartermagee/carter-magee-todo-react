import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { X, Plus } from 'react-feather';

import { textColor, inputBackground } from '../../style-utils/theme';
import Tag from '../Tag';

const MainContainer = styled(animated.div)`
  background: ${inputBackground};
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  border-top: 1px solid rgba(100, 100, 100, 0.2);
  color: ${textColor};
  /* height: 0px; */
  justify-items: center;
  width: 100%;
  will-change: height, opacity;
  z-index: 1;
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
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: ${inputBackground};
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  border-top: 1px solid rgba(100, 100, 100, 0.2);
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
}) {
  const [unusedTags, setUnusedTags] = useState([]);

  useEffect(() => {
    setUnusedTags(tags.filter((tag) => !itemTags.includes(tag)));
    return () => {
      setUnusedTags([]);
    };
  }, [itemTags, tags]);

  const openTransition = useTransition(open, null, {
    from: {
      height: '0.01%',
      transform: `translate3d(0, -100%, 0)`,
    },
    enter: {
      height: '100%',
      transform: `translate3d(0, 0.01%, 0)`,
    },
    leave: {
      height: '0.01%',
      transform: `translate3d(0, -100%, 0)`,
    },
  });

  return (
    <>
      {openTransition.map(
        ({ item: isOpen, key, props: openProps }) =>
          isOpen && (
            <MainContainer style={openProps} key={key}>
              <TitleContainer>
                <Title>Tags</Title>
                <CloseBtn onClick={toggle}>
                  <X />
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
                <ExpandBtn>
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
          )
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
  // add: PropTypes.func.isRequired,
  // remove: PropTypes.func.isRequired,
};

export default ItemTags;
// useChain(
//   open
//     ? [
//         { current: openTransitionRef.current },
//         { current: fadeRef.current },
//         { current: tagTransitionRef.current },
//       ]
//     : [
//         { current: tagTransitionRef.current },
//         { current: fadeRef.current },
//         { current: openTransitionRef.current },
//       ],
//    [0, open ? 0.1 : 0.6]
// );
