/// <reference path="IDataModel.ts" />

module app.data.models {

    export interface IUser extends IDataModel {
        DisplayName: string;
        ProjectKeys: string[];
        SprintKeys: string[];
        BoardKeys: string[];
        GroupKeys: string[];
    }

}   