// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  firebaseConfig: {
    apiKey: "AIzaSyA1DQpPRfs9XxFc1RAOrRXY2Dn7o_iTiIQ",
    authDomain: "fir-ocr-ec83a.firebaseapp.com",
    databaseURL: "https://fir-ocr-ec83a.firebaseio.com",
    projectId: "fir-ocr-ec83a",
    storageBucket: "fir-ocr-ec83a.appspot.com",
    messagingSenderId: "486449689562",
    appId: "1:486449689562:web:3d4ce49e881c07d52706e3"
  },
  // googleAPI: 'AIzaSyC1tn2sacBwFc-Q3TyxilRs2-IBQc4N8i8'
  mapboxAPI: 'pk.eyJ1IjoibWhobW0iLCJhIjoiY2tlZWpqejNqMTM4OTJ0cDdldHI2MTk4OSJ9.JSuP3IsBnKayJa7Et96_DQ'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
