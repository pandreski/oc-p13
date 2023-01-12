import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  0% { transform: rotate(0deg); }
  100% {  transform: rotate(360deg); }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
`

const Spinner = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 5px solid;
  border-color: #00bc77 transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`

/**
 * Component displaying a loading spinner.
 * @component
 * @example
 * return (
 *  <Loader />
 * )
 */
export default function Loader({ size }) {
  return (
    <Wrapper>
      <Spinner size={size} />
    </Wrapper>
  );
}

Loader.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])
};

Loader.defaultProps = {
  size: 48,
};
