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

        constructor(private $rootScope: any, private $state: any, private $modal: any, private scrumBoards: app.common.services.ScrumBoardService) { }

        public getSprints(): ng.IPromise<models.ISprint[]> {
            return this.scrumBoards
                .Sprints
                .filterByProject(Guid.New());
        }

        public index() {
        }

        public openBoard(sprint: models.ISprint) {
            this.$state.go('sprints.item', { key: sprint.Key });
        }

        public cancel() {
            this.index();
        }

        public addTask(task?: models.ITask) {
            task = task ? task : <models.ITask>{
                Key: Guid.Empty,
                Title: '',
                Description: '',
                BoardKey: null,
                ProjectKey: null,
                SprintKey: null,
                TaskType: models.TaskType.Default,
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

        public addTaskToBoard(board?: models.IBoard, callback?: (task: models.ITask) => void) {
            if (!board) return;

            var task: models.ITask = {
                Key: Guid.Empty,
                Title: '',
                Description: '',
                BoardKey: board.Key,
                ProjectKey: board.ProjectKey,
                SprintKey: board.SprintKey,
                TaskType: board.TaskType ? board.TaskType : models.TaskType.Default,
            };
            this.addTask(task);
        }

        public addTaskToSprint(sprint: models.ISprint) {
            var board = this.firstOrDefaultBoard(sprint.Key, models.TaskType.Default,(type) => <models.IBoard>{
                Key: Guid.Empty,
                Title: ControllerUtils.TaskDescription(type),
                TaskType: type,
                SprintKey: sprint.Key,
                ProjectKey: sprint.ProjectKey,
            });
            var task: models.ITask = {
                Key: Guid.Empty,
                Title: '',
                Description: '',
                TaskType: board.TaskType,
                ProjectKey: sprint.ProjectKey,
                SprintKey: sprint.Key,
                BoardKey: board.Key,
            };
            this.addTask(task);
        }

        public addSprint(project?: models.IProject, state?: models.SprintState) {
            var sprint: models.ISprint = {
                Number: 0,
                Key: Guid.Empty,
                State: state ? state : models.SprintState.Started,
                ProjectKey: project != null ? project.Key : null,
            };

            // Open the modal dialog
            var dialog = this.$modal.open({
                size: 'md',
                animation: true,
                templateUrl: 'views/common/modal/addSprint.tpl.html',
                controller: 'AddSprintController',
                resolve: {
                    modalContext: () => {
                        return {
                            sprint: sprint,
                        };
                    },
                }
            }).result.then(
                // On Commit
                (modalContext) => {
                    console.info(' - Modal closed. Updating sprint.', modalContext);
                    this.updateSprint(modalContext.sprint);
                },
                // Dismissed
                () => {
                    console.info(' - Modal dismissed at: ' + new Date());
                    this.cancel();
                });
        }

        public addBacklogs(sprint: models.ISprint, board?: models.IBoard) {
            // Open the modal dialog
            var dialog = this.$modal.open({
                size: 'md',
                animation: true,
                templateUrl: 'views/common/modal/addBacklogs.tpl.html',
                controller: 'AddBacklogsController',
                controllerAs: 'modalCtrl',
                resolve: {
                    modalContext: () => {
                        return {
                            data: [],
                            sprint: sprint,
                            projectKey: sprint.ProjectKey,
                        };
                    },
                }
            }).result.then(
                // On Commit
                (modalContext) => {
                    var result = modalContext.data;
                    console.info(' - Modal closed. Updating sprint.', result);
                    if (result && result.length) {
                        result.forEach((item: models.ITask) => {
                            item.TaskType = models.TaskType.Default;
                            item.SprintKey = sprint.Key;
                            item.ProjectKey = sprint.ProjectKey;
                            item.BoardKey = board ? board.Key : this.firstOrDefaultBoard(sprint.Key, models.TaskType.Default,(type) => <models.IBoard>{
                                Key: Guid.Empty,
                                TaskType: type,
                                SprintKey: sprint.Key,
                                ProjectKey: sprint.ProjectKey,                                
                                Title: ControllerUtils.TaskDescription(type),
                            }).Key;
                        });

                        this.scrumBoards.Boards.save().then(() => {
                            this.scrumBoards.Tasks.save();
                        });
                    }
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
            this.scrumBoards.Tasks.save().finally(() => {
                this.refreshData({ task: task });
                this.$rootScope.$applyAsync();
            });
        }

        public updateSprint(sprint: models.ISprint) {
            if (sprint.Key == Guid.Empty) {
                sprint.Key = Guid.New();
                this.scrumBoards.Sprints.insert(sprint);
            }
            this.scrumBoards.Sprints.save().finally(() => {
                this.refreshData({ sprint: sprint });
                this.$rootScope.$applyAsync();
            });
        }

        public refreshData(ctx: any) {
            this.$rootScope.$broadcast('RefreshData', ctx);
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

        public getBoardByType(sprint: models.ISprint, type?: models.TaskType): models.IBoard {
            var found = null;
            var boards = this.getBoards(sprint.Key);
            if (boards) {
                boards.forEach((item) => {
                    if (found) return;
                    if (item.TaskType == (type ? type : models.TaskType.Default)) {
                        found = item;
                    }
                });
            }
            return found;
        }

        public getBoards(sprintKey: string): models.IBoard[] {
            var list = this.scrumBoards.Boards.filterBySprint(sprintKey);
            if (!list.length) {
                var tasks = this.scrumBoards.Tasks.filterBySprint(sprintKey);
                if (tasks && tasks.length) {
                    tasks.forEach((item) => {
                        this.firstOrDefaultBoard(sprintKey, item.TaskType,(type) => <models.IBoard>{
                            Key: Guid.Empty,
                            Title: ControllerUtils.TaskDescription(type),
                            TaskType: type,
                            SprintKey: sprintKey,
                            ProjectKey: item.ProjectKey,
                        });
                    });
                }
                list = this.scrumBoards.Boards.filterBySprint(sprintKey);
            }
            return list;
        }

        public firstOrDefaultBoard(sprintKey: string, type: models.TaskType, defaults?: (type: models.TaskType) => models.IBoard): models.IBoard {
            var target = null;
            var boards = this.scrumBoards.Boards.filterBySprint(sprintKey, type);
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
                        this.scrumBoards.Boards.insert(item);
                    }
                    if (item.TaskType == type) {
                        target = item;
                    }
                });
            }
            return target;
        }

    }

    export class SprintListController {

        public showAll: boolean = true;
        public get sprints(): models.ISprint[] { return this.cached; }

        public cached: models.ISprint[] = [];

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService, public project?: models.IProject) {
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
            this.init();
        }

        public init() {
            this.load();
            this.$rootScope.$on('RefreshData',(event, data) => {
                this.load();
            });
        }

        public load() {
            this.scrumBoards.Sprints.load().then((items) => {
                if (items) {
                    var active = [];
                    items.forEach((item) => {
                        if (item.State == models.SprintState.Started) {
                            active.push(item);
                        }
                    });
                    this.active = active;
                    this.cached = items;
                }
            }).finally(() => {
                this.$rootScope.$applyAsync();
            });
        }

        public reload() {
            this.$rootScope.$broadcast('RefreshParent');
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
                this.boards = [

                    // Scheduled Tasks
                    this.firstOrDefaultBoard(models.TaskType.Default,(type) => <models.IBoard>{
                        Key: Guid.Empty,
                        TaskType: type,
                        Title: ControllerUtils.TaskDescription(type),
                        ProjectKey: this.sprint ? this.sprint.ProjectKey : null,
                        SprintKey: this.sprint ? this.sprint.Key : null,
                    }),

                    // In Progress Tasks
                    this.firstOrDefaultBoard(models.TaskType.InProgress,(type) => <models.IBoard>{
                        Key: Guid.Empty,
                        TaskType: type,
                        Title: ControllerUtils.TaskDescription(type),
                        ProjectKey: this.sprint ? this.sprint.ProjectKey : null,
                        SprintKey: this.sprint ? this.sprint.Key : null,
                    }),

                    // Testing (if required)
                    this.firstOrDefaultBoard(models.TaskType.Testing,(type) => !this.requiresTesting ? null : < models.IBoard > {
                        Key: Guid.Empty,
                        TaskType: type,
                        Title: ControllerUtils.TaskDescription(type),
                        ProjectKey: this.sprint ? this.sprint.ProjectKey : null,
                        SprintKey: this.sprint ? this.sprint.Key : null,
                    }),

                    // Completed Tasks
                    this.firstOrDefaultBoard(models.TaskType.Completed,(type) => <models.IBoard>{
                        Key: Guid.Empty,
                        TaskType: type,
                        Title: ControllerUtils.TaskDescription(type),
                        ProjectKey: this.sprint ? this.sprint.ProjectKey : null,
                        SprintKey: this.sprint ? this.sprint.Key : null,
                    }),
                ];
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

        public firstOrDefaultBoard(type: models.TaskType, defaults?: (type: models.TaskType) => models.IBoard) {
            var target = null;
            var sprintKey = this.sprint ? this.sprint.Key : null;
            var boards = this.scrumBoards.Boards.filterBySprint(sprintKey, type);
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
                        this.scrumBoards.Boards.insert(item);
                    }
                    if (item.TaskType == type) {
                        target = item;
                    }
                });
            }
            return target;
        }
    }

    export class SprintEditController {

        constructor(private scrumBoards: app.common.services.ScrumBoardService, public sprint?: models.ISprint) { }

    }
}