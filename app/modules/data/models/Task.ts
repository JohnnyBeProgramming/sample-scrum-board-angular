/// <reference path="IDataModel.ts" />

module app.data.models {

    export interface ITask extends IDataModel {
        Title: string;
        Description: string;
        BoardKey?: string;
        GroupKey?: string;
    }

}   