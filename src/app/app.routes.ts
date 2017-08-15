import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { EmptyDemo } from './view/emptydemo';
import { Documentation } from "app/view/documentation";
import { Home } from "app/view/home";
import { Infagen } from "app/infagen/infagen";
import { SourceTableResolver } from "app/shared/services/source-table-resolver.service";
import { SelectTable } from "app/infagen/ptp/selecttable";
import { SourceTableColumnsResolver } from "app/shared/services/source-table-columns-resolver.service";
import { SelectTableColumns } from "app/infagen/ptp/selectcolumns";
import { PTPConfirmGenerate } from "app/infagen/ptp/confirm";
import { SelectSource } from "app/infagen/ptp/selectsource";
import { Puddles } from "app/view/puddles.component";
import { PTPWorkflowResolver } from "app/shared/services/ptp-workflow-resolver.service";
import { SelectedTableColumnsResolver } from "app/shared/services/selected-table-columns-resolver.service";
import { AuthComponent } from "app/auth/auth.component";
import { NoAuthGuard } from "app/auth/no-auth-guard.service";
import { AuthGuard } from "app/shared/services/auth-guard.service";
import { MeasuresResolver } from "app/shared/services/measures-resolver.service";
import { SILWorkflows } from "app/view/sil-workflows.component";
import { SILWorkflowResolver } from "app/shared/services/sil-workflow-resolver.service";





export const routes: Routes = [
    {
        path: '', component: Home, resolve: {
            measureResp: MeasuresResolver
        }
        , canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: AuthComponent
        // , canActivate: [NoAuthGuard]
    },
    {
        path: 'infaptp/puddles', component: Puddles, canActivate: [AuthGuard], resolve: {
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
    {
        path: 'infasil/silworkflows', component: SILWorkflows, canActivate: [AuthGuard],
        resolve: {
            silWorkflows: SILWorkflowResolver
        }
    },
    { path: 'documentation', component: Documentation, canActivate: [AuthGuard] },
    {
        path: 'infaptp', component: Infagen, data: {
            activeIndex: 0
        }, children: [{
            path: 'start',
            component: SelectSource
            , canActivate: [AuthGuard]
        }, {
            path: 'datasources/:ds',
            component: SelectTable,
            canActivate: [AuthGuard],
            resolve: {
                sourceTableList: SourceTableResolver
            }
        }, {
            path: 'datasources/:ds/tables/:table/columns',
            component: SelectTableColumns,
            canActivate: [AuthGuard],
            resolve: {
                sourceTableColumn: SourceTableColumnsResolver,
                selectedTableColumns: SelectedTableColumnsResolver
            }

        }, {
            path: 'datasources/:ds/tables/:table/generate',

            component: PTPConfirmGenerate,
            canActivate: [AuthGuard],
            // ,resolve: {
            //     selections: SelectionsResolver
            // }
        }]
    },


];



export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);