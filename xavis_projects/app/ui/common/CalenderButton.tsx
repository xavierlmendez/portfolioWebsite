'use client';

interface CalendarButtonProps {
    label: string;
    date: Date;
    onClick?: () => void;
}

export function CalendarButton({ label, date, onClick }: CalendarButtonProps) {
    return ( //rounded-lg mt-1 p-3 py-1 bg-blue-600 text-white disabled:opacity-50
        <div className="flex flex-col justify-between">
            <button
                className="rounded-lg mt-2 ml-8 mr-8 mb-0 bg-blue-600 text-white disabled:opacity-50"
                onClick={onClick}
            >
                {label}
            </button>

            <div className="flex-1 flex items-end justify-center mt-0 mb-3">
                <span className="text-gray-300 text-sm">{date.toDateString()}</span>
            </div>
        </div>
    );
}
