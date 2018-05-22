import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { fadeAnimation} from '../_animations/fade-in.animation';
import { AlertService, AuthenticationService } from '../_services';

import * as Typed from "typed.js"



@Component({
templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    typed: any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {}

    ngOnInit() {


        this.makeMessage("Identify yourself");


        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error("Please check your username/password");
                    this.loading = false;
                });
    }

    makeMessage(newTexts: String){
          
        const dataType = newTexts;   // 

        if (dataType === undefined) {
          return false;
        }
        const strings = dataType.split(',');

        if(this.typed && this.typed.constructor === Typed) {
            this.typed.destroy();
        }

        this.typed = new Typed("#login_text", {
          strings: strings,
          typeSpeed: 70,
          showCursor: false
        });
    }

}
