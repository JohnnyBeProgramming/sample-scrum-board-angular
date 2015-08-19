angular.module('myScrumBoard.ui', [
    'ui.bootstrap',
])
    .directive('myAppToolbar', function () {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/toolbar.tpl.html'
        };
    })
    .directive('myAppHeading', function () {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/heading.tpl.html'
        };
    })
    .directive('myAppBody', function () {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/body.tpl.html'
        };
    })
    .directive('myAppFooter', function () {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/footer.tpl.html'
        };
    })
