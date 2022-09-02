import classes from './StudentsListItem.module.css';

export const StudentsListItem = (props) => {

    const Edit = () => (<span className={classes.edit}><svg width={'20'} height={'20'} viewBox="0 0 24 24">
        <path fill="currentColor" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z" />
    </svg></span>)

    return (
        <tr>
            <td>{props.student.user_id}</td>
            <td>{props.student.user_name} <Edit /></td>
            <td>{props.student.user_login}</td>
            <td>{props.student.user_email}</td>
            <td>{props.student.user_pass}</td>
            <td>{props.student.user_snils}</td>
            <td>{props.student.total_progress}</td>
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