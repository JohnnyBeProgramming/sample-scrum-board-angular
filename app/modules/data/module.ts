/// <reference path="models/AppState.ts" />

angular.module('myScrumBoard.data', [
    'ui.router',
])

    .constant('ScrumBoardState', app.data.models.LoadAppState()) 