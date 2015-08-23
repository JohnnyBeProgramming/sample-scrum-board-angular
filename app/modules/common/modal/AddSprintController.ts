module app.common.modal {

    export class AddSprintController {

        constructor(private $scope: any, private $modalInstance: any, private modalContext: any, public scrumBoardService: app.common.services.ScrumBoardService) {
            this.init();
        }

        public init() {
            this.$scope.model = this.scrumBoardService;
            this.$scope.project = this.modalContext.project;
            this.$scope.data = this.modalContext.sprint;
            this.$scope.submit = () => {
                this.$modalInstance.close(this.modalContext);
            };
            this.$scope.cancel = () => {
                this.$modalInstance.dismiss(this.modalContext);
            };
            
            if (this.modalContext.project) {
                this.$scope.data.ProjectKey = this.modalContext.project.Key;
            }

        }
    }

}