import { Observable } from "rxjs";
import { Result } from "../../../common/helpers/Result";
import { IAdminAddCategory } from "./interfaces/admin-add-category.interface";
import { AddCategoryAdminDto } from "./interfaces/dto/add-category-dto";
import { IUseCase } from "../../shared/application/ports/IUseCase.interface";

export class AddCategoryAdminUseCase
  implements IUseCase<AddCategoryAdminDto, Observable<Result<number>>>
{
  constructor(private readonly addCategoryService: IAdminAddCategory) {}
  execute(data: AddCategoryAdminDto): Observable<Result<number>> {
    return this.addCategoryService.execute(data);
  }
}
