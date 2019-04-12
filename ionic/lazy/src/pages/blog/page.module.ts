
	import { NgModule } from '@angular/core';
	import { IonicPageModule } from 'ionic-angular';
	import { BlogPage } from './page';
	
	@NgModule({
		declarations: [BlogPage],
		imports: [IonicPageModule.forChild(BlogPage)],
	})
	export class HomePageModule { }