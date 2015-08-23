module app.common.directives {

    export function AppHeading() {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/heading.tpl.html'
        };
    }

}