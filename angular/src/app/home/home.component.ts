import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService, AuthenticationService } from '../_services';
// import fade in animation
import * as Typed from "typed.js";

@Component({templateUrl: 'home.component.html',
styleUrls: ['home.component.css']

})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService,private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        var options = {
            strings: ["Dobrodošao, upali na <a href='http://onlineradiobox.com/hr/extra936/'>ExtraFM </a> :)"],
            typeSpeed: 40
          }
          
        var typed = new Typed("#home_text", options);

        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => { 
            this.loadAllUsers() 
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    logout(){
        this.authenticationService.logout().pipe(first()).subscribe(() => {
            console.log("logged out");
        })
    }
}