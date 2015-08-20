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
    static Empty: string;
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
    enum TaskType {
        Default = 0,
        Scheduled = 1,
        InProgress = 2,
        Testing = 3,
        Completed = 4,
        Canceled = 5,
        Backlog = 6,
    }
}
declare module app.data.models {
    interface IBoard extends IDataModel {
        Title: string;
        TaskType?: TaskType;
        ProjectKey?: string;
        SprintKey?: string;
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
        BoardKey?: string;
        GroupKey?: string;
    }
}
declare module app.data {
    class SampleData {
        static Projects: models.IProject[];
        static Groups: models.IGroup[];
        static Boards: models.IBoard[];
        static Tasks: models.ITask[];
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
    import IBoard = app.data.models.IBoard;
    class BoardRepository extends AbstractRepository<IBoard> implements IRepository<IBoard> {
        private $q;
        constructor($q: ng.IQService);
        create(type: app.data.models.TaskType, title?: string): IBoard;
        load(): ng.IPromise<IBoard[]>;
        save(): ng.IPromise<boolean>;
        filterByType(type: app.data.models.TaskType): IBoard[];
    }
}
declare module app.data.repositories {
    class GroupRepository {
        private $q;
        constructor($q: any);
    }
}
declare module app.data.repositories {
    import models = app.data.models;
    class TaskRepository extends AbstractRepository<models.ITask> implements IRepository<models.ITask> {
        private $q;
        constructor($q: ng.IQService);
        create(board: models.IBoard, title: string, description?: string): models.ITask;
        load(): ng.IPromise<models.ITask[]>;
        save(): ng.IPromise<boolean>;
        filter(boardKey: string, groupKey?: string): models.ITask[];
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
declare module app.controllers {
    import models = app.data.models;
    class BacklogController {
        private scrumBoards;
        tabIndex: number;
        current: models.IBoard;
        newTask: models.ITask;
        boards: models.IBoard[];
        constructor(scrumBoards: app.common.services.ScrumBoardService);
        index(): void;
        createNew(boardId?: string): void;
        openBoard(board: models.IBoard): void;
        update(board: models.IBoard): void;
        insert(board: models.IBoard): void;
        cancel(): void;
        addTask(): void;
        updateTask(task: models.ITask): void;
        cancelTask(): void;
    }
}
declare module app.controllers {
    class DashboardController {
        private scrumBoards;
        tabIndex: number;
        constructor(scrumBoards: app.common.services.ScrumBoardService);
    }
}
declare module app.controllers {
    class ProjectsController {
        private scrumBoards;
        tabIndex: number;
        constructor(scrumBoards: app.common.services.ScrumBoardService);
    }
}
declare module app.controllers {
    class SprintController {
        private scrumBoards;
        tabIndex: number;
        constructor(scrumBoards: app.common.services.ScrumBoardService);
    }
}
