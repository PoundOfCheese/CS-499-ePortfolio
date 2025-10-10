import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { Meal } from '../models/meal';
import { Room } from '../models/room';
import { User } from '../models/user';
import { News } from '../models/news';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})

export class TripData {

  constructor(
    private http: HttpClient,
    @Inject (BROWSER_STORAGE) private storage: Storage
    ) {}

  tripUrl = 'http://localhost:3000/api/trips';
  mealUrl = 'http://localhost:3000/api/meals';
  roomUrl = 'http://localhost:3000/api/rooms';
  newsUrl = 'http://localhost:3000/api/news';
  baseUrl = 'http://localhost:3000/api';

  // Methods for interfacing with trips api endpoints
  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripUrl);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.tripUrl, formData);
  }

  getTrip(tripCode: string) : Observable<Trip> {
    // console.log('Inside TripData::getTrips');
    return this.http.get<Trip>(this.tripUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    // console.log('Inside TripData::addTrips');
    return this.http.put<Trip>(this.tripUrl + '/' + formData.code, formData);
  }

  deleteTrip(tripCode: string) : Observable<Trip> {
    return this.http.delete<Trip>(this.tripUrl + '/' + tripCode);
  }

  // Methods for interfacing with meals api endpoints
  getMeals() : Observable<Meal[]> {
      return this.http.get<Meal[]>(this.mealUrl);
  }

  addMeal(formData: Meal) : Observable<Meal> {
    return this.http.post<Meal>(this.mealUrl, formData);
  }

  getMeal(mealCode: string) : Observable<Meal> {
    return this.http.get<Meal>(this.mealUrl + '/' + mealCode);
  }

  updateMeal(formData: Meal) : Observable<Meal> {
    return this.http.put<Meal>(this.mealUrl + '/' + formData.code, formData);
  }

  deleteMeal(mealCode: string) : Observable<Meal> {
    return this.http.delete<Meal>(this.mealUrl + '/' + mealCode);
  }

  // Methods for interfacing with rooms api endpoints
  getRooms() : Observable<Room[]> {
    return this.http.get<Room[]>(this.roomUrl);
  }

  addRoom(formData: Room) : Observable<Room> {
    return this.http.post<Room>(this.roomUrl, formData);
  }

  getRoom(roomCode: string) : Observable<Room> {
    return this.http.get<Room>(this.roomUrl + '/' + roomCode);
  }

  updateRoom(formData: Room) : Observable<Room> {
    return this.http.put<Room>(this.roomUrl + '/' + formData.code, formData);
  }

  deleteRoom(roomCode: string) : Observable<Room> {
    return this.http.delete<Room>(this.roomUrl + '/' + roomCode);
  }

  // Methods for interfacing with news api endpoints
  getAllNews() : Observable<News[]> {
    return this.http.get<News[]>(this.newsUrl);
  }

  addNews(formData: News) : Observable<News> {
    return this.http.post<News>(this.newsUrl, formData);
  }

  getNews(newsCode: string) : Observable<News> {
    return this.http.get<News>(this.newsUrl + '/' + newsCode);
  }

  updateNews(formData: News) : Observable<News> {
    return this.http.put<News>(this.newsUrl + '/' + formData.code, formData);
  }

  deleteNews(newsCode: string) : Observable<News> {
    return this.http.delete<News>(this.newsUrl + '/' + newsCode);
  }


  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string) : Observable<AuthResponse> {
    //console.log('Inside TripData::login');
    return this.handleAuthAPICall('login', user, passwd);
  }

  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string) : Observable<AuthResponse> {
    // console.log('Inside TripData::register');
    return this.handleAuthAPICall('register', user, passwd);
  }

  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string) :
  Observable<AuthResponse> {
    // console.log('Inside TripData::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
