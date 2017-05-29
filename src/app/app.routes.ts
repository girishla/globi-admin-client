import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EmptyDemo } from './view/emptydemo';
import { Documentation } from "app/view/documentation";
import { Home } from "app/view/home";
import { Infagen } from "app/infagen/infagen";
import { SourceTableResolver } from "app/source-table/source-table-resolver.service";


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'documentation', component: Documentation },
    {
        path: 'infagen', component: Infagen, children: [{
            path: 'datasources/:ds',
            component: EmptyDemo,
            resolve: {
                sourceTable: SourceTableResolver
            },
            data:{
                activeIndex:1
            }


        }]
    },


];



export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);