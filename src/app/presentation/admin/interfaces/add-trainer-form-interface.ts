import { FormControl } from "@angular/forms";

export interface AddTrainerForm {
  firstName: FormControl<string | null>;
  firstLastName: FormControl<string | null>;
  secondLastName: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}
