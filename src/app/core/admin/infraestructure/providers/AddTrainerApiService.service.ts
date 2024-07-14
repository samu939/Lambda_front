import { Injectable } from "@angular/core";
import { AuthLocalStorageService } from "../../../shared/infraestructure/local-storage/auth-local-storage.service";
import { AddTrainerAdminUseCase } from "../../application/add-trainer-use-case.service";
import { AddTrainerApiService } from "../services/AddTrainerApiService.service";

@Injectable({ providedIn: "root" })
export class AddTrainerApiProvider {
  public usecase: AddTrainerAdminUseCase;

  constructor() {
    this.usecase = new AddTrainerAdminUseCase(
      new AddTrainerApiService(new AuthLocalStorageService()),
    );
  }
}
