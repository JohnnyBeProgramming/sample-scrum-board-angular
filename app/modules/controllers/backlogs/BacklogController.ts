module app.controllers {

    import models = app.data.models;

    export class BacklogController {
        public newTask: models.ITask;
        public current: models.IBoard;

        public get boards(): models.IBoard[] { return this.getBoards(); }

        constructor(private $rootScope: any, private $state: any, private $modal: any, private scrumBoards: app.common.services.ScrumBoardService) { }

        public getBoards(): models.IBoard[] {
            return this.scrumBoards
                .Boards
                .filterByType(app.data.models.TaskType.Backlog);
        }

        public index() {
            this.$state.go('backlogs.list');
        }

        public openBoard(board: models.IBoard) {
            this.$state.go('backlogs.item', { key: board.Key });
        }

        public createNew(boardId?: string) {
            var board: models.IBoard = {
                Key: Guid.Empty,
                Title: 'Project Backlog',
                TaskType: models.TaskType.Backlog,
            };
            this.current = board;

            // Open the modal dialog
            var dialog = this.$modal.open({
                size: 'md',
                animation: true,
                templateUrl: 'views/common/modal/addBoard.tpl.html',
                controller: 'AddBoardController',
                resolve: {
                    modalContext: () => {
                        return {
                            board: board,
                        };
                    },
                }
            }).result.then(
                // On Commit
                (modalContext) => {
                    console.info(' - Modal closed. Updating task.', modalContext);
                    this.insert(modalContext.board);
                },
                // Dismissed
                () => {
                    console.info(' - Modal dismissed at: ' + new Date());
                    this.index();
                });

        }

        public update(board: models.IBoard) {
            this.scrumBoards.Boards.save()
                .then((success) => {
                if (success) {
                } else {
                    // Not saved....
                }
            });
            this.index();
        }

        public insert(board: models.IBoard) {
            if (board.Key == Guid.Empty) {
                board.Key = Guid.New();
                this.scrumBoards.Boards.insert(board);
            }
            this.scrumBoards.Boards.save()
                .then((success) => {
                if (success) {
                } else {
                    // Not saved....
                }
            });
            this.index();
        }

        public cancel() {
            this.index();
        }

        public addTaskToBoard(board?: models.IBoard) {
            if (!board) board = this.current;
            if (!board) return;

            var task: models.ITask = {
                Key: Guid.Empty,
                TaskType: models.TaskType.Default,
                Title: '',
                Description: '',
                BoardKey: board.Key,
            };
            this.newTask = task;

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
                    this.cancelTask();
                });
        }

        public moveTask(boardKey: string, task: models.ITask) {
            console.log(' - Move Task:', boardKey, task.Key);
            if (task && boardKey) {
                task.BoardKey = boardKey;
            }
            this.scrumBoards.Tasks.save().finally(() => {
                this.$rootScope.$applyAsync();
            });
        }

        public updateTask(task: models.ITask) {
            if (task.Key == Guid.Empty) {
                task.Key = Guid.New();
                this.scrumBoards.Tasks.insert(task);
            }
            console.log(task);
            this.scrumBoards.Tasks.save();
            this.newTask = null;
        }

        public cancelTask() {
            this.newTask = null;
        }
    }

    export class BacklogListController {

        constructor(private scrumBoards: app.common.services.ScrumBoardService) {
            this.init();
        }

        public init() {
        }


    }

    export class BacklogItemController {

        constructor(private scrumBoards: app.common.services.ScrumBoardService, public board?: models.IBoard) { }

    }

}