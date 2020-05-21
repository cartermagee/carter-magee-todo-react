import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { Moon, Sun } from 'react-feather';
import { useTheme } from '../style-utils/ThemeContext';

const AnimatedToggleBtn = styled(animated.button)`
  align-items: center;
  background: #626980;
  border: none;
  border-radius: 20px 0 0 20px;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 1em;
  justify-content: space-around;
  outline: none;
  position: absolute;
  right: 0px;
  top: 5px;
  & > * {
    margin: 5px;
  }
`;

function DarkModeToggle({ theme }) {
  // consumes theme
  const themeToggle = useTheme();
  const [showToggle, setShowToggle] = useState(false);
  // react-spring animates based on state
  const slide = useSpring({
    config: config.stiff,
    width: showToggle ? '13rem' : '2.625rem',
  });

  const fade = useSpring({
    config: config.stiff,
    display: showToggle ? 'flex' : 'none',
    opacity: showToggle ? 1 : 0,
    whiteSpace: 'nowrap',
  });
  // tells springs to animate
  const handleHover = () => {
    setShowToggle(!showToggle);
  };
  // calls theme toggle
  const handleClick = () => {
    themeToggle.toggle();
  };

  return (
    <>
      <AnimatedToggleBtn
        style={slide}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={handleClick}
      >
        {theme.mode === 'dark' ? (
          <>
            <Sun />
            <animated.span style={fade}>Switch to Light Mode</animated.span>
          </>
        ) : (
          <>
            <Moon />
            <animated.span style={fade}>Switch to Dark Mode</animated.span>
          </>
        )}
      </AnimatedToggleBtn>
    </>
  );
}

DarkModeToggle.propTypes = {
  theme: PropTypes.object,
};

export default withTheme(DarkModeToggle);
