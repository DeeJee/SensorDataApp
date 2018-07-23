
import { NgModule } from "@angular/core";
import { DataTypeService } from "./services/datatype.service";
import { SensorDataService } from "./services/sensordata.service";
import { QuerystringBuilderService } from "./services/querystringbuilder.service";
import { DatasourceService } from "./services/datasource.service";
import { AddDatasourceComponent } from "./add-datasource/add-datasource.component";
import { DataTypeControlComponent } from "./data-type-control/data-type-control.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule } from "@angular/material";
import { OverlayModule } from "@angular/cdk/overlay";
import { DatasourceManagementComponent } from "./datasource-management/datasource-management.component";
import { CreateDataTypeComponent } from "./create-data-type/create-data-type.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        OverlayModule,
        MatDialogModule       
    ],
    declarations:[
        AddDatasourceComponent,
        DatasourceManagementComponent,
        DataTypeControlComponent,
        CreateDataTypeComponent
    ],
    exports: [],
    providers:[
        QuerystringBuilderService,
        SensorDataService,
        DataTypeService,
        DatasourceService,
        MatDialog
    ],
    entryComponents:[
        CreateDataTypeComponent
    ]
})
export class SensorDataModule {}