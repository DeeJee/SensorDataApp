import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DatasourceService } from '../services/datasource.service';
import { DataTypeService } from '../services/datatype.service';
import { QuerystringBuilderService } from '../services/querystringbuilder.service';
import { Datasource } from '../../models/datasource';
import { DataType } from '../../models/DataType';
import { CreateDataTypeComponent } from '../create-data-type/create-data-type.component';

@Component({
  providers: [DatasourceService, DataTypeService, QuerystringBuilderService],
  selector: 'datasource-management',
  templateUrl: './add-datasource.component.html'
})
export class AddDatasourceComponent implements OnInit {
  dataSources: Datasource[] = [];
  dataTypes: DataType[] = [];
  showSpinner: boolean = true;
  dialogRef: MatDialogRef<CreateDataTypeComponent>;
  error: string;


  ngOnInit(): void {
    this.loadData();
  }
  constructor(private datasourceService: DatasourceService,
    private dataTypeService: DataTypeService,
    private dialog: MatDialog) { }

    dataTypeSelected(value: any, ds:any): void{
      if(value=="0"){
        this.dialogRef = this.dialog.open(CreateDataTypeComponent, 
          { 
            data: { datasource: ds, title:"aap" },
         //   position: {top: '-100', left: '-100'},
            width:"600px"
          });
        this.dialogRef.afterClosed().subscribe((res) => {
          if (res) {
            this.loadDataTypes();
          }
        });
      }
    }
  onCreateDataType(ds: Datasource): void {
    this.dialogRef = this.dialog.open(CreateDataTypeComponent, { data: { datasource: ds } });
    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadDataTypes();
      }
    });
  }

  loadData(): void {
    this.loadDataTypes();

    this.datasourceService.getNewDataSources().subscribe(res => {
      for (let index = 0; index < res.length; index++) {
        let item = res[index];
        this.dataSources.push(item);
      }
    }, err => null,
      () => {
        console.log('new dataSources loaded');
        this.showSpinner = false;
      });
  }

  loadDataTypes(): void {
    this.dataTypeService.get().subscribe(res => {
      res.unshift(new DataType(0, "Select datatype", null));
      res.push(new DataType(0, "Create new", null));
      this.dataTypes = res;
    }, err => null,
      () => {
        console.log('dataTypes loaded');
      });
  }

  save(): void {
    this.error = null;
    for (let index = 0; index < this.dataSources.length; index++) {
      let datasource = this.dataSources[index];
      if (datasource.DataTypeId && datasource.DataTypeId > 0) {
        console.debug(datasource.DeviceId + ", " + datasource.Description);
        this.datasourceService.addDatasource(datasource).subscribe(
          ds => null,
          err => this.error = err,
          () => {
            console.debug("Datasource added: " + datasource.DeviceId);
            this.dataSources.splice(index, 1);
          });
      }
    }
  }
}
