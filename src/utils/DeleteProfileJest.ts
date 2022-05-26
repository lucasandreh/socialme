import prisma from './Prisma';

async function deleteProfileJest(userId: number): Promise<void> {
  await prisma.profile.delete({
    where: {
      userId,
    },
  });
}

export default deleteProfileJest;
