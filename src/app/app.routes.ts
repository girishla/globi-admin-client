import {Routes,RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {EmptyDemo} from './view/emptydemo';


export const routes: Routes = [
    {path: '', component: EmptyDemo}
];



export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);