'use client'
// documentation for chartJS http://react-chartjs-2.js.org/
import { useState } from 'react'
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Tooltip,
    TooltipItem,
    Legend,
    ScatterDataPoint,
    ChartData,
    ChartOptions,
} from 'chart.js'
import { Line, } from 'react-chartjs-2'

ChartJS.register(LineElement, PointElement, LinearScale, Tooltip, Legend)

// Use Chart.js' point type instead of a custom one
type Point = ScatterDataPoint

const defaultPointsText = `1,2
2,3
3,2.5
4,5
5,4.5`

// todo move this to BE
function computeLineOfBestFit(points: Point[]): { m: number; b: number } | null {
    if (points.length < 2) return null

    const n = points.length
    const sumX = points.reduce((acc, p) => acc + (p.x ?? 0), 0)
    const sumY = points.reduce((acc, p) => acc + (p.y ?? 0), 0)
    const meanX = sumX / n
    const meanY = sumY / n

    let numerator = 0
    let denominator = 0
    for (const { x, y } of points) {
        const dx = x ?? 0 - meanX
        const dy = y ?? 0 - meanY
        numerator += dx * dy
        denominator += dx * dx
    }

    if (denominator === 0) return null

    const m = numerator / denominator
    const b = meanY - m * meanX
    return { m, b }
}

// Generate line points between minX and maxX
function buildLinePoints(points: Point[], m: number, b: number, steps = 50): Point[] {
    if (points.length === 0) return []

    const xs = points.map((p) => p.x as number)
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    if (minX === maxX) {
        const y = m * minX + b
        return [
            { x: minX - 1, y },
            { x: maxX + 1, y },
        ]
    }

    const range = maxX - minX
    const step = range / (steps - 1)

    const line: Point[] = []
    for (let i = 0; i < steps; i++) {
        const x = minX + i * step
        const y = m * x + b
        line.push({ x, y })
    }
    return line
}

function parsePoints(input: string): Point[] {
    const lines = input.split('\n')
    const points: Point[] = []

    for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed) continue

        const [xStr, yStr] = trimmed.split(',').map((v) => v.trim())
        const x = Number(xStr)
        const y = Number(yStr)
        if (!Number.isNaN(x) && !Number.isNaN(y)) {
            points.push({ x, y })
        }
    }
    return points
}

export function ChartBuilder() {
    const [rawInput, setRawInput] = useState(defaultPointsText)
    const [points, setPoints] = useState<Point[]>(parsePoints(defaultPointsText))
    const [linePoints, setLinePoints] = useState<Point[]>(() => {
        const pts = parsePoints(defaultPointsText)
        const coefficients = computeLineOfBestFit(pts)
        return coefficients ? buildLinePoints(pts, coefficients.m, coefficients.b) : []
    })
    const [error, setError] = useState<string | null>(null)

    const handlePlot = () => {
        setError(null)
        const parsed = parsePoints(rawInput)

        if (parsed.length < 2) {
            setPoints([])
            setLinePoints([])
            setError('Please provide at least two valid points in "x,y" format, one per line.')
            return
        }

        setPoints(parsed)

        const coefficients = computeLineOfBestFit(parsed)
        if (!coefficients) {
            setLinePoints([])
            setError('Unable to compute a line of best fit (all x-values might be identical).')
            return
        }

        setLinePoints(buildLinePoints(parsed, coefficients.m, coefficients.b))
    }

    // Explicitly type chartData as ChartData<"line", ScatterDataPoint[]> for compatibility with char.js 
    const chartData: ChartData<'line', ScatterDataPoint[]> = {
        datasets: [
            {
                label: 'Data Points',
                data: points,
                parsing: false,
                pointRadius: 5,
                pointHoverRadius: 6,
                showLine: false,
                backgroundColor: 'rgba(56, 189, 248, 1)', // cyan
            },
            {
                label: 'Line of Best Fit',
                data: linePoints,
                parsing: false,
                borderWidth: 2,
                fill: false,
                showLine: true,
                pointRadius: 0,
                borderColor: 'rgba(129, 140, 248, 1)', // indigo
            },
        ],
    }

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                grid: {
                    color: 'rgba(75, 85, 99, 0.4)',
                },
                ticks: {
                    color: 'rgba(209, 213, 219, 1)',
                },
            },
            y: {
                grid: {
                    color: 'rgba(75, 85, 99, 0.4)',
                },
                ticks: {
                    color: 'rgba(209, 213, 219, 1)',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(229, 231, 235, 1)',
                },
            },
            tooltip: {
                callbacks: {
                    label: function (item: TooltipItem<'line'>) {
                        // raw is typed as unknown by Chart.js, so cast it
                        const raw = item.raw as ScatterDataPoint | undefined
                        const parsed = item.parsed as { x: number; y: number }

                        const x = (raw?.x ?? parsed.x) as number
                        const y = (raw?.y ?? parsed.y) as number

                        return `(${x.toFixed(2)}, ${y.toFixed(2)})`
                    },
                },
            },
        },
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-gray-100 mb-1">
                    Paste Coordinates & Fit a Line
                </h2>
                <p className="text-sm text-gray-300">
                    Enter one point per line in <span className="font-mono">x,y</span> format. Click{' '}
                    <span className="font-semibold">Plot</span> to see the scatter and the line of best fit.
                </p>
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="points-input"
                    className="block text-xs font-semibold tracking-wide uppercase text-gray-400"
                >
                    Points (x,y per line)
                </label>
                <textarea
                    id="points-input"
                    className="w-full rounded-lg bg-gray-900 border border-gray-700 text-gray-100 text-sm font-mono p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 min-h-[140px]"
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    spellCheck={false}
                />
                <p className="text-xs text-gray-400">
                    Example:
                    <br />
                    <code className="font-mono">
                        1,2
                        <br />
                        2,3
                        <br />
                        3,2.5
                    </code>
                </p>
            </div>

            <button
                type="button"
                onClick={handlePlot}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-gray-900 transition"
            >
                Plot Points & Fit Line
            </button>

            {error && (
                <div className="rounded-lg border border-red-500/50 bg-red-900/40 text-xs text-red-100 px-3 py-2">
                    {error}
                </div>
            )}

            <div className="mt-4 h-80 rounded-lg bg-gray-900 border border-gray-700 p-3">
                {points.length === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500 text-center px-4">
                        No data yet. Paste coordinates above and click{' '}
                        <span className="font-semibold">Plot</span> to render the chart and line of best fit.
                    </div>
                ) : (
                    <Line data={chartData} options={chartOptions} />
                )}
            </div>
        </div>
    )
}