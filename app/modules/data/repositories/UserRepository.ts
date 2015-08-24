/// <reference path="../../common/utils/Guid.ts" />
/// <reference path="AbstractRepository.ts" />
/// <reference path="../models/IUser.ts" />
/// <reference path="../samples.ts" />

module app.data.repositories {

    export class UserRepository extends AbstractRepository<models.IUser> {

        constructor($rootScope: ng.IRootScopeService, $q: ng.IQService) {
            super('users', $rootScope, $q,() => SampleData.Users);
        }       

    }

}  