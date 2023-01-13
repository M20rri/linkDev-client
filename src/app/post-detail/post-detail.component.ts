import { LinkDevService } from './../services/link-dev.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IVacancy } from '../models/ivacancy';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public id: number = 0;
  public post !: IVacancy;

  constructor(private route: ActivatedRoute, private _linkDev: LinkDevService) { }

  ngOnInit(): void {
    this.loadPost();
  }

  isExpiredVacancy = (date: string) => {
    const convertToDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return convertToDate < today;
  }


  loadPost = () => {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this._linkDev.getVacancyById(this.id).subscribe(res => {
        this.post = res.data;
      });
    });
  }

}
