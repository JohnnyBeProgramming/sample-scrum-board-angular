module app.common.modal {

    import models = app.data.models;

    export class AddTaskController {

        public map: any = {};
        public projects: models.IProject[] = [];
        public sprints: models.ISprint[] = [];
        public boards: models.IBoard[] = [];

        constructor(private $rootScope: any, private $scope: any, private $modalInstance: any, private modalContext: any, public scrumBoardService: app.common.services.ScrumBoardService) {
            this.init();
        }

        public init() {
            this.scrumBoardService.Projects.load().then((items) => {
                this.$rootScope.$applyAsync(() => {
                    this.projects = items;
                });
            });
            this.scrumBoardService.Sprints.load().then((items) => {
                this.$rootScope.$applyAsync(() => {
                    this.sprints = items;
                });
            });
            this.scrumBoardService.Boards.load().then((items) => {
                this.$rootScope.$applyAsync(() => {
                    this.boards = items;
                });
            });

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

        public getProjectLabel(projectKey: string): string {
            if (this.projects) {
                this.projects.forEach((project) => {
                    if (project.Key == projectKey) {
                        this.map[projectKey] = project;
                    }
                });
            }
            if (this.map[projectKey]) {
                return this.map[projectKey].Title;
            }
            return null;
        }

        public getSprintLabel(sprintKey: string): string {
            if (this.sprints) {
                this.sprints.forEach((item) => {
                    if (item.Key == sprintKey) {
                        this.map[sprintKey] = item;
                    }
                });
            }
            if (this.map[sprintKey]) {
                return 'Sprint #' + (this.map[sprintKey].Number || 1);
            }
            return null;
        }

        public getBoardLabel(boardKey: string): string {
            if (this.boards) {
                this.boards.forEach((item) => {
                    if (item.Key == boardKey) {
                        this.map[boardKey] = item;
                    }
                });
            }
            if (this.map[boardKey]) {
                return this.map[boardKey].Title;
            }
            return null;
        }

        public setProjectKey(task: models.ITask, key: string) {
            this.$rootScope.$applyAsync(() => {
                task.ProjectKey = key;
                task.SprintKey = null;
                task.BoardKey = null;
            });
        }
        public setSprintKey(task: models.ITask, key: string) {
            this.$rootScope.$applyAsync(() => {
                task.SprintKey = key;
                task.BoardKey = null;
            });
            console.log('setSprintKey', task, key);
        }
        public setBoardKey(task: models.ITask, key: string) {
            this.$rootScope.$applyAsync(() => {
                task.BoardKey = key;
            });
            console.log('setBoardKey', task, key);
        }
    }

}