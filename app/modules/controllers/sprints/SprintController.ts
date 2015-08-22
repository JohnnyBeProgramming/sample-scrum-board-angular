/// <reference path="../../data/module.ts" />
/// <reference path="../../common/module.ts" />

module app.controllers {

    import models = app.data.models;

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
            this.$state.go('sprints.list');
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

        public getStateDesc(state: models.SprintState) {
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

        constructor(private scrumBoards: app.common.services.ScrumBoardService, public sprint?: models.ISprint) {
            console.log(' - Sprint Child Controller...', sprint);
        }

    }

    export class SprintEditController {

        constructor(private scrumBoards: app.common.services.ScrumBoardService, public sprint?: models.ISprint) {
            console.log(' - Sprint Edit Controller...', sprint);
        }

    }
}