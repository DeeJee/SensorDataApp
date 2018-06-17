import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AdalService } from 'adal-angular4/adal.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(
        public router: Router,
        private adalService: AdalService) { }

    ngOnInit() {
        //this.adalService.login();
    }

    onLoggedin() {
        this.adalService.login();
    }
}
