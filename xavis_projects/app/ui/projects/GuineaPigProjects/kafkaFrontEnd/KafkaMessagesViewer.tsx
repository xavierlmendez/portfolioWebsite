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

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/kafka/messages') // API route to be implemented
        const data = await res.json()
        setMessages(data.messages)
      } catch (err) {
        console.error('Error fetching Kafka messages:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()

    // Currently doing 5 second poll interval - this will be selectable on FE later
    const interval = setInterval(fetchMessages, 5000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className='border p-4 rounded-xl shadow-md mb-4 hover:shadow-lg transition-all bg-white'>
      <h2 className='text-xl font-semibold text-blue-600 mb-2'>Live Kafka Messages</h2>
      {isLoading ? (
        <p className='text-gray-600'>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p className='text-gray-600'>No messages available.</p>
      ) : (
        <ul className='space-y-2 max-h-96 overflow-y-auto'>
          {messages.map((msg, index) => (
            <li key={index} className='border-b py-2 text-sm'>
              <strong>Partition {msg.partition}:</strong> {msg.value} <span >({msg.offset})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}