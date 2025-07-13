// pages/api/kafka/messages.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type KafkaMessage = {
  offset: string
  partition: number
  value: string
}

type ResponseData = {
  messages: KafkaMessage[]
}

const mockMessages: KafkaMessage[] = [
  { offset: '1', partition: 0, value: 'First test message' },
  { offset: '2', partition: 0, value: 'Second test message' },
]

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // Here you would actually call your Kafka message-fetching logic
  res.status(200).json({ messages: mockMessages })
}
