
module app.data.repositories {

    import models = app.data.models;

    export class TaskRepository extends AbstractRepository<models.ITask> {

        constructor($rootScope: ng.IRootScopeService, $q: ng.IQService) {
            super('tasks', $rootScope, $q,() => SampleData.Tasks);
        }

        public create(board: models.IBoard, title: string, description?: string): models.ITask {
            var item: models.ITask = {
                Key: Guid.New(),
                TaskType: models.TaskType.Default,
                Title: title,
                Description: description,
                BoardKey: board.Key,
            };
            this.insert(item);
            return item;
        }

        public filter(boardKey: string, groupKey?: string): models.ITask[] {
            var list: models.ITask[] = [];
            this.list().forEach((item) => {
                if (boardKey && boardKey != item.BoardKey) return;
                if (groupKey && groupKey != item.GroupKey) return;
                list.push(item);
            });
            return list;
        }

        public filterByProject(projectKey: string, groupKey?: string): models.ITask[] {
            var list: models.ITask[] = [];
            this.list().forEach((item) => {
                if (projectKey && projectKey != item.ProjectKey) return;
                if (groupKey && groupKey != item.GroupKey) return;
                list.push(item);
            });
            return list;
        }

        public filterBySprint(sprintKey: string, groupKey?: string): models.ITask[] {
            var list: models.ITask[] = [];
            this.list().forEach((item) => {
                if (sprintKey && sprintKey != item.SprintKey) return;
                if (groupKey && groupKey != item.GroupKey) return;
                list.push(item);
            });
            return list;
        }
    }

} 