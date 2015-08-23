module app.common.directives {

    export function AppFooter() {
        return {
            replace: true,
            restrict: 'AEM',
            templateUrl: 'views/common/footer.tpl.html'
        };
    }

}