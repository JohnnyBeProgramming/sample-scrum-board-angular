﻿module app.controllers.sprints.directives {

    import models = app.data.models;

    export function SprintSummaryDirective() {
        return {
            replace: true,
            restrict: 'AEMC',
            scope: {
                project: '=sprintSummaryProject',
                sprint: '=sprintSummaryActive',
            },
            templateUrl: 'views/sprints/directives/summary.tpl.html',
            controller: 'SprintSummaryController',
            controllerAs: 'summryCtrl',
        };
    }


    export class SprintSummaryController {

        public project: models.IProject;
        public current: models.ISprint;
        public sprints: models.ISprint[] = [];

        constructor(private $rootScope: any, private $scope: any, private $modal: any, public scrumboardService: app.common.services.ScrumBoardService) {
            this.current = $scope.sprint;
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
                            sprints.push(item);
                            if (this.current) return;
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

        public countTasks(taskType: models.TaskType): number {
            var count = 0;
            this.scrumboardService.Tasks.filterByProject(this.project.Key).forEach((itm) => {
                if (!this.project || this.project.Key != itm.ProjectKey) return;
                if (!this.current || this.current.Key != itm.SprintKey) return;
                if (itm.TaskType == taskType) count++;
            });
            return count;
        }

        public getTaskCss(type: models.TaskType): string {
            switch (type) {
                case models.TaskType.Default: return 'default';
                case models.TaskType.Backlog: return 'backlog';
                case models.TaskType.Canceled: return 'canceled';
                case models.TaskType.InProgress: return 'started';
                case models.TaskType.Testing: return 'testing';
                case models.TaskType.Completed: return 'completed';
            }
            return null;
        }

        public cancel() {

        }

        public prevSprint() {
            if (this.current) {
                var pilot = this.sprints.indexOf(this.current);
                if (pilot >= 1) {
                    pilot--;
                }
                this.current = this.sprints[pilot];
            }
        }

        public nextSprint() {
            if (this.current) {
                var pilot = this.sprints.indexOf(this.current);
                if (pilot < (this.sprints.length - 1)) {
                    pilot++;
                }
                this.current = this.sprints[pilot];
            }
        }

        public addSprint(project?: models.IProject, state?: models.SprintState) {
            var sprint: models.ISprint = {
                Number: project != null ? this.scrumboardService.Sprints.getNextSprintNumber(project.Key) : 1,
                Key: Guid.Empty,
                State: state ? state : models.SprintState.Default,
                ProjectKey: project != null ? project.Key : null,
            };

            // Open the modal dialog
            var dialog = this.$modal.open({
                size: 'md',
                animation: true,
                templateUrl: 'views/common/modal/addSprint.tpl.html',
                controller: 'AddSprintController',
                controllerAs: 'modalCtrl',
                resolve: {
                    modalContext: () => {
                        return {
                            project: project,
                            sprint: sprint,
                        };
                    },
                }
            }).result.then(
                // On Commit
                (modalContext) => {
                    this.updateSprint(modalContext.sprint);
                },
                // Dismissed
                () => {
                    this.cancel();
                });
        }

        public updateSprint(sprint: models.ISprint) {
            if (sprint.Key == Guid.Empty) {
                sprint.Key = Guid.New();
                this.scrumboardService.Sprints.insert(sprint);
            }
            this.scrumboardService.Sprints.save().finally(() => {
                this.refresh();
                this.$rootScope.$applyAsync();
            });
        }

        public getTaskSummary(sprint: models.ISprint): models.IBoard[] {
            var key = sprint.Key;
            var init = (taskType) => this.newBoard(sprint, taskType);
            var boards: models.IBoard[] = [
                this.firstOrDefaultBoard(key, models.TaskType.Default, init),
                this.firstOrDefaultBoard(key, models.TaskType.InProgress, init),
                this.firstOrDefaultBoard(key, models.TaskType.Testing, init),
                this.firstOrDefaultBoard(key, models.TaskType.Completed, init),
                this.firstOrDefaultBoard(key, models.TaskType.Backlog, init),
            ];
            return boards;
        }

        public newBoard(sprint: models.ISprint, taskType: models.TaskType): models.IBoard {
            return <models.IBoard>{
                Key: Guid.Empty,
                TaskType: taskType,
                SprintKey: sprint.Key,
                ProjectKey: sprint.ProjectKey,
                Title: ControllerUtils.TaskDescription(taskType),
            };
        }

        public firstOrDefaultBoard(sprintKey: string, type: models.TaskType, defaults?: (type: models.TaskType) => models.IBoard): models.IBoard {
            var target = null;
            var boards = this.scrumboardService.Boards.filterBySprint(sprintKey, type);
            if (boards.length) {
                boards.forEach((item) => {
                    if (target) return;
                    if (item.TaskType == type) {
                        target = item;
                    }
                });
            }

            if (!target) {
                boards = defaults ? [defaults(type)] : [];
                boards.forEach((item) => {
                    if (item.Key == Guid.Empty) {
                        item.Key = Guid.New();
                        this.scrumboardService.Boards.insert(item);
                    }
                    if (item.TaskType == type) {
                        target = item;
                    }
                });
            }
            return target;
        }
    }
}