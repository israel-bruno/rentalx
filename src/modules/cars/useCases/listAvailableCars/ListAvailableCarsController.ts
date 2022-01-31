import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category_id, name, brand }: IRequest = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      category_id,
      name,
      brand,
    });

    return response.json(cars);
  }
}
export { ListAvailableCarsController };
