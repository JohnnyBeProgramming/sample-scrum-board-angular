/// <reference path="../../common/utils/Guid.ts" />

module app.data.repositories {

    import IDataModel = app.data.models.IDataModel;

    export interface IRepository<TModel> {
        load(): ng.IPromise<TModel[]>;
        save(): ng.IPromise<boolean>;
    }

    export class AbstractRepository<TModel extends IDataModel>  {

        memCache: TModel[] = [];

        constructor(public $q: ng.IQService) { }

        public list(): TModel[] {
            return this.memCache;
        }

        public insert(item: TModel): TModel {
            if (!item.Key) {
                item.Key = Guid.New();
            }
            this.memCache.push(item);
            return item;
        }

        public remove(item: TModel) {
            var index = this.memCache.indexOf(item);
            if (index) {
                this.memCache.splice(index, 1);
            }
        }

    }

}   