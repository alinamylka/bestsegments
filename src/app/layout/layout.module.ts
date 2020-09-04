import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {LoaderComponent} from './loader/loader.component';
import {AuthorizeComponent} from './authorize/authorize.component';
import { SyncComponent } from './sync/sync.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [HeaderComponent, LoaderComponent, AuthorizeComponent, SyncComponent],
    exports: [HeaderComponent, LoaderComponent]
})
export class LayoutModule {
}
