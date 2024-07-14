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
import { AddCategoryAdminDto } from "../../application/interfaces/dto/add-category-dto";
import { IAdminAddCategory } from "../../application/interfaces/admin-add-category.interface";

export class AddCategoryApiService implements IAdminAddCategory {
  BASE_URL: string = enviroment.baseUrl + `/category/create`;
  _httpClient = inject(HttpClient);

  execute(params: AddCategoryAdminDto): Observable<Result<number>> {
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
