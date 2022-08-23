import prismaClient from "../../prisma";
import { hash } from "bcryptjs"

interface UserRequest {
    name: String;
    email: String;
    password: String;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest){
        //Verifica envio de e-mail
        if(!email){
            throw new Error("E-mail incorrect");
        }
        
        //Vewrifica se e-mail já foi cadastrado
        const userExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(userExists){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })


        return user;
    }
}

export { CreateUserService }