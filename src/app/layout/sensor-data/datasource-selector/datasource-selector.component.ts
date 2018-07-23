import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SensorDataService } from '../services/sensordata.service';
import { Datasource } from '../../models/datasource';
import { DatasourceService } from '../services/datasource.service';

@Component({
  providers: [SensorDataService],
  selector: 'dataSourceSelector',
  templateUrl: 'datasource-selector.component.html'
  //template:''
})
export class DataSourceSelectorComponent implements OnInit {
  @Output("dataSourceChange") selectedDataSourceChange: EventEmitter<Datasource> = new EventEmitter<Datasource>();

  @Input() public channel: number;
  @Input() public dataSources: Datasource[];

  constructor(private datasourceService: DatasourceService) {}

  ngOnInit(): void {
    this.datasourceService.getDataSources(this.channel).subscribe(res => {
      this.dataSources = res;
      if (this.dataSources.length > 0) {
        this.selectedDataSourceChange.emit(this.dataSources[0]);
      }
    },
      error => { },
      () => {
        console.log('getDataSources finished');
        console.debug("datasources: " + this.dataSources.length);
        console.debug("datasources: channel: " + this.channel);
      });

  }

  public dataSourceChanged(event: any): void {
    let dataSource = this.getDatasource(event.target.value);
    this.selectedDataSourceChange.emit(dataSource);
  }

  private getDatasource(deviceId: string): Datasource {
    for (let entry of this.dataSources) {
      if (entry.DeviceId === deviceId) {
        return entry;
      }
    }
    return null;
  }
}
