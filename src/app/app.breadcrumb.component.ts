import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BreadcrumbService } from "app/shared/services/breadcrumb.service";
import { MenuItem } from "primeng/primeng";


@Component({
    selector: 'app-breadcrumb',
    template: `
        <p-breadcrumb  styleClass="app-breadcrumb" [home]="{ label: 'Home', icon: 'home', routerLink: ['/'] }" [model]="breadcrumbItems"></p-breadcrumb>
    `
})

export class BreadcrumbComponent implements OnInit, OnChanges {
    @Input() useBootstrap: boolean = true;
    @Input() prefix: string = '';

    public _urls: string[];
    public _routerSubscription: any;
    breadcrumbItems: MenuItem[] = [];
    validcrumbs: String[];

    constructor(
        private router: Router,
        private breadcrumbService: BreadcrumbService
    ) { }

    ngOnInit(): void {
        this._urls = new Array();

        if (this.prefix.length > 0) {
            this._urls.unshift(this.prefix);
        }

        this.breadcrumbService.addFriendlyNameForRoute("/infaptp/puddles", "Puddles List");
        this.breadcrumbService.addFriendlyNameForRouteRegex("/documentation", "Documentation");


        this._routerSubscription = this.router.events.subscribe((navigationEnd: NavigationEnd) => {

            if (navigationEnd instanceof NavigationEnd) {


                this._urls.length = 0; //Fastest way to clear out array

                console.log("generating crumbs...")
                this.generateBreadcrumbTrail(navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url);


                this._urls.forEach(url => {

                    let friendlyLink = this.friendlyName(url);

                    if ((friendlyLink) && !(this.breadcrumbItems.find((crumb)=>crumb.label===friendlyLink)))  {
                        this.addCrumb({ label: friendlyLink, icon: '', routerLink: [url] })
                    }


                });

            }
        });
    }



    ngOnChanges(changes: any): void {
        if (!this._urls) {
            return;
        }

        this._urls.length = 0;
        this.generateBreadcrumbTrail(this.router.url);
        console.log("processing changes....adding crumbs", this._urls)
        this._urls.forEach(url => this.addCrumb({ label: 'this.friendlyName(url)', icon: '', routerLink: [url] }));



    }


    addCrumb(item: MenuItem) {

        this.breadcrumbItems.push(item);

    }


    generateBreadcrumbTrail(url: string): void {
        if (!this.breadcrumbService.isRouteHidden(url)) {
            //Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
            this._urls.unshift(url);
        }

        if (url.lastIndexOf('/') > 0) {
            this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/'))); //Find last '/' and add everything before it as a parent route
        } else if (this.prefix.length > 0) {
            this._urls.unshift(this.prefix);
        }
    }

    navigateTo(url: string): void {
        this.router.navigateByUrl(url);
    }

    friendlyName(url: string): string {
        return !url ? '' : this.breadcrumbService.getFriendlyNameForRoute(url);
    }

    ngOnDestroy(): void {
        this._routerSubscription.unsubscribe();
    }

}