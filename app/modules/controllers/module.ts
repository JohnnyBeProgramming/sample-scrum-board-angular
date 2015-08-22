/// <reference path="../common/module.ts" />
/// <reference path="backlogs/BacklogController.ts" />
/// <reference path="dashboard/DashboardController.ts" />
/// <reference path="projects/ProjectsController.ts" />
/// <reference path="sprints/SprintController.ts" />

angular.module('myScrumBoard.controllers', [
    'myScrumBoard.common',
])

    .controller('BacklogController', ['$state', '$modal', 'ScrumBoardService', app.controllers.BacklogController])
    .controller('BacklogItemController', ['board', 'ScrumBoardService', app.controllers.BacklogItemController])

    .controller('DashboardController', ['ScrumBoardService', app.controllers.DashboardController])
    .controller('ProjectsController', ['ScrumBoardService', app.controllers.ProjectsController])
    .controller('SprintController', ['ScrumBoardService', app.controllers.SprintController])
