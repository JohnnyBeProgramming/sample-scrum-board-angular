/// <reference path="services/ScrumBoardService.ts" />
/// <reference path="directives/directives.ts" />
/// <reference path="modal/AddProjectController.ts" />
/// <reference path="modal/AddBoardController.ts" />
/// <reference path="modal/AddTaskController.ts" />

angular.module('myScrumBoard.common', [
    'myScrumBoard.directives',
]) 

    .service('ScrumBoardService', ['$q', app.common.services.ScrumBoardService])

    .controller('AddProjectController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddProjectController])
    .controller('AddBoardController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddBoardController])
    .controller('AddTaskController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddTaskController])
