/// <reference path="../../common/utils/Guid.ts" />
/// <reference path="../models/Project.ts" />
/// <reference path="AbstractRepository.ts" />
/// <reference path="../samples.ts" />

module app.data.repositories {

    import IProject = app.data.models.IProject;

    export class ProjectRepository extends AbstractRepository<IProject> implements IRepository<IProject> {

        constructor($q: ng.IQService) {
            super($q);
            this.load()
                .then((list) => {
                    this.memCache = list;
                });
        }

        public create(title: string, description?: string): IProject {
            var item = {
                Key: Guid.New(),
                Title: title,
                Description: description,
            };
            this.insert(item);
            return item;
        }

        public load(): ng.IPromise<IProject[]> {
            var deferred = this.$q.defer<IProject[]>();
            {
                deferred.resolve(SampleData.Projects);
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

    }

}  