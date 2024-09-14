import LoginUser from './components/loginUser';
const Template = ({ children }) => {
  return (
    <>
      <LoginUser />
      {children}
    </>
  );
};

export default Template;
