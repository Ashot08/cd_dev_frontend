import {useState} from "react";
import InputMask from 'react-input-mask';
import {programAPI} from "../../../rest";

export const CreateUserForm = (props) => {
    const [state, setState] = useState({
        isShowed: false,
        data: {
            user_login: '',
            first_name: '',
            snils: '',
            user_email: '',
            user_position: '',
            program_id: props.programId
        },
        formResult: ''
    });
    const onShowForm = () => {
        setState({
            ...state,
            isShowed: !state.isShowed
        })
    }

    const onChangeForm = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...state,
            data: {
                ...state.data,
                program_id: props.programId,
                [name]: value
            }
        });
    }

    const resultHandler = (result) => {
        console.log(result)
        setState({
            ...state,
            formResult: result.message
        })
    }

    return (
        <div>
            <button onClick={onShowForm}>Добавить слушателя</button>

            {state.isShowed ?
                <form onSubmit={(e) => {
                    e.preventDefault();
                    props.onSubmit(state.data).then(res => resultHandler(res))
                }}>
                    <input     onChange={(e) => onChangeForm(e)} value={state.data.user_login} name={'user_login'} type="text" placeholder={'Логин'}/>
                    <input     onChange={(e) => onChangeForm(e)} value={state.data.first_name} name={'first_name'} type="text" placeholder={'ФИО'}/>
                    <InputMask onChange={(e)     => onChangeForm(e)} value={state.data.snils} name={'snils'} mask="999-999-999 99" maskChar={null} placeholder={'СНИЛС'} />
                    <input     onChange={(e) => onChangeForm(e)} value={state.data.user_email} name={'user_email'} type="email" placeholder={'Email'}/>
                    <input     onChange={(e) => onChangeForm(e)} value={state.data.user_position} name={'user_position'} type="text" placeholder={'Должность'}/>
                    <input type="submit" value={'Добавить'}/>
                </form>
                :
                ''
            }
            <div>
                {state.formResult}
            </div>
        </div>

    )
}