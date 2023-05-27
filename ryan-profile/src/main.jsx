import React from 'react'
import ReactDOM from 'react-dom/client'
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App.jsx'
//import About from './About.jsx';
import './index.css';

/* Check this for future multiple page
const Main = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/About" component={About} />
      </Switch>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
