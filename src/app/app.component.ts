import { Component, OnInit } from '@angular/core';
import { AdalService } from 'adal-angular4/adal.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private adalService:AdalService) {
    }

    ngOnInit() {
        this.adalService.init(environment.adalConfig);
        this.adalService.handleWindowCallback();
    }
}
