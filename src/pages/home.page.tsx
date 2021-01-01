import { concat, slice } from "lodash";
import { useState } from "react";
import { useModal } from "../utils/universalModal";

const showCalendar = (calendar: []) => {
    for (let i = 0; i < calendar.length; i++) {
        // TODO: write show logic
    }
}

type DayInfo = {
    year: number,
    month: number,
    day: number,
    dayOfWeek: number
};

function getMonthInfo(current: Date, starts: number = 1, ends?: number | undefined): DayInfo[] {
    console.log("I'm here");
    const year = current.getFullYear(),
        month = current.getMonth(),
        lastDay = ends ?? new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month, 1).getDay();

    if (starts <= 0) {
        starts = lastDay - starts;
    }

    const monthInfo: DayInfo[] = [];

    for (let day = starts; day <= lastDay; day++) {
        monthInfo.push({
            year, month, day, dayOfWeek
        });
        dayOfWeek = (dayOfWeek + 1) % 7;
    }

    return monthInfo;
}

const btnStyle: React.CSSProperties = {
    width: 30,
    padding: "2px 0px",
    fontSize: 12,
    flex: "none"
};

const getMonthCalendarInfo = (current: Date) => {
    const year = current.getFullYear(), month = current.getMonth();
    return concat(getMonthInfo(new Date(year, month - 1)), getMonthInfo(current), getMonthInfo(new Date(year, month + 1)));
};

const CalendarPicker = ({ year, month }: { year: number, month: number }) => {
    let selectedYear = year,
        selectedMonth = month;
    let calenderInfo = getMonthCalendarInfo(new Date(selectedYear, selectedMonth));
    calenderInfo = slice(calenderInfo, 7 * 4, 7 * 4 + 7 * 6);

    const getKey = (dayInfo: DayInfo): string => {
        return `${dayInfo.month} - ${dayInfo.day}`;
    };

    return (
        <>
            {calenderInfo.map(dayInfo => <button key={getKey(dayInfo)} disabled={dayInfo.month !== selectedMonth} className="btn btn-sm" style={btnStyle}>{dayInfo.day}</button>)}
        </>
    );
}


const CalendarPanel = () => {
    const [year, setYear] = useState(2021);
    const [month, setMonth] = useState(0);

    const nextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    const prevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };

    const daysOfWeek = [
        "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
    ];

    return (
        <>
            <div className="row">
                <div className="col">
                    {year}
                </div>
                <div className="col">
                    <div className="btn-group">
                        <button onClick={prevMonth} className="btn btn-sm">{"<"}</button>
                        <button onClick={nextMonth} className="btn btn-sm">{">"}</button>
                    </div>
                </div>
            </div>
            <hr />
            <div className="btn-group d-flex flex-wrap align-content-start" role="group" aria-label="First group" style={{ width: 210 }}>
                {daysOfWeek.map(dof => <span className="btn-sm text-center" style={btnStyle}>{dof}</span>)}
                <hr />
                <CalendarPicker year={year} month={month} />
            </div>
        </>
    );
}


export const HomePage = () => (
    <>
        <div className="row">
            <div className="col-2">
                <CalendarPanel />
            </div>
        </div>
    </>
);