import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import ScrollToTop from "react-scroll-to-top";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

import './assets/styles/common.css';
import 'react-datepicker/dist/react-datepicker.css';

import { ToastProvider } from "./hooks/ToastProvider";
import LoginPage from "./pages/Login/LoginPage";
import SideBarAccountant from "./pages/accountant/dashboard/SideBar";
import SideBarStaff from "./pages/staff/dashboard/SideBar";

function App() {
  return (
    <ToastProvider>
      <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/accountant/dashboard' element={<SideBarAccountant />} />
            <Route path='/staff/dashboard' element={<SideBarStaff />} />
          </Routes>
          {/* <ScrollToTop smooth /> */}
      </Router>
    </ToastProvider>
  );
}

export default App;