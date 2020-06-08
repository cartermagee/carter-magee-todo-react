import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useSpring, useTransition, useChain } from 'react-spring';
import {
  inputBackground,
  submitButtonColor,
  dropShadow,
} from '../style-utils/theme';

const Overlay = styled(animated.div)`
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  justify-items: center;
  position: fixed;
  width: 100vw;
  z-index: 5;
`;

const DialogContainer = styled(animated.div)`
  background: ${inputBackground};
  border-radius: 1em;
  display: grid;
  filter: ${dropShadow};
  grid-gap: 1rem;
  height: fit-content;
  padding: 1em;
  width: 400px;
  z-index: 6;
`;
const Text = styled.p`
  white-space: pre-wrap;
`;

const BtnContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Btn = styled(animated.button)`
  align-items: center;
  background: ${({ cancel }) => (cancel ? '#D32F2E' : submitButtonColor)};
  border-radius: 8px;
  color: #fff;
  display: flex;
  height: 30px;
  height: 2rem;
  padding: 1em;
`;

export default function Dialog({
  showDialog = false,
  dialogObj: { text = '', buttons = [] },
  closeDialog,
}) {
  const slideDownRef = useRef(null);

  const slideDown = useSpring({
    ref: slideDownRef,
    from: {
      opacity: 0,
      transform: 'translateY(-100%)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0%)',
    },
  });

  const fadeInRef = useRef(null);

  const fadeIn = useSpring({
    ref: fadeInRef,
    from: {
      opacity: 0,
      transform: 'scale(0.1)',
    },
    to: {
      opacity: 1,
      transform: 'scale(1)',
    },
  });

  const transitionRef = useRef(null);

  const transition = useTransition(showDialog, null, {
    ref: transitionRef,
    from: {
      opacity: 0,
      display: 'none',
    },
    enter: {
      opacity: 1,
      display: 'grid',
    },
    leave: {
      opacity: 0,
      display: 'none',
    },
    // config: config.stiff,
  });

  useChain(
    showDialog
      ? [transitionRef, slideDownRef, fadeInRef]
      : [fadeInRef, slideDownRef, transitionRef],
    [0, showDialog ? 0.1 : 0.6]
  );
  return (
    <>
      {transition.map(({ item, key, props }) => (
        <Overlay key={key} style={props} onClick={closeDialog}>
          <DialogContainer style={slideDown}>
            <h1>Wait!</h1>
            <Text>{text}</Text>
            <BtnContainer>
              {buttons.map(({ btnTxt, callback }) => (
                <Btn
                  key={btnTxt}
                  style={fadeIn}
                  type="button"
                  cancel={btnTxt === 'cancel' ? 1 : 0}
                  onClick={callback}
                >
                  {btnTxt}
                </Btn>
              ))}
            </BtnContainer>
          </DialogContainer>
        </Overlay>
      ))}
    </>
  );
}

Dialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  dialogObj: PropTypes.any, // revisit ****
  closeDialog: PropTypes.func.isRequired,
};
