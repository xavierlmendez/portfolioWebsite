import { NextResponse } from 'next/server'
import { sendText } from '@/app/lib/projectUtils/smsInterfaceWrapper/twilioAPI'
export async function POST(req: Request) {
  try {

    const jsonBody = await req.json()
    console.log(jsonBody)

    const {
      accountSid,
      authToken,
      from,
      to,
      body,
      symbols, // optional, e.g. "AAPL,MSFT"
    } = jsonBody

    const symbolList: string[] =
      typeof symbols === 'string'
        ? symbols
            .split(',')
            .map((s: string) => s.trim().toUpperCase())
            .filter(Boolean)
        : Array.isArray(symbols)
        ? (symbols as string[])
            .map(s => s.trim().toUpperCase())
            .filter(Boolean)
        : []

    const result = await sendText({
      accountSid,
      authToken,
      from,
      to,
      body,
      symbols: symbolList,
    })

    return NextResponse.json(result, { status: 200 })
  } catch (err: any) {
    console.error('[smsInterfaceWrapper] Error sending SMS:', err)

    return NextResponse.json(
      {
        success: false,
        error: err?.message ?? 'Unknown error',
      },
      { status: 400 }
    )
  }
}