import { IVacancy } from './../models/ivacancy';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LinkDevService } from '../services/link-dev.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private _linkDev: LinkDevService, private route: ActivatedRoute) { }

  public title: string = 'Vacancies';
  public vacancies !: Array<IVacancy>;
  public isLoading: boolean = false;

  async ngOnInit() {
    await this.getVacancies();
  }

  getVacancies = async () => {
    this.isLoading = true;
    await this._linkDev.getVacanciesList().subscribe(res => {
      this.isLoading = false;
      this.vacancies = res.data;
    })
  }

}
