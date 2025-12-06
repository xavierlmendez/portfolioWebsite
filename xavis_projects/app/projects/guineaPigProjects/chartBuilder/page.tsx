'use client'

import { Header } from '../../../ui/page/header'
import { ChartBuilder } from '@/app/ui/projects/GuineaPigProjects/chartBuilder/ChartBuilder'

export default function LineFitChartPage() {
    const pageTitle = 'Chart Builder'
    const pageDescription =
        'Paste sample coordinates, plot them, and visualize the line of best fit using react-chartjs-2. ' +
        'This is a guinea pig skin for experimenting with chart behavior and potential BotMaker outputs.'

    return (
        <>
            <Header title={pageTitle} description={pageDescription} />

            <div className="container mx-auto px-6 py-10">
                <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
                    <ChartBuilder />
                </div>
            </div>
        </>
    )
}