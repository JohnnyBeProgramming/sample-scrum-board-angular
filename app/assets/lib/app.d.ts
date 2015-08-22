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
declare module app.data.repositories {
    import IDataModel = app.data.models.IDataModel;
    interface IRepository<TModel> {
        load(): ng.IPromise<TModel[]>;
        save(): ng.IPromise<boolean>;
    }
    class AbstractRepository<TModel extends IDataModel> {
        $q: ng.IQService;
        memCache: TModel[];
        constructor($q: ng.IQService);
        list(): TModel[];
        insert(item: TModel): TModel;
        remove(item: TModel): void;
    }
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
declare module app.data.models {
    enum SprintState {
        Default = 0,
        Started = 1,
        Completed = 2,
        Discarded = 3,
        OnHold = 4,
    }
    interface ISprint extends IDataModel {
        Number: number;
        State: SprintState;
        ProjectKey?: string;
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
        static Sprints: models.ISprint[];
        static Groups: models.IGroup[];
        static Boards: models.IBoard[];
        static Tasks: models.ITask[];
    }
}
declare module app.data.repositories {
    import IProject = app.data.models.IProject;
    class ProjectRepository extends AbstractRepository<IProject> implements IRepository<IProject> {
        constructor($q: ng.IQService);
        create(title: string, description?: string): IProject;
        load(): ng.IPromise<IProject[]>;
        save(): ng.IPromise<boolean>;
        findByKey(key: string): ng.IPromise<IProject>;
    }
}
declare module app.data.repositories {
    import ISprint = app.data.models.ISprint;
    class SprintRepository extends AbstractRepository<ISprint> implements IRepository<ISprint> {
        constructor($q: ng.IQService);
        create(projectKey: string, number?: number): ISprint;
        load(): ng.IPromise<ISprint[]>;
        save(): ng.IPromise<boolean>;
        findByKey(key: string): ng.IPromise<ISprint>;
        filterByProject(key: string): ng.IPromise<models.ISprint[]>;
        getNextSprintNumber(projectKey: string): number;
    }
}
declare module app.data.repositories {
    import IBoard = app.data.models.IBoard;
    class BoardRepository extends AbstractRepository<IBoard> implements IRepository<IBoard> {
        constructor($q: ng.IQService);
        create(type: app.data.models.TaskType, title?: string): IBoard;
        load(): ng.IPromise<IBoard[]>;
        save(): ng.IPromise<boolean>;
        filterByType(type: app.data.models.TaskType): IBoard[];
        findByKey(key: string): ng.IPromise<IBoard>;
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
        Sprints: app.data.repositories.SprintRepository;
        Boards: app.data.repositories.BoardRepository;
        Groups: app.data.repositories.GroupRepository;
        Tasks: app.data.repositories.TaskRepository;
        Users: app.data.repositories.UserRepository;
        constructor($q: any);
    }
}
declare module app.common.modal {
    class AddProjectController {
        private $scope;
        private $modalInstance;
        private modalContext;
        constructor($scope: any, $modalInstance: any, modalContext: any);
        init(): void;
    }
}
declare module app.common.modal {
    class AddBoardController {
        private $scope;
        private $modalInstance;
        private modalContext;
        constructor($scope: any, $modalInstance: any, modalContext: any);
        init(): void;
    }
}
declare module app.common.modal {
    class AddTaskController {
        private $scope;
        private $modalInstance;
        private modalContext;
        constructor($scope: any, $modalInstance: any, modalContext: any);
        init(): void;
    }
}
declare module app.controllers {
    import models = app.data.models;
    class BacklogItemController {
        private scrumBoards;
        board: models.IBoard;
        constructor(scrumBoards: app.common.services.ScrumBoardService, board?: models.IBoard);
    }
    class BacklogController {
        private $state;
        private $modal;
        private scrumBoards;
        newTask: models.ITask;
        current: models.IBoard;
        boards: models.IBoard[];
        constructor($state: any, $modal: any, scrumBoards: app.common.services.ScrumBoardService);
        getBoards(): models.IBoard[];
        index(): void;
        openBoard(board: models.IBoard): void;
        createNew(boardId?: string): void;
        update(board: models.IBoard): void;
        insert(board: models.IBoard): void;
        cancel(): void;
        addTask(board?: models.IBoard): void;
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
    import models = app.data.models;
    class ProjectsController {
        private $state;
        private $modal;
        private scrumBoards;
        constructor($state: any, $modal: any, scrumBoards: app.common.services.ScrumBoardService);
        index(): void;
        openProject(project: models.IProject): void;
        newProject(): void;
        update(project: models.IProject): void;
        cancel(): void;
    }
    class ProjectListController {
        private $rootScope;
        private scrumBoards;
        projects: models.IProject[];
        constructor($rootScope: any, scrumBoards: app.common.services.ScrumBoardService);
        init(): void;
    }
    class ProjectItemController {
        private $rootScope;
        private scrumBoards;
        project: models.IProject;
        constructor($rootScope: any, scrumBoards: app.common.services.ScrumBoardService, project?: models.IProject);
    }
}
declare module app.controllers {
    import models = app.data.models;
    class SprintController {
        private $rootScope;
        private $state;
        private $modal;
        private scrumBoards;
        projectCache: any;
        constructor($rootScope: any, $state: any, $modal: any, scrumBoards: app.common.services.ScrumBoardService);
        getSprints(): ng.IPromise<models.ISprint[]>;
        index(): void;
        openBoard(sprint: models.ISprint): void;
        cancel(): void;
        addTask(board?: models.IBoard): void;
        updateTask(task: models.ITask): void;
        getProjectLabel(projectKey: string): string;
        getStateDesc(state: models.SprintState): string;
    }
    class SprintListController {
        private $rootScope;
        private scrumBoards;
        project: models.IProject;
        showAll: boolean;
        sprints: models.ISprint[];
        cached: models.ISprint[];
        constructor($rootScope: any, scrumBoards: app.common.services.ScrumBoardService, project?: models.IProject);
        init(): void;
    }
    class SprintsActiveController {
        private $rootScope;
        private scrumBoards;
        showAll: boolean;
        sprints: models.ISprint[];
        cached: models.ISprint[];
        active: models.ISprint[];
        constructor($rootScope: any, scrumBoards: app.common.services.ScrumBoardService);
        init(): void;
    }
    class SprintItemController {
        private scrumBoards;
        sprint: models.ISprint;
        constructor(scrumBoards: app.common.services.ScrumBoardService, sprint?: models.ISprint);
    }
}
