import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navigations/Navbar';
import Footer from '../components/navigations/Footer';

const Layout = (props) => {

  return (
    <div>
      <Navbar />
      <ToastContainer autoClose={5000} />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
