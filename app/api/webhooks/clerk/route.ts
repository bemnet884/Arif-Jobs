import { NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const event = body.type
  const data = body.data

  // Handle only user.created
  if (event === 'user.created') {
    const clerkId = data.id
    const email = data.email_addresses[0]?.email_address

    // 👇 You can add logic to determine role dynamically
    const role = 'FREELANCER' // Or 'CLIENT'

    try {
      const existing = await prisma.user.findUnique({ where: { clerkId } })
      if (!existing) {
        await prisma.user.create({
          data: {
            clerkId,
            email,
            role,
          },
        })
      }

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('❌ Webhook error:', error)
      return NextResponse.json({ success: false }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
