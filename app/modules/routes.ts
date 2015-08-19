angular.module('myScrumBoard.routes', [
    'ui.router',
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Configure defaults
    $urlRouterProvider
        .when('', '/')
        .when('index.html', '/')

    // Configure client-side routing
    $stateProvider
        .state('default', {
            url: '/',
            views: {
                'main@': {
                    templateUrl: 'views/dashboard/main.tpl.html',
                    //controller: 'MainViewController',
                    //controllerAs: 'mainCtrl',
                },
            }
        })

        .state('projects', {
            url: '/projects',
            views: {
                'main@': {
                    templateUrl: 'views/projects/main.tpl.html',
                },
            }
        })

        .state('sprints', {
            url: '/sprints',
            views: {
                'main@': {
                    templateUrl: 'views/sprints/main.tpl.html',
                },
            }
        })

        .state('backlogs', {
            url: '/backlogs',
            views: {
                'main@': {
                    templateUrl: 'views/backlogs/main.tpl.html',
                },
            }
        })

}]) 