/// <reference path="services/ScrumBoardService.ts" />
/// <reference path="directives/directives.ts" />

angular.module('myScrumBoard.common', [
    'myScrumBoard.directives',
]) 

    .service('ScrumBoardService', ['$q', app.common.services.ScrumBoardService])