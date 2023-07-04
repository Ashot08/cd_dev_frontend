import {useState} from "react";
import InputMask from 'react-input-mask';
import {programAPI} from "../../../rest";
import classes from '../forms.module.css';
import {Loader} from "../../Loader/Loader";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import {StudentsList} from "../../StudentsControl/StudentsList/StudentsList";
import {StudentsControlAll} from "../../StudentsControl/StudentsControlAll";

export const CreateUserForm = (props) => {
    const [state, setState] = useState({
        isShowed: false,
        isLoading: false,
        isOpenPopup: false,
        data: {
            user_login: '',
            first_name: '',
            snils: '',
            user_email: '',
            user_position: '',
            program_id: props.programId,
            user_pass: ''
        },
        formResult: ''
    });
    const onShowForm = () => {
        setState({
            ...state,
            isShowed: !state.isShowed
        })
    }

    const onTogglePopup = () => {
        setState({
            ...state,
            isOpenPopup: !state.isOpenPopup
        })
    }

    const onChangeForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if(name === 'snils'){
            setState({
                ...state,
                data: {
                    ...state.data,
                    program_id: props.programId,
                    [name]: value,
                    user_login: value,
                    user_pass: value
                }
            });
        }else{
            setState({
                ...state,
                data: {
                    ...state.data,
                    program_id: props.programId,
                    [name]: value
                }
            });
        }
    }

    const resultHandler = (result) => {
        console.log(result)
        setState({
            ...state,
            isLoading: false,
            formResult: result.message
        })
    }

    return (
        <div>
            <button onClick={onShowForm}>Добавить слушателя</button>

            {state.isShowed ?
                <>
                    <div>
                        <button onClick={onTogglePopup}>Выбрать из списка</button>

                        <Popup
                            open={state.isOpenPopup}
                            onClose = {() => {setState({
                                ...state,
                                isOpenPopup: false
                            })}}
                            modal
                            nested
                        >
                            <div className={classes.studentsAddPopup}>
                                <StudentsControlAll />
                            </div>


                        </Popup>

                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setState({
                            ...state,
                            isLoading: true,
                        })
                        props.onSubmit(state.data).then(res => resultHandler(res))
                    }}>
                        <input hidden={true}  onChange={(e) => onChangeForm(e)} value={state.data.snils} name={'user_login'} type="text" placeholder={'Логин'}/>
                        <input     onChange={(e) => onChangeForm(e)} value={state.data.first_name} name={'first_name'} type="text" placeholder={'ФИО'}/>
                        <InputMask onChange={(e)     => onChangeForm(e)} value={state.data.snils} name={'snils'} mask="999-999-999 99" maskChar={null} placeholder={'СНИЛС'} />
                        <input     onChange={(e) => onChangeForm(e)} value={state.data.user_email} name={'user_email'} type="email" placeholder={'Email'}/>
                        <input     onChange={(e) => onChangeForm(e)} value={state.data.user_position} name={'user_position'} type="text" placeholder={'Должность'}/>
                        <input type="submit" value={'Добавить'}/>
                    </form>

                </>
                :
                ''
            }

            <div className={classes.result + ( state.formResult ? ' cd__warning' : '' ) }>
                {state.isLoading ? <Loader /> : state.formResult}
            </div>
        </div>

    )
}