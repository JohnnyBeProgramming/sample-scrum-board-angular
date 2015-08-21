module app.data.repositories {

    import IBoard = app.data.models.IBoard;

    export class BoardRepository extends AbstractRepository<IBoard> implements IRepository<IBoard> {

        constructor(private $q: ng.IQService) {
            super();
            this.load()
                .then((list) => {
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

        public filterByType(type: app.data.models.TaskType): IBoard[]{
            var list = [];
            this.memCache.forEach((item) => {
                if (item.TaskType == type) {
                    list.push(item);
                }
            });
            return list;
        }
    }

}  