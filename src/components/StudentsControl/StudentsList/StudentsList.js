import {StudentsListItem} from "../StudentsListItem/StudentsListItem";


export const StudentsList = (props) => {

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Логин</th>
                        <th>Email</th>
                        <th>Пароль</th>
                        <th>СНИЛС</th>
                        <th>Прогресс</th>
                        <th>Дата окончания</th>
                        <th>
                            <label className="">
                                <input
                                    checked={props.isSelectAll}
                                    onChange={(e) => props.onStudentSelect(e, props.students, true)}
                                    type="checkbox"
                                />
                                    Все
                            </label>
                        </th>
                    </tr>
                    {props.students.map(s => <StudentsListItem
                        isSelectAll={props.isSelectAll}
                        checkboxesDisable={props.checkboxesDisable}
                        onStudentSelect={props.onStudentSelect}
                        onStudentUpdate={props.onStudentUpdate}
                        checked={props.selectedStudents.has(s.user_id)}
                        key={s.user_id}
                        student={s} />)}
                </tbody>
            </table>
        </>
    )
}
