import classes from './StudentsListItem.module.css';
import {useEffect, useState} from "react";
import {Loader} from "../../Loader/Loader";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

export const StudentsListItem = (props) => {
    const [state, setState] = useState({
        isEditing : false,
        isLoading: false,
        isProgramsUpdating: false,
        result: '',
        isOpenPopup: false,
        programs: [],
        student_programs: new Set(props.student.student_programs),
        programsUpdateResult: '',
    });


    useEffect(() => {
        if(state.isOpenPopup){
            props.onGetPrograms({page: 0, offset: 999}).then(res => {
                setState({
                    ...state,
                    programs: res.programs
                })
            })
        }else{
            setState({
                ...state,
                programs: []
            })
        }
    }, [state.isOpenPopup])

    const checkProgram = (e) => {

        let studentProgramsClone = new Set(state.student_programs);

        if(state.student_programs.has(e.target.value)){
            studentProgramsClone.delete(e.target.value);
            setState({
                ...state,
                student_programs: studentProgramsClone
            })
        }else{

            studentProgramsClone.add(e.target.value);

            setState({
                ...state,
                student_programs: studentProgramsClone
            })
        }

    }

    const Edit = (props) => {

        const [editValue, setEditValue] = useState({
            value: '',
            result: ''
        })

        const editor = (<div>
        <span onClick={() => setState({
            ...state,
            isEditing: !state.isEditing
        })} className={classes.edit}>
            <svg width={'20'} height={'20'} viewBox="0 0 24 24"><path fill="currentColor" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z"/></svg>
        </span>
            {
                state.isEditing ?

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setState({
                            ...state,
                            isLoading: true
                        })
                        props.onStudentUpdate({
                            user_id: props.user_id,
                            [props.name]: editValue.value
                        }).then(res => {
                            setState({
                                ...state,
                                isLoading: false,
                                isEditing: false,
                                result: res.message
                            });
                        })}
                    }>
                        <input onChange={(e) => setEditValue({...editValue, value: e.target.value})} type="text" value={editValue.value}/>
                        <input type="submit" value={'Ok'}/>
                    </form>

                    :

                    ''
            }
        </div>);

        return (<>
            {
                state.isLoading ? <Loader /> : editor
            }
            {
                state.result ? state.result : ''
            }
        </>)
    }


    const programsHTML = <form onSubmit={(e) => {
        setState({
            ...state,
            isProgramsUpdating: true,
        })
        e.preventDefault();
        const data = {
            user_id: props.student.user_id,
            programs: Array.from(state.student_programs)
        }
        props.onUpdateUserPrograms(data).then(res => {
            setState({
                ...state,
                isProgramsUpdating: false,
                programsUpdateResult: res.message
            })
        });
    }}>{
        state.programs.map((p) => {
            return (
                <>
                    <div>
                        <label key={p.id} >
                            <input onChange={checkProgram} checked={state.student_programs.has(p.id)} name={p.id} type={'checkbox'} value={p.id} />
                            {p.title}
                        </label>
                    </div>
                </>
            )
        })
    }
        <input type={"submit"} value={'Обновить'} />

        <div>
            {state.isProgramsUpdating ? <Loader/> : state.programsUpdateResult}
        </div>
    </form>;

    const showUserData = () => {
        console.log(props.student.user_name)
    }



    return (
        <tr>
            <td>{props.student.user_id}</td>
            <td>
                <span onClick={
                    () => {
                        setState({
                            ...state,
                            isOpenPopup: true
                        })
                    }
                } className={classes.user_name}>{props.student.user_name}</span>
                <Popup
                    open={state.isOpenPopup}
                    onClose = {() => {setState({
                        ...state,
                        isOpenPopup: false
                    })}}
                    modal
                    nested
                >
                    <a className={classes.close} onClick={() => setState({
                        ...state,
                        isOpenPopup: false
                    })}>
                        &times;
                    </a>
                    <div className={classes.popup}>
                        <div>
                            <strong>{props.student.user_name}</strong> ({props.student.user_login})
                        </div>
                        <div>
                            <strong>Информация о студенте:</strong>
                            <div>
                                Email: {props.student.user_email}
                            </div>
                            <div>
                                СНИЛС: {props.student.user_snils}
                            </div>
                        </div>
                        <div>
                            <div><strong>Программы:</strong></div>
                            <div>
                                { state.programs.length
                                    ?
                                    programsHTML
                                    :
                                    <Loader />
                                }
                            </div>
                        </div>
                    </div>
                </Popup>
                <Edit name={'display_name'} onStudentUpdate={props.onStudentUpdate} user_id={props.student.user_id} /></td>
            <td>{props.student.user_login}</td>
            <td>{props.student.user_email}<Edit name={'user_email'} onStudentUpdate={props.onStudentUpdate} user_id={props.student.user_id} /></td>
            <td>{props.student.user_pass} <Edit name={'user_pass'} onStudentUpdate={props.onStudentUpdate} user_id={props.student.user_id} /></td>
            <td>{props.student.user_snils.toString()}<Edit name={'user_snils'} onStudentUpdate={props.onStudentUpdate} user_id={props.student.user_id} /></td>
            <td className={classes.progress_td}>{props.student.total_progress}% </td>
            <td>{props.student.start_date}</td>
            <td>
                <label className={classes.label__checkbox}>
                    <input
                        disabled={props.checkboxesDisable}
                        onChange={(e) => props.onStudentSelect(e, props.student.user_id)}
                        checked={props.isSelectAll || props.checked}
                        type="checkbox"
                    />
                </label>
            </td>
        </tr>
    )
}