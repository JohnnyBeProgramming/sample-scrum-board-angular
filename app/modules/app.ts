/// <reference path="imports.d.ts" />
/// <reference path="data/module.ts" />
/// <reference path="common/module.ts" />
/// <reference path="routes.ts" />

angular.module('myScrumBoard', [
    'myScrumBoard.common',
    'myScrumBoard.routes',
    'myScrumBoard.data',
])

    .run(['$rootScope', 'ScrumBoardState', ($rootScope, ScrumBoardState: app.data.models.AppState) => {
        console.debug('Starting application...');

        $rootScope.myApp = {
            state: ScrumBoardState,
        };
    }])
