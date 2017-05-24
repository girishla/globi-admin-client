import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {EmptyDemo} from './view/emptydemo';
import { Documentation } from "app/view/documentation";
import { Home } from "app/view/home";
import { Infagen } from "app/infagen/infagen";



export const routes: Routes = [
    {path: '', component: Home},
    {path: 'documentation', component: Documentation},
    {path: 'infagen', component: Infagen}
];



export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);