import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EditListingInfo from './components/ListingInfo/EditListingInfo';
import CreateListingInfo from './components/ListingInfo/CreateListingInfo';

//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <CreateListingInfo />
  </React.StrictMode>,
  document.getElementById('root')
);
