import {Programs} from "../Programs/Programs";
import {programAPI, studentAPI, userAPI} from "../../rest";
import {useEffect, useState} from "react";
import {StudentsList} from "./StudentsList/StudentsList";
import {Loader} from "../Loader/Loader";
import {Paginator} from "../Paginator/Paginator";
import {CreateUserForm} from "../forms/CreateUserForm/CreateUserForm";
import {StudentsControlProtocol} from "../forms/Protocols/StudentsControlProtocol/StudentsControlProtocol";
import {StudentsToExcel} from "../forms/Protocols/StudentsToExcel/StudentsToExcel";
import classes from './StudentsControl.module.css';
import {UsersFilter} from "../common/filters/UsersFIlter/UsersFilter";
import {Link} from "react-router-dom";

export const StudentsControlAll = (props) => {

    const [state, setState] = useState({
        loading: false,
        checkboxesDisable: false,
        program_id: 'all',
        programTitle: '',
        page: 0,
        offset: 10,
        count: 0,
        students: [],
        selectedStudents: new Set(),
        selectedStudentsCount: 0,
        isSelectAll: false,
        filters: {
            dateFilter: {
                from: '',
                to: ''
            }
        }

    });

    useEffect(() => {
        studentAPI.getStudents(state.program_id, state.page, state.offset, state.filters).then(res => {
            setState(
                {
                    ...state,
                    checkboxesDisable: false,
                    loading: false,
                    students: res.students,
                    count: res.count,
                })
        })
    }, [state.page, state.program_id, state.offset, state.selectedStudentsCount, state.filters])

    const showStudents = (p, programTitle = '') => {
        setState({
            ...state,
            page: 0,
            loading: true,
            program_id: p,
            programTitle: programTitle
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

        //e.target.disabled = true;
        //setTimeout(()=>e.target.disabled = false, 1000);
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
            isSelectAll: false,
            checkboxesDisable: true,
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

    const onStudentsToExcel = (data) => {
        return studentAPI.getStudentsToExcel(data);
    }

    const onStudentUpdate = (data) => {
        return userAPI.updateUser(data);
    }

    const onGetPrograms = (page, offset) => {
        return programAPI.getPrograms(page, offset);
    }

    const onDateFilter = (filter) => {
        setState({
            ...state,
            page: 0,
            filters: {
                ...state.filters,
                dateFilter: {
                    from: filter.from,
                    to: filter.to,
                }
            }
        })
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
                    <div className={classes.showCounts}>
                        <div className={classes.showCountText}>Отображать по: </div> {countItemsToShow(state.count, 5).map(
                        (i)=> {
                            const active = (+state.offset === +i ? ' ' + classes.active : '');
                            console.log(+state.offset === +i)
                            return <div className={classes.showCount + active} key={'show_count_' + i} onClick={
                                !active ?
                                    () => setState({
                                        ...state,
                                        loading: true,
                                        offset: i,
                                        page: 0
                                    }) : null
                            }>{i}</div>;
                        }
                    )}</div>
                    <div className={classes.selectedCount}>
                        <div className={classes.count}>{state.selectedStudents.size ? 'Количество выбранных студентов:  ' + state.selectedStudents.size : ''}</div>
                        <button onClick={onStudentReset}>Сбросить выбор</button>
                    </div>
                </div>

                <StudentsList
                    onStudentSelect={onStudentSelect}
                    onStudentUpdate={onStudentUpdate}
                    selectedStudents={state.selectedStudents}
                    students={state.students}
                    isSelectAll={state.isSelectAll}
                    checkboxesDisable={state.checkboxesDisable}
                    onGetPrograms={onGetPrograms}
                />
                <div>
                    {state.count && !state.loading ? <Paginator page={state.page} count={Math.ceil(state.count / state.offset)} changePage={changePage} /> : ''}
                </div>
            </>
        );
    }else if(state.program_id){
        content= 'Нет студентов';
    }

    return (
        <>

            <div>
                {state.programTitle ? (<h3>{state.programTitle}</h3>) : ''}
            </div>

            {state.program_id ? <UsersFilter onDateFilter={onDateFilter} />: ''}

            {content}

            {state.program_id ? <StudentsControlProtocol
                students={Array.from(state.selectedStudents)}
                onSubmit={onCreateStudentProtocol}
                programTitle={state.programTitle}
            /> : ''}

            {state.program_id ? <StudentsToExcel
                students={Array.from(state.selectedStudents)}
                onSubmit={onStudentsToExcel}
            /> : ''}

        </>
    )
}
