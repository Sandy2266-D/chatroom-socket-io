import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Chat from './Components/Chat/Chat';
import Join from './Components/Join/Join';

function App() {
  return (
    <div className="App">
      <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
    </div>
  );
}

export default App;
