'use server'

import prisma from "@/lib/prisma"


export async function registerUser({
  clerkId,
  email,
  role,
}: {
  clerkId: string
  email: string
  role: 'FREELANCER' | 'CLIENT'
}) {
  return await prisma.user.create({
    data: {
      clerkId,
      email,
      role,
    },
  })
}
