import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { News } from '../models/news';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.html',
  styleUrl: './news-card.css'
})

export class NewsCard implements OnInit{
  @Input('news') news: any;

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) {}

  ngOnInit(): void {
  
  }

  public editNews(news: News) {
    localStorage.removeItem('newsCode');
    localStorage.setItem('newsCode', news.code);
    this.router.navigate(['edit-news']);
  }

  public deleteNews(news: News) {
    localStorage.removeItem('newsCode');
    localStorage.setItem('newsCode', news.code);
    this.router.navigate(['delete-news']);
  }

  public isLoggedIn()
  {
    return this.authenticationService.isLoggedIn();
  }
}
