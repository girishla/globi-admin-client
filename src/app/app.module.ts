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
import { InfagenPTP } from "app/infagen/ptp/infagen-ptp";


import { PullToPuddleWizardComponent } from "app/infagen/ptp/ptp-wizard.component";
import { SourceTableResolver } from "app/shared/services/source-table-resolver.service";
import { RouterModule, ActivatedRouteSnapshot } from "@angular/router";
import { SourceTablesService } from "app/shared/services/source-tables.service";
import { ApiService } from "app/shared/services/api.service";
import { SelectTable } from "app/infagen/ptp/selecttable";
import { SelectTableColumns } from "app/infagen/ptp/selectcolumns";
import { SourceTableColumnsResolver } from "app/shared/services/source-table-columns-resolver.service";
import { SourceTableColumnsService } from "app/shared/services/source-table-columns.service";
import { PTPConfirmGenerate } from "app/infagen/ptp/confirm";
import { SelectSource } from "app/infagen/ptp/selectsource";
import { BusyModule } from 'angular2-busy';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { Puddles } from "app/view/puddles.component";
import { PTPWorkflowResolver } from "app/shared/services/ptp-workflow-resolver.service";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { PTPStateService } from "app/infagen/ptp/ptp-state.service";
import { DataListModule, SplitButtonModule, ConfirmationService, ConfirmDialogModule, MessagesModule, DialogModule, ProgressBarModule, ChartModule, BreadcrumbModule, ToolbarModule, PanelModule } from 'primeng/primeng';
import { SelectedTableColumnsResolver } from "app/shared/services/selected-table-columns-resolver.service";
import { AppStateService } from "app/shared/services/app-state.service";
import { ConfigService } from "app/shared/services/stomp/config/config.service";
import { STOMPService } from "app/shared/services/stomp";
import { ScrollingListComponent } from "app/shared/scrolling-list.component";
import { UserService } from "app/shared/services/user.service";
import { JwtService } from "app/shared/services/jwt.service";
import { AuthComponent } from "app/auth/auth.component";
import { ShowAuthedDirective } from "app/shared/directives/show-authed.directive";
import { AuthGuard } from "app/shared/services/auth-guard.service";
import { NoAuthGuard } from "app/auth/no-auth-guard.service";
import { MeasuresResolver } from "app/shared/services/measures-resolver.service";
import { MeasuresService } from "app/shared/services/measures.service";
import { BreadcrumbService } from "app/shared/services/breadcrumb.service";
import { BreadcrumbComponent } from "app/app.breadcrumb.component";
import { SILWorkflows } from "app/view/sil-workflows.component";
import { SILWorkflowResolver } from "app/shared/services/sil-workflow-resolver.service";
import { SILWorkflowsService } from "app/shared/services/sil-workflows.service";
import { SILStateService } from "app/infagen/sil/sil-state.service";
import { SILSelectTable } from "app/infagen/sil/sil-selecttable";
import { SILGenerateIntro } from "app/infagen/sil/sil-generate-intro.component";

import { SilConfirmFactComponent } from './infagen/sil/sil-confirm-fact/sil-confirm-fact.component';
import { SilConfirmDimensionComponent } from './infagen/sil/sil-confirm-dimension/sil-confirm-dimension.component';
import { SilWizardComponent } from "app/infagen/sil/sil-wizard.component";
import { InfagenSIL } from "app/infagen/sil/infagen-sil";
import { SilMetadataTableResolver } from "app/shared/services/sil-metadata-table-resolver.service";
import { SilMetadataTablesService } from "app/shared/services/sil-metadata-tables.service";





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
    InfagenPTP,
    InfagenSIL,
    SelectTable,
    SelectTableColumns,
    PTPConfirmGenerate,
    SelectSource,
    Puddles,
    SILGenerateIntro,
    ScrollingListComponent,
    AuthComponent,
    ShowAuthedDirective,
    BreadcrumbComponent,
    SILWorkflows,
    SILSelectTable,
    SilConfirmFactComponent,
    SilConfirmDimensionComponent,
    PullToPuddleWizardComponent,
    SilWizardComponent



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
    MessagesModule,
    RadioButtonModule,
    SplitButtonModule,
    ButtonModule,
    ListboxModule,
    DataTableModule,
    CheckboxModule,
    BusyModule,
    NgHttpLoaderModule,
    DataListModule,
    ConfirmDialogModule,
    DialogModule,
    ProgressBarModule,
    ChartModule,
    BreadcrumbModule,
    ToolbarModule,
    PanelModule
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
    SILWorkflowResolver,
    SILWorkflowsService,
    SILStateService,
    SilMetadataTableResolver,
    SilMetadataTablesService,
    ApiService,
    ConfirmationService,
    AppStateService,
    STOMPService,
    ConfigService,
    UserService,
    JwtService,
    AuthGuard,
    NoAuthGuard,
    MeasuresResolver,
    MeasuresService,
    BreadcrumbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
