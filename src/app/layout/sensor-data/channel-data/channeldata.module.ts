import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { ChanneldataRoutingModule } from './channeldata-routing.module';
import { ChanneldataComponent } from './channeldata.component';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from '../../../shared';
import { DataSourceSelectorComponent } from '../datasource-selector/datasource-selector.component';
import { DatasourceService } from '../services/datasource.service';
import { QuerystringBuilderService } from '../services/querystringbuilder.service';
import { CachingSensorDataService } from '../services/cachingsensordata.service';
import { DataTypeService } from '../services/datatype.service';
import { SensorDataChartComponent } from '../sensordata-chart/sensordatachart.component';
import { LoadingSpinnerModule } from '../../../shared/modules/loading-spinner/loading-spinner.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        ChanneldataRoutingModule,
        PageHeaderModule,
        FormsModule,
        LoadingSpinnerModule
    ],
    declarations: [
        ChanneldataComponent,
        DataSourceSelectorComponent      ,
        SensorDataChartComponent  
    ],
    providers:[
        DatasourceService,
        QuerystringBuilderService,
        CachingSensorDataService,
        DataTypeService
    ],
    entryComponents:[
        SensorDataChartComponent
    ]
})
export class ChanneldataModule { }
