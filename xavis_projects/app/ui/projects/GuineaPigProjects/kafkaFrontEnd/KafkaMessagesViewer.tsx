'use client'

import { useEffect, useState } from 'react'

type KafkaMessage = {
  offset: string
  partition: number
  value: string
}

export function KafkaMessagesViewer() {
  const [messages, setMessages] = useState<KafkaMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProducing, setIsProducing] = useState(false)

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/kafka/messages')
      const data = await res.json()
      setMessages(data.messages)
    } catch (err) {
      console.error('Error fetching Kafka messages:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleProduce = async () => {
    setIsProducing(true)
    try {
      const res = await fetch('/api/kafka', { method: 'POST' })
      if (!res.ok) throw new Error('Produce request failed')
      // allow a moment for Kafka commit, then refresh
      setTimeout(fetchMessages, 500)
    } catch (err) {
      console.error('Error producing Kafka message:', err)
    } finally {
      setIsProducing(false)
    }
  }

  return (
    <div className='border p-4 rounded-xl shadow-md mb-4 hover:shadow-lg transition-all bg-white'>
      <h2 className='text-xl font-semibold text-blue-600 mb-2'>Live Kafka Messages</h2>

      {isLoading ? (
        <p className='text-gray-600'>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className='text-gray-600'>No messages available.</p>
      ) : (
        <ul className='space-y-2 max-h-96 overflow-y-auto mb-4'>
          {messages.map((msg, index) => (
            <li key={index} className='border-b py-2 text-sm'>
              <strong>Partition {msg.partition}:</strong> {msg.value}{' '}
              <span className='text-gray-400'>({msg.offset})</span>
            </li>
          ))}
        </ul>
      )}

      <div className='pt-4 border-t flex justify-end'>
        <button
          onClick={handleProduce}
          disabled={isProducing}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isProducing
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isProducing ? 'Producing…' : 'Produce Test Message'}
        </button>
      </div>
    </div>
  )
}
