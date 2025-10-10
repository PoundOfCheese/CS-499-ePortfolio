import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { DeleteTrip } from './delete-trip/delete-trip';
import { Register } from './register/register';
import { MealListing } from './meal-listing/meal-listing';
import { EditMeal } from './edit-meal/edit-meal';
import { AddMeal } from './add-meal/add-meal';
import { DeleteMeal } from './delete-meal/delete-meal';
import { RoomListing } from './room-listing/room-listing';
import { AddRoom } from './add-room/add-room';
import { EditRoom } from './edit-room/edit-room';
import { DeleteRoom } from './delete-room/delete-room';
import { NewsListing } from './news-listing/news-listing';
import { AddNews } from './add-news/add-news';
import { EditNews } from './edit-news/edit-news';
import { DeleteNews } from './delete-news/delete-news';

export const routes: Routes = [
    { path: 'add-trip', component: AddTrip },
    { path: 'edit-trip', component: EditTrip },
    { path: 'delete-trip', component: DeleteTrip},
    { path: 'meal-listing', component: MealListing},
    { path: 'add-meal', component: AddMeal},
    { path: 'edit-meal', component: EditMeal},
    { path: 'delete-meal', component: DeleteMeal},
    { path: 'add-room', component: AddRoom},
    { path: 'edit-room', component: EditRoom},
    { path: 'delete-room', component: DeleteRoom},
    { path: 'room-listing', component: RoomListing},
    { path: 'add-news', component: AddNews},
    { path: 'edit-news', component: EditNews},
    { path: 'delete-news', component: DeleteNews},
    { path: 'news-listing', component: NewsListing},
    { path: 'register', component: Register},
    { path: 'login', component: Login},
    { path: "", component: TripListing, pathMatch: "full" }
];
