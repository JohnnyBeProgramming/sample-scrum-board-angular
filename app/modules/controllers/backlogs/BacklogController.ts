module app.controllers {

    import models = app.data.models;

    export class BacklogController {

        public tabIndex: number = 0;
        public current: models.IBoard;
        public newTask: models.ITask;

        public get boards(): models.IBoard[] {
            return this.scrumBoards.Boards.filterByType(app.data.models.TaskType.Backlog);
        }

        constructor(private scrumBoards: app.common.services.ScrumBoardService) {
        }

        public index() {
            this.tabIndex = 0;
        }

        public createNew(boardId?: string) {
            var board: models.IBoard = {
                Key: Guid.Empty,
                Title: 'Project Backlog',
                TaskType: models.TaskType.Backlog,
            };
            this.current = board;
            this.tabIndex = 2;
        }

        public openBoard(board: models.IBoard) {
            this.current = board;
            this.tabIndex = 1;
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
            this.openBoard(board);
        }

        public cancel() {
            this.current = null;
            this.index();
        }

        public addTask() {
            var task: models.ITask = {
                Key: Guid.Empty,
                Title: '',
                Description: '',
                BoardKey: this.current.Key,
            };
            this.newTask = task;
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

}