var app;
(function (app) {
    var data;
    (function (data) {
        var models;
        (function (models) {
            function LoadAppState() {
                return new AppState();
            }
            models.LoadAppState = LoadAppState;
            var AppState = (function () {
                function AppState() {
                }
                return AppState;
            })();
            models.AppState = AppState;
        })(models = data.models || (data.models = {}));
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
var Guid = (function () {
    function Guid() {
    }
    Guid.New = function () {
        return Guid.generate();
    };
    Guid.generate = function () {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
    };
    Guid.s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    Guid.Empty = '00000000-0000-0000-0000-000000000000';
    return Guid;
})();
/// <reference path="IDataModel.ts" />
/// <reference path="../../common/utils/Guid.ts" />
var app;
(function (app) {
    var data;
    (function (data) {
        var repositories;
        (function (repositories) {
            var AbstractRepository = (function () {
                function AbstractRepository() {
                    this.memCache = [];
                }
                AbstractRepository.prototype.list = function () {
                    return this.memCache;
                };
                AbstractRepository.prototype.insert = function (item) {
                    if (!item.Key) {
                        item.Key = Guid.New();
                    }
                    this.memCache.push(item);
                    return item;
                };
                AbstractRepository.prototype.remove = function (item) {
                    var index = this.memCache.indexOf(item);
                    if (index) {
                        this.memCache.splice(index, 1);
                    }
                };
                return AbstractRepository;
            })();
            repositories.AbstractRepository = AbstractRepository;
        })(repositories = data.repositories || (data.repositories = {}));
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
/// <reference path="IDataModel.ts" />
var app;
(function (app) {
    var data;
    (function (data) {
        var models;
        (function (models) {
            (function (TaskType) {
                TaskType[TaskType["Default"] = 0] = "Default";
                TaskType[TaskType["Scheduled"] = 1] = "Scheduled";
                TaskType[TaskType["InProgress"] = 2] = "InProgress";
                TaskType[TaskType["Testing"] = 3] = "Testing";
                TaskType[TaskType["Completed"] = 4] = "Completed";
                TaskType[TaskType["Canceled"] = 5] = "Canceled";
                TaskType[TaskType["Backlog"] = 6] = "Backlog";
            })(models.TaskType || (models.TaskType = {}));
            var TaskType = models.TaskType;
        })(models = data.models || (data.models = {}));
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
/// <reference path="IDataModel.ts" />
/// <reference path="TaskType.ts" />
/// <reference path="IDataModel.ts" />
/// <reference path="IDataModel.ts" />
/// <reference path="../common/utils/Guid.ts" />
/// <reference path="models/Project.ts" />
/// <reference path="models/Board.ts" />
/// <reference path="models/Group.ts" />
/// <reference path="models/Task.ts" />
var app;
(function (app) {
    var data;
    (function (data) {
        var SampleData = (function () {
            function SampleData() {
            }
            SampleData.Projects = [
                {
                    Key: Guid.New(),
                    Title: 'Simple Project',
                    Description: 'This is a basic project example.',
                },
                {
                    Key: Guid.New(),
                    Title: 'Large Scale Project',
                    Description: 'This is a larger project with many groups, users and sprints.',
                },
            ];
            SampleData.Groups = [
                {
                    Key: Guid.New(),
                    Title: 'ToDo',
                    Description: 'A brief explanation goes here.',
                },
            ];
            SampleData.Boards = [
                // --------------------------------------------------------------
                {
                    Key: Guid.New(),
                    Title: 'Scheduled Tasks',
                    TaskType: data.models.TaskType.Scheduled,
                    ProjectKey: SampleData.Projects[0].Key,
                    SprintKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Scheduled Tasks',
                    TaskType: data.models.TaskType.Scheduled,
                    ProjectKey: SampleData.Projects[1].Key,
                    SprintKey: null,
                },
                // --------------------------------------------------------------
                // --------------------------------------------------------------
                {
                    Key: Guid.New(),
                    Title: 'Tasks In Progress',
                    TaskType: data.models.TaskType.InProgress,
                    ProjectKey: SampleData.Projects[0].Key,
                    SprintKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Tasks In Progress',
                    TaskType: data.models.TaskType.InProgress,
                    ProjectKey: SampleData.Projects[1].Key,
                    SprintKey: null,
                },
                // --------------------------------------------------------------
                // --------------------------------------------------------------
                {
                    Key: Guid.New(),
                    Title: 'Tasks In Testing',
                    TaskType: data.models.TaskType.Testing,
                    ProjectKey: SampleData.Projects[0].Key,
                    SprintKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Tasks In Testing',
                    TaskType: data.models.TaskType.Testing,
                    ProjectKey: SampleData.Projects[1].Key,
                    SprintKey: null,
                },
                // --------------------------------------------------------------
                // --------------------------------------------------------------
                {
                    Key: Guid.New(),
                    Title: 'Backlogs',
                    TaskType: data.models.TaskType.Backlog,
                    ProjectKey: SampleData.Projects[0].Key,
                    SprintKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Backlogs',
                    TaskType: data.models.TaskType.Backlog,
                    ProjectKey: SampleData.Projects[1].Key,
                    SprintKey: null,
                },
            ];
            SampleData.Tasks = [
                // --------------------------------------------------------------
                {
                    Key: Guid.New(),
                    Title: 'Reminder',
                    Description: 'Create some more tasks and assign more work.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Creative Design',
                    Description: 'Create a mockup of the UI and draw some layouts.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Scaffold web application',
                    Description: 'Create the HTML, CSS and javascript folder structures for the web app.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Add Grunt Build',
                    Description: 'Create a build folder and install and setup grunt for continous builds.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Create Git Repository',
                    Description: 'Create a clean new repo to store the code.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Commit Initial Release',
                    Description: 'Publish to the git repository.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                // --------------------------------------------------------------
                {
                    Key: Guid.New(),
                    Title: 'Do some task for me',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[1].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Do some task for me',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[6].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Do some task for me',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[6].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Do some task for me',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[6].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Do some task for me',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[7].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    Title: 'Do some task for me',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[7].Key,
                    GroupKey: null,
                },
            ];
            return SampleData;
        })();
        data.SampleData = SampleData;
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
/// <reference path="../../common/utils/Guid.ts" />
/// <reference path="../models/Project.ts" />
/// <reference path="AbstractRepository.ts" />
/// <reference path="../samples.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var app;
(function (app) {
    var data;
    (function (data) {
        var repositories;
        (function (repositories) {
            var ProjectRepository = (function (_super) {
                __extends(ProjectRepository, _super);
                function ProjectRepository($q) {
                    var _this = this;
                    _super.call(this);
                    this.$q = $q;
                    this.load()
                        .then(function (list) {
                        _this.memCache = list;
                    });
                }
                ProjectRepository.prototype.create = function (title, description) {
                    var item = {
                        Key: Guid.New(),
                        Title: title,
                        Description: description,
                    };
                    this.insert(item);
                    return item;
                };
                ProjectRepository.prototype.load = function () {
                    var deferred = this.$q.defer();
                    {
                        deferred.resolve(data.SampleData.Projects);
                    }
                    return deferred.promise;
                };
                ProjectRepository.prototype.save = function () {
                    var deferred = this.$q.defer();
                    {
                        console.log(' - ToDo: Implement Save: ', this.memCache);
                        deferred.reject(new Error('Save has not been implemented for: ' + typeof this));
                    }
                    return deferred.promise;
                };
                return ProjectRepository;
            })(repositories.AbstractRepository);
            repositories.ProjectRepository = ProjectRepository;
        })(repositories = data.repositories || (data.repositories = {}));
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
var app;
(function (app) {
    var data;
    (function (data) {
        var repositories;
        (function (repositories) {
            var BoardRepository = (function (_super) {
                __extends(BoardRepository, _super);
                function BoardRepository($q) {
                    var _this = this;
                    _super.call(this);
                    this.$q = $q;
                    this.load()
                        .then(function (list) {
                        _this.memCache = list;
                    });
                }
                BoardRepository.prototype.create = function (type, title) {
                    var item = {
                        Key: Guid.New(),
                        Title: title,
                        TaskType: type,
                    };
                    this.insert(item);
                    return item;
                };
                BoardRepository.prototype.load = function () {
                    var deferred = this.$q.defer();
                    {
                        deferred.resolve(data.SampleData.Boards);
                    }
                    return deferred.promise;
                };
                BoardRepository.prototype.save = function () {
                    var deferred = this.$q.defer();
                    {
                        console.log(' - ToDo: Implement Save: ', this.memCache);
                        deferred.reject(new Error('Save has not been implemented for: ' + typeof this));
                    }
                    return deferred.promise;
                };
                BoardRepository.prototype.filterByType = function (type) {
                    var list = [];
                    this.memCache.forEach(function (item) {
                        if (item.TaskType == type) {
                            list.push(item);
                        }
                    });
                    return list;
                };
                return BoardRepository;
            })(repositories.AbstractRepository);
            repositories.BoardRepository = BoardRepository;
        })(repositories = data.repositories || (data.repositories = {}));
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
var app;
(function (app) {
    var data;
    (function (data) {
        var repositories;
        (function (repositories) {
            var GroupRepository = (function () {
                function GroupRepository($q) {
                    this.$q = $q;
                }
                return GroupRepository;
            })();
            repositories.GroupRepository = GroupRepository;
        })(repositories = data.repositories || (data.repositories = {}));
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
var app;
(function (app) {
    var data;
    (function (data) {
        var repositories;
        (function (repositories) {
            var TaskRepository = (function (_super) {
                __extends(TaskRepository, _super);
                function TaskRepository($q) {
                    var _this = this;
                    _super.call(this);
                    this.$q = $q;
                    this.load().then(function (list) {
                        _this.memCache = list;
                    });
                }
                TaskRepository.prototype.create = function (board, title, description) {
                    var item = {
                        Key: Guid.New(),
                        Title: title,
                        Description: description,
                        BoardKey: board.Key,
                    };
                    this.insert(item);
                    return item;
                };
                TaskRepository.prototype.load = function () {
                    var deferred = this.$q.defer();
                    {
                        deferred.resolve(data.SampleData.Tasks);
                    }
                    return deferred.promise;
                };
                TaskRepository.prototype.save = function () {
                    var deferred = this.$q.defer();
                    {
                        console.log(' - ToDo: Implement Save: ', this.memCache);
                        deferred.reject(new Error('Save has not been implemented for: ' + typeof this));
                    }
                    return deferred.promise;
                };
                TaskRepository.prototype.filter = function (boardKey, groupKey) {
                    var list = [];
                    this.memCache.forEach(function (item) {
                        if (boardKey && boardKey != item.BoardKey)
                            return;
                        if (groupKey && groupKey != item.BoardKey)
                            return;
                        list.push(item);
                    });
                    return list;
                };
                return TaskRepository;
            })(repositories.AbstractRepository);
            repositories.TaskRepository = TaskRepository;
        })(repositories = data.repositories || (data.repositories = {}));
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
var app;
(function (app) {
    var data;
    (function (data) {
        var repositories;
        (function (repositories) {
            var UserRepository = (function () {
                function UserRepository($q) {
                    this.$q = $q;
                }
                return UserRepository;
            })();
            repositories.UserRepository = UserRepository;
        })(repositories = data.repositories || (data.repositories = {}));
    })(data = app.data || (app.data = {}));
})(app || (app = {}));
/// <reference path="models/AppState.ts" />
/// <reference path="../data/repositories/ProjectRepository.ts" />
/// <reference path="../data/repositories/BoardRepository.ts" />
/// <reference path="../data/repositories/GroupRepository.ts" />
/// <reference path="../data/repositories/TaskRepository.ts" />
/// <reference path="../data/repositories/UserRepository.ts" />
angular.module('myScrumBoard.data', [
    'ui.router',
])
    .constant('ScrumBoardState', app.data.models.LoadAppState());
/// <reference path="../../data/module.ts" />
var app;
(function (app) {
    var common;
    (function (common) {
        var services;
        (function (services) {
            var ScrumBoardService = (function () {
                function ScrumBoardService($q) {
                    this.$q = $q;
                    this.Projects = new app.data.repositories.ProjectRepository($q);
                    this.Boards = new app.data.repositories.BoardRepository($q);
                    this.Groups = new app.data.repositories.GroupRepository($q);
                    this.Tasks = new app.data.repositories.TaskRepository($q);
                    this.Users = new app.data.repositories.UserRepository($q);
                }
                return ScrumBoardService;
            })();
            services.ScrumBoardService = ScrumBoardService;
        })(services = common.services || (common.services = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
angular.module('myScrumBoard.directives', [
    'ui.bootstrap',
])
    .directive('appToolbar', function () {
    return {
        replace: true,
        restrict: 'AEM',
        templateUrl: 'views/common/toolbar.tpl.html'
    };
})
    .directive('appHeading', function () {
    return {
        replace: true,
        restrict: 'AEM',
        templateUrl: 'views/common/heading.tpl.html'
    };
})
    .directive('appBody', function () {
    return {
        replace: true,
        restrict: 'AEM',
        templateUrl: 'views/common/body.tpl.html'
    };
})
    .directive('appFooter', function () {
    return {
        replace: true,
        restrict: 'AEM',
        templateUrl: 'views/common/footer.tpl.html'
    };
});
var app;
(function (app) {
    var common;
    (function (common) {
        var modal;
        (function (modal) {
            var AddTaskController = (function () {
                function AddTaskController($scope, $modalInstance, modalContext) {
                    this.$scope = $scope;
                    this.$modalInstance = $modalInstance;
                    this.modalContext = modalContext;
                    this.init();
                }
                AddTaskController.prototype.init = function () {
                    var _this = this;
                    this.$scope.data = this.modalContext.task;
                    this.$scope.submit = function () {
                        _this.$modalInstance.close(_this.modalContext);
                    };
                    this.$scope.cancel = function () {
                        _this.$modalInstance.dismiss(_this.modalContext);
                    };
                    var intv = setInterval(function () {
                        clearInterval(intv);
                        $('#taskTitle').focus();
                    }, 500);
                    $('#taskTitle').focusout(function () {
                        console.log(' - Blur');
                        $('#taskBody').focus();
                    });
                };
                return AddTaskController;
            })();
            modal.AddTaskController = AddTaskController;
        })(modal = common.modal || (common.modal = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        var modal;
        (function (modal) {
            var AddBoardController = (function () {
                function AddBoardController($scope, $modalInstance, modalContext) {
                    this.$scope = $scope;
                    this.$modalInstance = $modalInstance;
                    this.modalContext = modalContext;
                    this.init();
                }
                AddBoardController.prototype.init = function () {
                    var _this = this;
                    this.$scope.data = this.modalContext.board;
                    this.$scope.submit = function () {
                        _this.$modalInstance.close(_this.modalContext);
                    };
                    this.$scope.cancel = function () {
                        _this.$modalInstance.dismiss(_this.modalContext);
                    };
                    var intv = setInterval(function () {
                        clearInterval(intv);
                        $('#boardTitle').focus();
                    }, 500);
                    $('#taskTitle').focusout(function () {
                        console.log(' - Blur');
                        $('#boardBody').focus();
                    });
                };
                return AddBoardController;
            })();
            modal.AddBoardController = AddBoardController;
        })(modal = common.modal || (common.modal = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
/// <reference path="services/ScrumBoardService.ts" />
/// <reference path="directives/directives.ts" />
/// <reference path="modal/AddTaskController.ts" />
/// <reference path="modal/AddBoardController.ts" />
angular.module('myScrumBoard.common', [
    'myScrumBoard.directives',
])
    .service('ScrumBoardService', ['$q', app.common.services.ScrumBoardService])
    .controller('AddTaskController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddTaskController])
    .controller('AddBoardController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddBoardController]);
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var models = app.data.models;
        var BacklogController = (function () {
            function BacklogController($modal, scrumBoards) {
                this.$modal = $modal;
                this.scrumBoards = scrumBoards;
                this.tabIndex = 0;
            }
            Object.defineProperty(BacklogController.prototype, "boards", {
                get: function () { return this.getBoards(); },
                enumerable: true,
                configurable: true
            });
            BacklogController.prototype.index = function () {
                this.tabIndex = 0;
            };
            BacklogController.prototype.getBoards = function () {
                return this.scrumBoards
                    .Boards
                    .filterByType(app.data.models.TaskType.Backlog);
            };
            BacklogController.prototype.createNew = function (boardId) {
                var _this = this;
                var board = {
                    Key: Guid.Empty,
                    Title: 'Project Backlog',
                    TaskType: models.TaskType.Backlog,
                };
                this.current = board;
                // Open the modal dialog
                var dialog = this.$modal.open({
                    size: 'md',
                    animation: true,
                    templateUrl: 'views/common/modal/addBoard.tpl.html',
                    controller: 'AddBoardController',
                    resolve: {
                        modalContext: function () {
                            return {
                                board: board,
                            };
                        },
                    }
                }).result.then(
                // On Commit
                // On Commit
                function (modalContext) {
                    console.info(' - Modal closed. Updating task.', modalContext);
                    _this.insert(modalContext.board);
                }, 
                // Dismissed
                // Dismissed
                function () {
                    console.info(' - Modal dismissed at: ' + new Date());
                    _this.index();
                });
            };
            BacklogController.prototype.openBoard = function (board) {
                this.current = board;
                this.tabIndex = 1;
            };
            BacklogController.prototype.update = function (board) {
                this.scrumBoards.Boards.save()
                    .then(function (success) {
                    if (success) {
                    }
                    else {
                    }
                });
                this.index();
            };
            BacklogController.prototype.insert = function (board) {
                if (board.Key == Guid.Empty) {
                    board.Key = Guid.New();
                    this.scrumBoards.Boards.insert(board);
                }
                this.scrumBoards.Boards.save()
                    .then(function (success) {
                    if (success) {
                    }
                    else {
                    }
                });
                this.openBoard(board);
            };
            BacklogController.prototype.cancel = function () {
                this.current = null;
                this.index();
            };
            BacklogController.prototype.addTask = function (board) {
                var _this = this;
                if (!board)
                    board = this.current;
                if (!board)
                    return;
                var task = {
                    Key: Guid.Empty,
                    Title: '',
                    Description: '',
                    BoardKey: board.Key,
                };
                this.newTask = task;
                // Open the modal dialog
                var dialog = this.$modal.open({
                    size: 'md',
                    animation: true,
                    templateUrl: 'views/common/modal/addTask.tpl.html',
                    controller: 'AddTaskController',
                    resolve: {
                        modalContext: function () {
                            return {
                                task: task,
                            };
                        },
                    }
                }).result.then(
                // On Commit
                // On Commit
                function (modalContext) {
                    console.info(' - Modal closed. Updating task.', modalContext);
                    _this.updateTask(modalContext.task);
                }, 
                // Dismissed
                // Dismissed
                function () {
                    console.info(' - Modal dismissed at: ' + new Date());
                    _this.cancelTask();
                });
            };
            BacklogController.prototype.updateTask = function (task) {
                if (task.Key == Guid.Empty) {
                    task.Key = Guid.New();
                    this.scrumBoards.Tasks.insert(task);
                }
                console.log(task);
                this.scrumBoards.Tasks.save();
                this.newTask = null;
            };
            BacklogController.prototype.cancelTask = function () {
                this.newTask = null;
            };
            return BacklogController;
        })();
        controllers.BacklogController = BacklogController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var DashboardController = (function () {
            function DashboardController(scrumBoards) {
                this.scrumBoards = scrumBoards;
                this.tabIndex = 0;
            }
            return DashboardController;
        })();
        controllers.DashboardController = DashboardController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var ProjectsController = (function () {
            function ProjectsController(scrumBoards) {
                this.scrumBoards = scrumBoards;
                this.tabIndex = 0;
            }
            return ProjectsController;
        })();
        controllers.ProjectsController = ProjectsController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var SprintController = (function () {
            function SprintController(scrumBoards) {
                this.scrumBoards = scrumBoards;
                this.tabIndex = 0;
            }
            return SprintController;
        })();
        controllers.SprintController = SprintController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
/// <reference path="../common/module.ts" />
/// <reference path="backlogs/BacklogController.ts" />
/// <reference path="dashboard/DashboardController.ts" />
/// <reference path="projects/ProjectsController.ts" />
/// <reference path="sprints/SprintController.ts" />
angular.module('myScrumBoard.controllers', [
    'myScrumBoard.common',
])
    .controller('BacklogController', ['$modal', 'ScrumBoardService', app.controllers.BacklogController])
    .controller('DashboardController', ['ScrumBoardService', app.controllers.DashboardController])
    .controller('ProjectsController', ['ScrumBoardService', app.controllers.ProjectsController])
    .controller('SprintController', ['ScrumBoardService', app.controllers.SprintController]);
angular.module('myScrumBoard.routes', [
    'ui.router',
])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // Configure defaults
        $urlRouterProvider
            .when('', '/')
            .when('index.html', '/');
        // Configure client-side routing
        $stateProvider
            .state('default', {
            url: '/',
            views: {
                'main@': {
                    templateUrl: 'views/dashboard/main.tpl.html',
                    controller: 'DashboardController',
                    controllerAs: 'viewCtrl',
                },
            }
        })
            .state('projects', {
            url: '/projects',
            views: {
                'main@': {
                    templateUrl: 'views/projects/main.tpl.html',
                    controller: 'ProjectsController',
                    controllerAs: 'viewCtrl',
                },
            }
        })
            .state('sprints', {
            url: '/sprints',
            views: {
                'main@': {
                    templateUrl: 'views/sprints/main.tpl.html',
                    controller: 'SprintController',
                    controllerAs: 'viewCtrl',
                },
            }
        })
            .state('backlogs', {
            url: '/backlogs',
            views: {
                'main@': {
                    templateUrl: 'views/backlogs/main.tpl.html',
                    controller: 'BacklogController',
                    controllerAs: 'viewCtrl',
                },
            }
        });
    }]);
/// <reference path="imports.d.ts" />
/// <reference path="data/module.ts" />
/// <reference path="common/module.ts" />
/// <reference path="controllers/module.ts" />
/// <reference path="routes.ts" />
angular.module('myScrumBoard', [
    'myScrumBoard.data',
    'myScrumBoard.common',
    'myScrumBoard.controllers',
    'myScrumBoard.routes',
    'myScrumBoard.templates',
])
    .run(['$rootScope', 'ScrumBoardState', function ($rootScope, ScrumBoardState) {
        console.debug('Starting application...');
        $rootScope.myApp = {
            state: ScrumBoardState,
        };
    }]);
