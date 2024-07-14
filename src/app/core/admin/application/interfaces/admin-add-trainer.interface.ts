import { Observable } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { AddTrainerAdminDto } from "./dto/add-trainer-dto";

export interface IAdminAddTrainer {
  execute(params: AddTrainerAdminDto): Observable<Result<number>>;
}
