import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-news.html',
  styleUrl: './add-news.css'
})

export class AddNews implements OnInit{
  public addForm!: FormGroup;
    submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      headline: ['', Validators.required],
      date: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required]
    })
  }

  public onSubmit() {
    this.submitted = true;
    if(this.addForm.valid) {
      this.tripData.addNews(this.addForm.value)
      .subscribe( {
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['news-listing']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }
  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}
