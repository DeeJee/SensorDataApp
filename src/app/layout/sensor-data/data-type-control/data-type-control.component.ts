import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Datasource } from '../../models/datasource';
import { DataType } from '../../models/DataType';

@Component({
  selector: 'data-type-control',
  templateUrl: './data-type-control.component.html',
  styleUrls: ['./data-type-control.component.css']
})
export class DataTypeControlComponent {
  @Input() ds: Datasource;
  @Input() dataTypes: DataType[];
  @Output() onCreateDataType: EventEmitter<Datasource> = new EventEmitter<Datasource>();

  onTypeChanged(event: any) {
    if (event.target.selectedIndex == event.target.options.length - 1) {
      this.onCreateDataType.emit(this.ds);
    }
  }
}
