import { Component, Inject, forwardRef } from '@angular/core';
import { AppComponent } from './app.component';
import { UserService } from "app/shared/services/user.service";
import { Router } from "@angular/router";



@Component({
    selector: 'app-topbar',
    template: `
        
        <div *showAuthed="true">
        <div class="topbar clearfix">
        
            <div  class="topbar-left">            
                <div class="logo"></div>
            </div>



            <div class="topbar-right">

                    <a  id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>
               
                
                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>




                <ul class="topbar-items animated fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                

                 
                <li #profile class="profile-item" *ngIf="app.profileMode==='top'||app.isHorizontal()"
                        [ngClass]="{'active-top-menu':app.activeTopbarItem === profile}">

                        <a href="#" (click)="app.onTopbarItemClick($event,profile)">                            
                            <div class="avatar-circle-sm">
                            <span class="initials">
                                {{profileUserName.charAt(0)}}
                            </span>
                         </div>
                        </a>

                                               
                        <ul class="ultima-menu animated fadeInDown">
                            <li role="menuitem">
                                <a href="#" (click)="logout()">
                                    <i class="material-icons">power_settings_new</i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>


                    <li #themes [ngClass]="{'active-top-menu':app.activeTopbarItem === themes}">
                        <a href="#" (click)="app.onTopbarItemClick($event,themes)"> 
                            <i class="topbar-icon material-icons">palette</i>

                            <span class="topbar-item-name">Themes</span>
                        </a>
                        <ul class="ultima-menu animated fadeInDown">
                            <li role="menuitem" *ngFor="let themeItem of themeItems">
                                <a (click)="themeItem.command($event)"  >
                                    <i class="material-icons">brush</i>
                                    <span>{{themeItem.label}}</span>
                                </a>

                            </li>

                        </ul>
                    </li>


                    <li #search class="search-item" [ngClass]="{'active-top-menu':app.activeTopbarItem === search}"
                        (click)="app.onTopbarItemClick($event,search)">
                        <span class="md-inputfield">
                            <input type="text" pInputText>
                            <label>Search</label>
                            <i class="topbar-icon material-icons">search</i>
                        </span>
                    </li>


                </ul>


                
            </div>
                        
        </div>
        </div>
    `
})
export class AppTopBar {

    profileUserName: String;

    themeItems = [
        { label: 'Indigo - Pink', icon: 'brush', command: (event) => { this.changeTheme('indigo') } },
        { label: 'Brown - Green', icon: 'brush', command: (event) => { this.changeTheme('brown') } },
        { label: 'Blue - Amber', icon: 'brush', command: (event) => { this.changeTheme('blue') } },
        { label: 'Blue Grey - Green', icon: 'brush', command: (event) => { this.changeTheme('blue-grey') } },
        { label: 'Dark - Blue', icon: 'brush', command: (event) => { this.changeTheme('dark-blue') } },
        { label: 'Dark - Green', icon: 'brush', command: (event) => { this.changeTheme('dark-green') } },
        { label: 'Green - Yellow', icon: 'brush', command: (event) => { this.changeTheme('green') } },
        { label: 'Purple - Cyan', icon: 'brush', command: (event) => { this.changeTheme('purple-cyan') } },
        { label: 'Purple - Amber', icon: 'brush', command: (event) => { this.changeTheme('purple-amber') } },
        { label: 'Teal - Lime', icon: 'brush', command: (event) => { this.changeTheme('teal') } },
        { label: 'Cyan - Amber', icon: 'brush', command: (event) => { this.changeTheme('cyan') } },
        { label: 'Grey - Deep Orange', icon: 'brush', command: (event) => { this.changeTheme('grey') } }
    ];

    constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent,
        private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.userService.currentUser.subscribe(user => { this.profileUserName = user.username });

    }


    logout() {
        this.userService.purgeAuth();
        this.router.navigateByUrl('/login');
    }

    changeTheme(theme) {
        let themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        let layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');

        themeLink.href = 'assets/theme/theme-' + theme + '.css';
        layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
    }
}