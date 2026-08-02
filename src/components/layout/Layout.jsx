import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
