import React from 'react';
import { ToastContainer } from 'react-toastify';
import SearchContainer  from '../containers/search_container';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <div className="app">
    <SearchContainer />
    <ToastContainer autoClose={3000} />
  </div>
);

export default App;
