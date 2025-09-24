import logo from './assets/images/SCAS_LOGO.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          야옹이... 
        </p>
        <a
          className="App-link"
          href="https://forms.gle/wUXgP5nB2Xg2rjwx9"
          target="_blank"
          rel="noopener noreferrer"
        >
          출결 기록하기
        </a>
      </header>
    </div>
  );
}

export default App;
