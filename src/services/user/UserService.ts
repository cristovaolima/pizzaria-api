import prismaClient from "../../prisma";

class UserService {
    async execute(user_id: String) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        return user;
    }
}

export { UserService };