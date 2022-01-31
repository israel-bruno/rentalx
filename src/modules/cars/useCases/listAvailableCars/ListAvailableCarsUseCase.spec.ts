import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car1 brand",
      name: "Car1",
      description: "Car1 desc",
      daily_rate: 150.0,
      category_id: "category id",
      fine_amount: 40.0,
      license_plate: "XXX-YYYY",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car2brand",
      name: "Car1",
      description: "Car1 desc",
      daily_rate: 150.0,
      category_id: "category id",
      fine_amount: 40.0,
      license_plate: "XXX-YYYY",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car1 brand",
    });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car2brand",
      name: "Car1byname",
      description: "Car1 desc",
      daily_rate: 150.0,
      category_id: "category id",
      fine_amount: 40.0,
      license_plate: "XXX-YYYY",
    });
    const cars = await listAvailableCarsUseCase.execute({ name: "Car1byname" });

    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      brand: "Car2brand",
      name: "Car1byname",
      description: "Car1 desc",
      daily_rate: 150.0,
      category_id: "category_id_test",
      fine_amount: 40.0,
      license_plate: "XXX-YYYY",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "Car1category_id_testbyname",
    });

    expect(cars).toEqual([car]);
  });
});
