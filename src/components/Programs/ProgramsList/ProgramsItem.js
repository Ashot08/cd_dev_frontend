import classes from './ProgramsItem.module.css';
import Popup from "reactjs-popup";
import {Loader} from "../../Loader/Loader";
import {useState} from "react";
export const ProgramsItem = (props) => {

    const [state, setState] = useState({
        isOpenConfirmDelete: false,
        deletePending: false,
        deleted: false
    })

    const onEdit = (e) => {
        e.stopPropagation();

    }
    const onDelete = (e) => {
        e.stopPropagation();
        setState({
            ...state,
            isOpenConfirmDelete: true,
        })
    }

    const onDeleteSubmit = () => {
        setState({
            ...state,
            deletePending: true
        })
        props.onProgramDelete()(props.id).then((res) => {
            if(res.success){
                setState({
                    ...state,
                    deletePending: false,
                    isOpenConfirmDelete: false,
                    deleted: true
                })
            }
        })
    }

    if(state.deleted) return;

    return (
        <div
            className={classes.programs__item + ' ' + (props.isActive ? classes.active : '')}
            onClick={ !props.isActive ? () => props.onProgramClick(props.id, props.title) : null}
        >
            <div className={classes.programs__title}>
                {props.title}
            </div>
            <div>
                {props.date}
            </div>

            {props.editable ? <div className={classes.edit_program} onClick={onEdit}>
                <svg width={'17'} height={'17'} viewBox="0 0 24 24"><path fill="currentColor" d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z"/></svg>
            </div> : ''}

            {props.editable ? <div className={classes.edit_program + ' ' + classes.delete_program} onClick={onDelete}>
                <svg width={'17'} height={'17'} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
            </div> : ''}

            <Popup
                open={state.isOpenConfirmDelete}
                onClose = {() => {setState({
                    ...state,
                    isOpenConfirmDelete: false
                })}}
                modal
                nested
            >
                <a className={classes.close} onClick={() => setState({
                    ...state,
                    isOpenConfirmDelete: false
                })}>
                    &times;
                </a>
                <div className={classes.popup}>
                    <div>
                        Вы уверены, что хотите удалить эту программу?
                    </div>

                    <div>
                        <button onClick={onDeleteSubmit}>
                            {state.deletePending ? <Loader /> : 'Удалить'}
                        </button>
                        <button onClick={()=>{setState({
                            ...state,
                            isOpenConfirmDelete: false
                        })}}>Отмена</button>
                    </div>
                </div>
            </Popup>

        </div>
    )
}