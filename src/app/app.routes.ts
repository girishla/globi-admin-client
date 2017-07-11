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
import { Puddles } from "app/view/puddles";
import { PTPWorkflowResolver } from "app/shared/services/ptp-workflow-resolver.service";
import { SelectedTableColumnsResolver } from "app/shared/services/selected-table-columns-resolver.service";
import { AuthComponent } from "app/auth/auth.component";
import { NoAuthGuard } from "app/auth/no-auth-guard.service";




export const routes: Routes = [
    { path: '', component: Home },
    {
        path: 'login',
        component: AuthComponent
        // canActivate: [NoAuthGuard]
    },
    {
        path: 'infaptp/puddles', component: Puddles, resolve: {
            ptpworkflows: PTPWorkflowResolver
        }, children: [{
            path: ':id/:ds/:table/columns',
            component: SelectTableColumns,
            resolve: {
                sourceTableColumn: SourceTableColumnsResolver,
                selectedTableColumns: SelectedTableColumnsResolver
            }
        }]
    },
    { path: 'documentation', component: Documentation },
    {
        path: 'infaptp', component: Infagen, data: {
            activeIndex: 0
        }, children: [{
            path: 'start',
            component: SelectSource
        }, {
            path: 'datasources/:ds',
            component: SelectTable,
            resolve: {
                sourceTableList: SourceTableResolver
            }
        }, {
            path: 'datasources/:ds/tables/:table/columns',
            component: SelectTableColumns,
            resolve: {
                sourceTableColumn: SourceTableColumnsResolver,
                selectedTableColumns: SelectedTableColumnsResolver
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