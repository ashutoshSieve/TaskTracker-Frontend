import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Signup from './components/Signup';
import Login from './components/Login';
import Main from "./components/Main";
import Completed from './components/Completed';
import OnGoing from './components/OnGoing';
import TaskDetails from './components/TaskDetailsFill';
import Passed from './components/Passed';
import SingleDay from "./components/SingleDay";
import Notepad from './components/Notepad';
import Graph from './components/Graph';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/completed" element={<Completed/>} />
        <Route path="/onGoing" element={<OnGoing/>} />
        <Route path="/taskDetails/:id" element={<TaskDetails/>} />
        <Route path="/passed/:id" element={<Passed/>} />
        <Route path="/notepad" element={<Notepad/>} />
        <Route path="/graph/:name" element={<Graph/>} />
        <Route path="/singleDay/:id/:taskName/:date/:month/:year" element={<SingleDay/>} />
      </Routes>
    </Router>
  );
}

export default App;
