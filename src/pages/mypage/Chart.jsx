import { eachDayOfInterval, isSameDay, getDay, format } from "date-fns";
import styles from "./Chart.module.scss";
import { useState } from "react";

const Calendar = ({ startDate, endDate, studyData }) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const [tooltipDate, setTooltipDate] = useState(null); // 말풍선에 표시할 날짜 정보 상태

  const handleMouseEnter = (date) => {
    setTooltipDate(date);
  };
  const handleMouseLeave = () => {
    setTooltipDate(null);
  };

  const Tooltip = ({ date }) => {
    return <div className={styles.tooltip}>{format(date, "yyyy-MM-dd")}</div>;
  };

  const rows = [];
  let currentRow = [];
  days.forEach((day) => {
    const dayOfWeek = getDay(day);
    if (dayOfWeek === 6) {
      // 토요일인 경우
      currentRow.push(day);
      rows.push(currentRow);
      currentRow = [];
    } else {
      currentRow.push(day);
    }
  });
  if (currentRow.length !== 0) {
    rows.push(currentRow);
  }

  const reversedRows = rows.reverse();

  return (
    <div className={styles.calendar}>
      {reversedRows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.calendarRow}>
          {row.map((day, columnIndex) => {
            const studyInfo = studyData.find((data) =>
              isSameDay(data.date, day)
            );
            const duration = studyInfo ? studyInfo.duration : 0;
            const color = duration > 0 ? "#c79aff" : "#c2bcca";

            const gridColumn = columnIndex + 1; // 일요일은 첫 번째 열

            return (
              <div
                key={day.toISOString()}
                className={styles.calendarCell}
                style={{ backgroundColor: color, gridColumn: gridColumn }}
                onMouseEnter={() => handleMouseEnter(day)}
                onMouseLeave={handleMouseLeave}
              >
                {tooltipDate && isSameDay(day, tooltipDate) && (
                  <Tooltip date={tooltipDate} />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Chart = () => {
  const startDate = new Date("2023-01-01");
  const endDate = new Date();
  const studyData = [
    { date: new Date("2023-01-01"), duration: 2 },
    { date: new Date("2023-01-05"), duration: 1.5 },
    // ...
  ];

  return (
    <Calendar startDate={startDate} endDate={endDate} studyData={studyData} />
  );
};

export default Chart;
