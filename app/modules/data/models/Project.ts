/// <reference path="IDataModel.ts" />

module app.data.models {

    export interface IProject extends IDataModel {
        Key: string;
        Title: string;
        Description?: string;
    }

}  