module app.common.modal {

    import models = app.data.models;

    export class AddBacklogsController {

        public selected: any = {};
        public boards: models.IBoard[] = [];
        public other: models.ITask[] = [];

        constructor(private $scope: any, private $modalInstance: any, private modalContext: any, public scrumBoardService: app.common.services.ScrumBoardService) {
            this.init();
        }

        public init() {
            var ctx = this.modalContext;
            this.$scope.ctx = ctx;
            this.$scope.data = ctx.data;
            this.$scope.model = this.scrumBoardService;
            this.$scope.submit = () => {
                this.scrumBoardService.Tasks.load().then((items) => {
                    var list = [];
                    var targets = this.getSelected();
                    if (items && targets.length) {
                        items.forEach((item) => {
                            if (targets.indexOf(item.Key) >= 0) {
                                list.push(item);
                            }
                        });
                    }
                    ctx.data = list;
                });
                this.$modalInstance.close(ctx);
            };
            this.$scope.cancel = () => {
                this.$modalInstance.dismiss(ctx);
            };

            if (ctx.projectKey) {
                var map = {};
                var svc = this.scrumBoardService;
                svc.Boards.load().then((items) => {
                    var boards = svc.Boards.filterByProject(ctx.projectKey, models.TaskType.Backlog);
                    if (boards) {
                        boards.forEach((board) => {
                            map[board.Key] = board;
                        });
                    }
                    this.$scope.$applyAsync(() => {
                        this.boards = boards;
                    });

                    svc.Tasks.load().then((items) => {
                        var other = [];
                        var tasks = svc.Tasks.filterByProject(ctx.projectKey);
                        if (tasks) {
                            tasks.forEach((item) => {
                                if (item.BoardKey in map) return;
                                if (item.TaskType == models.TaskType.Backlog) {
                                    other.push(item);
                                }
                            });
                        }
                        this.$scope.$applyAsync(() => {
                            this.other = other;
                        });
                    });

                });
            }
        }

        public getSelected(): string[] {
            var list = [];
            for (var key in this.selected) {
                if (this.selected.hasOwnProperty(key) && this.selected[key] === true) {
                    list.push(key);
                }
            }
            return list;
        }

        public getBoardTasks(board: models.IBoard): models.ITask[] {
            return this.scrumBoardService.Tasks.filter(board.Key);
        }
    }

}