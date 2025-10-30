'use client';

interface CalendarButtonProps {
  label: string;
  date: Date;
  onClickFunction: () => void
}

export function CalendarButton(
  {
    label,
    date,
    onClickFunction
  }: CalendarButtonProps) {

  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-3">
      <button
        onClick = {onClickFunction}
        className="rounded-lg px-5 py-2 bg-blue-600 text-white 
                  hover:bg-blue-500 active:bg-blue-700 transition 
                  disabled:opacity-50 shadow-md shadow-blue-900/30"
      >
        {label}
      </button>
      <span className="text-gray-300 text-sm">{date.toDateString()}</span>
    </div>
  );
}