import { FormControl } from "@angular/forms";

export interface AddCategoryForm {
  name: FormControl<string | null>;
  icon: FormControl<File | null>;
}
