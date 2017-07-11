import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "app/shared/services/user.service";
import { AppStateService } from "app/shared/services/app-state.service";





@Component({
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  userName: String;
  password: String

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    // private fb: FormBuilder,
    private appStateService:AppStateService
  ) {
    // use FormBuilder to create a form group
    // this.authForm = this.fb.group({
    //   'email': ['', Validators.required],
    //   'password': ['', Validators.required]
    // });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title =  'Sign in';

    });
  }

  submitForm() {
    this.isSubmitting = true;


    const credentials = {username:this.userName,password:this.password};
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.appStateService.addGrowl({ severity: 'error', summary: 'Authentication failure :', detail: "Please enter valid credentials"})
        this.isSubmitting = false;
      }
    );
  }
}
