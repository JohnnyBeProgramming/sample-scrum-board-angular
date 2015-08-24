/// <reference path="../../common/utils/Guid.ts" />

module app.data.repositories {

    import IDataModel = app.data.models.IDataModel;

    export interface IRepository<TModel> {
        load(): ng.IPromise<TModel[]>;
        save(): ng.IPromise<TModel>;
    }

    export class AbstractRepository<TModel extends IDataModel> implements IRepository<TModel>  {

        public hasLocal: boolean = false;
        public isOnline: boolean = false;

        private keys: string[] = [];
        private memCache: TModel[] = [];

        constructor(public ident: string, private $rootScope: ng.IRootScopeService, public $q: ng.IQService, private defaults?: () => TModel[]) {
            this.init();
        }

        public init() {
            this.hasLocal = typeof (Storage) !== "undefined";
            this.load().then((list) => {
                console.debug(' - Store [ ' + this.ident + ' ] Loaded.', this.keys.length);
            });
        }

        public load(): ng.IPromise<TModel[]> {
            var deferred = this.$q.defer<TModel[]>();
            try {
                if (this.memCache.length) {
                    deferred.resolve(this.memCache);
                } else if (this.isOnline) {
                    deferred.reject(new Error('Online Storage has not been implemented.'));
                } if (this.hasLocal) {
                    var found = true;
                    var local = localStorage.getItem(this.ident);
                    if (local) {
                        var cache = [];
                        console.debug(' - Store [ ' + this.ident + ' ] Restoring...');
                        this.keys = JSON.parse(local);
                        this.keys.forEach((key) => {
                            var storeKey = this.ident + '[' + key + ']';
                            var storeItem = localStorage.getItem(storeKey);
                            if (storeItem) {
                                cache.push(JSON.parse(storeItem));
                            }
                        });
                        this.memCache = cache;
                        deferred.resolve(cache);
                    } else {
                        found = false;
                    }
                }

                if (!found) {
                    var data = this.defaults ? this.defaults() : [];
                    this.memCache = data;
                    this.save().then(() => {
                        deferred.resolve(data);
                    });
                }
            } catch (ex) {
                deferred.reject(ex);
            }

            return deferred.promise;
        }

        public reset(): ng.IPromise<TModel[]> {
            var deferred = this.$q.defer<TModel[]>();
            try {
                if (this.isOnline) {
                    deferred.reject(new Error('Online Storage has not been implemented.'));
                } else {
                    var data = this.defaults ? this.defaults() : [];
                    console.debug(' - Store [ ' + this.ident + ' ] Reset.', data);
                    this.memCache = data;
                    this.save().then((item) => {
                        deferred.resolve(data);
                    }).catch((err) => {
                        deferred.reject(err);
                    });
                }
            } catch (ex) {
                deferred.reject(ex);
            }
            return deferred.promise;
        }

        public save(item?: TModel, updateModel: boolean = true): ng.IPromise<TModel> {
            var deferred = this.$q.defer<TModel>();
            try {
                if (this.hasLocal) {                    
                    // Save keys
                    var keys = [];
                    this.list().forEach((item) => keys.push(item.Key));
                    localStorage.setItem(this.ident, JSON.stringify(this.keys));
                    this.keys = keys;
                }
                if (!item) {
                    // Save all
                    var list = [];
                    this.list().forEach((model) => list.push(this.save(model, false)));
                    this.$q.all(list).then(() => {
                        deferred.resolve(null);
                    });
                } else {
                    // Save item
                    var storeKey = this.ident + '[' + item.Key + ']';
                    localStorage.setItem(storeKey, JSON.stringify(item));
                    console.debug(' - Store [ ' + this.ident + ' ] Saved:', storeKey);
                    if (updateModel) {
                        var found = false;
                        this.list().forEach((node) => {
                            if (found) return;
                            if (node.Key == item.Key) {
                                angular.extend(node, item);
                                found = true;
                            }
                        });
                    }
                    deferred.resolve(item);
                }
            } catch (ex) {
                deferred.reject(ex);
            }
            return deferred.promise;
        }

        public findByKey(key: string): ng.IPromise<TModel> {
            var found = false;
            var deferred = this.$q.defer<TModel>();
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

        public list(): TModel[] {
            return this.memCache;
        }

        public insert(item: TModel): TModel {
            if (!item.Key || Guid.Empty) {
                item.Key = Guid.New();
            }
            if (!this.keys.indexOf(item.Key)) {
                this.keys.push(item.Key);
            }
            this.memCache.push(item);
            return item;
        }

        public remove(item: TModel) {
            var index = this.memCache.indexOf(item);
            if (index) {
                var key = this.keys.indexOf(item.Key);
                if (key >= 0) {
                    this.keys.splice(key, 1);
                }
                this.memCache.splice(index, 1);
            }
        }

    }

}   