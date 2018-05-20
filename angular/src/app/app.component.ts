import { Component,OnInit } from '@angular/core';
declare var particlesJS: any;

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})

export class AppComponent implements OnInit{
    ngOnInit() {
        particlesJS.load('particles-js', '../../assets/particles.json', function() {
            console.log('callback - particles.js config loaded');
          });
    }
 }