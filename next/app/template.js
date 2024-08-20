import Header from './components/header';
import LoginUser from './components/loginUser';
const Template = ({ children }) => {
  return (
    <>
      <Header />
      <LoginUser />
      {children}
    </>
  );
};

export default Template;
