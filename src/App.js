import logo from './logo.svg';
import './App.css';
import * as p from './pages/index.js';

function App() {
  return (
       <div className="main offwhite">
            <p.Header></p.Header>
            <p.User></p.User>
            <p.Footer></p.Footer>
       </div>
  );
}

export default App;
