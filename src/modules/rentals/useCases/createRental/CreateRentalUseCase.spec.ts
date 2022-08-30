import dayjs from "dayjs";
import { AppError } from "@errors/AppError";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;

let dayAdd24hour = dayjs().add(24, "hours").toDate();

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayJsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1234",
      car_id: "12342131",
      expected_return_date: dayAdd24hour,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another one open for the same user", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "000",
        expected_return_date: dayAdd24hour,
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "12342131",
        expected_return_date: dayAdd24hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another one open for the same 'car'", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "xxxx",
        car_id: "0101",
        expected_return_date: dayAdd24hour,
      });

      const rental2 = await createRentalUseCase.execute({
        user_id: "xxxx",
        car_id: "0101",
        expected_return_date: dayAdd24hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a new rental with invalid return time'", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        user_id: "xxxx",
        car_id: "0101",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
