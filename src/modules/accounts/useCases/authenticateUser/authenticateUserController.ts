import { container } from "tsyringe";
import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUserUseCase = await container.resolve(
      AuthenticateUserUseCase
    );

    const token = await authenticateUserUseCase.execute({ password, email });
    return response.json(token);
  }
}

export { AuthenticateUserController };
