/// <reference path="AppToolbar.ts" />
/// <reference path="AppHeading.ts" />
/// <reference path="AppBody.ts" />
/// <reference path="AppFooter.ts" />
/// <reference path="DropTarget.ts" />
/// <reference path="DragItem.ts" />

angular.module('myScrumBoard.directives', [
    'ui.bootstrap',
])

    .directive('appToolbar', app.common.directives.AppToolbar)
    .directive('appHeading', app.common.directives.AppHeading)
    .directive('appBody', app.common.directives.AppBody)
    .directive('appFooter', app.common.directives.AppFooter)

    .directive('dropTarget', app.common.directives.DropTarget)
    .directive('dragItem', app.common.directives.DragItem)

