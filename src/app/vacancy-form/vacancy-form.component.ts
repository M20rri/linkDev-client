import { IApplicant, IApplyVacancy } from './../models/ivacancy';
import { LinkDevService } from './../services/link-dev.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { ToastPosition, ToastType } from '../models/toastEnum';

@Component({
  selector: 'app-vacancy-form',
  templateUrl: './vacancy-form.component.html',
  styleUrls: ['./vacancy-form.component.css']
})
export class VacancyFormComponent implements OnInit {

  public id: number = 0;
  public applicaint: IApplicant = new IApplicant();
  public applyVacancy: IApplyVacancy = new IApplyVacancy();
  public cardHeader: string = 'Apply Vacancy';
  public isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private toastr: Toaster, private router: Router, private _linkDev: LinkDevService) {

  }

  async ngOnInit() {
    await this.loadVacancyIdFromRoute();
  }

  loadVacancyIdFromRoute = async () => {
    await this.route.params.subscribe(async params => {
      this.id = parseInt(params['id']);
    });
  }

  onSubmit = async () => {

    let applicaintId: number = 0;

    await this._linkDev.createApplicant(this.applicaint).subscribe(async res => {

      if (res.statusCode == 400) {
        const responseDate: Array<string> = res.data.split(',');
        applicaintId = +responseDate[1];
      } else {
        applicaintId = +res.data;
      }

      this.applyVacancy.applicantId = applicaintId;
      this.applyVacancy.vacancyId = this.id; // vacancy id from route

      await this._linkDev.ApplyVacancy(this.applyVacancy).subscribe(res => {
        if (res.statusCode == 400) {
          this.toastr.open({ text: res.data, caption: 'LinkDev', duration: 4000, type: ToastType.danger, position: ToastPosition.topRight });
          return;
        }
        this.toastr.open({ text: `Vacancy #${res.data} Created successfully`, caption: 'LinkDev', duration: 4000, type: ToastType.success, position: ToastPosition.topRight });
        this.router.navigate(['vacancy']);
      });

    });

  }

}
