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

        public getTasks(board: models.IBoard): models.ITask[] {
            var tasks = this.scrumBoards.Tasks.filter(board.Key);
            //console.log(' - Tasks: ', board.Key, tasks);
            return tasks;
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
                    this.insert(modalContext.board);
                },
                // Dismissed
                () => {
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
                    this.updateTask(modalContext.task);
                },
                // Dismissed
                () => {
                    this.cancelTask();
                });
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
                    this.cancelTask();
                });
        }

        public updateTask(task: models.ITask) {
            if (task.Key == Guid.Empty) {
                task.Key = Guid.New();
                this.scrumBoards.Tasks.insert(task);
            }
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