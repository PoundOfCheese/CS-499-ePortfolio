import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripData } from '../services/trip-data';
import { News } from '../models/news';

@Component({
  selector: 'app-edit-news',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-news.html',
  styleUrl: './edit-news.css'
})

export class EditNews implements OnInit{

  public editForm!: FormGroup;
    news!: News;
    submitted = false;
    message : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    
    // Retrieve stashed trip ID
    let newsCode = localStorage.getItem("newsCode");
    if (!newsCode) {
      alert("Something wrong, couldn't find where I stashed newsCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditNews::ngOnInit');
    console.log('newsCode:' + newsCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      headline: ['', Validators.required],
      date: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required]
    })

    this.tripData.getNews(newsCode)
      .subscribe({
        next: (value: any) => {
          this.news = value;
          // Populate our record into the form
          this.editForm.patchValue(value);
          if(!value)
          {
            this.message = 'No News Retrieved!';
          }
          else {
            this.message = 'News: ' + newsCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  public onSubmit()
  {
    this.submitted = true;

    if(this.editForm.valid)
    {
      this.tripData.updateNews(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['news-listing']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        })
    }
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

}
