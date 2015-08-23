module app.common.directives {

    export function AppBody() {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/body.tpl.html'
        };
    }

}