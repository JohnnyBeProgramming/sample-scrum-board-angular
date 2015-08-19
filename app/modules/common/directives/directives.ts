angular.module('myScrumBoard.directives', [
    'ui.bootstrap',
])
    .directive('appToolbar', function () {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/toolbar.tpl.html'
        };
    })
    .directive('appHeading', function () {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/heading.tpl.html'
        };
    })
    .directive('appBody', function () {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/body.tpl.html'
        };
    })
    .directive('appFooter', function () {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/footer.tpl.html'
        };
    })
