import { Observable } from "rxjs";
import { Result } from "../../../common/helpers/Result";
import { IAdminAddTrainer } from "./interfaces/admin-add-trainer.interface";
import { AddTrainerAdminDto } from "./interfaces/dto/add-trainer-dto";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";

export class AddTrainerAdminUseCase
  implements IUseCase<AddTrainerAdminDto, Observable<Result<number>>>
{
  constructor(private readonly addTrainerService: IAdminAddTrainer) {}
  execute(data: AddTrainerAdminDto): Observable<Result<number>> {
    return this.addTrainerService.execute(data);
  }
}
