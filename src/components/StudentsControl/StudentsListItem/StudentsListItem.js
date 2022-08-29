export const StudentsListItem = (props) => {
    return (
        <tr>
            <td>{props.student.user_id}</td>
            <td>{props.student.user_name}</td>
            <td>{props.student.user_login}</td>
            <td>{props.student.user_email}</td>
            <td>{props.student.user_snils}</td>
            <td>{props.student.user_pass}</td>
            <td>{props.student.total_progress}</td>
            <td>
                <input type="checkbox"/>
            </td>
        </tr>
    )
}