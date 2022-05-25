import prisma from './Prisma';

async function deleteUserJest(username: string) : Promise<void> {
  await prisma.user.delete({
    where: {
      username,
    },
  });
}

export default deleteUserJest;
