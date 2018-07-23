import { Component, OnInit, Output } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sd-date-picker',
    templateUrl: './sd-date-picker.component.html',
    styleUrls: ['./sd-date-picker.component.scss']
})
export class SdDatePickerComponent implements OnInit {
    @Output() model: NgbDateStruct;
    constructor() { }

    ngOnInit() {
    }
}
