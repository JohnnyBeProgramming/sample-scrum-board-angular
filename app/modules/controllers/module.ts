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

    .controller('SprintController', ['ScrumBoardService', app.controllers.SprintController])
    .controller('SprintItemController', ['sprint', 'ScrumBoardService', app.controllers.SprintItemController])

    .controller('BacklogController', ['$state', '$modal', 'ScrumBoardService', app.controllers.BacklogController])
    .controller('BacklogItemController', ['board', 'ScrumBoardService', app.controllers.BacklogItemController])

