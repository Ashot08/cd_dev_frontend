import {ProgramsList} from "./ProgramsList/ProgramsList";
import {useState} from "react";
import {studentAPI} from "../../rest";

export const Programs = (props) => {
    const [state, setState] = useState({
        isStudentsShowed: false,
        page: 0,
        offset: 6
    });
    const showStudents = (p) => {
        studentAPI.getStudents(p, state.page, state.offset).then(res => console.log(res))
    }
    return (
        <>
            <ProgramsList showStudents={showStudents} />
        </>
    )
}
