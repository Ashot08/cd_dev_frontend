import './App.css';
import {StudentsControl} from "./components/StudentsControl/StudentsControl";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {StudentsControlAll} from "./components/StudentsControl/StudentsControlAll";
import {useState} from "react";
import {ProgramsPage} from "./components/Programs/ProgramsPage/ProgramsPage";

function App() {

    const [state, setState] = useState({
        isAllOpen: false,
        isControl: true,
        isPrograms: false,
    })

    return (
        <BrowserRouter>
            <div className="App">
                {/*<Link to="/"><button>Контроль студентов</button></Link>*/}
                {/*<Link to="/programs"><button>Программы</button></Link>*/}
                {/*<Routes>*/}
                {/*    /!*<Route path={'/'} element={<StudentsControl/>} />*!/*/}
                {/*    <Route path={'/programs'} element={<ProgramsPage />} />*/}
                {/*</Routes>*/}

                <div className={'scbt__nav_btns'}>
                    <button className={state.isControl ? 'active' : ''} onClick={()=>setState({...state, isAllOpen: false, isPrograms: false, isControl: true})}>
                        { <span>Контроль студентов</span>}
                    </button>
                    <button className={state.isAllOpen ? 'active' : ''} onClick={()=>setState({...state, isAllOpen: true, isPrograms: false, isControl: false})}>
                        { <span>Все студенты</span>}
                    </button>
                    <button className={state.isPrograms ? 'active' : ''} onClick={()=>setState({...state, isAllOpen: false, isPrograms: true, isControl: false})}>
                        {<span>Программы</span>}
                    </button>
                </div>



                {state.isAllOpen  ? <StudentsControlAll /> : ''}
                {state.isControl  ? <StudentsControl /> : ''}
                {state.isPrograms ? <ProgramsPage /> : ''}

            </div>
        </BrowserRouter>
    )
}

export default App;
