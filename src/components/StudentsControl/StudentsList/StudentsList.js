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
                        <th>
                            <label className="cd__table_select_all_label">
                                <input type="checkbox" data-action="cd__table_select_all" />
                                    Все
                            </label>
                        </th>
                    </tr>
                    {props.students.map(s => <StudentsListItem key={s.user_id} student={s} />)}
                </tbody>
            </table>
        </>
    )
}
