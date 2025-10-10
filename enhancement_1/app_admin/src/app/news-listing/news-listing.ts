import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCard } from '../news-card/news-card';
import { TripData } from '../services/trip-data';
import { News } from '../models/news';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-news-listing',
  standalone: true,
  imports: [CommonModule, NewsCard],
  templateUrl: './news-listing.html',
  styleUrl: './news-listing.css',
  providers: [TripData]
})
export class NewsListing implements OnInit{
  news!: News[];
    message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authenticationService: Authentication
    ) {
    console.log('news-listing constructor');
    }

  public addNews(): void {
    this.router.navigate(['add-news']);
  }

  private getStuff(): void {
    this.tripData.getAllNews().subscribe({
      next: (value: any) => {
        this.news = value;
        if(value.length > 0) {
          this.message = 'There are ' + value.length + ' articles available.';
        }
        else {
          this.message = 'There were no articles retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  public isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
