import { Observable } from "rxjs";
import { Result } from "../../../../common/helpers/Result";
import { AddCategoryAdminDto } from "./dto/add-category-dto";

export interface IAdminAddCategory {
  execute(params: AddCategoryAdminDto): Observable<Result<number>>;
}
