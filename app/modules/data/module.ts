/// <reference path="models/AppState.ts" />
/// <reference path="../data/repositories/ProjectRepository.ts" />
/// <reference path="../data/repositories/BoardRepository.ts" />
/// <reference path="../data/repositories/GroupRepository.ts" />
/// <reference path="../data/repositories/TaskRepository.ts" />
/// <reference path="../data/repositories/UserRepository.ts" />

angular.module('myScrumBoard.data', [
    'ui.router',
])

    .constant('ScrumBoardState', app.data.models.LoadAppState()) 