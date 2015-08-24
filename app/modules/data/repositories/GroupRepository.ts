/// <reference path="../../common/utils/Guid.ts" />
/// <reference path="AbstractRepository.ts" />
/// <reference path="../models/IGroup.ts" />
/// <reference path="../samples.ts" />

module app.data.repositories {

    import IGroup = app.data.models.IGroup;

    export class GroupRepository extends AbstractRepository<IGroup> {

        constructor($rootScope: ng.IRootScopeService, $q: ng.IQService) {
            super('groups', $rootScope, $q,() => SampleData.Groups);
        }

    }

}  