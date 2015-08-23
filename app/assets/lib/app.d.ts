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
        InProgress = 1,
        Testing = 2,
        Completed = 3,
        Canceled = 4,
        Backlog = 5,
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
        TaskType: TaskType;
        ProjectKey?: string;
        SprintKey?: string;
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
        filterByProject(projectKey: string, type?: app.data.models.TaskType): IBoard[];
        filterBySprint(sprintKey: string, type?: app.data.models.TaskType): IBoard[];
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
        filterByProject(projectKey: string, groupKey?: string): models.ITask[];
        filterBySprint(sprintKey: string, groupKey?: string): models.ITask[];
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
declare module app.common.directives {
    function AppToolbar(): {
        replace: boolean;
        restrict: string;
        templateUrl: string;
    };
}
declare module app.common.directives {
    function AppHeading(): {
        replace: boolean;
        restrict: string;
        templateUrl: string;
    };
}
declare module app.common.directives {
    function AppBody(): {
        replace: boolean;
        restrict: string;
        templateUrl: string;
    };
}
declare module app.common.directives {
    function AppFooter(): {
        replace: boolean;
        restrict: string;
        templateUrl: string;
    };
}
declare module app.common.directives {
    function DropTarget(): {
        replace: boolean;
        restrict: string;
        scope: {
            action: string;
        };
        controller: (string | (($scope: any) => void))[];
        link: ($scope: any, element: JQuery) => void;
    };
}
declare module app.common.directives {
    function DragItem(): {
        replace: boolean;
        restrict: string;
        scope: {
            data: string;
        };
        controller: (string | (($scope: any) => void))[];
        link: ($scope: any, element: any) => void;
    };
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
    import models = app.data.models;
    class AddTaskController {
        private $rootScope;
        private $scope;
        private $modalInstance;
        private modalContext;
        scrumBoardService: app.common.services.ScrumBoardService;
        map: any;
        projects: models.IProject[];
        sprints: models.ISprint[];
        boards: models.IBoard[];
        constructor($rootScope: any, $scope: any, $modalInstance: any, modalContext: any, scrumBoardService: app.common.services.ScrumBoardService);
        init(): void;
        getProjectLabel(projectKey: string): string;
        getSprintLabel(sprintKey: string): string;
        getBoardLabel(boardKey: string): string;
        setProjectKey(task: models.ITask, key: string): void;
        setSprintKey(task: models.ITask, key: string): void;
        setBoardKey(task: models.ITask, key: string): void;
    }
}
declare module app.common.modal {
    class AddSprintController {
        private $scope;
        private $modalInstance;
        private modalContext;
        scrumBoardService: app.common.services.ScrumBoardService;
        constructor($scope: any, $modalInstance: any, modalContext: any, scrumBoardService: app.common.services.ScrumBoardService);
        init(): void;
    }
}
declare module app.common.modal {
    import models = app.data.models;
    class AddBacklogsController {
        private $scope;
        private $modalInstance;
        private modalContext;
        scrumBoardService: app.common.services.ScrumBoardService;
        selected: any;
        boards: models.IBoard[];
        other: models.ITask[];
        constructor($scope: any, $modalInstance: any, modalContext: any, scrumBoardService: app.common.services.ScrumBoardService);
        init(): void;
        getSelected(): string[];
        getBoardTasks(board: models.IBoard): models.ITask[];
    }
}
declare module app.controllers {
    import models = app.data.models;
    class BacklogController {
        private $rootScope;
        private $state;
        private $modal;
        private scrumBoards;
        newTask: models.ITask;
        current: models.IBoard;
        boards: models.IBoard[];
        constructor($rootScope: any, $state: any, $modal: any, scrumBoards: app.common.services.ScrumBoardService);
        getBoards(): models.IBoard[];
        getTasks(board: models.IBoard): models.ITask[];
        index(): void;
        openBoard(board: models.IBoard): void;
        createNew(boardId?: string): void;
        update(board: models.IBoard): void;
        insert(board: models.IBoard): void;
        cancel(): void;
        addTaskToBoard(board?: models.IBoard): void;
        moveTask(boardKey: string, task: models.ITask): void;
        editTask(task: models.ITask): void;
        updateTask(task: models.ITask): void;
        cancelTask(): void;
    }
    class BacklogListController {
        private scrumBoards;
        constructor(scrumBoards: app.common.services.ScrumBoardService);
        init(): void;
    }
    class BacklogItemController {
        private scrumBoards;
        board: models.IBoard;
        constructor(scrumBoards: app.common.services.ScrumBoardService, board?: models.IBoard);
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
    class ControllerUtils {
        static TaskDescription(type: models.TaskType): string;
        static StateDescription(state: models.SprintState): string;
    }
    class SprintController {
        private $rootScope;
        private $state;
        private $modal;
        private scrumBoards;
        projectCache: any;
        constructor($rootScope: any, $state: any, $modal: any, scrumBoards: app.common.services.ScrumBoardService);
        getSprints(): ng.IPromise<models.ISprint[]>;
        index(): void;
        cancel(): void;
        openBoard(sprint: models.ISprint): void;
        addTask(task?: models.ITask): void;
        addTaskToBoard(board?: models.IBoard, callback?: (task: models.ITask) => void): void;
        addTaskToSprint(sprint: models.ISprint): void;
        addSprint(project?: models.IProject, state?: models.SprintState): void;
        addBacklogs(sprint: models.ISprint, board?: models.IBoard): void;
        updateTask(task: models.ITask): void;
        updateSprint(sprint: models.ISprint): void;
        refreshData(ctx: any): void;
        getProjectLabel(projectKey: string): string;
        getStateDesc(state: models.SprintState): string;
        getBoardByType(sprint: models.ISprint, type?: models.TaskType): models.IBoard;
        getBoards(sprintKey: string): models.IBoard[];
        firstOrDefaultBoard(sprintKey: string, type: models.TaskType, defaults?: (type: models.TaskType) => models.IBoard): models.IBoard;
        moveTask(boardKey: string, task: models.ITask): void;
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
        load(): void;
        reload(): void;
    }
    class SprintItemController {
        private $rootScope;
        private scrumBoards;
        sprint: models.ISprint;
        boards: models.IBoard[];
        requiresTesting: boolean;
        constructor($rootScope: any, scrumBoards: app.common.services.ScrumBoardService, sprint?: models.ISprint);
        init(): void;
        getColumnCss(size: number): string;
        firstOrDefaultBoard(type: models.TaskType, defaults?: (type: models.TaskType) => models.IBoard): any;
    }
    class SprintEditController {
        private scrumBoards;
        sprint: models.ISprint;
        constructor(scrumBoards: app.common.services.ScrumBoardService, sprint?: models.ISprint);
    }
}
