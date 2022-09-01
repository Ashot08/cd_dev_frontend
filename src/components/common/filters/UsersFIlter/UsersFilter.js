import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from './UsersFilter.module.css';

export const UsersFilter = (props) => {
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

    return (<>
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
    </>)
}