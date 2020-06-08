import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { X, Plus } from 'react-feather';

import { textColor, inputBackground } from '../../style-utils/theme';
import ColorIndicator from '../colors/ColorIndicator';

const MainContainer = styled.div`
  background: ${inputBackground};
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  border-top: 1px solid rgba(100, 100, 100, 0.2);
  color: ${textColor};
  justify-items: center;
  width: 100%;
  will-change: height, opacity;
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

function ItemColors({
  open = false,
  itemColor = '',
  colors = [],
  toggle,
  handleAssign,
  history,
}) {
  return (
    <>
      {open && (
        <MainContainer>
          <TitleContainer>
            <Title>Select Color</Title>
            <CloseBtn onClick={toggle}>
              <X />
            </CloseBtn>
          </TitleContainer>
          <Expander>
            {colors.map((color) => (
              <ColorIndicator
                large
                select
                selected={color === itemColor}
                key={color}
                color={color}
                handleAssign={handleAssign}
              />
            ))}
            <ColorIndicator
              large
              select
              selected={itemColor === ''}
              color=""
              handleAssign={handleAssign}
            />
            <ExpandBtn onClick={() => history.push('colors')}>
              <Plus />
            </ExpandBtn>
          </Expander>
        </MainContainer>
      )}
    </>
  );
}

ItemColors.propTypes = {
  open: PropTypes.bool.isRequired,
  itemColor: PropTypes.string,
  colors: PropTypes.arrayOf(PropTypes.string),
  toggle: PropTypes.func.isRequired,
  handleAssign: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default withRouter(ItemColors);
