/// <reference path="IDataModel.ts" />

module app.data.models {
    
    export enum SprintState {
        Default,
        Started,
        Completed,
        Discarded,
        OnHold,
    }

    export interface ISprint extends IDataModel {
        Number: number;
        State: SprintState;
        ProjectKey?: string;
    }

}   