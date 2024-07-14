import { inject, Injectable } from "@angular/core";
import { IAuthRepository } from "../../../shared/application/ports/IAuthRepository.interface";
import { enviroment } from "../../../../../environments/environment";
import {
  HttpClient,
  HttpHeaders,
  HttpResponseBase,
} from "@angular/common/http";
import { Result } from "../../../../common/helpers/Result";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { AddTrainerAdminDto } from "../../application/interfaces/dto/add-trainer-dto";
import { IAdminAddTrainer } from "../../application/interfaces/admin-add-trainer.interface";

export class AddTrainerApiService implements IAdminAddTrainer {
  BASE_URL: string = enviroment.baseUrl + `/trainer/create`;
  _httpClient = inject(HttpClient);

  execute(params: AddTrainerAdminDto): Observable<Result<number>> {
    console.log(params);

    let token = this.authRepository.getToken();
    if (!token.hasValue())
      return of(Result.makeError<number>(new Error("Error: no tiene Token")));

    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${token.getValue()}`,
    );

    return this._httpClient
      .post<HttpResponseBase>(this.BASE_URL, params, { headers })
      .pipe(
        map((response) => {
          return Result.makeResult(response.status);
        }),
        catchError((error) => {
          return throwError(() =>
            Result.makeError(new Error(error.error.message)),
          );
        }),
      );
  }

  constructor(private authRepository: IAuthRepository) {}
}
