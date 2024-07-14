import { Component, inject, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { ValidatorService } from "../../../shared/services/validator/validator.service";
import { DarkModeService } from "../../../shared/services/dark-mode/dark-mode.service";
import { PopupInfoModalService } from "../../../shared/services/popup-info-modal/popup-info-modal.service";
import { FileService } from "../../../shared/services/file/file.service";
import { Trainer } from "../../../../core/trainer/domain/trainer.model";
import { AuthLocalStorageService } from "../../../../core/shared/infraestructure/local-storage/auth-local-storage.service";
import { Result } from "../../../../common/helpers/Result";
import { TrainerGetManyProvider } from "../../../../core/trainer/infrastructure/providers/trainer-get-many.service";
import { LoaderComponent } from "../../../auth/components/loader/loader.component";
import { AddTrainerApiProvider } from "../../../../core/admin/infraestructure/providers/AddTrainerApiService.service";
import { AddTrainerForm } from "../../interfaces/add-trainer-form-interface";
import { AddTrainerAdminDto } from "../../../../core/admin/application/interfaces/dto/add-trainer-dto";

@Component({
  selector: "add-trainer-page",
  templateUrl: "./add-trainer.component.html",
  styleUrl: "./add-trainer.component.css",
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    LoaderComponent,
  ],
})
export class AddTrainerPageComponent {
  private fb = inject(FormBuilder);
  public validatorService = inject(ValidatorService);
  public darkModeService = inject(DarkModeService);
  private popupService = inject(PopupInfoModalService);
  public TrainerCreatedSucsessfully = "The Trainer was created sucessfully";
  public TrainerCreatedError =
    "Something went wrong creating the Trainer, please try again";

  public isLoadingAddTrainer = false;

  public addTrainerForm: FormGroup<AddTrainerForm> =
    this.fb.group<AddTrainerForm>({
      firstName: new FormControl(null, { validators: [Validators.required] }),
      firstLastName: new FormControl(null, {
        validators: [Validators.required],
      }),
      secondLastName: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [
          Validators.pattern(this.validatorService.emailPattern),
          Validators.required,
        ],
      }),
      phone: new FormControl(null, {
        validators: [
          Validators.pattern(this.validatorService.phoneNumberPattern),
          Validators.required,
        ],
      }),
    });

  isValidField(field: string) {
    return this.validatorService.isValidField(this.addTrainerForm, field);
  }
  showData() {
    this.isLoadingAddTrainer = true;
    if (this.addTrainerForm.valid) {
      let formData = this.addTrainerForm.value;
      let sendData: AddTrainerAdminDto = {
        firstName: formData.firstName!,
        firstLastName: formData.firstLastName!,
        secondLastName: formData.secondLastName!,
        email: formData.email!,
        phone: formData.phone!,
      };
      this.sendAddTrainer(sendData);
    }
  }

  private adminUseCase = inject(AddTrainerApiProvider);

  private sendAddTrainer(data: AddTrainerAdminDto) {
    this.adminUseCase.usecase.execute(data).subscribe({
      next: (value) => {
        this.popupService.displayInfoModal(this.TrainerCreatedSucsessfully);
        this.isLoadingAddTrainer = false;
      },
      error: (error: Result<Error>) => {
        this.isLoadingAddTrainer = false;
        this.popupService.displayErrorModal(error.getError().message);
      },
    });
  }

  constructor() {}
}
