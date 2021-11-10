import React from 'react';
import { ToastContainer } from 'react-toastify';
import SearchContainer  from '../containers/search_container';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <SearchContainer />
    <ToastContainer autoClose={3000} />
  </>
);

export default App;
