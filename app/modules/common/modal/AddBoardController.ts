module app.common.modal {

    export class AddBoardController {

        constructor(private $scope: any, private $modalInstance: any, private modalContext: any) {
            this.init();
        }

        public init() {
            this.$scope.data = this.modalContext.board;
            this.$scope.submit = () => {
                this.$modalInstance.close(this.modalContext);
            };

            this.$scope.cancel = () => {
                this.$modalInstance.dismiss(this.modalContext);
            };

            var intv = setInterval(() => {
                clearInterval(intv);
                $('#boardTitle').focus();
            }, 500);

            $('#taskTitle').focusout(() => {
                console.log(' - Blur');
                $('#boardBody').focus();
            });
        }
    }

}