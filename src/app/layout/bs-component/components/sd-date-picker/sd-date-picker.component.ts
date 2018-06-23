import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'sd-date-picker',
    templateUrl: './sd-date-picker.component.html',
    styleUrls: ['./sd-date-picker.component.scss']
})
export class SdDatePickerComponent implements OnInit {
    model: any;
    constructor() { }

    ngOnInit() {
    }
    
    click(event: any): void {
console.log(event);
    }
}
