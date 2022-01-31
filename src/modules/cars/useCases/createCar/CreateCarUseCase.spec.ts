import { AppError } from "@errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      brand: "Brand",
      category_id: "category",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });
  });

  it("Should not be able to create a existent car", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car name",
        description: "Car description",
        daily_rate: 100,
        brand: "Brand",
        category_id: "category",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });

      await createCarUseCase.execute({
        name: "Car name 2",
        description: "Car description 2",
        daily_rate: 100,
        brand: "Brand",
        category_id: "category",
        fine_amount: 60,
        license_plate: "ABC-1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      brand: "Brand",
      category_id: "category",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    expect(car.available).toBe(true);
  });
});
