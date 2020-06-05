import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  animated,
  useTransition,
  useSpring,
  useChain,
  config,
} from 'react-spring';
import styled from 'styled-components';
import { X, Plus } from 'react-feather';
import { textColor, inputBackgroundFocus } from '../style-utils/theme';
import Tag from './Tag';

const MainContainer = styled(animated.div)`
  background: ${inputBackgroundFocus};
  position: relative;
  top: 0;
  right: 0;
  border-top: 1px solid rgba(100, 100, 100, 0.2);
  will-change: display, width, height, visibility;
  font-size: 1rem;
  border: 1px solid;
  justify-items: center;
  /* visibility: hidden; */
  z-index: 2;
  /* overflow: hidden; */
`;
const CloseBtn = styled.button.attrs({
  type: 'button',
})`
  width: 25px;
  height: 25px;
  color: ${textColor};
  background: none;
  grid-column: 3;
`;
const TitleContainer = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
  width: 100%;
  justify-items: center;
`;
const Title = styled.title`
  display: grid;
  border-bottom: 1px solid;
  padding-bottom: 5px;
  width: 75%;
  grid-column: 2;
  text-align: center;
`;

const InnerContainer = styled(animated.div)`
  width: 100%;
  display: flex;
  align-items: center;
  height: fit-content;
`;

const Item = animated(Tag);

function ItemTags({ tags, open, toggle, deleteTag }) {
  const springRef = useRef();
  const grow = useSpring({
    config: config.molasses,
    ref: springRef,
    from: { height: '0%', display: 'none' },
    to: [
      { height: open ? '100%' : '0%', display: 'grid' },
      { display: open ? 'grid' : 'none' },
    ],
  });

  const transRef = useRef();
  const transitions = useTransition(open ? tags : [], (item) => item, {
    ref: transRef,
    unique: true,
    trail: 400 / tags.length,
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  // useChain(open ? [springRef, transRef] : [transRef, springRef]);
  useChain(open ? [springRef, transRef] : [transRef, springRef], [
    0,
    open ? 0.1 : 0.6,
  ]);
  return (
    <MainContainer style={grow}>
      <TitleContainer>
        <Title>Tags</Title>
        <CloseBtn onClick={toggle}>
          <X />
        </CloseBtn>
      </TitleContainer>
      <InnerContainer>
        {transitions.map(({ item, key, props }) => {
          console.log({ item, key, props });
          return (
            <Item
              key={key}
              style={props}
              tagName={item}
              deleteTag={deleteTag}
            />
          );
        })}
        <Plus />
      </InnerContainer>
    </MainContainer>
  );
}

ItemTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  deleteTag: PropTypes.func.isRequired,
};

export default ItemTags;
