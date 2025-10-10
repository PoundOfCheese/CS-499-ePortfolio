import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '../models/news';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-delete-news',
  imports: [],
  templateUrl: './delete-news.html',
  styleUrl: './delete-news.css'
})
export class DeleteNews implements OnInit{
  constructor(
      private router: Router,
      private tripData: TripData
    ) {}

  ngOnInit(): void {
    let newsCode = localStorage.getItem("newsCode");
    if (!newsCode) {
      alert("Something wrong, couldn't find where I stashed newsCode!");
      this.router.navigate(['news-listing']);
      return;
    }

    this.tripData.deleteNews(newsCode)
      .subscribe({
        next: (newsCode: any) => {
          console.log(newsCode);
          this.router.navigate(['news-listing']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }
}
