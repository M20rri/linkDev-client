import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../models/IResponse';
import { IApplicant, IApplyVacancy, IVacancy } from '../models/ivacancy';

@Injectable({
  providedIn: 'root'
})
export class LinkDevService {

  constructor(private _http: HttpClient) { }

  getVacanciesList(): Observable<IResponse> {
    return this._http.get<IResponse>(`${environment.linkDevUrl}/vacancy/get-all-vacancies`);
  }

  getVacancyById(id: number): Observable<IResponse> {
    return this._http.get<IResponse>(`${environment.linkDevUrl}/vacancy/get-by-id/${id}`);
  }

  getApplicaintById(id: number): Observable<IResponse> {
    return this._http.get<IResponse>(`${environment.linkDevUrl}/applicant/get-by-id/${id}`);
  }

  createApplicant(model: IApplicant): Observable<IResponse> {
    return this._http.post<IResponse>(`${environment.linkDevUrl}/applicant/Create`, model);
  }

  ApplyVacancy(model: IApplyVacancy): Observable<IResponse> {
    return this._http.post<IResponse>(`${environment.linkDevUrl}/application/Create`, model);
  }

}
