module app.common.directives {

    export function DropTarget() {
        function addEvent(to, type, fn) {
            if ('addEventListener' in document) {
                to.addEventListener(type, fn, false);
            } else if ('attachEvent' in document) {
                to.attachEvent('on' + type, fn);
            } else {
                to['on' + type] = fn;
            }
        };
        return {
            replace: true,
            restrict: 'AEMC',
            scope: {
                action: '&dropAction',
            },
            controller: ['$scope', ($scope) => {
                $scope.over = () => { }
                $scope.enter = () => { }
                $scope.leave = () => { }
                $scope.drop = (data) => {
                    console.warn(' - Drop', data.Key, $scope.action);
                    if ($scope.action) {
                        $scope.action({
                            data: data,
                        });
                    }
                }
            }],
            link: ($scope: any, element: JQuery) => {
                addEvent(element[0], 'dragover',(e) => {
                    if (e.preventDefault) e.preventDefault(); // allows us to drop
                    e.dataTransfer.dropEffect = 'copy';
                    element.toggleClass('over', true);
                    $scope.over();
                    return false;
                });
                addEvent(element[0], 'dragenter',(e) => {
                    element.toggleClass('over', true); // to get IE to work
                    $scope.enter();
                    return false;
                });
                addEvent(element[0], 'dragleave',() => {
                    element.toggleClass('over', false);
                    $scope.leave();
                });
                addEvent(element[0], 'drop',(e) => {
                    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
                    element.toggleClass('over', false);
                    var data = e.dataTransfer.getData('Text');
                    $scope.drop(JSON.parse(data));
                    return false;
                });
            },
        };
    }
}