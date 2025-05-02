'use server'

import prisma from "@/lib/prisma"


export async function getFreelancers() {
  return await prisma.profile.findMany({
    where: {
      user: { role: 'FREELANCER' },
    },
    include: {
      user: true,
    },
  })
}
