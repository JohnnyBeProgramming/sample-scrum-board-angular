module app.data.repositories {

    import ISprint = app.data.models.ISprint;

    export class SprintRepository extends AbstractRepository<ISprint> {

        constructor($rootScope: ng.IRootScopeService, $q: ng.IQService) {
            super('sprints', $rootScope, $q,() => SampleData.Sprints);
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
            this.list().forEach((item) => {
                if (item.ProjectKey == projectKey && item.Number > sprintMax) {
                    sprintMax = item.Number;
                }
            });
            return sprintMax + 1;
        }
    }

}  