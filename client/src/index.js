import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './footballshop/UserShop';
import NewsShop from './footballshop/NewsShop';
import MatchShop from './footballshop/MatchShop';
import PosterShop from './footballshop/PosterShop';

export const Context = createContext(null)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value = {{
      user: new UserStore(),
      news: new NewsShop(),
      match: new MatchShop(),
      poster: new PosterShop()
  }}>
    <App />
  </Context.Provider>
);

reportWebVitals();
