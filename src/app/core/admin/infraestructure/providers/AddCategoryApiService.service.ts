import { Injectable } from "@angular/core";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";
import { AddCategoryApiService } from "../services/AddCategoryApiService.service";
import { AddCategoryAdminUseCase } from "../../application/add-category-use-case.service";

@Injectable({ providedIn: "root" })
export class AddCategoryApiProvider {
  public usecase: AddCategoryAdminUseCase;

  constructor() {
    this.usecase = new AddCategoryAdminUseCase(
      new AddCategoryApiService(new AuthLocalStorageService()),
    );
  }
}
