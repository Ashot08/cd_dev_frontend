import {ProgramsList} from "./ProgramsList/ProgramsList";
import {useState} from "react";
import {studentAPI} from "../../rest";
import {StudentsControl} from "../StudentsControl/StudentsControl";

export const Programs = (props) => {
    return (
        <>
            <ProgramsList activeProgram={props.activeProgram} showStudents={props.showStudents} />
        </>
    )
}
