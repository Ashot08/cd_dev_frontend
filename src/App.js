import './App.css';
import {StudentsControl} from "./components/StudentsControl/StudentsControl";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {StudentsControlAll} from "./components/StudentsControl/StudentsControlAll";
import {useState} from "react";

function App() {

    const [state, setState] = useState({
        isAllOpen: false
    })

    return (
        <BrowserRouter>
            <div className="App">
                {/*<Link to="/account/students_control"><button>Контроль студентов</button></Link>*/}
                {/*<Link to="/account/students_control_all"><button>Все студенты</button></Link>*/}
                {/*<Routes>*/}
                {/*    <Route path={'/account/students_control'} element={<StudentsControl/>} />*/}
                {/*    <Route path={'/account/students_control_all'} element={<StudentsControlAll/>} />*/}
                {/*</Routes>*/}

                <div>
                    <button onClick={()=>setState({...state, isAllOpen: !state.isAllOpen})}>
                        {state.isAllOpen ?<span>Назад</span> : <span>Все студенты</span>}

                    </button>
                </div>

                {state.isAllOpen ? <StudentsControlAll /> : <StudentsControl />}
            </div>
        </BrowserRouter>
    )
}

export default App;
