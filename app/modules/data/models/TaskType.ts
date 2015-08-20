/// <reference path="IDataModel.ts" />

module app.data.models {

    export enum TaskType {
        Default = 0,
        Scheduled = 1,
        InProgress = 2,
        Testing = 3,
        Completed = 4,
        Canceled = 5,
        Backlog = 6,
    }

}   