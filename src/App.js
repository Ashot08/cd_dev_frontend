import './App.css';
import {StudentsControl} from "./components/StudentsControl/StudentsControl";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {StudentsControlAll} from "./components/StudentsControl/StudentsControlAll";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Link to="/students_control">Stud control</Link>
                <Link to="/students_control/all">Stud control all</Link>
                <Routes>
                    <Route path={'/students_control'} element={<StudentsControl/>} />
                    <Route path={'/students_control/all'} element={<StudentsControlAll/>} />
                </Routes>
                {/*<StudentsControl />*/}
            </div>
        </BrowserRouter>
    )
}

export default App;
