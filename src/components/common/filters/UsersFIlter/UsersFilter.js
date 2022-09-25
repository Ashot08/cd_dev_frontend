import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from './UsersFilter.module.css';

export const UsersFilter = (props) => {
    const [state, setState] = useState({
        displayNameInput: props.filters.displayNameFilter
    })

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    useEffect(() => {
        if (endDate){
            props.onDateFilter({
                from: startDate,
                to: endDate,
            })
        }else if(!endDate && !startDate){
            props.onDateFilter({
                from: null,
                to: null,
            })
        }
    },[endDate])

    const onDisplayNameFilter = (e) => {
        e.preventDefault();
        props.onDisplayNameFilter(state.displayNameInput);
    }

    return (<>
        <div className={classes.filter_wrapper}>
            <div className={classes.filter_item}>
                <div className={classes.dateFilter}>
                    Дата окончания:
                    <div>
                        <DatePicker
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            showDisabledMonthNavigation
                        />
                    </div>
                    <button onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                    }}>Сбросить фильтр по дате</button>
                </div>
            </div>

            <div className={classes.filter_item}>
                <form className={classes.filter_inner} onSubmit={onDisplayNameFilter}>
                    <input
                        onChange={(e) => {
                            setState({
                                ...state,
                                displayNameInput: e.target.value
                            })
                        }
                        }
                        type="text"
                        name={'display_name'}
                        value={state.displayNameInput}
                        placeholder={'Поиск по имени'}
                    />
                    {/*<input type="submit" value={'Искать'}/>*/}
                    <button>Искать</button>
                </form>

            </div>
        </div>


    </>)
}