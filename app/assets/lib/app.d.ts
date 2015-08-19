/// <reference path="../../modules/imports.d.ts" />
declare module app.data.models {
    function LoadAppState(): AppState;
    class AppState {
        active: boolean;
        lastError: Error;
        pilot: number;
    }
}
declare class Guid {
    static New(): string;
    private static generate();
    private static s4();
}
declare module app.data.models {
    interface IDataModel {
        Key: string;
    }
}
declare module app.data.models {
    interface IProject extends IDataModel {
        Key: string;
        Title: string;
        Description?: string;
    }
}
declare module app.data.repositories {
    import IDataModel = app.data.models.IDataModel;
    interface IRepository<TModel> {
        create(title: string, description?: string): TModel;
        load(): ng.IPromise<TModel[]>;
        save(): ng.IPromise<boolean>;
    }
    class AbstractRepository<TModel extends IDataModel> {
        memCache: TModel[];
        constructor();
        list(): TModel[];
        insert(item: TModel): TModel;
        remove(item: TModel): void;
    }
}
declare module app.data.models {
    interface IBoard extends IDataModel {
        Title: string;
        Description: string;
    }
}
declare module app.data.models {
    interface IGroup extends IDataModel {
        Title: string;
        Description: string;
    }
}
declare module app.data.models {
    interface ITask extends IDataModel {
        Title: string;
        Description: string;
    }
}
declare module app.data {
    class SampleData {
        static Projects: models.IProject[];
        static Groups: models.IGroup[];
    }
}
declare module app.data.repositories {
    import IProject = app.data.models.IProject;
    class ProjectRepository extends AbstractRepository<IProject> implements IRepository<IProject> {
        private $q;
        constructor($q: ng.IQService);
        create(title: string, description?: string): IProject;
        load(): ng.IPromise<IProject[]>;
        save(): ng.IPromise<boolean>;
    }
}
declare module app.data.repositories {
    class BoardRepository {
        private $q;
        constructor($q: any);
    }
}
declare module app.data.repositories {
    class GroupRepository {
        private $q;
        constructor($q: any);
    }
}
declare module app.data.repositories {
    class TaskRepository {
        private $q;
        constructor($q: any);
    }
}
declare module app.data.repositories {
    class UserRepository {
        private $q;
        constructor($q: any);
    }
}
declare module app.common.services {
    class ScrumBoardService {
        private $q;
        Projects: app.data.repositories.ProjectRepository;
        Boards: app.data.repositories.BoardRepository;
        Groups: app.data.repositories.GroupRepository;
        Tasks: app.data.repositories.TaskRepository;
        Users: app.data.repositories.UserRepository;
        constructor($q: any);
    }
}
