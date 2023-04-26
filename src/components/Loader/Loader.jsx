import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <ThreeDots
      height="80"
      width="150"
      radius="8"
      color="#3f51b5"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
      visible={true}
    />
  );
};
