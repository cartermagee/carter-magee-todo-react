import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { X } from 'react-feather';
import ColorWheel from '../../icons/ColorWheel';
import { textColor, inputBackground } from '../../style-utils/theme';

const ColorContainer = styled.div`
  background: ${({ color }) => color || 'none'};
  border-radius: 5px;
  color: ${({ color }) => color};
  cursor: pointer;
  font-size: 10px;
  margin: ${({ large }) => large && '5px'};
  overflow: hidden;
  width: ${({ large }) => (large ? 'calc(100% / 5.5)' : '30px')};
  height: ${({ large }) => (large ? '2rem' : '20px')};
  &:hover {
    transform: scale(1.05);
  }
`;
// indianred

const Color = styled.div`
  align-items: center;
  display: grid;
  justify-items: end;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  mix-blend-mode: luminosity;
  padding-right: 2px;
`;

const DeleteBtn = styled.button.attrs({
  type: 'button',
})`
  background: rgb(52, 58, 64, 0.3);
  border-radius: 5px;
  color: rgb(205, 92, 92);
  display: grid;
  &:hover {
    border: 1px solid rgba(205, 92, 92, 1);
  }
`;
function ColorIndicator({ large, color = '', deleteColor }) {
  const handleDelete = () => {
    deleteColor(color);
  };
  return (
    <ColorContainer color={color} large={large}>
      <Color>
        {!color && <ColorWheel />}
        {large && (
          <DeleteBtn color={color} onClick={handleDelete}>
            <X />
          </DeleteBtn>
        )}
      </Color>
    </ColorContainer>
  );
}

ColorIndicator.propTypes = {
  large: PropTypes.bool,
  color: PropTypes.string,
  deleteColor: PropTypes.func,
};

export default ColorIndicator;
