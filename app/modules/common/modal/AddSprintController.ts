module app.common.modal {

    export class AddSprintController {

        constructor(private $scope: any, private $modalInstance: any, private modalContext: any) {
            this.init();
        }

        public init() {
            this.$scope.data = this.modalContext.sprint;
            this.$scope.submit = () => {
                this.$modalInstance.close(this.modalContext);
            };

            this.$scope.cancel = () => {
                this.$modalInstance.dismiss(this.modalContext);
            };
            
        }
    }

}