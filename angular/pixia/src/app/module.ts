
// Core

import { NgModule } from '@angular/core';
import { 
  BrowserModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// 3 part

import 'hammerjs';

// Class

import { HammerConfig } from './class/hammerconfig';

// Service

import { ApiService } from './service/api';
import { ResponsiveService } from './service/responsive';
import { PixiStyleService } from './service/pixistyle';
import { PixiTextureService } from './service/pixitexture';
import { PixiInteractionService } from './service/pixiinteraction';

// Pipe

import { KeysPipe } from './pipe/keys';

// APP 

import { AppComponent } from './component/app/component';

// Responsive

import { SectionGroupComponent } from './component/layout/section-group/component';
import { SectionComponent } from './component/layout/section/component';
import { BlockComponent } from './component/layout/block/component';

// Nav

import { NavComponent } from './component/nav/component';

// Routes views

import { MainViewComponent } from './view/main/component';
import { AvatarViewComponent } from './view/avatar/component';
import { LabViewComponent } from './view/lab/component';
import { GesturesViewComponent } from './view/gestures/component';
import { PixiViewComponent } from './view/pixi/component';

import { NoViewComponent } from './view/no/component';

// Block library

import { BlockBaseComponent } from './component/blockstore/base/component';
import { BlockPlaymotivAnagramaComponent } from './component/blockstore/playmotiv-anagrama/component';
import { BlockPixiComponent } from './component/blockstore/pixi/component';
import { BlockAvatarComponent } from './component/blockstore/avatar/component';

// UI Library

import { UIButtonComponent } from './component/ui/button/component';

// http://onehungrymind.com/named-router-outlets-in-angular-2/

const appRoutes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'avatar', component: AvatarViewComponent },
  { path: 'lab', component: LabViewComponent },
  { path: 'gestures', component: GesturesViewComponent },
  { 
    path: 'pixi', 
    component: PixiViewComponent,
    children: [
      { path: 'avatar', component: BlockAvatarComponent }
    ]
  },
  { path: '**', component: NoViewComponent }
];

@NgModule({
  declarations: [

    // Pipe

    KeysPipe,

    // APP

    AppComponent,

    // Responsive

    SectionGroupComponent,
    SectionComponent,
    BlockComponent,

    // Nav

    NavComponent,

    // Routes views

    MainViewComponent,
    AvatarViewComponent,
    LabViewComponent,
    GesturesViewComponent,
    PixiViewComponent,

    NoViewComponent,

    // Block store

    BlockBaseComponent,
    BlockPlaymotivAnagramaComponent,
    BlockPixiComponent,
    BlockAvatarComponent,

    // UI

    UIButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [
    ApiService,
    ResponsiveService,
    { 
      provide: HAMMER_GESTURE_CONFIG, 
      useClass: HammerConfig
    },
    PixiStyleService,
    PixiTextureService,
    PixiInteractionService  
  ],
  exports: [    
     KeysPipe
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
