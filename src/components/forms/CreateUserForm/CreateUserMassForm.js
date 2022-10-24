import classes from '../forms.module.css';
import {Link} from "react-router-dom";
import {useState} from "react";
import {Loader} from "../../Loader/Loader";

export const CreateUserMassForm = (props) => {

    const [state, setState] = useState({
        isLoading: false,
        formResult: '',
        data: {
            file_path: '',
            program_id: props.programId,

        },
    });

    const resultHandler = (result) => {
        console.log(result)
        setState({
            ...state,
            isLoading: false,
            formResult: result.message
        })
    }

    return (
        <div className={classes.cd__students_mass_adding}>
            <h3>Добавить слушателей массово (Excel)</h3>
            <Link className={classes.cd__students_mass_template_link} to={"/wp-content/plugins/courses_dashboard_2/views/program/add_students_template.xlsx"}>
                <svg width={24} height={24} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12.06L9.93 8.89H8.22L7.13 10.9L7.09 10.96L7.06 11.03Q6.8 10.5 6.5 9.96 6.25 9.43 5.97 8.89H4.16L6.05 12.08L4 15.28H5.78M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H12V15.75M13.88 11.38V8.25H12V11.38M13.88 7V4.5H8.25V7M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38M20.75 7V4.5H15.13V7Z"></path>
                </svg>
                Скачать шаблон для загрузки
            </Link>
            <form onSubmit={(e) => {
                e.preventDefault();
                setState({
                    ...state,
                    isLoading: true,
                })
                props.onSubmit(state.data).then(res => resultHandler(res))
            }}>
                <input onChange={(e) => {
                    setState({
                        ...state,
                        data: {
                            ...state.data,
                            file_path: e.target.value
                        }
                    })
                }} accept={'.xls, .xlsx'} name="cd__students_mass_file" type="file" />
                <div className={classes.cd__button}>
                    <input type="submit" value={'Добавить'}/>
                </div>
            </form>
            <div className={classes.result + ( state.formResult ? ' cd__warning' : '' ) }>
                {/*{state.isLoading ? <Loader /> : state.formResult}*/}
            </div>
        </div>
    )
}