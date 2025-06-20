import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { MapPage } from './pages/map/map.page';
import { ListPage } from './pages/list/list.page';
import { ProfilePage } from './pages/profile/profile.page';
import { LoginPage } from './pages/login/login.page';
import { AuthGuard } from './guards/auth-guard.guard';
import { PlacePage } from './pages/place/place.page';
import { LogoutPage } from './pages/logout/logout.page';
import { NewPlacePage } from './pages/new-place/new-place.page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: '', redirectTo: 'tabs/map', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [AuthGuard], // Ensure user is authenticated
    children: [
      {
        path: 'map',
        component: MapPage,
      },
      {
        path: 'list',
        component: ListPage,
      },
      {
        path: 'profile',
        component: ProfilePage,
      },
    ],
  },
  {
    path: 'place/:id',
    canActivate: [AuthGuard],
    component: PlacePage,
  },
  { path: 'logout', component: LogoutPage },
  { path: 'new-place/:lat/:lng', canActivate: [AuthGuard], component: NewPlacePage },
  { path: '**', redirectTo: 'tabs/map' },
];
