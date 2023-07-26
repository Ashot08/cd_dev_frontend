import classes from './ProgramsItem.module.css';
import Popup from "reactjs-popup";
import {Loader} from "../../Loader/Loader";
import {useEffect, useState} from "react";
import {programAPI, programCatAPI} from "../../../rest";
import {CreateUserMassForm} from "../../forms/CreateUserForm/CreateUserMassForm";
import {CreateUserForm} from "../../forms/CreateUserForm/CreateUserForm";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
export const ProgramsItem = (props) => {

    const [state, setState] = useState({
        isOpenConfirmDelete: false,
        isOpenEditProgram: false,
        deletePending: false,
        deleted: false,
        cats: [],
        catsActive: new Set(),
        catToAssign: {id: 0, action: ''},
        catsChangeResult: '',
        catsLoading: false,
        editableTree : {},
        isEditProgramStructureLoading: true
    })

    useEffect(() => {
        if(state.isOpenEditProgram){
            programCatAPI.getCats(props.id).then((res) => {
                setState({
                    ...state,
                    cats: res.cats,
                    catsActive: new Set(res.active)
                })
            })



        }
    }, [state.isOpenEditProgram])

    useEffect(() => {
        programAPI.getEditableTree(props.id).then((res) => {

            const structureArray = [];

            for(let el in res){

                structureArray.push(res[el])

            }
            setState(
                {
                    ...state,
                    editableTree: structureArray,
                    isEditProgramStructureLoading: false
                }
            )
        })
    }, [state.isEditProgramStructureLoading])

    const onEditProgramStructure = () =>{

            setState(
                {
                    ...state,
                    isEditProgramStructureLoading: true
                }
            )
    }

    useEffect( () => {
        if(state.isOpenEditProgram){
            setState({
                ...state,
                catsLoading: true,
                catsChangeResult: ''
            })

            programCatAPI.assignCategoryToProgram({
                action: state.catToAssign.action,
                program_id: props.id,
                program_cat_id: state.catToAssign.id
            }).then((res) => {
                setState({
                    ...state,
                    catsLoading: false,
                    catsChangeResult: <div className={'cd__warning'}>{res.message}</div>
                })
            })
        }

    },[state.catToAssign] )

    const onEdit = (e) => {
        e.stopPropagation();
        setState({
            ...state,
            isOpenEditProgram: true,
        })

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

    const onSubmitCategory = (e) => {

        let catsActiveSet = new Set(state.catsActive);
        let action = '';
        if(e.target.checked){
            action = 'add';
            catsActiveSet.add(e.target.value)

        }else{
            action = 'delete';
            catsActiveSet.delete(e.target.value);

        }

        setState({
            ...state,
            catsActive: catsActiveSet,
            catToAssign: {action  , id: e.target.value}
        })

    }

    if(state.deleted) return;

    const cats = state.cats.map((cat) => {
        return <label key={cat.id}>
            {cat.title}
            <input onChange={onSubmitCategory} checked={state.catsActive.has(cat.id)} value={cat.id} type={'checkbox'}  />
        </label>
    })

    const recursiveMap = (arr) => {

        function toggleOpen (e) {
            const ul = e.target.closest('label').querySelector('ul');
            if(ul.dataset.open === 'false'){
                e.target.innerHTML = '-';
                ul.dataset.open = 'true';
            } else {
                e.target.innerHTML = '+';
                ul.dataset.open = 'false';
            }

        }

        return (
            arr.map(el => {

                return (

                    <li>
                        <label htmlFor="">

                            {el.children.length
                                ?
                                <span data-id={el.id} onClick={(e) => {toggleOpen(e)}}>
                                    {el.is_open ? '-' : '+'}
                                </span>
                                : ''
                            }

                            <input onChange={()=>console.log('change')} checked={el.is_checked} type="checkbox" value={el.id}/>
                            <span>{el.name}</span>
                            {el.children.length ?
                                <ul data-open={el.is_open ? true : false}>
                                    {recursiveMap(el.children)}
                                </ul>
                                :
                                ''
                            }

                        </label>
                    </li>

                )

            })
        )

    }

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

            <Popup
                open={state.isOpenEditProgram}
                onClose = {() => {setState({
                    ...state,
                    isOpenEditProgram: false
                })}}
                modal
                nested
            >
                <a className={classes.close} onClick={() => setState({
                    ...state,
                    isOpenEditProgram: false
                })}>
                    &times;
                </a>
                <div className={classes.popup}>
                    <div>
                        <h3>Редактирование программы</h3>
                    </div>

                    <Tabs>
                        <TabList>
                            <Tab>
                                <strong>Категории</strong>
                            </Tab>
                            <Tab onClick={onEditProgramStructure}>
                                <strong>Состав программы</strong>
                            </Tab>
                            <Tab>
                                <strong>Информация о программе</strong>
                            </Tab>
                        </TabList>

                        <TabPanel>

                            <div>
                                <div><strong>Присвоить категорию</strong></div>

                                {state.catsLoading ? <Loader />: <div className={classes.categories}>{cats}</div>}

                                <div>

                                    {state.catsChangeResult}

                                </div>

                            </div>

                        </TabPanel>

                        <TabPanel>

                            {state.isEditProgramStructureLoading ? <Loader /> :
                                <div className={classes.edit_programs}>
                                    {

                                        state.editableTree.map((el) => {
                                            return (
                                                <>
                                                    <div onClick={()=>console.log(state.editableTree)} className={classes.editable_program}>
                                                        <div><img src={el.image_url} alt={el.name} /></div>
                                                        <div className={classes.editable_program_name}>{el.name}</div>

                                                        {el.children.length
                                                            ?
                                                            <ul>
                                                                {recursiveMap(el.children)}
                                                            </ul>
                                                            :
                                                            ''
                                                        }

                                                    </div>

                                                </>
                                            )
                                        } )


                                    }


                                </div>
                            }

                        </TabPanel>

                        <TabPanel>

                            <div><strong>Информация о программе</strong></div>

                        </TabPanel>

                    </Tabs>

                </div>
            </Popup>

        </div>
    )
}

