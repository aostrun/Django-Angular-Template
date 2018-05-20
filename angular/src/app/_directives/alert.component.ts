import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../_services';
import * as Typed from "typed.js"

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;
    typed: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            this.message = message; 
            if (this.message != undefined){
                this.makeMessage(this.message.text);
            }else{
                this.makeMessage("");
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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

        this.typed = new Typed("#alert_text", {
          strings: strings,
          typeSpeed: 40,
          loop: true,
          backSpeed: 80,
          showCursor: false
        });
    }
}