import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppheaderComponent } from './components/appheader/appheader.component';
import { AppsidebarComponent } from './components/appsidebar/appsidebar.component';
import { AppcontentComponent } from './components/appcontent/appcontent.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppcontrolComponent } from './components/appcontrol/appcontrol.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { LocationComponent } from './components/location/location.component';
import { CategoryComponent } from './components/category/category.component';
import { UnitComponent } from './components/unit/unit.component';

import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { SupplierComponent } from './components/supplier/supplier.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AppcontentComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'location', component: LocationComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'unit', component: UnitComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'customer', component: CustomerComponent },
  { path: '**', redirectTo: '' }
];

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    AppheaderComponent,
    AppsidebarComponent,
    AppcontentComponent,
    AppfooterComponent,
    AppcontrolComponent,
    WarehouseComponent,
    LocationComponent,
    CategoryComponent,
    UnitComponent,
    SupplierComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent],
  entryComponents: [
    WarehouseComponent
  ]
})
export class AppModule { }
