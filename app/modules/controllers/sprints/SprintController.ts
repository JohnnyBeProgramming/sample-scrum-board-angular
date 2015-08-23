/// <reference path="../../data/module.ts" />
/// <reference path="../../common/module.ts" />

module app.controllers {

    import models = app.data.models;

    export class ControllerUtils {

        public static TaskDescription(type: models.TaskType): string {
            switch (type) {
                case models.TaskType.Default: return 'Unassigned Tasks';
                case models.TaskType.Backlog: return 'Backlog';
                case models.TaskType.Canceled: return 'Canceled';
                case models.TaskType.Completed: return 'Completed';
                case models.TaskType.InProgress: return 'In Progress';
                case models.TaskType.Scheduled: return 'Scheduled';
                case models.TaskType.Testing: return 'Testing';
                default: return '';
            }
        }

        public static StateDescription(state: models.SprintState): string {
            switch (state) {
                case models.SprintState.Default: return 'Scheduled';
                case models.SprintState.Completed: return 'Completed';
                case models.SprintState.Discarded: return 'Discarded';
                case models.SprintState.OnHold: return 'On Hold';
                case models.SprintState.Started: return 'In Progress';
                default: return '';
            }
        }

    }

    export class SprintController {
        public projectCache: any = {};

        constructor(private $rootScope: any, private $state: any, private $modal: any, private scrumBoards: app.common.services.ScrumBoardService) {
            console.log(' - Sprint Controller...');
        }

        public getSprints(): ng.IPromise<models.ISprint[]> {
            return this.scrumBoards
                .Sprints
                .filterByProject(Guid.New());
        }

        public index() {
            this.$state.go('sprints');
        }

        public openBoard(sprint: models.ISprint) {
            this.$state.go('sprints.item', { key: sprint.Key });
        }

        public cancel() {
            this.index();
        }

