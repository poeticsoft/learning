
  import { Component } from '@angular/core';
  import { Platform } from 'ionic-angular';
  import { StatusBar } from '@ionic-native/status-bar';
  import { SplashScreen } from '@ionic-native/splash-screen';

  @Component({
    templateUrl: 'template.html'
  })
  export class AppComponent {

    rootPage:any = 'HomePage';

    constructor(
      platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen
    ) {

      platform.ready().then(() => {
        
        statusBar.styleDefault();
        splashScreen.hide();
      });
    }
  }

