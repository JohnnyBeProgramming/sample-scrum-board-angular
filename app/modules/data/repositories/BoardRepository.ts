module app.data.repositories {

    import IBoard = app.data.models.IBoard;

    export class BoardRepository extends AbstractRepository<IBoard> implements IRepository<IBoard> {

        constructor($q: ng.IQService) {
            super($q);
            this.load().then((list) => {
                this.memCache = list;
            });
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

        public load(): ng.IPromise<IBoard[]> {
            var deferred = this.$q.defer<IBoard[]>();
            {
                deferred.resolve(SampleData.Boards);
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

        public filterByProject(projectKey: string, type?: app.data.models.TaskType): IBoard[] {
            var list = [];
            this.memCache.forEach((item) => {
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
            this.memCache.forEach((item) => {
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
            this.memCache.forEach((item) => {
                if (item.TaskType == type) {
                    list.push(item);
                }
            });
            return list;
        }

        public findByKey(key: string): ng.IPromise<IBoard> {
            var found = false;
            var deferred = this.$q.defer<IBoard>();
            this.load()
                .then((items) => {
                if (items) {
                    items.forEach((item) => {
                        if (found) return;
                        if (item.Key == key) {
                            deferred.resolve(item);
                            found = true;
                        }
                    });
                }
                if (!found) {
                    deferred.resolve(null);
                }
            }).catch((error) => {
                deferred.reject(error || new Error('Item with key "' + key + '" could not be found. Type:' + typeof this));
            });
            return deferred.promise;
        }
    }

}  