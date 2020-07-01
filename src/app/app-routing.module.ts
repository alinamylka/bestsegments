import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SegmentEffortComponent} from './segment.effort/segment.effort.component';
import {SegmentComponent} from './segment/segment.component';


const routes: Routes = [
    { path: 'segment-efforts', component: SegmentEffortComponent },
    { path: 'segments', component: SegmentComponent }
];

@NgModule({
  imports: [HttpClientModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
