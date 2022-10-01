import {ProgramsList} from "./ProgramsList/ProgramsList";
import {useState} from "react";
import {studentAPI} from "../../rest";
import {StudentsControl} from "../StudentsControl/StudentsControl";

export const Programs = (props) => {

    return (
        <>
            <ProgramsList catsFilters={props.catsFilters} onProgramDelete={props.onProgramDelete} editable={props.editable} activeProgram={props.activeProgram} onProgramClick={props.onProgramClick} />
        </>
    )
}
