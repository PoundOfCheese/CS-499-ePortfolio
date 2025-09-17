import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-meal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-meal.html',
  styleUrl: './add-meal.css'
})

export class AddMeal implements OnInit{
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      image: ['', Validators.required],
      name_detail: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  public onSubmit() {
    this.submitted = true;
    if(this.addForm.valid) {
      this.tripData.addMeal(this.addForm.value)
      .subscribe( {
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['meal-listing']);
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
