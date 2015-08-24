/// <reference path="services/ScrumBoardService.ts" />
/// <reference path="directives/directives.ts" />
/// <reference path="modal/AddProjectController.ts" />
/// <reference path="modal/AddBoardController.ts" />
/// <reference path="modal/AddTaskController.ts" />
/// <reference path="modal/AddSprintController.ts" />
/// <reference path="modal/AddBacklogsController.ts" />

angular.module('myScrumBoard.common', [
    'myScrumBoard.directives',
])

    .service('ScrumBoardService', ['$rootScope', '$q', app.common.services.ScrumBoardService])

    .controller('AddProjectController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddProjectController])
    .controller('AddBoardController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddBoardController])
    .controller('AddSprintController', ['$scope', '$modalInstance', 'modalContext', 'ScrumBoardService', app.common.modal.AddSprintController])
    .controller('AddTaskController', ['$rootScope', '$scope', '$modalInstance', 'modalContext', 'ScrumBoardService', app.common.modal.AddTaskController])
    .controller('AddBacklogsController', ['$scope', '$modalInstance', 'modalContext', 'ScrumBoardService', app.common.modal.AddBacklogsController])
