﻿
module app.data.repositories {

    import models = app.data.models;

    export class TaskRepository extends AbstractRepository<models.ITask> implements IRepository<models.ITask> {

        constructor(private $q: ng.IQService) {
            super();
            this.load().then((list) => {
                this.memCache = list;
            });
        }

        public create(board: models.IBoard, title: string, description?: string): models.ITask {
            var item: models.ITask = {
                Key: Guid.New(),
                Title: title,
                Description: description,
                BoardKey: board.Key,
            };
            this.insert(item);
            return item;
        }

        public load(): ng.IPromise<models.ITask[]> {
            var deferred = this.$q.defer<models.ITask[]>();
            {
                deferred.resolve(SampleData.Tasks);
            }
            return deferred.promise;
        }

        public save(): ng.IPromise<boolean> {
            var deferred = this.$q.defer<boolean>();
            {
                console.log(' - ToDo: Implement Save: ', this.memCache);
                deferred.reject(new Error('Save has not been implemented for: ' + typeof this));
            }
            return deferred.promise;
        }

        public filter(boardKey: string, groupKey?: string): models.ITask[] {
            var list: models.ITask[] = [];
            this.memCache.forEach((item) => {
                if (boardKey && boardKey != item.BoardKey) return;
                if (groupKey && groupKey != item.BoardKey) return;
                list.push(item);
            });
            return list;
        }
    }

} 