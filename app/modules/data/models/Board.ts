/// <reference path="IDataModel.ts" />

module app.data.models {

    export interface IBoard extends IDataModel {
        Title: string;
        Description: string;
    }

}   