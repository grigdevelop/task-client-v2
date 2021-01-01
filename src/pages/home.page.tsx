import { useState } from "react";
import { useModal } from "../utils/universalModal";

const showCalendar = (calendar: []) => {
    for (let i = 0; i < calendar.length; i++) {
        // TODO: write show logic
    }
}

const getMonth = (year: number, month: number) => {
    // months are working on 0 based system
    month = month - 1;

    // create dates
    const lastDate = new Date(year, month + 1, 0);
    const firstDate = new Date(year, month, 1);
    const prevMonthLastDay = new Date(year, month, 0);
    const nextMonthFirstDay = new Date(year, month + 1, 1);

    // last date info
    const lastDayInMonth = lastDate.getDate();
    const firstDayOfWeekInMonth = firstDate.getDay();
    console.log("firstDayOfWeekInMonth", firstDate, firstDayOfWeekInMonth);

    const monthInfo = [];

    if (firstDayOfWeekInMonth > 0) {
        const prevLastDay = prevMonthLastDay.getDate();
        console.log("prevLastDay", prevMonthLastDay);
        for (let i = prevLastDay - firstDayOfWeekInMonth + 1; i <= prevLastDay; i++) {
            monthInfo.push({
                day: i,
                month: prevMonthLastDay.getMonth(),
                year: prevMonthLastDay.getFullYear()
            })
        }
    }

    for (let i = 1; i <= lastDayInMonth; i++) {
        monthInfo.push({
            day: i,
            month,
            year
        });
    }

    for (let i = 1; i < (7 * 6) - monthInfo.length; i++) {
        monthInfo.push({
            day: i,
            month: month + 1,
            year: nextMonthFirstDay.getFullYear()
        })
    }

    console.log("full year", monthInfo);
};
getMonth(2021, 1);


export const HomePage = () => (
    <>
        <div className="row">
            <div className="col-2">
                <div className="btn-group" role="group" aria-label="First group">
                    <button type="button" className="btn btn-sm">1</button>
                    <button type="button" className="btn btn-secondary btn-sm">2</button>
                    <button type="button" className="btn btn-secondary btn-sm">3</button>
                    <button type="button" className="btn btn-secondary btn-sm">4</button>
                </div>
                <div className="btn-group" role="group" aria-label="First group">
                    <button type="button" className="btn btn-secondary btn-sm">1</button>
                    <button type="button" className="btn btn-secondary btn-sm">2</button>
                    <button type="button" className="btn btn-secondary btn-sm">32</button>
                    <button type="button" className="btn btn-secondary btn-sm">4</button>
                </div>

            </div>
        </div>
    </>
);