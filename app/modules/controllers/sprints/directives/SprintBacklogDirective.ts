module app.controllers.sprints.directives {

    import models = app.data.models;

    export function SprintBacklogDirective() {
        return {
            replace: true,
            restrict: 'AEMC',
            scope: {
                project: '=sprintBacklogView',
                sprint: '=sprintBacklogActive',
            },
            templateUrl: 'views/sprints/directives/backlogs.tpl.html',
            controller: 'SprintBacklogController',
            controllerAs: 'backlogCtrl',
        };
    }


    export class SprintBacklogController {

        public showAll: boolean = true;
        public cached: models.ISprint[] = [];
        public current: models.ISprint;
        public project: models.IProject;

        public get sprints(): models.ISprint[] { return this.cached; }


        constructor(private $rootScope: any, private $scope: any, private $modal: any, public scrumboardService: app.common.services.ScrumBoardService) {
            this.project = $scope.project;
            this.init();
        }

        public init() {
            this.refresh();
        }

        public refresh() {
            this.scrumboardService.Sprints.load().then((items) => {
                var max: models.ISprint;
                var sprints = [];
                if (items) {
                    items.forEach((item) => {
                        if (!this.project) return;
                        if (this.project.Key == item.ProjectKey) {
                            this.cached.push(item);
                            if (max && (max.State == models.SprintState.Started)) return;
                            if (!max || (max.Number < item.Number)) {
                                if (max && (item.State == models.SprintState.Discarded)) return;
                                if (max && (item.State == models.SprintState.Completed)) return;
                                max = item;
                            }
                        }
                    });
                }
                this.sprints = sprints;
                this.current = max;
            }).finally(() => {
                this.$rootScope.$applyAsync();
            });
        }

        public getBoards(sprint: models.ISprint) {
            var boards = [

            ];
            return boards;
        }

        public isVisible(board: models.IBoard): boolean {
            if (!board) return false;
            if (this.current) return this.current.Key == board.SprintKey;
            return true;
        }

        public cancel() {

        }


        public addTaskToBoard(board?: models.IBoard) {
            if (!board) return;

            var task: models.ITask = {
                Key: Guid.Empty,
                TaskType: models.TaskType.Default,
                Title: '',
                Description: '',
                BoardKey: board.Key,
            };

            // Open the modal dialog
            var dialog = this.$modal.open({
                size: 'md',
                animation: true,
                templateUrl: 'views/common/modal/addTask.tpl.html',
                controller: 'AddTaskController',
                resolve: {
                    modalContext: () => {
                        return {
                            task: task,
                        };
                    },
                }
            }).result.then(
                // On Commit
                (modalContext) => {
                    this.updateTask(modalContext.task);
                },
                // Dismissed
                () => {
                    this.cancel();
                });
        }

        public getStateDesc(state: models.SprintState): string {
            return ControllerUtils.StateDescription(state);
        }

        public moveTask(boardKey: string, task: models.ITask) {
            if (task && !!boardKey) {
                this.$rootScope.$applyAsync(() => {
                    console.log(' - Move:', task.Key, boardKey);
                    task.BoardKey = boardKey;
                    this.updateTask(task);
                });
            }
        }
        
        public updateTask(task: models.ITask) {
            if (task.Key == Guid.Empty) {
                task.Key = Guid.New();
                this.scrumboardService.Tasks.insert(task);
            }
            this.scrumboardService.Tasks.save().finally(() => {
                this.refreshData({ task: task });
                this.$rootScope.$applyAsync();
            });
        }

        public refreshData(ctx: any) {
            this.$rootScope.$broadcast('RefreshData', ctx);
        }


        public getTasks(board: models.IBoard): models.ITask[] {
            var tasks = this.scrumboardService.Tasks.filter(board.Key);
            //console.log(' - Tasks: ', board.Key, tasks);
            return tasks;
        }

        public editTask(task: models.ITask) {

            // Open the modal dialog
            var dialog = this.$modal.open({
                size: 'md',
                animation: true,
                templateUrl: 'views/common/modal/addTask.tpl.html',
                controller: 'AddTaskController',
                controllerAs: 'modalCtrl',
                resolve: {
                    modalContext: () => {
                        return {
                            task: task,
                        };
                    },
                }
            }).result.then(
                // On Commit
                (modalContext) => {
                    this.updateTask(modalContext.task);
                },
                // Dismissed
                () => {
                    this.cancel();
                });
        }

    }
}