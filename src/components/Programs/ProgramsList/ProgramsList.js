import {programAPI} from "../../../rest";
import {useEffect, useState} from "react";
import {Loader} from "../../Loader/Loader";
import {Paginator} from "../../Paginator/Paginator";
import classes from './ProgramsList.module.css';
import {ProgramsItem} from "./ProgramsItem";

export const ProgramsList = (props) => {
    const [state, setState] = useState({
        loading: true,
        programs: null,
        page: 0,
        offset: 6,
        count: 0,
        selected: []
    });
    useEffect(() => {
        programAPI.getPrograms(state.page, state.offset).then(res => {
            setState(
                {
                    ...state,
                    loading: false,
                    programs: res.programs,
                    count: res.count
                })
        })
    }, [setState, state.page])
    const changePage = (p) => {
        setState(
            {
                ...state,
                loading: true,
                page: p
            }
        )
    }
    let content;
    if(state.loading){
        content = <Loader/>
    }else{
        content = (<div className={classes.programs_list}>
            {state.programs.map(
                program => <ProgramsItem
                    title={program.title}
                    date={program.create_date}
                    showStudents={props.showStudents}
                    id = {program.id}
                    isActive = {+program.id === +props.activeProgram}
                    key={program.id}/> )
            }
        </div>)
    }
    return (
        <>
            {
                content
            }

            <div>
                {state.count && !state.loading ? <Paginator page={state.page} count={Math.ceil(state.count / state.offset)} changePage={changePage} /> : ''}
            </div>
        </>

    )
}