        public addTask(board?: models.IBoard) {
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
                    console.info(' - Modal closed. Updating task.', modalContext);
                    this.updateTask(modalContext.task);
                },
                // Dismissed
                () => {
                    console.info(' - Modal dismissed at: ' + new Date());
                    this.cancel();
                });
        }

        public updateTask(task: models.ITask) {
            if (task.Key == Guid.Empty) {
                task.Key = Guid.New();
                this.scrumBoards.Tasks.insert(task);
            }
            this.scrumBoards.Tasks.save().then(() => {
                this.$rootScope.$applyAsync();
            });
        }

        public getProjectLabel(projectKey: string): string {
            if (projectKey in this.projectCache) {
                return this.projectCache[projectKey].Title;
            } else {
                this.scrumBoards.Projects
                    .findByKey(projectKey)
                    .then((result) => {
                    this.projectCache[projectKey] = result;
                }).finally(() => {
                    this.$rootScope.$applyAsync();
                });
            }
            return null;
        }

        public getStateDesc(state: models.SprintState): string {
            return ControllerUtils.StateDescription(state);
        }

        public getBoards(sprintKey: string): models.IBoard[] {
            var list = this.scrumBoards.Boards.filterBySprint(sprintKey);
            if (!list.length) {
                var tasks = this.scrumBoards.Tasks.filterBySprint(sprintKey);
                if (tasks && tasks.length) {
                    tasks.forEach((item) => {
                        this.defineBoard(sprintKey, item.TaskType,(type) => <models.IBoard>{
                            Key: Guid.Empty,
                            Title: ControllerUtils.TaskDescription(type),
                            TaskType: type,
                            SprintKey: sprintKey,
                            ProjectKey: item.ProjectKey,
                        });
                    });
                    list = this.scrumBoards.Boards.filterBySprint(sprintKey);
                }
            }
            return list;
        }

        public defineBoard(sprintKey, type: models.TaskType, defaults?: (type: models.TaskType) => models.IBoard) {
            var boards = this.scrumBoards.Boards.filterBySprint(sprintKey, type);
            if (!boards.length) {
                boards = defaults ? [defaults(type)] : [];
                boards.forEach((item) => {
                    if (item.Key == Guid.Empty) {
                        item.Key = Guid.New();
                        this.scrumBoards.Boards.insert(item);
                    }
                })
            }
            return boards;
        }

    }

    export class SprintListController {

        public showAll: boolean = true;
        public get sprints(): models.ISprint[] { return this.cached; }

        public cached: models.ISprint[] = [];

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService, public project?: models.IProject) {
            console.log(' - Sprint List Controller...');
            this.init();
        }

        public init() {
            this.scrumBoards.Sprints.load().then((items) => {
                this.cached = [];
                if (items) {
                    items.forEach((item) => {
                        if (this.project && (this.project.Key == item.ProjectKey)) {
                            this.cached.push(item);
                        }
                    });
                }
            }).finally(() => {
                this.$rootScope.$applyAsync();
            });
        }

    }

    export class SprintsActiveController {

        public showAll: boolean = false;
        public get sprints(): models.ISprint[] { return this.showAll ? this.cached : this.active; }

        public cached: models.ISprint[] = [];
        public active: models.ISprint[] = [];

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService) {
            console.log(' - Sprint List Controller...');
            this.init();
        }

        public init() {
            this.scrumBoards.Sprints.load().then((items) => {
                this.active = [];
                this.cached = items;
                if (items) {
                    items.forEach((item) => {
                        if (item.State == models.SprintState.Started) {
                            this.active.push(item);
                        }
                    });
                }
            }).finally(() => {
                this.$rootScope.$applyAsync();
            });
        }

    }

    export class SprintItemController {

        public boards: models.IBoard[] = [];

        public get requiresTesting() { return !!this.sprint; }

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService, public sprint?: models.ISprint) {
            this.init();
        }

        public init() {
            this.scrumBoards.Boards.load().then((items) => {
                // Define the boards
                this.boards = [];

                // Scheduled Tasks
                this.defineBoard(models.TaskType.Scheduled,(type) => <models.IBoard>{
                    Key: Guid.Empty,
                    TaskType: type,
                    Title: ControllerUtils.TaskDescription(type),
                    ProjectKey: this.sprint ? this.sprint.ProjectKey : null,
                    SprintKey: this.sprint ? this.sprint.Key : null,
                });

                // In Progress Tasks
                this.defineBoard(models.TaskType.InProgress,(type) => <models.IBoard>{
                    Key: Guid.Empty,
                    TaskType: type,
                    Title: ControllerUtils.TaskDescription(type),
                    ProjectKey: this.sprint ? this.sprint.ProjectKey : null,
                    SprintKey: this.sprint ? this.sprint.Key : null,
                });

                // Testing (if required)
                this.defineBoard(models.TaskType.Testing,(type) => !this.requiresTesting ? null : < models.IBoard > {
                    Key: Guid.Empty,
                    TaskType: type,
                    Title: ControllerUtils.TaskDescription(type),
                    ProjectKey: this.sprint ? this.sprint.ProjectKey : null,
                    SprintKey: this.sprint ? this.sprint.Key : null,
                });

                // Completed Tasks
                this.defineBoard(models.TaskType.Completed,(type) => <models.IBoard>{
                    Key: Guid.Empty,
                    TaskType: type,
                    Title: ControllerUtils.TaskDescription(type),
                    ProjectKey: this.sprint ? this.sprint.ProjectKey : null,
                    SprintKey: this.sprint ? this.sprint.Key : null,
                });

            }).finally(() => {
                this.$rootScope.$applyAsync();
            })
        }

        public getColumnCss(size: number) {
            size = size || this.boards.length;
            if (12 < size) {
                return 'col-md-1';
            } else {
                return 'col-md-' + Math.floor(12 / size);
            }
        }

        public defineBoard(type: models.TaskType, defaults?: (type: models.TaskType) => models.IBoard) {
            var projKey = this.sprint ? this.sprint.ProjectKey : null;
            var boards = this.scrumBoards.Boards.filterByProject(projKey, type);
            if (!boards.length) {
                boards = defaults ? [defaults(type)] : [];
            }
            if (boards.length) {
                boards.forEach((item) => {
                    if (item) this.boards.push(item);
                });
            }
        }
    }

    export class SprintEditController {

        constructor(private scrumBoards: app.common.services.ScrumBoardService, public sprint?: models.ISprint) {
            console.log(' - Sprint Edit Controller...', sprint);
        }

    }
}