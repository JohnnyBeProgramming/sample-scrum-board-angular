/// <reference path="../common/module.ts" />
/// <reference path="backlogs/BacklogController.ts" />
/// <reference path="dashboard/DashboardController.ts" />
/// <reference path="projects/ProjectsController.ts" />
/// <reference path="sprints/SprintController.ts" />
/// <reference path="projects/directives/ProjectSummary.ts" />

angular.module('myScrumBoard.controllers', [
    'myScrumBoard.common',
])

    .controller('DashboardController', ['ScrumBoardService', app.controllers.DashboardController])

    .controller('ProjectsController', ['$rootScope','$state', '$modal', 'ScrumBoardService', app.controllers.ProjectsController])
    .controller('ProjectListController', ['$rootScope', '$state', '$modal', 'ScrumBoardService', app.controllers.ProjectListController])
    .controller('ProjectItemController', ['$rootScope', 'ScrumBoardService', 'project', app.controllers.ProjectItemController])
    .controller('ProjectSummaryController', ['$rootScope', '$scope', '$modal', 'ScrumBoardService', app.controllers.projects.directives.ProjectSummaryController])
    .directive('projectSummary', [app.controllers.projects.directives.ProjectSummary])

    .controller('SprintController', ['$rootScope', '$state', '$modal', 'ScrumBoardService', app.controllers.SprintController])
    .controller('SprintsActiveController', ['$rootScope', 'ScrumBoardService', app.controllers.SprintsActiveController])
    .controller('SprintListController', ['$rootScope', 'ScrumBoardService', 'project', app.controllers.SprintListController])
    .controller('SprintItemController', ['$rootScope', 'ScrumBoardService', 'sprint', app.controllers.SprintItemController])
    .controller('SprintEditController', ['ScrumBoardService', 'sprint', app.controllers.SprintEditController])

    .controller('BacklogController', ['$rootScope', '$state', '$modal', 'ScrumBoardService', app.controllers.BacklogController])
    .controller('BacklogListController', ['ScrumBoardService', app.controllers.BacklogListController])
    .controller('BacklogItemController', ['ScrumBoardService', 'board', app.controllers.BacklogItemController])

