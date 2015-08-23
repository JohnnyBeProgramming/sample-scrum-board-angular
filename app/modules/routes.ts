angular.module('myScrumBoard.routes', [
    'ui.router',
])

    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

    // Configure defaults
    $urlRouterProvider
        .when('', '/')
        .when('/', '/projects')
        .when('index.html', '/')

    // Configure client-side routing
    $stateProvider
        .state('default',
        {
            url: '/',
            /*
            views: {
                'main@': {
                    templateUrl: 'views/dashboard/main.tpl.html',
                    controller: 'DashboardController',
                    controllerAs: 'viewCtrl',
                },
            }
            */
            parent: 'projects',
            views: {
                'contents': {
                    templateUrl: 'views/projects/list.tpl.html',
                    controller: 'ProjectListController',
                    controllerAs: 'childCtrl',
                },
            },
        })

        .state('projects',
        {
            url: '/projects',
            abstract: true,
            views: {
                'main@': {
                    templateUrl: 'views/projects/main.tpl.html',
                    controller: 'ProjectsController',
                    controllerAs: 'viewCtrl',
                },
            }
        })
        .state('projects.list',
        {
            url: '',
            parent: 'projects',
            views: {
                'contents': {
                    templateUrl: 'views/projects/list.tpl.html',
                    controller: 'ProjectListController',
                    controllerAs: 'childCtrl',
                },
            },
        })
        .state('projects.item',
        {
            url: '/{projectKey:string}',
            parent: 'projects',
            views: {
                'contents': {
                    templateUrl: 'views/projects/item.tpl.html',
                    controller: 'ProjectItemController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                project: ['$stateParams', 'ScrumBoardService', ($stateParams, svc: app.common.services.ScrumBoardService) => {
                    return $stateParams.projectKey ? svc.Projects.findByKey($stateParams.projectKey) : null;
                }]
            },
        })

        .state('sprints',
        {
            url: '/sprints',
            abstract: true,
            views: {
                'main@': {
                    templateUrl: 'views/sprints/main.tpl.html',
                    controller: 'SprintController',
                    controllerAs: 'viewCtrl',
                },
            }
        })        
        .state('sprints.active',
        {
            url: '',
            parent: 'sprints',
            views: {
                'contents': {
                    templateUrl: 'views/sprints/active.tpl.html',
                    controller: 'SprintsActiveController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                project: ['$stateParams', 'ScrumBoardService', ($stateParams, svc: app.common.services.ScrumBoardService) => {
                    return $stateParams.projectKey ? svc.Projects.findByKey($stateParams.projectKey) : null;
                }]
            },
        })
        .state('sprints.list',
        {
            url: '^/{projectKey:string}/sprints',
            parent: 'sprints',
            views: {
                'contents': {
                    templateUrl: 'views/sprints/list.tpl.html',
                    controller: 'SprintListController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                project: ['$stateParams', 'ScrumBoardService', ($stateParams, svc: app.common.services.ScrumBoardService) => {
                    return $stateParams.projectKey ? svc.Projects.findByKey($stateParams.projectKey) : null;
                }],
            },
        })
        .state('sprints.item',
        {
            url: '/{key:string}',
            parent: 'sprints',
            views: {
                'contents': {
                    templateUrl: 'views/sprints/item.tpl.html',
                    controller: 'SprintItemController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                sprint: ['$stateParams', 'ScrumBoardService', ($stateParams, svc: app.common.services.ScrumBoardService) => {
                    return $stateParams.key ? svc.Sprints.findByKey($stateParams.key) : null;
                }]
            },
        })
        .state('sprints.edit',
        {
            url: '/{key:string}/edit',
            parent: 'sprints',
            views: {
                'contents': {
                    templateUrl: 'views/sprints/edit.tpl.html',
                    controller: 'SprintEditController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                sprint: ['$stateParams', 'ScrumBoardService', ($stateParams, svc: app.common.services.ScrumBoardService) => {
                    return $stateParams.key ? svc.Sprints.findByKey($stateParams.key) : null;
                }]
            },
        })

        .state('backlogs',
        {
            url: '/backlogs',
            abstract: true,
            views: {
                'main@': {
                    templateUrl: 'views/backlogs/main.tpl.html',
                    controller: 'BacklogController',
                    controllerAs: 'viewCtrl',
                },
            }
        })
        .state('backlogs.list',
        {
            url: '',
            parent: 'backlogs',
            views: {
                'contents': {
                    templateUrl: 'views/backlogs/list.tpl.html',
                    controller: 'BacklogListController',
                    controllerAs: 'childCtrl',
                },
            },
        })
        .state('backlogs.item',
        {
            url: '/{key:string}',
            parent: 'backlogs',
            views: {
                'contents': {
                    templateUrl: 'views/backlogs/item.tpl.html',
                    controller: 'BacklogItemController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                board: ['$stateParams', 'ScrumBoardService', ($stateParams, svc: app.common.services.ScrumBoardService) => {
                    return $stateParams.key ? svc.Boards.findByKey($stateParams.key) : null;
                }]
            },
        })

}]) 