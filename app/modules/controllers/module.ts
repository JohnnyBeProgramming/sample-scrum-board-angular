/// <reference path="../common/module.ts" />
/// <reference path="backlogs/BacklogController.ts" />
/// <reference path="dashboard/DashboardController.ts" />
/// <reference path="projects/ProjectsController.ts" />
/// <reference path="sprints/SprintController.ts" />

angular.module('myScrumBoard.controllers', [
    'myScrumBoard.common',
])

    .controller('DashboardController', ['ScrumBoardService', app.controllers.DashboardController])

    .controller('ProjectsController', ['$state', '$modal', 'ScrumBoardService', app.controllers.ProjectsController])
    .controller('ProjectListController', ['$rootScope', 'ScrumBoardService', app.controllers.ProjectListController])
    .controller('ProjectItemController', ['$rootScope', 'ScrumBoardService', 'project', app.controllers.ProjectItemController])

    .controller('SprintController', ['$rootScope', '$state', '$modal', 'ScrumBoardService', app.controllers.SprintController])
    .controller('SprintsActiveController', ['$rootScope', 'ScrumBoardService', app.controllers.SprintsActiveController])
    .controller('SprintListController', ['$rootScope', 'ScrumBoardService', 'project', app.controllers.SprintListController])
    .controller('SprintItemController', ['$rootScope', 'ScrumBoardService', 'sprint', app.controllers.SprintItemController])
    .controller('SprintEditController', ['ScrumBoardService', 'sprint', app.controllers.SprintEditController])

    .controller('BacklogController', ['$state', '$modal', 'ScrumBoardService', app.controllers.BacklogController])
    .controller('BacklogItemController', ['ScrumBoardService', 'board', app.controllers.BacklogItemController])

