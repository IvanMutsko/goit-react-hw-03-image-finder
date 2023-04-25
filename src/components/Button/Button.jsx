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
