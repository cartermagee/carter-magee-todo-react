import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Plus } from 'react-feather';
import { BlockPicker } from 'react-color';
// import { isValidHex } from 'react-color/helpers/color';
import ColorIndicator from '../components/colors/ColorIndicator';
import { textColor, backgroundColor } from '../style-utils/theme';
import { getContrastYIQ } from '../helpers/getContrastTIQ';
// import { textColor, inputBackground } from '../../style-utils/theme';

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
  text-align: center;
  display: grid;
  overflow: visible;
  width: calc(100% / 5.5);
  height: 2rem;
  grid-gap: 12px;
  justify-items: center;
  align-items: center;
  transition: all 0.4s ease;
  margin: 5px;
`;

const Button = styled.button.attrs({
  type: 'button',
})`
  align-items: center;
  background: ${({ inputBackgroundColor }) => inputBackgroundColor || 'none'};
  border-radius: 5px;
  color: ${({ btnTextColor }) => btnTextColor || textColor};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 2rem;
  padding-left: 5px;
  border: 1px solid ${textColor};
  width: 100%;
  &:hover {
    transform: scale(1.05);
  }
`;

function Colors({ colors = [], addNewColor, deleteColor, appRef }) {
  const colorPickerRef = useRef();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState('#000000');
  const [btnTextColor, setBtnTextColor] = useState('#fff');

  console.log({ btnTextColor });

  const escFunction = useCallback((e) => {
    if (e.keyCode === 27 || e.keyCode === 9) {
      setShowColorPicker(false);
      setNewColor('#000000');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    const shit = getContrastYIQ(newColor);
    console.log(shit);

    setBtnTextColor(shit);
  }, [newColor]);

  const toggleShowColorPicker = (e) => {
    setShowColorPicker(!showColorPicker);
  };

  const handleClickOutside = (e) => {
    if (colorPickerRef.current.contains(e.target)) return;
    setShowColorPicker(false);
    setNewColor('#000000');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // const handleColorSelect = ({ rgb: { r, g, b }, hex }, event) => {
  const handleColorSelect = (color, event) => {
    setNewColor(color.hex);
  };

  const handleSubmit = () => {
    setShowColorPicker(false);
    addNewColor(newColor);
  };
  return (
    <ColorsContainer>
      {colors.map((color) => (
        <ColorIndicator
          large
          key={color}
          color={color}
          deleteColor={deleteColor}
        />
      ))}
      <ColorPickerContainer ref={colorPickerRef}>
        {showColorPicker ? (
          <Button
            inputBackgroundColor={newColor}
            btnTextColor={btnTextColor}
            onClick={handleSubmit}
            onBlur={handleClickOutside}
          >
            submit
          </Button>
        ) : (
          <Button
            btnTextColor={btnTextColor}
            onClick={toggleShowColorPicker}
            onBlur={handleClickOutside}
          >
            add new
          </Button>
        )}
        {showColorPicker && (
          <BlockPicker
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
  addNewColor: PropTypes.func.isRequired,
  deleteColor: PropTypes.func.isRequired,
  appRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default Colors;
