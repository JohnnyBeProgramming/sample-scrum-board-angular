/// <reference path="IDataModel.ts" />
/// <reference path="TaskType.ts" />

module app.data.models {
    
    export interface IBoard extends IDataModel {
        Title: string;
        TaskType?: TaskType;
        ProjectKey?: string;
        SprintKey?: string;
    }

}   