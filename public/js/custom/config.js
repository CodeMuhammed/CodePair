angular.module('config' , ['ui.router','ngMaterial','ngMdIcons','ui.ace'])

    //state configuration and routing setup
    .config([
        '$stateProvider' , '$urlRouterProvider'  , '$locationProvider',
        function($stateProvider , $urlRouterProvider  , $locationProvider){
              //enabling HTML5 mode
               $locationProvider.html5Mode(false).hashPrefix('!');
               $stateProvider
                 .state('home' , {
                     url : '/home',
                     templateUrl : 'views/home.html',
                     controller : 'homeController',
                 })

                 .state('app' , {
                     url : '/app',
                     templateUrl : 'views/app.html',
                     controller : 'appController',
                 })

                 .state('collaborate' , {
                     url : '/collaborate',
                     templateUrl : 'views/collaborate.html'
                 })

                 $urlRouterProvider.otherwise('/collaborate');
            }
    ])

    // cors configurations to enable consuming the rest api
    .config([
        '$httpProvider' ,
        function($httpProvider){
           $httpProvider.defaults.useXDomain = true;
           $httpProvider.defaults.withCredentials = true;
           delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
    ])



   .config(function($mdThemingProvider, $mdIconProvider , $locationProvider, $urlRouterProvider, $stateProvider){
            $mdThemingProvider.theme('default')
                .primaryPalette('green')
                // If you specify less than all of the keys, it will inherit from the
                // default shades
                .accentPalette('amber');

    });
