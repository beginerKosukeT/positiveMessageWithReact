import './globals.css';
import Footer from './components/footer';

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
