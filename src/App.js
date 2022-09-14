import './App.css';
import {StudentsControl} from "./components/StudentsControl/StudentsControl";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {StudentsControlAll} from "./components/StudentsControl/StudentsControlAll";

function App() {

    const onPopup = () => {

    }

    return (
        <BrowserRouter>
            <div className="App">
                <Link to="/account/students_control">Контроль студентов</Link>
                <Link to="/account/students_control_all">Все студенты</Link>
                <Routes>
                    <Route path={'/account/students_control'} element={<StudentsControl/>} />
                    <Route path={'/account/students_control_all'} element={<StudentsControlAll/>} />
                </Routes>


                {/*<StudentsControl />*/}
            </div>
        </BrowserRouter>
    )
}

export default App;
