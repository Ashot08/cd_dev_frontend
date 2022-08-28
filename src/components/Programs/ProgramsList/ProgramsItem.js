import classes from './ProgramsItem.module.css';
export const ProgramsItem = (props) => {
    return (
        <div className={classes.programs__item} onClick={() => props.showStudents(props.id)}>
            <div className={classes.programs__title}>
                {props.title}
            </div>
            <div>
                {props.date}
            </div>
        </div>
    )
}