// app/api/webhooks/clerk/route.ts

export const dynamic = 'force-dynamic' // 👈 prevents static rendering

import { NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const event = body.type
  const data = body.data

  if (event === 'user.created') {
    const clerkId = data.id
    const email = data.email_addresses[0]?.email_address

    try {
      const exists = await prisma.user.findUnique({ where: { clerkId } })
      if (!exists) {
        await prisma.user.create({
          data: { clerkId, email, role: 'FREELANCER' }, // or dynamic role
        })
      }

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Webhook Error:', error)
      return NextResponse.json({ success: false }, { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
