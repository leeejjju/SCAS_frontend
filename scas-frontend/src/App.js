import { Routes, Route } from 'react-router-dom';
import MainPage from './views/MainPage';
import ViewPage from './views/ViewPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/view" element={<ViewPage/>} />
      </Routes>
    </div>
  );
}

export default App;
