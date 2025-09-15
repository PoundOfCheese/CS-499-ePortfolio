import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { DeleteTrip } from './delete-trip/delete-trip';
import { Register } from './register/register';

export const routes: Routes = [
    { path: "add-trip", component: AddTrip },
    { path: 'edit-trip', component: EditTrip },
    { path: 'delete-trip', component: DeleteTrip},
    { path: 'register', component: Register},
    { path: 'login', component: Login},
    { path: "", component: TripListing, pathMatch: "full" }
];
