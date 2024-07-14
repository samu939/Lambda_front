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
import { CategoyUseCaseProvider } from "../../../../core/categories/infrastructure/providers/category-usecase-provider";
import { ValidatorService } from "../../../shared/services/validator/validator.service";
import { DarkModeService } from "../../../shared/services/dark-mode/dark-mode.service";
import { PopupInfoModalService } from "../../../shared/services/popup-info-modal/popup-info-modal.service";
import { FileService } from "../../../shared/services/file/file.service";
import { Category } from "../../../../core/categories/domain/category.model";
import { Trainer } from "../../../../core/trainer/domain/trainer.model";
import { AuthLocalStorageService } from "../../../../core/shared/infraestructure/local-storage/auth-local-storage.service";
import { Result } from "../../../../common/helpers/Result";
import { TrainerGetManyProvider } from "../../../../core/trainer/infrastructure/providers/trainer-get-many.service";
import { LoaderComponent } from "../../../auth/components/loader/loader.component";
import { AddCategoryApiProvider } from "../../../../core/admin/infraestructure/providers/AddCategoryApiService.service";
import { AddCategoryForm } from "../../interfaces/add-category-form-interface";
import { AddCategoryAdminDto } from "../../../../core/admin/application/interfaces/dto/add-category-dto";

@Component({
  selector: "add-category-page",
  templateUrl: "./add-category.component.html",
  styleUrl: "./add-category.component.css",
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
export class AddCategoryPageComponent {
  private categoryUseCaseService = inject(CategoyUseCaseProvider);
  private fb = inject(FormBuilder);
  public validatorService = inject(ValidatorService);
  public darkModeService = inject(DarkModeService);
  private popupService = inject(PopupInfoModalService);
  private fileService = inject(FileService);
  public CategoryCreatedSucsessfully = "The Category was created sucessfully";
  public CategoryCreatedError =
    "Something went wrong creating the Category, please try again";
  public errorUploadingImage = "Error uploading the image";

  public isLoadingAddCategory = false;
  public icon: string[] = [];

  public addCategoryForm: FormGroup<AddCategoryForm> =
    this.fb.group<AddCategoryForm>({
      name: new FormControl(null, { validators: [Validators.required] }),
      icon: new FormControl(null, { validators: [Validators.required] }),
    });

  showData() {
    this.isLoadingAddCategory = true;
    if (this.addCategoryForm.valid) {
      let formData = this.addCategoryForm.value;
      let sendData: AddCategoryAdminDto = {
        name: formData.name!,
        icon: this.icon[0],
      };
      this.sendAddCategory(sendData);
    }
  }

  private adminUseCase = inject(AddCategoryApiProvider);

  loadImage(event: any): void {
    let files: any = [];
    for (let i of event.target.files) {
      files.push(i);
    }
    const cleanedFiles: File[] = files;
    let imagesBase64: string[] = [];

    cleanedFiles.forEach((file) => {
      this.fileService.convertFileToBase64(file).then((imagen) => {
        imagesBase64.push(imagen.model);
        console.log(imagesBase64);
      });
    });

    this.icon = imagesBase64;
    this.addCategoryForm.get("icon")?.setValue(cleanedFiles[0]);

    //if (!file) console.log('file nulo')
    //return this.popupService.displayErrorModal(this.errorUploadingUserImage)}
    // Validar Formato del Archivo
    //const isValidImageExtension = this.validatorService.vali.test(file.name);
  }

  private sendAddCategory(data: AddCategoryAdminDto) {
    this.adminUseCase.usecase.execute(data).subscribe({
      next: (value) => {
        this.popupService.displayInfoModal(this.CategoryCreatedSucsessfully);
        this.isLoadingAddCategory = false;
      },
      error: (error: Result<Error>) => {
        this.isLoadingAddCategory = false;
        this.popupService.displayErrorModal(error.getError().message);
      },
    });
  }

  constructor() {}
}
