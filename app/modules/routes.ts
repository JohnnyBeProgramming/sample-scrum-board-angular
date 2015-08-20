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
                    controller: 'DashboardController',
                    controllerAs: 'viewCtrl',
                },
            }
        })

        .state('projects', {
            url: '/projects',
            views: {
                'main@': {
                    templateUrl: 'views/projects/main.tpl.html',
                    controller: 'ProjectsController',
                    controllerAs: 'viewCtrl',
                },
            }
        })

        .state('sprints', {
            url: '/sprints',
            views: {
                'main@': {
                    templateUrl: 'views/sprints/main.tpl.html',
                    controller: 'SprintController',
                    controllerAs: 'viewCtrl',
                },
            }
        })

        .state('backlogs', {
            url: '/backlogs',
            views: {
                'main@': {
                    templateUrl: 'views/backlogs/main.tpl.html',
                    controller: 'BacklogController',
                    controllerAs: 'viewCtrl',
                },
            }
        })

}]) 