import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'

export default async function StockPage() {
  // Define the stock symbol you want to display
  const symbol = "AAPL"

  // Fetch its data server-side
  const [stock] = await getWatchListUpdates([symbol])

  return (
    <main className="w-full min-h-screen flex flex-col items-center sm:px-4 py-8">
      <section className="w-full max-w-2xl bg-white/5 rounded-xl p-6 shadow">
        <h1 className="text-4xl font-bold text-white mb-4">
          {stock.title} Stock Details
        </h1>

        <div className="space-y-4 text-gray-200 text-lg">
          <p><strong>Price:</strong> {stock.price.replace("Price: ", "")}</p>
          <p><strong>Change:</strong> {stock.change.replace("Change: ", "")}</p>
          <p><strong>Volume:</strong> {stock.volume.replace("Volume: ", "")}</p>
          <p><strong>Bid:</strong> {stock.bid.replace("Bid: ", "")}</p>
          <p><strong>Ask:</strong> {stock.ask.replace("Ask: ", "")}</p>
          <p><strong>Day Range:</strong> {stock.dayRange.replace("Day Range: ", "")}</p>
        </div>
      </section>
    </main>
  )
}