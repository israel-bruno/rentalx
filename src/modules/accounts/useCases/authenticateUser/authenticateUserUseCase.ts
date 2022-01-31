import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";

import { sign } from "jsonwebtoken";
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email incorrect", 401);
    }

    const passworMatch = await compare(password, user.password);

    if (!passworMatch) {
      throw new AppError("Email or password incorrect", 401);
    }

    const token = sign({}, "cfe275a5908b5650488e0b0342c2d6cc", {
      subject: user.id,
      expiresIn: "1d",
    });

    return { user: { name: user.name, email: user.email }, token };
  }
}

export { AuthenticateUserUseCase };
