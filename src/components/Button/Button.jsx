import { ButtonWrap, LoadMoreBtn } from './Button.styled';

export const Button = ({ text }) => {
  return (
    <ButtonWrap>
      <LoadMoreBtn type="button">{text}</LoadMoreBtn>
    </ButtonWrap>
  );
};
