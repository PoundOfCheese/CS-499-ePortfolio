import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCard } from '../room-card/room-card';
import { TripData } from '../services/trip-data';
import { Room } from '../models/room';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-room-listing',
  standalone: true,
  imports: [CommonModule, RoomCard],
  templateUrl: './room-listing.html',
  styleUrl: './room-listing.css',
  providers: [TripData]
})
export class RoomListing implements OnInit{
  rooms!: Room[];
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authenticationService: Authentication
    ) {
    console.log('room-listing constructor');
    }

  public addRoom(): void {
    this.router.navigate(['add-room']);
  }

  private getStuff(): void {
    this.tripData.getRooms().subscribe({
      next: (value: any) => {
        this.rooms = value;
        if(value.length > 0) {
          this.message = 'There are ' + value.length + ' rooms available.';
        }
        else {
          this.message = 'There were no rooms retrieved from the database';
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
