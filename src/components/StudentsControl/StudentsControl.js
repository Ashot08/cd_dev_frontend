import {Programs} from "../Programs/Programs";
import {programAPI, studentAPI} from "../../rest";
import {useEffect, useState} from "react";
import {StudentsList} from "./StudentsList/StudentsList";
import {Loader} from "../Loader/Loader";
import {Paginator} from "../Paginator/Paginator";
import {CreateUserForm} from "../forms/CreateUserForm/CreateUserForm";
import {StudentsControlProtocol} from "../forms/Protocols/StudentsControlProtocol/StudentsControlProtocol";

export const StudentsControl = (props) => {

    const [state, setState] = useState({
        loading: false,
        program_id: 0,
        page: 0,
        offset: 2,
        count: 0,
        students: [],
        selectedStudents: new Set(),
        selectedStudentsCount: 0,
        isSelectAll: false
    });

    useEffect(() => {
        studentAPI.getStudents(state.program_id, state.page, state.offset).then(res => {
            setState(
                {
                    ...state,
                    loading: false,
                    students: res.students,
                    count: res.count,
                })
            console.log(res)
        })
    }, [state.page, state.program_id, state.offset, state.selectedStudentsCount])

    const showStudents = (p) => {
        setState({
            ...state,
            page: 0,
            loading: true,
            program_id: p
        })
    }

    const changePage = (p) => {
        setState(
            {
                ...state,
                loading: true,
                page: p,
                isSelectAll: false
            }
        )
    }

    const onStudentSelect = (e, studentId, isSelectAll = false) => {

        e.target.disabled = true;
        setTimeout(()=>e.target.disabled = false, 1000);
        let selectedStudentsClone = new Set(state.selectedStudents);

        if(isSelectAll){

            if(e.target.checked){
                selectedStudentsClone = new Set( [...selectedStudentsClone, ...studentId.map(s=>s.user_id)]);
            }else{
                selectedStudentsClone = new Set();
            }
            setState({
                ...state,
                selectedStudents: selectedStudentsClone,
                selectedStudentsCount: selectedStudentsClone.size,
                isSelectAll: !state.isSelectAll
            })
            return;
        }

        if( selectedStudentsClone.has(studentId) ){
            selectedStudentsClone.delete(studentId)
        }else{
            selectedStudentsClone.add(studentId)
        }

        setState({
            ...state,
            selectedStudents: selectedStudentsClone,
            selectedStudentsCount: selectedStudentsClone.size
        })

    }

    const onStudentReset = () => {
        setState({
            ...state,
            isSelectAll: false,
            selectedStudents: new Set()
        })
    }

    const onStudentCreate = (data) => {
        return studentAPI.createStudent(data)
    }

    const onCreateStudentProtocol = (data) => {
        return studentAPI.getStudentsProtocol(data);
    }

    function countItemsToShow(totalCount, step){
        let countArray = [];
        while(+totalCount > 0){
            countArray.push(step)
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
                    Отображать по - {countItemsToShow(state.count, 2).map(
                        (i)=> {
                            return <div key={'show_count_' + i} onClick={() => setState({
                                ...state,
                                loading: true,
                                offset: i,
                                page: 0
                            })}>{i}</div>;
                        }
                    )}
                    <div>
                        <button onClick={onStudentReset}>Сбросить выбор</button>
                    </div>
                </div>
                <StudentsList
                    onStudentSelect={onStudentSelect}
                    selectedStudents={state.selectedStudents}
                    students={state.students}
                    isSelectAll={state.isSelectAll}
                />
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
            {state.program_id ? <CreateUserForm programId={state.program_id} onSubmit={onStudentCreate} /> : ''}
            {state.program_id ? <StudentsControlProtocol onSubmit={onCreateStudentProtocol} /> : ''}
            <Programs activeProgram={state.program_id} showStudents={showStudents} />
        </>
    )
}
