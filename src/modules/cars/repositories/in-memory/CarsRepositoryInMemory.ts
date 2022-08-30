import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    brand,
    name,
    description,
    daily_rate,
    category_id,
    fine_amount,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate == license_plate);
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    const all = this.cars.filter(
      (car) =>
        car.available === true &&
        ((brand && car.brand === brand) ||
          (name && car.name === name) ||
          (category_id && car.category_id == category_id) ||
          true)
    );
    return all;
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id == id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id == id);

    this.cars[findIndex].available = available;
  }
}
export { CarsRepositoryInMemory };
