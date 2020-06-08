import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BlockPicker } from 'react-color';

import ColorIndicator from '../components/colors/ColorIndicator';

import { textColor, backgroundColor } from '../style-utils/theme';
import { getContrastYIQ } from '../helpers/getContrastTIQ';
import { useOnClickOutside } from '../helpers/useOnClickOutside';
import { useOnEscapeClose } from '../helpers/useOnEscapeClose';
import { useSubmitOnEnter } from '../helpers/useSubmitOnEnter';
import { useOnNOpen } from '../helpers/useOnNOpen';

const ColorsContainer = styled.div`
  align-items: center;
  background: ${backgroundColor};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  width: 100%;
`;

const ColorPickerContainer = styled.div`
  height: 2rem;
  margin: 5px;
  overflow: visible;
  text-align: center;
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  align-items: center;
  background: ${({ inputBackgroundColor }) => inputBackgroundColor || 'none'};
  border: 1px solid
    ${({ submit, inputBackgroundColor }) =>
      submit ? inputBackgroundColor : textColor};
  border-radius: 5px;
  color: ${({ btnTextColor }) => btnTextColor || textColor};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 2rem;
  width: 168px;
  &:hover {
    transform: scale(1.05);
  }
`;

const ColorPicker = styled(BlockPicker)`
  margin-top: 1rem;
`;

function Colors({ colors = [], addNewAttribute, confirmDeleteAttribute }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState('#000000');

  const escFunction = () => {
    setShowColorPicker(false);
    setNewColor('#000000');
  };

  const colorPickerRef = useRef(null);

  useOnClickOutside(colorPickerRef, () => escFunction());

  useOnEscapeClose(escFunction);
  useOnNOpen(() => setShowColorPicker(true));

  const handleSubmit = () => {
    setShowColorPicker(false);
    addNewAttribute(newColor, 'colors');
  };
  useSubmitOnEnter(handleSubmit, showColorPicker);
  const toggleShowColorPicker = (e) => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorSelect = (color) => {
    setNewColor(color.hex);
  };

  return (
    <ColorsContainer>
      {colors.map((color) => (
        <ColorIndicator
          large
          key={color}
          color={color}
          confirmDeleteAttribute={confirmDeleteAttribute}
        />
      ))}
      <ColorPickerContainer ref={colorPickerRef}>
        {showColorPicker ? (
          <Button
            submit
            inputBackgroundColor={newColor}
            btnTextColor={() => getContrastYIQ(newColor)}
            onClick={handleSubmit}
          >
            submit
          </Button>
        ) : (
          <Button btnTextColor={textColor} onClick={toggleShowColorPicker}>
            add new
          </Button>
        )}
        {showColorPicker && (
          <ColorPicker
            color={newColor}
            triangle="top"
            onChangeComplete={handleColorSelect}
          />
        )}
      </ColorPickerContainer>
    </ColorsContainer>
  );
}

Colors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  addNewAttribute: PropTypes.func.isRequired,
  confirmDeleteAttribute: PropTypes.func.isRequired,
};

export default Colors;
