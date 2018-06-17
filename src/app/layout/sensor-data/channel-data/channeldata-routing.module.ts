import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChanneldataComponent } from './channeldata.component';

const routes: Routes = [
    {
        path: ':id',
        component: ChanneldataComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChanneldataRoutingModule {}
