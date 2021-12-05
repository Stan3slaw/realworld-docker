import axios from 'axios';

import logo from './logo.svg';
import './App.css';

function App() {
  const makeApiRequest = () => {
    axios.get('/api/testwithcurrentuser').then((response) => {
      console.log('Auth response', response);
    });
  };
  const makeMailRequest = () => {
    axios.get('/api/testmailconfirmation').then((response) => {
      console.log('Mail response', response);
    });
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          <button onClick={makeApiRequest}>Make api request</button>
          <button onClick={makeMailRequest}>Make mail request</button>
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
