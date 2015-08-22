module app.data.repositories {

    import ISprint = app.data.models.ISprint;

    export class SprintRepository extends AbstractRepository<ISprint> implements IRepository<ISprint> {

        constructor($q: ng.IQService) {
            super($q);
            this.load().then((list) => {
                this.memCache = list;
            });
        }

        public create(projectKey: string, number?: number): ISprint {
            var item: ISprint = {
                Key: Guid.New(),
                Number: number ? number : this.getNextSprintNumber(projectKey),
                State: models.SprintState.Default,
                ProjectKey: projectKey,
            };
            this.insert(item);
            return item;
        }

        public load(): ng.IPromise<ISprint[]> {
            var deferred = this.$q.defer<ISprint[]>();
            {
                deferred.resolve(SampleData.Sprints);
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

        public findByKey(key: string): ng.IPromise<ISprint> {
            var found = false;
            var deferred = this.$q.defer<ISprint>();
            this.load().then((items) => {
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

        public filterByProject(key: string): ng.IPromise<models.ISprint[]> {
            var list = [];
            var deferred = this.$q.defer<ISprint[]>();
            this.load().then((items) => {
                if (items) {
                    items.forEach((item) => {
                        if (item.ProjectKey == key) {
                            list.push(item);
                        }
                    });
                }
                deferred.resolve(list);
            }).catch((error) => {
                deferred.reject(error || new Error('Item with key "' + key + '" could not be found. Type:' + typeof this));
            });
            return deferred.promise;
        }

        public getNextSprintNumber(projectKey: string): number {
            var sprintMax = 0;
            if (this.memCache) {
                this.memCache.forEach((item) => {
                    if (item.ProjectKey == projectKey && item.Number > sprintMax) {
                        sprintMax = item.Number;
                    }
                });
            }
            return sprintMax + 1;
        }
    }

}  