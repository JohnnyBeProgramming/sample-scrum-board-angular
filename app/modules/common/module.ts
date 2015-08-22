/// <reference path="services/ScrumBoardService.ts" />
/// <reference path="directives/directives.ts" />
/// <reference path="modal/AddTaskController.ts" />
/// <reference path="modal/AddBoardController.ts" />

angular.module('myScrumBoard.common', [
    'myScrumBoard.directives',
]) 

    .service('ScrumBoardService', ['$q', app.common.services.ScrumBoardService])

    .controller('AddTaskController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddTaskController])
    .controller('AddBoardController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddBoardController])
