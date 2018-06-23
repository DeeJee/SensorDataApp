
import { NgModule } from "@angular/core";
import { DataTypeService } from "./services/datatype.service";
import { SensorDataService } from "./services/sensordata.service";
import { QuerystringBuilderService } from "./services/querystringbuilder.service";
import { DatasourceService } from "./services/datasource.service";
import { ChanneldataComponent } from './channel-data/channeldata.component';


@NgModule({
    imports: [
    ],
    declarations:[
        ChanneldataComponent,
    ],
    exports: [],
    providers:[
        QuerystringBuilderService,
        SensorDataService,
        DataTypeService,
        DatasourceService
    ],
    entryComponents:[
    ]
})
export class SensorDataModule {}