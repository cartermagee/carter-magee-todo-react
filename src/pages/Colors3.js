import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BlockPicker } from 'react-color';
import ColorIndicator from '../components/colors/ColorIndicator';
import { textColor, backgroundColor } from '../style-utils/theme';
import { getContrastYIQ } from '../helpers/getContrastTIQ';

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
  overflow: visible;
  margin: 5px;
  height: 2rem;
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

function Colors({ colors = [], addNewAttribute, deleteColor }) {
  const colorPickerRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState('#000000');

  console.log({
    showColorPicker,
    newColor,
  });

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

  const handleColorSelect = (color) => {
    setNewColor(color.hex);
  };

  const handleSubmit = () => {
    setShowColorPicker(false);
    addNewAttribute(newColor, 'colors');
  };

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === 27 || e.keyCode === 9) return setShowColorPicker(false);
      if (e.keyCode === 13 && showColorPicker) {
        setShowColorPicker(false);
        addNewAttribute(newColor, 'colors');
      }
    },
    [addNewAttribute, newColor, showColorPicker]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false);
    };
  }, []);
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
            submit
            inputBackgroundColor={newColor}
            btnTextColor={() => getContrastYIQ(newColor)}
            onClick={handleSubmit}
            // onBlur={handleClickOutside}
          >
            submit
          </Button>
        ) : (
          <Button
            btnTextColor={textColor}
            onClick={toggleShowColorPicker}
            // onBlur={handleClickOutside}
          >
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
  deleteColor: PropTypes.func.isRequired,
};

export default Colors;
