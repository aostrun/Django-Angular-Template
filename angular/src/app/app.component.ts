import { Component,OnInit } from '@angular/core';
import { fadeAnimation } from './_animations/fade-in.animation';
import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild,sequence
  } from '@angular/animations';
declare var particlesJS: any;

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    animations: [fadeAnimation] // register the animation
})

export class AppComponent implements OnInit{
    ngOnInit() {
        particlesJS.load('particles-js', '../../assets/particles.json', function() {
            console.log('callback - particles.js config loaded');
          });
    }

    
 }