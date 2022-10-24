
import {useEffect, useState} from "react";
import {Programs} from "../Programs";
import {programAPI, studentAPI} from "../../../rest";
import {logDOM} from "@testing-library/react";
import {Loader} from "../../Loader/Loader";
import {ProgramsCats} from "../../ProgramsCats/ProgramsCats";
import {CreateUserForm} from "../../forms/CreateUserForm/CreateUserForm";
import {CreateUserMassForm} from "../../forms/CreateUserForm/CreateUserMassForm";



export const ProgramsPage = (props) => {

    const [state, setState] = useState({
        loading: false,
        program_id: 0,
        programTitle: '',
        programTree: '',
        catsFilters: []
    });

    useEffect(() => {
        programAPI.getTree(state.program_id).then((res) => {
            setState({
                ...state,
                loading: false,
                programTree: res.message
            })
        } );
    },[state.program_id])

    const showProgram = (p, programTitle = '') => {
        if(!state.loading){
            setState({
                ...state,
                loading: true,
                program_id: p,
                programTitle: programTitle
            })
        }

    }

    const onStudentCreate = (data) => {
        return studentAPI.createStudent(data)
    }

    const onStudentMassCreate = (data) => {
        return studentAPI.createStudentMass(data)
    }

    const onProgramDelete = () => {
        return programAPI.delete;
    }

    const onFilterUpdate = (cats) => {
        setState({
            ...state,
            catsFilters: Array.from(cats)
        })
    }

    const createTree = (treeStructure) => {
        if(!treeStructure.length) return;
        let tree = [];
        for(let li of treeStructure){
            let classes = li.is_open ? 'cd__list_item_open ' : 'cd__list_item_not_open ';
            classes += li.has_children ? 'cd__list_has_children ' : 'cd__list_has_not_children ';
            tree.push(<li key={li.link} className={classes}>
                {li.is_open ?

                    <div className="cd__program_hierarchy_list_item_wrapper">
                        <a href={li.link}>
                            <span>{li.name}</span>
                            <span className="cd__progress_value"> - {li.progress} %</span>
                        </a>
                    </div>
                    :
                    <div className="cd__program_hierarchy_list_item_wrapper">
                        <span>{li.name}</span>
                        <svg width={14} height={14} viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M12,17C10.89,17 10,16.1 10,15C10,13.89 10.89,13 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M18,20V10H6V20H18M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10C4,8.89 4.89,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                        </svg>
                    </div>
                }

                {li.has_children ? <ul>{createTree(li.children)}</ul> : ''}

            </li>)
        }
        return tree;
    }
    const tree = createTree(state.programTree)


    return (
        <>
            {state.loading ? <Loader/> : <div className="cd__program_hierarchy_list"><ul>{tree}</ul></div>}
            <ProgramsCats onFilterUpdate={onFilterUpdate} />

            <Programs catsFilters={state.catsFilters} onProgramDelete={onProgramDelete} editable={true} activeProgram={state.program_id} onProgramClick={showProgram} />

            {
                state.program_id ?
                    <CreateUserForm programId={state.program_id} onSubmit={onStudentCreate} />
                    :
                    ''
            }

            {
                state.program_id ?
                    <CreateUserMassForm programId={state.program_id} onSubmit={onStudentMassCreate} />
                    :
                    ''
            }

        </>
    )
}
