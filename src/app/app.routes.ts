import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { MapPage } from './pages/map/map.page';
import { ListPage } from './pages/list/list.page';
import { ProfilePage } from './pages/profile/profile.page';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs/map', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
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
		component: ProfilePage
      },
    ],
  },
  //{ path: '**', redirectTo: 'tabs/map' },
];
