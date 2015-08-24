module app.data.repositories {

    import IBoard = app.data.models.IBoard;

    export class BoardRepository extends AbstractRepository<IBoard> {

        constructor($rootScope: ng.IRootScopeService, $q: ng.IQService) {
            super('boards', $rootScope, $q,() => SampleData.Boards);
        }

        public create(type: app.data.models.TaskType, title?: string): IBoard {
            var item = {
                Key: Guid.New(),
                Title: title,
                TaskType: type,
            };
            this.insert(item);
            return item;
        }

        public filterByProject(projectKey: string, type?: app.data.models.TaskType): IBoard[] {
            var list = [];
            this.list().forEach((item) => {
                if (item.ProjectKey != projectKey) return;
                if (!type) {
                    list.push(item);
                } else if (item.TaskType == type) {
                    list.push(item);
                }
            });
            return list;
        }

        public filterBySprint(sprintKey: string, type?: app.data.models.TaskType): IBoard[] {
            var list = [];
            this.list().forEach((item) => {
                if (item.SprintKey != sprintKey) return;
                if (!type) {
                    list.push(item);
                } else if (item.TaskType == type) {
                    list.push(item);
                }
            });
            return list;
        }

        public filterByType(type: app.data.models.TaskType): IBoard[] {
            var list = [];
            this.list().forEach((item) => {
                if (item.TaskType == type) {
                    list.push(item);
                }
            });
            return list;
        }

    }

}  