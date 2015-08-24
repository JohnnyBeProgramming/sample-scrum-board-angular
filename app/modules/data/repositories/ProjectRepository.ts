/// <reference path="../../common/utils/Guid.ts" />
/// <reference path="AbstractRepository.ts" />
/// <reference path="../models/IProject.ts" />
/// <reference path="../samples.ts" />

module app.data.repositories {

    import IProject = app.data.models.IProject;

    export class ProjectRepository extends AbstractRepository<IProject> {

        constructor($rootScope: ng.IRootScopeService, $q: ng.IQService) {
            super('projects', $rootScope, $q,() => SampleData.Projects);
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
        
    }

}  