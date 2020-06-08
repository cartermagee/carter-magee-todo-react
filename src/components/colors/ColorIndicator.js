import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated } from 'react-spring';
import { X } from 'react-feather';
import ColorWheel from '../../icons/ColorWheel';
import { textColor } from '../../style-utils/theme';

const ColorContainer = styled(animated.div)`
  background: ${({ color }) => color || 'none'};
  border-radius: 5px;
  border: ${({ clearFilter }) => clearFilter && `1px solid ${textColor}`};
  color: ${({ color }) => color};
  cursor: pointer;
  font-size: 10px;
  height: ${({ large }) => (large ? '2rem' : '20px')};
  margin: ${({ large }) => (large ? '5px' : '0 5px')};
  overflow: hidden;
  transform: scale(1);
  width: ${({ large }) => (large ? '6.7rem' : '30px')};
  &:hover {
    transform: ${({ large }) => large && 'scale(1.05)'};
  }
`;

const Color = styled.div`
  align-items: center;
  border: ${({ large }) => large && '1px solid rgba(244, 115, 115, 1)'};
  border-radius: 5px;
  display: grid;
  justify-items: end;
  height: 100%;
  mix-blend-mode: ${({ large }) => large && 'luminosity'};
  padding-right: 2px;
  width: 100%;
`;

const DeleteBtn = styled.button.attrs({
  type: 'button',
})`
  background: rgb(52, 58, 64, 0.3);
  border-radius: 5px;
  color: #fff;
  display: grid;
  &:hover {
    border: 1px solid rgba(244, 115, 115, 1);
  }
`;
function ColorIndicator({
  large = false,
  select = false,
  clearFilter = false,
  filter = false,
  color = '',
  confirmDeleteAttribute,
  handleAssign,
  animatedStyle,
  handleColorSelect,
  handleClearColor,
}) {
  const handleDelete = () => {
    confirmDeleteAttribute(color, 'colors');
  };

  const handleClick = () => {
    if (clearFilter) return handleClearColor();
    if (select) return handleAssign(color, 'colors');
    if (filter) return handleColorSelect(color);
  };

  return (
    <ColorContainer
      onClick={handleClick}
      style={animatedStyle}
      color={color}
      large={large ? 1 : 0}
    >
      <Color large={large}>
        {!color && !clearFilter && <ColorWheel large={large} />}
        {clearFilter && 'clear'}
        {large && !select && (
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
  select: PropTypes.bool,
  color: PropTypes.string,
  clearFilter: PropTypes.bool,
  filter: PropTypes.bool,
  animatedStyle: PropTypes.object,
  confirmDeleteAttribute: PropTypes.func,
  handleColorSelect: PropTypes.func,
  handleAssign: PropTypes.func,
  handleClearColor: PropTypes.func,
};

export default ColorIndicator;
