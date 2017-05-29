import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EmptyDemo } from './view/emptydemo';
import { Documentation } from "app/view/documentation";
import { Home } from "app/view/home";
import { Infagen } from "app/infagen/infagen";
import { SourceTableResolver } from "app/shared/services/source-table-resolver.service";
import { SelectTables } from "app/view/selecttables";


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'documentation', component: Documentation },
    {
        path: 'infaptp', component: Infagen, data: {
            activeIndex: 0
        }, children: [{
            path: 'datasources/:ds',
            component: SelectTables,
            resolve: {
                sourceTable: SourceTableResolver
            },
            data: {
                activeIndex: 1
            }


        }]
    },


];



export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);