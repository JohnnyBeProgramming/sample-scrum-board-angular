angular.module('myScrumBoard.data', [
    'ui.router',
])

    .constant('myScrumBoardState', {
        active: null,
        lastError: null,
    })