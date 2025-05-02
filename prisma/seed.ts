// prisma/seed.ts
import { PrismaClient, Role, JobStatus, ProposalStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Create users
  const clientUser = await prisma.user.create({
    data: {
      clerkId: 'client123',
      email: 'client@example.com',
      role: Role.CLIENT,
    },
  })

  const freelancerUser = await prisma.user.create({
    data: {
      clerkId: 'freelancer123',
      email: 'freelancer@example.com',
      role: Role.FREELANCER,
      profile: {
        create: {
          fullName: 'Sara Gebre',
          bio: 'Experienced web developer in Ethiopia',
          skills: ['React', 'Node.js', 'Tailwind'],
          hourlyRate: 500,
          location: 'Addis Ababa',
          portfolio: ['https://myportfolio.com/project1'],
          rating: 4.8,
        },
      },
    },
  })

  // 2. Create job
  const job = await prisma.job.create({
    data: {
      title: 'Build a Next.js Freelance App',
      description: 'Looking for a Next.js dev with Tailwind experience.',
      budget: 10000,
      category: 'Web Development',
      clientId: clientUser.id,
      status: JobStatus.OPEN,
    },
  })

  // 3. Create proposal
  await prisma.proposal.create({
    data: {
      jobId: job.id,
      freelancerId: freelancerUser.id,
      coverLetter: 'I have experience building full-stack apps with Next.js.',
      proposedRate: 9000,
      status: ProposalStatus.PENDING,
    },
  })

  console.log('✅ Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
