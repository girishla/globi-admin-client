import { Component, AfterViewInit, ElementRef, Renderer, ViewChild } from '@angular/core';
import { Spinkit } from 'ng-http-loader/spinkits'
import { AppStateService } from "app/shared/services/app-state.service";
import { Message, MenuItem } from "primeng/primeng";
import { Observable } from "rxjs/Observable";
import { UserService } from "app/shared/services/user.service";
import { Router, NavigationEnd } from "@angular/router";
enum MenuOrientation {
    STATIC,
    OVERLAY,
    HORIZONTAL
};

declare var jQuery: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent implements AfterViewInit {

    layoutCompact: boolean = false;
    layoutMode: MenuOrientation = MenuOrientation.STATIC;
    darkMenu: boolean = false;
    profileMode: string = 'top';
    rotateMenuButton: boolean;
    topbarMenuActive: boolean;
    overlayMenuActive: boolean;
    staticMenuDesktopInactive: boolean;
    staticMenuMobileActive: boolean;
    layoutContainer: HTMLDivElement;
    layoutMenuScroller: HTMLDivElement;
    menuClick: boolean;
    topbarItemClick: boolean;
    activeTopbarItem: any;
    documentClickListener: Function;
    resetMenu: boolean;
    Spinkit = Spinkit;
    msgs: Message[] = [];
    growls: Message[] = [];
    loggedInUserName: String;

    @ViewChild('layoutContainer') layourContainerViewChild: ElementRef;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    constructor(public renderer: Renderer,
        private appStateService: AppStateService,
        private userService: UserService,
        private router: Router) { }



    ngOnInit() {
        this.appStateService.msgUpdated.subscribe(
            (msgs) => {
                this.msgs = msgs;
                Observable.timer(5000).subscribe(i => {
                    this.msgs = [];
                })
            }
        );

        this.appStateService.growlUpdated.subscribe(
            (msgs) => {
                this.growls = msgs;
            }
        );


        //added to adjust spacing for login form
        this.staticMenuDesktopInactive = true;

        this.userService.populate();



    }


    ngAfterViewInit() {


        this.layoutContainer = <HTMLDivElement>this.layourContainerViewChild.nativeElement;
        // this.layoutMenuScroller = <HTMLDivElement> this.layoutMenuScrollerViewChild.nativeElement;

        //hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', (event) => {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.menuClick && this.isHorizontal()) {
                this.resetMenu = true;
            }

            this.topbarItemClick = false;
            this.menuClick = false;
        });



        // setTimeout(() => {
        //     jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
        // }, 10);
    }

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        }
        else {
            if (this.isDesktop())
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            else
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        // if(!this.isHorizontal()) {
        //     setTimeout(() => {
        //         jQuery(this.layoutMenuScroller).nanoScroller();
        //     }, 500);
        // }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        if (this.overlayMenuActive || this.staticMenuMobileActive) {
            this.rotateMenuButton = false;
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        }

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item)
            this.activeTopbarItem = null;
        else
            this.activeTopbarItem = item;

        event.preventDefault();
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }

        // jQuery(this.layoutMenuScroller).nanoScroller({flash:true});
    }

}