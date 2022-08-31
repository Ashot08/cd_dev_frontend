import classes from './ProgramsItem.module.css';
export const ProgramsItem = (props) => {
    return (
        <div
            className={classes.programs__item + ' ' + (props.isActive ? classes.active : '')}
            onClick={ !props.isActive ? () => props.showStudents(props.id, props.title) : null}
        >
            <div className={classes.programs__title}>
                {props.title}
            </div>
            <div>
                {props.date}
            </div>
        </div>
    )
}