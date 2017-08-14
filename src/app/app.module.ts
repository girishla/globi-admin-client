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
import { SelectTable } from "app/infagen/pull-to-puddle/selecttable";
import { SelectTableColumns } from "app/infagen/pull-to-puddle/selectcolumns";
import { SourceTableColumnsResolver } from "app/shared/services/source-table-columns-resolver.service";
import { SourceTableColumnsService } from "app/shared/services/source-table-columns.service";
import { PTPConfirmGenerate } from "app/infagen/pull-to-puddle/confirm";
import { SelectSource } from "app/infagen/pull-to-puddle/selectsource";
import { BusyModule } from 'angular2-busy';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { Puddles } from "app/infagen/pull-to-puddle/puddles";
import { PTPWorkflowResolver } from "app/shared/services/ptp-workflow-resolver.service";
import { PTPWorkflowsService } from "app/shared/services/ptp-workflows.service";
import { PTPStateService } from "app/infagen/pull-to-puddle/ptp-state.service";
import { DataListModule, SplitButtonModule, ConfirmationService, ConfirmDialogModule, MessagesModule, DialogModule, ProgressBarModule, ChartModule, BreadcrumbModule, ToolbarModule } from 'primeng/primeng';
import { SelectedTableColumnsResolver } from "app/shared/services/selected-table-columns-resolver.service";
import { AppStateService } from "app/shared/services/app-state.service";
import { ConfigService } from "app/shared/services/stomp/config/config.service";
import { STOMPService } from "app/shared/services/stomp";
import { ScrollingListComponent } from "app/infagen/scrolling-list.component";
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
import { SILWorkflows } from "app/infagen/sil/sil-workflows.component";
import { SILWorkflowResolver } from "app/shared/services/sil-workflow-resolver.service";
import { SILWorkflowsService } from "app/shared/services/sil-workflows.service";
import { SILStateService } from "app/infagen/sil/sil-state.service";


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
    Puddles,
    ScrollingListComponent,
    AuthComponent,
    ShowAuthedDirective,
    BreadcrumbComponent,
    SILWorkflows


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
    ToolbarModule
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
