import Link from 'next/link'

type TickerProps = {
    update: {
      id: string
      title: string
      price: string
      change: string
      volume: string
      bid: string
      ask: string
      dayRange: string
    }
  }
  
  export function TickerDetails({ update }: TickerProps) {
    const percentChange = parseFloat(update.change.replace('Change: ', '').replace('%', ''))
    const titleColor = percentChange < 0 ? 'text-red-600' : 'text-green-800'
  
    return (
    <li className='mb-4 w-full overflow-hidden rounded-xl shadow-lg transition hover:shadow-xl'>
      <Link href={`${update.id}`} className='block bg-white p-6 rounded-xl hover:bg-gray-50'>
        <div className='grid grid-cols-7 items-center gap-6 text-gray-800'>
          <h2 className={`text-xl font-bold ${titleColor}`}>
            {update.title}
          </h2>

          <div className='text-center'>
            <span className='block font-semibold'>Price</span>
            <span>{update.price.replace('Price: ', '')}</span>
          </div>

          <div className='text-center'>
            <span className='block font-semibold'>Change</span>
            <span>{update.change.replace('Change: ', '')}</span>
          </div>

          <div className='text-center'>
            <span className='block font-semibold'>Volume</span>
            <span>{update.volume.replace('Volume: ', '')}</span>
          </div>

          <div className='text-center'>
            <span className='block font-semibold'>Bid</span>
            <span>{update.bid.replace('Bid: ', '')}</span>
          </div>

          <div className='text-center'>
            <span className='block font-semibold'>Ask</span>
            <span>{update.ask.replace('Ask: ', '')}</span>
          </div>

          <div className='text-center'>
            <span className='block font-semibold'>Day Range</span>
            <span>{update.dayRange.replace('Day Range: ', '')}</span>
          </div>
        </div>
      </Link>
      </li>
    )
  }