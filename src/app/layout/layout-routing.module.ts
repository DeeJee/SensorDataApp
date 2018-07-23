import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AddDatasourceComponent } from './sensor-data/add-datasource/add-datasource.component';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { DatasourceManagementComponent } from './sensor-data/datasource-management/datasource-management.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'channeldata', loadChildren: './sensor-data/channel-data/channeldata.module#ChanneldataModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },

            { path: 'adddatasources', component: AddDatasourceComponent },
            { path: 'managedatasources', component: DatasourceManagementComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes),
        SensorDataModule
    ],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
