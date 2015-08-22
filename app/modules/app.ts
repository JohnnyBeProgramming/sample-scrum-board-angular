/// <reference path="imports.d.ts" />
/// <reference path="data/module.ts" />
/// <reference path="common/module.ts" />
/// <reference path="controllers/module.ts" />
/// <reference path="routes.ts" />

angular.module('myScrumBoard', [
    'myScrumBoard.data',
    'myScrumBoard.common',
    'myScrumBoard.controllers',
    'myScrumBoard.routes',
    'myScrumBoard.templates',
])

    .run(['$rootScope', 'ScrumBoardState', ($rootScope, ScrumBoardState: app.data.models.AppState) => {
        console.debug('Starting application...');

        $rootScope.myApp = {
            state: ScrumBoardState,
        };
    }])
