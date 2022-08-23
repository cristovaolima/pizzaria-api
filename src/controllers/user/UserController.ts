import { Request, Response } from "express";
import { UserService } from "../../services/user/UserService";

class UserController {
    async handle(req: Request, res: Response){

        const user_id = req.user_id;

        const userService = new UserService();

        const user = await userService.execute(user_id);

        return res.json(user);
    }
}
export { UserController };