import {Programs} from "../Programs/Programs";
import {programAPI, studentAPI} from "../../rest";
import {useEffect, useState} from "react";
import {StudentsList} from "./StudentsList/StudentsList";
import {Loader} from "../Loader/Loader";
import {Paginator} from "../Paginator/Paginator";

export const StudentsControl = (props) => {

    const [state, setState] = useState({
        loading: false,
        program_id: 0,
        page: 0,
        offset: 2,
        count: 0,
        students: []
    });

    useEffect(() => {
        studentAPI.getStudents(state.program_id, state.page, state.offset).then(res => {
            setState(
                {
                    ...state,
                    loading: false,
                    students: res.students,
                    count: res.count
                })
            console.log(res)
        })
    }, [state.page, state.program_id])

    const showStudents = (p) => {
        setState({
            ...state,
            loading: true,
            program_id: p
        })
    }

    const changePage = (p) => {
        setState(
            {
                ...state,
                loading: true,
                page: p
            }
        )
    }
    function countItemsToShow(totalCount, step){
        let countArray = [];
        while(+totalCount > 0){
            countArray.push(totalCount)
            totalCount -= step;
            step *= 2;
        }
        return countArray;
    }

    let content = '';
    if(state.loading) {
        content = <Loader />
    }else if(state.students.length) {
        content = (
            <>
                <div>
                    Отображать по
                    {countItemsToShow(state.count, 2).map(i=>i)}
                </div>
                <StudentsList students={state.students}/>
                <div>
                    {state.count && !state.loading ? <Paginator page={state.page} count={Math.ceil(state.count / state.offset)} changePage={changePage} /> : ''}
                </div>
            </>
        );
    }else if(state.program_id){
        content= 'На этом курсе нет студентов';
    }

    return (
        <>
            {content}
            <Programs activeProgram={state.program_id} showStudents={showStudents} />
        </>
    )
}
