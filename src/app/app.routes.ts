import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EmptyDemo } from './view/emptydemo';
import { Documentation } from "app/view/documentation";
import { Home } from "app/view/home";
import { Infagen } from "app/infagen/infagen";
import { SourceTableResolver } from "app/shared/services/source-table-resolver.service";
import { SelectTable } from "app/view/selecttable";
import { SourceTableColumnsResolver } from "app/shared/services/source-table-columns-resolver.service";
import { SelectTableColumns } from "app/view/selectcolumns";
import { PTPConfirmGenerate } from "app/view/confirm";
import { SelectSource } from "app/view/selectsource";


export const routes: Routes = [
    { path: '', component: Home },
    { path: 'documentation', component: Documentation },
    {
        path: 'infaptp', component: Infagen, data: {
            activeIndex: 0
        }, children: [{
            path: 'start',
            component: SelectSource
        },{
            path: 'datasources/:ds',
            component: SelectTable,
            resolve: {
                sourceTable: SourceTableResolver
            }
        }, {
            path: 'datasources/:ds/tables/:table/columns',
            component: SelectTableColumns,
            resolve: {
                sourceTableColumn: SourceTableColumnsResolver
            }

        }, {
            path: 'datasources/:ds/tables/:table/generate',
            component: PTPConfirmGenerate
            // ,resolve: {
            //     selections: SelectionsResolver
            // }
        }]
    },


];



export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);