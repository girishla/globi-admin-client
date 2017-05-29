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
import { StepsModule, GrowlModule, RadioButtonModule, ButtonModule } from "primeng/primeng";
import { WizardModule } from "app/wizard/wizard.module";
import { Infagen } from "app/infagen/infagen";
import { PullToPuddleWizardComponent } from "app/infagen/pull-to-puddle/pull-to-puddle-wizard.component";
import { SourceTableResolver } from "app/shared/services/source-table-resolver.service";
import { RouterModule, ActivatedRouteSnapshot } from "@angular/router";
import { SourceTablesService } from "app/shared/services/source-tables.service";
import { ApiService } from "app/shared/services/api.service";




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
    ButtonModule
  ],

  providers: [
    SourceTableResolver,
    SourceTablesService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
