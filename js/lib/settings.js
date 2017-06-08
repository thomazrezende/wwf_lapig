console.log('--- app.js')

var minify = false;
var app,base

if(minify){
  base = 'js/min'
  app = '../min'
}else{
  base = 'js/lib'
  app = '../app'
}

requirejs.config({
    baseUrl: base,
    paths: {
      app: app
    },
    shim: {
      'jquery-cross-origin'   :{ deps:['jquery']},
      'jquery-easing'         :{ deps:['jquery']},
      'jquery-scrollTo'       :{ deps:['jquery']},
      'jquery-ui'             :{ deps:['jquery']},
      'leaflet'               :{ deps:['jquery']},
      // 'gmaps'                 :{ deps:['jquery','leaflet']},
      'leaflet.googlemutant'  :{ deps:['jquery','leaflet']},
      //app
      'app/icons'             :{ deps:['jquery','leaflet']},
      'app/main'              :{ deps:['jquery','leaflet','app/icons']},
      'app/lang'              :{ deps:['jquery','leaflet','app/icons','app/main' ]},
      'app/navigation'        :{ deps:['jquery','leaflet','app/icons','app/main','app/lang' ]}
   }
});

// Start the main app logic.

require([
  'jquery',
  'jquery-cross-origin',
  'jquery-easing',
  'jquery-scrollTo',
  'jquery-ui',
  'jquery-ui',
  'leaflet',
  // 'gmaps',
  'leaflet.googlemutant',
  //app
  'app/icons',
  'app/main',
  'app/lang',
  'app/navigation'
]);
