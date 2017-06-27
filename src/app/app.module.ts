import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenu } from './app.menu.component';


import { AppTopBar } from './app.topbar.component';
import { AppFooter } from './app.footer.component';
import { AppRoutes } from './app.routes';
import { EmptyDemo } from './view/emptydemo';
import { Documentation } from "app/view/documentation";
import { Home } from "app/view/home";
import { StepsModule, GrowlModule, RadioButtonModule, ButtonModule, ListboxModule, DataTableModule, CheckboxModule } from "primeng/primeng";
import { WizardModule } from "app/wizard/wizard.module";
import { Infagen } from "app/infagen/infagen";
import { PullToPuddleWizardComponent } from "app/infagen/pull-to-puddle/pull-to-puddle-wizard.component";
import { SourceTableResolver } from "app/shared/services/source-table-resolver.service";
import { RouterModule, ActivatedRouteSnapshot } from "@angular/router";
import { SourceTablesService } from "app/shared/services/source-tables.service";
import { ApiService } from "app/shared/services/api.service";
import { SelectTable } from "app/view/selecttable";
import { SelectTableColumns } from "app/view/selectcolumns";
import { SourceTableColumnsResolver } from "app/shared/services/source-table-columns-resolver.service";
import { SourceTableColumnsService } from "app/shared/services/source-table-columns.service";
import { PTPConfirmGenerate } from "app/view/confirm";
import { SelectSource } from "app/view/selectsource";
import {BusyModule} from 'angular2-busy';
import { WaveComponent } from 'ng2-spin-kit/app/spinner/wave'
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { PTPWorkflows } from "app/view/ptpworkflows";
import { PTPWorkflowResolver } from "app/shared/services/ptp-workflow-resolver.service";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { DataListModule, SplitButtonModule, ConfirmationService, ConfirmDialogModule } from 'primeng/primeng';
import { SelectedTableColumnsResolver } from "app/shared/services/selected-table-columns-resolver.service";


@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenu,
    AppTopBar,
    AppFooter,
    EmptyDemo,
    Documentation,
    Home,
    Infagen,
    PullToPuddleWizardComponent,
    SelectTable,
    SelectTableColumns,
    PTPConfirmGenerate,
    SelectSource,
    WaveComponent,
    PTPWorkflows

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutes,
    StepsModule,
    WizardModule,
    GrowlModule,
    RadioButtonModule,
    SplitButtonModule,
    ButtonModule,
    ListboxModule,
    DataTableModule,
    CheckboxModule,
    BusyModule,
    NgHttpLoaderModule,
    DataListModule,
    ConfirmDialogModule
  ],


  providers: [
    PTPWorkflowResolver,
    SourceTableResolver,
    SourceTableColumnsResolver,
    SelectedTableColumnsResolver,
    SourceTablesService,
    SourceTableColumnsService,
    PTPWorkflowsService,
    PTPStateService,
    ApiService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
