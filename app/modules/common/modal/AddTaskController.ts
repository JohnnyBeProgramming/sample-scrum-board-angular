module app.common.modal {

    export class AddTaskController {

        constructor(private $scope: any, private $modalInstance: any, private modalContext: any) {
            this.init();
        }

        public init() {
            this.$scope.data = this.modalContext.task;
            this.$scope.submit = () => {
                this.$modalInstance.close(this.modalContext);
            };

            this.$scope.cancel = () => {
                this.$modalInstance.dismiss(this.modalContext);
            };

            var intv = setInterval(() => {
                clearInterval(intv);
                $('#taskTitle').focus();
            }, 500);

            $('#taskTitle').focusout(() => {
                $('#taskBody').focus();
            });
        }
    }

}