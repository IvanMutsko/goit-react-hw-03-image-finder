import PropTypes from 'prop-types';
import { ButtonWrap, LoadMoreBtn } from './Button.styled';

export const Button = ({ text, onClick }) => {
  return (
    <ButtonWrap>
      <LoadMoreBtn type="button" onClick={onClick}>
        {text}
      </LoadMoreBtn>
    </ButtonWrap>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
