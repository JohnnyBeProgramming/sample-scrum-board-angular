module app.common.directives {

    export function DragItem() {
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
                data: '=dragData',
            },
            controller: ['$scope', ($scope) => {
                $scope.drag = (data) => {
                    console.log(' - Drag:', data.Key);
                }
            }],
            link: ($scope: any, element) => {
                element.attr('draggable', 'true');
                addEvent(element[0], 'dragstart',(e) => {
                    var data = $scope.data;
                    e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
                    e.dataTransfer.setData('Text', JSON.stringify(data)); // required otherwise doesn't work
                    $scope.drag(data);
                });
            },
        };
    }

}