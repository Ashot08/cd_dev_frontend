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
        selected: new Set()
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

    }, [setState, state.selected])

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