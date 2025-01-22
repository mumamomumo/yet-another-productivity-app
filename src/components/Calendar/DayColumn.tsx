function DayColumn(props: {
  day: number | string;
  date: number | string;
  isToday?: boolean;
}) {
  console.log(props.isToday);

  return (
    <div className="h-full border-2">
      <div className="h-full border-2 text-center">
        <p className={props.isToday ? "underline" : ""}>{props.day}</p>
        <p>{props.date}</p>
      </div>
    </div>
  );
}

export default DayColumn;
