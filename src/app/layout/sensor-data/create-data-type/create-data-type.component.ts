import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CachingSensorDataService } from '../services/cachingsensordata.service';
import { QuerystringBuilderService } from '../services/querystringbuilder.service';
import { DataTypeService } from '../services/datatype.service';
import { DataType } from '../../models/DataType';
import { HttpErrorResponse } from '../../../../../node_modules/@angular/common/http';
// import { CachingSensorDataService } from 'app/services/cachingsensordata.service';
// import { QuerystringBuilderService } from 'app/services//querystringbuilder.service';
// import { DataTypeService } from 'app/services/datatype.service';
// import { DataType } from 'app/models/DataType';

@Component({
  selector: 'app-create-data-type',
  templateUrl: './create-data-type.component.html',
  styleUrls: ['./create-data-type.component.css'],
  providers: [CachingSensorDataService, QuerystringBuilderService, DataTypeService]
})
export class CreateDataTypeComponent {
  label: string;
  properties: string[];
  error: string;
  @Output() datasourceCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<CreateDataTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sensorDataService: CachingSensorDataService,
    private dataTypeService: DataTypeService) {

    this.label = "Create data type for datasource " + data.datasource.DeviceId;

    this.sensorDataService.getMostRecent(data.datasource.DeviceId).subscribe((res) => {
      let item = JSON.parse(res.Payload);
      this.properties = Object.getOwnPropertyNames(item);
    });
  }

  save(data: any) {
    let dataType = new DataType(0, data.name, this.properties.join(','));
    this.dataTypeService.create(dataType).subscribe(
      ds => null,
      (err: HttpErrorResponse) => this.error = err.error.Message,
      () => {
        console.log('Created: ' + dataType);
        this.dialogRef.close(true);
      });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
