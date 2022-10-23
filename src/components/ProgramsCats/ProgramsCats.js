import {useEffect, useState} from "react";
import {programCatAPI} from "../../rest";
import {Loader} from "../Loader/Loader";
import classes from "./ProgramsCats.module.css";

export const ProgramsCats = (props) => {

    const [state, setState] = useState({
        loading: true,
        title: '',
        createResponse: '',
        cats: [],
        selected: new Set(),
        deletedId: 0
    })

    useEffect(() => {

        programCatAPI.getCats().then((res) => {
            setState({
                ...state,
                loading: false,
                cats: res.cats
            })
            props.onFilterUpdate(state.selected)
        })

    }, [setState, state.selected, state.deletedId])

    const onCreate = (e) => {
        e.preventDefault();
        setState({
            ...state,
            cats: [],
            loading: true
        })
        programCatAPI.create({
            title: state.title
        }).then(res=>{
            setState({
                ...state,
                loading: false,
                createResponse: res.message
            })
        });
    }

    const onDelete = (cat_id) => {
        setState({
            ...state,
            cats: [],
            loading: true
        })
        programCatAPI.delete(cat_id).then(res=>{
            setState({
                ...state,
                loading: false,
                createResponse: res.message,
                deletedId: res.id
            })
        });
    }

    let categories = [];
    if(state.cats && state.cats.length){
        categories = state.cats.map((c) => {
            return (
                <label key={c.title + c.id} >
                    {c.title}
                    <input onChange={(e) => {
                        let selectedClone = new Set(state.selected);
                        if(e.target.checked){
                            selectedClone.add(e.target.value);
                        }else{
                            selectedClone.delete(e.target.value);
                        }
                        setState({
                            ...state,
                            loading: true,
                            selected: new Set(selectedClone)
                        })
                    }} checked={state.selected.has(c.id)} value={c.id} type="checkbox"/>

                    <span onClick={ () => onDelete(c.id)} className={classes.delete_cat}>
                        <svg width={20} height={20} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </span>
                </label>
            )
        })
    }


    return (<div>
        <form onSubmit={onCreate}>
            <div>Создать категорию</div>
            <input onChange={(e) => {setState({
                ...state,
                title: e.target.value
            })}} type="text" value={state.title}/>
            <div>
                {state.createResponse}
            </div>
            <input type="submit" value={'Создать'}/>
        </form>

        <form>
            <div>Фильтр по категориям</div>
            <div className={classes.categories}>
                {
                    state.loading ? <Loader /> :  categories
                }
            </div>

        </form>
    </div>)
}