module app.common.directives {

    export function AppToolbar() {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/toolbar.tpl.html'
        };
    }

}