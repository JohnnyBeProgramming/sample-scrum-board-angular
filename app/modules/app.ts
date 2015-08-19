/// <reference path="imports.d.ts" />

angular.module('myScrumBoard', [
    'myScrumBoard.ui',
    'myScrumBoard.modules',
    'myScrumBoard.routes',
    'myScrumBoard.data',
])

    .run(['$rootScope', 'myScrumBoardState', function ($rootScope, myScrumBoardState) {
        console.debug('Starting application...');

        $rootScope.myApp = {
            state: myScrumBoardState,
        };
    }])
