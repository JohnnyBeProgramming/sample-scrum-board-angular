/// <reference path="IDataModel.ts" />

module app.data.models {

    export enum TaskType {
        Default = 0,
        InProgress = 1,
        Testing = 2,
        Completed = 3,
        Canceled = 4,
        Backlog = 5,
    }

}   