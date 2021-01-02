import { concat, slice } from "lodash";
import { useMemo, useState } from "react";
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

const DatePickerDaysTable = (
    { year, month, selectedDay, onDayClick }:
        {
            year: number,
            month: number,
            selectedDay: DayInfo | null,
            onDayClick?: (dayInfo: DayInfo) => void;
        }) => {
    let currentYear = year,
        currentMonth = month;
    let calenderInfo = useMemo(() => {
        return getMonthCalendarInfo(new Date(currentYear, currentMonth))
    }, [currentMonth, currentYear]);
    calenderInfo = slice(calenderInfo, 7 * 4, 7 * 4 + 7 * 6);

    const getKey = (dayInfo: DayInfo): string => {
        return `${dayInfo.month} - ${dayInfo.day}`;
    };

    const handleDayClick = (dayInfo: DayInfo) => {
        if (onDayClick) onDayClick(dayInfo);
    };

    const compareDays = (day: DayInfo, selectedDay: DayInfo | null) => {
        if (selectedDay) {
            return (
                selectedDay.day === day.day &&
                selectedDay.month === day.month &&
                selectedDay.year === day.year
            );
        }
        return false;
    };

    return (
        <>
            {
                calenderInfo.map(dayInfo =>
                    <button
                        key={getKey(dayInfo)}
                        disabled={dayInfo.month !== currentMonth}
                        className={`btn btn-sm ${compareDays(dayInfo, selectedDay) ? "btn-primary" : ""}`}
                        style={btnStyle}
                        onClick={() => handleDayClick(dayInfo)}
                    >
                        {dayInfo.day}
                    </button>
                )
            }
        </>
    );
}

const DatePickerWeekNames = () => {
    const daysOfWeek = [
        "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
    ];

    return (
        <>
            {daysOfWeek.map(dow => <span key={dow} className="btn-sm text-center" style={btnStyle}>{dow}</span>)}
        </>
    );
};

const DatePickerHeader = ({
    year, month,
    onPrevClick, onNextClick }: {
        year: number,
        month: number,
        onPrevClick?: () => void;
        onNextClick?: () => void;
    }) => {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const navBtnStyles: React.CSSProperties = {
        padding: '0px 0px'
    };

    const noPaddingStyles: React.CSSProperties = {
        padding: "0 Important!",
        margin: "0 Important!"
    };

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <p className="small">{year}</p>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-2">
                            <button onClick={onPrevClick} className="btn btn-sm" style={navBtnStyles}>{"<"}</button>
                        </div>
                        <div className="col-8">
                            <p className="small text-center">{months[month]}</p>
                        </div>
                        <div className="col-2">
                            <button onClick={onNextClick} className="btn btn-sm" style={navBtnStyles}>{">"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const DatePicker = () => {
    const [year, setYear] = useState(2021);
    const [month, setMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState<DayInfo | null>(null);

    const handleNextMonth = () => {
        if (month === 11) {
            setYear(year + 1);
            setMonth(0);
        } else {
            setMonth(month + 1);
        }
    };

    const handlePrevMonth = () => {
        if (month === 0) {
            setYear(year - 1);
            setMonth(11);
        } else {
            setMonth(month - 1);
        }
    };

    const handleDayClick = (dayInfo: DayInfo) => {
        setSelectedDay(dayInfo);
    };

    const panelStyles: React.CSSProperties = {
        width: 210
    };

    return (
        <>
            <div style={panelStyles}>
                <DatePickerHeader onNextClick={handleNextMonth} onPrevClick={handlePrevMonth} year={year} month={month} />
                <hr />
                <div className="btn-group d-flex flex-wrap align-content-start" role="group" aria-label="First group">
                    <DatePickerWeekNames />
                    <hr />
                    <DatePickerDaysTable year={year} month={month} selectedDay={selectedDay} onDayClick={handleDayClick} />
                </div>
            </div>
        </>
    );
}


export const HomePage = () => (
    <>
        <div className="row">
            <div className="col">
                <DatePicker />
            </div>
        </div>
    </>
);