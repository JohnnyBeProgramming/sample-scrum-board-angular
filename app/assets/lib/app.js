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
/// <reference path="models/AppState.ts" />
angular.module('myScrumBoard.data', [
    'ui.router',
])
    .constant('ScrumBoardState', app.data.models.LoadAppState());
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
/// <reference path="../../common/utils/Guid.ts" />
var app;
(function (app) {
    var data;
    (function (data) {
        var repositories;
        (function (repositories) {
            var AbstractRepository = (function () {
                function AbstractRepository($q) {
                    this.$q = $q;
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
/// <reference path="IDataModel.ts" />
var app;
(function (app) {
    var data;
    (function (data) {
        var models;
        (function (models) {
            (function (SprintState) {
                SprintState[SprintState["Default"] = 0] = "Default";
                SprintState[SprintState["Started"] = 1] = "Started";
                SprintState[SprintState["Completed"] = 2] = "Completed";
                SprintState[SprintState["Discarded"] = 3] = "Discarded";
                SprintState[SprintState["OnHold"] = 4] = "OnHold";
            })(models.SprintState || (models.SprintState = {}));
            var SprintState = models.SprintState;
        })(models = data.models || (data.models = {}));
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
                TaskType[TaskType["InProgress"] = 1] = "InProgress";
                TaskType[TaskType["Testing"] = 2] = "Testing";
                TaskType[TaskType["Completed"] = 3] = "Completed";
                TaskType[TaskType["Canceled"] = 4] = "Canceled";
                TaskType[TaskType["Backlog"] = 5] = "Backlog";
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
/// <reference path="models/IProject.ts" />
/// <reference path="models/ISprint.ts" />
/// <reference path="models/IBoard.ts" />
/// <reference path="models/IGroup.ts" />
/// <reference path="models/ITask.ts" />
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
            SampleData.Sprints = [
                // --------------------------------------------------------------
                {
                    Number: 1,
                    Key: Guid.New(),
                    State: data.models.SprintState.Started,
                    ProjectKey: SampleData.Projects[0].Key,
                },
                {
                    Number: 2,
                    Key: Guid.New(),
                    State: data.models.SprintState.Default,
                    ProjectKey: SampleData.Projects[0].Key,
                },
                // --------------------------------------------------------------
                {
                    Number: 1,
                    Key: Guid.New(),
                    State: data.models.SprintState.Completed,
                    ProjectKey: SampleData.Projects[1].Key,
                },
                {
                    Number: 2,
                    Key: Guid.New(),
                    State: data.models.SprintState.Completed,
                    ProjectKey: SampleData.Projects[1].Key,
                },
                {
                    Number: 3,
                    Key: Guid.New(),
                    State: data.models.SprintState.Started,
                    ProjectKey: SampleData.Projects[1].Key,
                },
                {
                    Number: 4,
                    Key: Guid.New(),
                    State: data.models.SprintState.OnHold,
                    ProjectKey: SampleData.Projects[1].Key,
                },
                {
                    Number: 5,
                    Key: Guid.New(),
                    State: data.models.SprintState.Default,
                    ProjectKey: SampleData.Projects[1].Key,
                },
                {
                    Number: 6,
                    Key: Guid.New(),
                    State: data.models.SprintState.Default,
                    ProjectKey: SampleData.Projects[1].Key,
                },
                {
                    Number: 7,
                    Key: Guid.New(),
                    State: data.models.SprintState.Discarded,
                    ProjectKey: SampleData.Projects[1].Key,
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
                    TaskType: data.models.TaskType.Default,
                    ProjectKey: SampleData.Projects[0].Key,
                    SprintKey: SampleData.Sprints[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Scheduled Tasks',
                    TaskType: data.models.TaskType.Default,
                    ProjectKey: SampleData.Projects[1].Key,
                    SprintKey: SampleData.Sprints[0].Key,
                },
                // --------------------------------------------------------------
                // --------------------------------------------------------------
                {
                    Key: Guid.New(),
                    Title: 'Tasks In Progress',
                    TaskType: data.models.TaskType.InProgress,
                    ProjectKey: SampleData.Projects[0].Key,
                    SprintKey: SampleData.Sprints[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Tasks In Progress',
                    TaskType: data.models.TaskType.InProgress,
                    ProjectKey: SampleData.Projects[1].Key,
                    SprintKey: SampleData.Sprints[4].Key,
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
                    TaskType: data.models.TaskType.Completed,
                    Description: 'Create some more tasks and assign more work.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Creative Design',
                    TaskType: data.models.TaskType.Testing,
                    Description: 'Create a mockup of the UI and draw some layouts.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Scaffold web application',
                    TaskType: data.models.TaskType.InProgress,
                    Description: 'Create the HTML, CSS and javascript folder structures for the web app.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Add Grunt Build',
                    TaskType: data.models.TaskType.Default,
                    Description: 'Create a build folder and install and setup grunt for continous builds.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    Title: 'Create Git Repository',
                    TaskType: data.models.TaskType.Completed,
                    Description: 'Create a clean new repo to store the code.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Backlog,
                    Title: 'Do Sanity Checks',
                    Description: 'Publish to the git repository.',
                    ProjectKey: SampleData.Projects[0].Key,
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Backlog,
                    Title: 'Get Feedback from product owners',
                    Description: 'Publish to the git repository.',
                    ProjectKey: SampleData.Projects[0].Key,
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Backlog,
                    Title: 'Publish release notes',
                    Description: 'Publish to the git repository.',
                    ProjectKey: SampleData.Projects[0].Key,
                    BoardKey: null,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Canceled,
                    Title: 'Canceled Task',
                    Description: 'This is a sample of a canceled task.',
                    BoardKey: SampleData.Boards[0].Key,
                    GroupKey: SampleData.Groups[0].Key,
                },
                // --------------------------------------------------------------
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Default,
                    Title: 'Do some task for me #1',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[1].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Default,
                    Title: 'Do some task for me #2',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[6].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Default,
                    Title: 'Do some task for me #3',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[6].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Default,
                    Title: 'Do some task for me #4',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[6].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Default,
                    Title: 'Do some task for me #5',
                    Description: 'This is an example taskthat is just that: an example.',
                    BoardKey: SampleData.Boards[7].Key,
                    GroupKey: null,
                },
                {
                    Key: Guid.New(),
                    TaskType: data.models.TaskType.Default,
                    Title: 'Do some task for me #5',
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
/// <reference path="AbstractRepository.ts" />
/// <reference path="../models/IProject.ts" />
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
                    _super.call(this, $q);
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
                ProjectRepository.prototype.findByKey = function (key) {
                    var _this = this;
                    var found = false;
                    var deferred = this.$q.defer();
                    this.load()
                        .then(function (items) {
                        if (items) {
                            items.forEach(function (item) {
                                if (found)
                                    return;
                                if (item.Key == key) {
                                    deferred.resolve(item);
                                    found = true;
                                }
                            });
                        }
                        if (!found) {
                            deferred.resolve(null);
                        }
                    }).catch(function (error) {
                        deferred.reject(error || new Error('Item with key "' + key + '" could not be found. Type:' + typeof _this));
                    });
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
            var SprintRepository = (function (_super) {
                __extends(SprintRepository, _super);
                function SprintRepository($q) {
                    var _this = this;
                    _super.call(this, $q);
                    this.load().then(function (list) {
                        _this.memCache = list;
                    });
                }
                SprintRepository.prototype.create = function (projectKey, number) {
                    var item = {
                        Key: Guid.New(),
                        Number: number ? number : this.getNextSprintNumber(projectKey),
                        State: data.models.SprintState.Default,
                        ProjectKey: projectKey,
                    };
                    this.insert(item);
                    return item;
                };
                SprintRepository.prototype.load = function () {
                    var deferred = this.$q.defer();
                    {
                        deferred.resolve(data.SampleData.Sprints);
                    }
                    return deferred.promise;
                };
                SprintRepository.prototype.save = function () {
                    var deferred = this.$q.defer();
                    {
                        console.log(' - ToDo: Implement Save: ', this.memCache);
                        deferred.reject(new Error('Save has not been implemented for: ' + typeof this));
                    }
                    return deferred.promise;
                };
                SprintRepository.prototype.findByKey = function (key) {
                    var _this = this;
                    var found = false;
                    var deferred = this.$q.defer();
                    this.load().then(function (items) {
                        if (items) {
                            items.forEach(function (item) {
                                if (found)
                                    return;
                                if (item.Key == key) {
                                    deferred.resolve(item);
                                    found = true;
                                }
                            });
                        }
                        if (!found) {
                            deferred.resolve(null);
                        }
                    }).catch(function (error) {
                        deferred.reject(error || new Error('Item with key "' + key + '" could not be found. Type:' + typeof _this));
                    });
                    return deferred.promise;
                };
                SprintRepository.prototype.filterByProject = function (key) {
                    var _this = this;
                    var list = [];
                    var deferred = this.$q.defer();
                    this.load().then(function (items) {
                        if (items) {
                            items.forEach(function (item) {
                                if (item.ProjectKey == key) {
                                    list.push(item);
                                }
                            });
                        }
                        deferred.resolve(list);
                    }).catch(function (error) {
                        deferred.reject(error || new Error('Item with key "' + key + '" could not be found. Type:' + typeof _this));
                    });
                    return deferred.promise;
                };
                SprintRepository.prototype.getNextSprintNumber = function (projectKey) {
                    var sprintMax = 0;
                    if (this.memCache) {
                        this.memCache.forEach(function (item) {
                            if (item.ProjectKey == projectKey && item.Number > sprintMax) {
                                sprintMax = item.Number;
                            }
                        });
                    }
                    return sprintMax + 1;
                };
                return SprintRepository;
            })(repositories.AbstractRepository);
            repositories.SprintRepository = SprintRepository;
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
                    _super.call(this, $q);
                    this.load().then(function (list) {
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
                BoardRepository.prototype.filterByProject = function (projectKey, type) {
                    var list = [];
                    this.memCache.forEach(function (item) {
                        if (item.ProjectKey != projectKey)
                            return;
                        if (!type) {
                            list.push(item);
                        }
                        else if (item.TaskType == type) {
                            list.push(item);
                        }
                    });
                    return list;
                };
                BoardRepository.prototype.filterBySprint = function (sprintKey, type) {
                    var list = [];
                    this.memCache.forEach(function (item) {
                        if (item.SprintKey != sprintKey)
                            return;
                        if (!type) {
                            list.push(item);
                        }
                        else if (item.TaskType == type) {
                            list.push(item);
                        }
                    });
                    return list;
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
                BoardRepository.prototype.findByKey = function (key) {
                    var _this = this;
                    var found = false;
                    var deferred = this.$q.defer();
                    this.load()
                        .then(function (items) {
                        if (items) {
                            items.forEach(function (item) {
                                if (found)
                                    return;
                                if (item.Key == key) {
                                    deferred.resolve(item);
                                    found = true;
                                }
                            });
                        }
                        if (!found) {
                            deferred.resolve(null);
                        }
                    }).catch(function (error) {
                        deferred.reject(error || new Error('Item with key "' + key + '" could not be found. Type:' + typeof _this));
                    });
                    return deferred.promise;
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
            var models = app.data.models;
            var TaskRepository = (function (_super) {
                __extends(TaskRepository, _super);
                function TaskRepository($q) {
                    var _this = this;
                    _super.call(this, $q);
                    this.load().then(function (list) {
                        _this.memCache = list;
                    });
                }
                TaskRepository.prototype.create = function (board, title, description) {
                    var item = {
                        Key: Guid.New(),
                        TaskType: models.TaskType.Default,
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
                        if (groupKey && groupKey != item.GroupKey)
                            return;
                        list.push(item);
                    });
                    return list;
                };
                TaskRepository.prototype.filterByProject = function (projectKey, groupKey) {
                    var list = [];
                    this.memCache.forEach(function (item) {
                        if (projectKey && projectKey != item.ProjectKey)
                            return;
                        if (groupKey && groupKey != item.GroupKey)
                            return;
                        list.push(item);
                    });
                    return list;
                };
                TaskRepository.prototype.filterBySprint = function (sprintKey, groupKey) {
                    var list = [];
                    this.memCache.forEach(function (item) {
                        if (sprintKey && sprintKey != item.SprintKey)
                            return;
                        if (groupKey && groupKey != item.GroupKey)
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
/// <reference path="../../data/module.ts" />
/// <reference path="../../data/repositories/ProjectRepository.ts" />
/// <reference path="../../data/repositories/SprintRepository.ts" />
/// <reference path="../../data/repositories/BoardRepository.ts" />
/// <reference path="../../data/repositories/GroupRepository.ts" />
/// <reference path="../../data/repositories/TaskRepository.ts" />
/// <reference path="../../data/repositories/UserRepository.ts" />
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
                    this.Sprints = new app.data.repositories.SprintRepository($q);
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
var app;
(function (app) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            function AppToolbar() {
                return {
                    replace: true,
                    restrict: 'AEM',
                    templateUrl: 'views/common/toolbar.tpl.html'
                };
            }
            directives.AppToolbar = AppToolbar;
        })(directives = common.directives || (common.directives = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            function AppHeading() {
                return {
                    replace: true,
                    restrict: 'AEM',
                    templateUrl: 'views/common/heading.tpl.html'
                };
            }
            directives.AppHeading = AppHeading;
        })(directives = common.directives || (common.directives = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            function AppBody() {
                return {
                    replace: true,
                    restrict: 'AEM',
                    templateUrl: 'views/common/body.tpl.html'
                };
            }
            directives.AppBody = AppBody;
        })(directives = common.directives || (common.directives = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            function AppFooter() {
                return {
                    replace: true,
                    restrict: 'AEM',
                    templateUrl: 'views/common/footer.tpl.html'
                };
            }
            directives.AppFooter = AppFooter;
        })(directives = common.directives || (common.directives = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            function DropTarget() {
                function addEvent(to, type, fn) {
                    if ('addEventListener' in document) {
                        to.addEventListener(type, fn, false);
                    }
                    else if ('attachEvent' in document) {
                        to.attachEvent('on' + type, fn);
                    }
                    else {
                        to['on' + type] = fn;
                    }
                }
                ;
                return {
                    replace: true,
                    restrict: 'AEMC',
                    scope: {
                        action: '&dropAction',
                    },
                    controller: ['$scope', function ($scope) {
                            $scope.over = function () { };
                            $scope.enter = function () { };
                            $scope.leave = function () { };
                            $scope.drop = function (data) {
                                //console.debug(' - Drop', data);
                                if ($scope.action) {
                                    $scope.action({
                                        data: data,
                                    });
                                }
                            };
                        }],
                    link: function ($scope, element) {
                        addEvent(element[0], 'dragover', function (e) {
                            if (e.preventDefault)
                                e.preventDefault(); // allows us to drop
                            e.dataTransfer.dropEffect = 'copy';
                            element.toggleClass('over', true);
                            $scope.over();
                            return false;
                        });
                        addEvent(element[0], 'dragenter', function (e) {
                            element.toggleClass('over', true); // to get IE to work
                            $scope.enter();
                            return false;
                        });
                        addEvent(element[0], 'dragleave', function () {
                            element.toggleClass('over', false);
                            $scope.leave();
                        });
                        addEvent(element[0], 'drop', function (e) {
                            if (e.stopPropagation)
                                e.stopPropagation(); // stops the browser from redirecting...why???
                            element.toggleClass('over', false);
                            var data = e.dataTransfer.getData('Text');
                            $scope.drop(JSON.parse(data));
                            return false;
                        });
                    },
                };
            }
            directives.DropTarget = DropTarget;
        })(directives = common.directives || (common.directives = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        var directives;
        (function (directives) {
            function DragItem() {
                function addEvent(to, type, fn) {
                    if ('addEventListener' in document) {
                        to.addEventListener(type, fn, false);
                    }
                    else if ('attachEvent' in document) {
                        to.attachEvent('on' + type, fn);
                    }
                    else {
                        to['on' + type] = fn;
                    }
                }
                ;
                return {
                    replace: true,
                    restrict: 'AEMC',
                    scope: {
                        data: '=dragData',
                    },
                    controller: ['$scope', function ($scope) {
                            $scope.drag = function (data) {
                                //console.debug(' - Drag:', data);
                            };
                        }],
                    link: function ($scope, element) {
                        element.attr('draggable', 'true');
                        addEvent(element[0], 'dragstart', function (e) {
                            var data = $scope.data;
                            e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
                            e.dataTransfer.setData('Text', JSON.stringify(data)); // required otherwise doesn't work
                            $scope.drag(data);
                        });
                    },
                };
            }
            directives.DragItem = DragItem;
        })(directives = common.directives || (common.directives = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
/// <reference path="AppToolbar.ts" />
/// <reference path="AppHeading.ts" />
/// <reference path="AppBody.ts" />
/// <reference path="AppFooter.ts" />
/// <reference path="DropTarget.ts" />
/// <reference path="DragItem.ts" />
angular.module('myScrumBoard.directives', [
    'ui.bootstrap',
])
    .directive('appToolbar', app.common.directives.AppToolbar)
    .directive('appHeading', app.common.directives.AppHeading)
    .directive('appBody', app.common.directives.AppBody)
    .directive('appFooter', app.common.directives.AppFooter)
    .directive('dropTarget', app.common.directives.DropTarget)
    .directive('dragItem', app.common.directives.DragItem);
var app;
(function (app) {
    var common;
    (function (common) {
        var modal;
        (function (modal) {
            var AddProjectController = (function () {
                function AddProjectController($scope, $modalInstance, modalContext) {
                    this.$scope = $scope;
                    this.$modalInstance = $modalInstance;
                    this.modalContext = modalContext;
                    this.init();
                }
                AddProjectController.prototype.init = function () {
                    var _this = this;
                    this.$scope.data = this.modalContext.project;
                    this.$scope.submit = function () {
                        _this.$modalInstance.close(_this.modalContext);
                    };
                    this.$scope.cancel = function () {
                        _this.$modalInstance.dismiss(_this.modalContext);
                    };
                    var intv = setInterval(function () {
                        clearInterval(intv);
                        $('#projectTitle').focus();
                    }, 500);
                    $('#taskTitle').focusout(function () {
                        $('#projectBody').focus();
                    });
                };
                return AddProjectController;
            })();
            modal.AddProjectController = AddProjectController;
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
                        $('#boardBody').focus();
                    });
                };
                return AddBoardController;
            })();
            modal.AddBoardController = AddBoardController;
        })(modal = common.modal || (common.modal = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        var modal;
        (function (modal) {
            var AddTaskController = (function () {
                function AddTaskController($rootScope, $scope, $modalInstance, modalContext, scrumBoardService) {
                    this.$rootScope = $rootScope;
                    this.$scope = $scope;
                    this.$modalInstance = $modalInstance;
                    this.modalContext = modalContext;
                    this.scrumBoardService = scrumBoardService;
                    this.map = {};
                    this.projects = [];
                    this.sprints = [];
                    this.boards = [];
                    this.init();
                }
                AddTaskController.prototype.init = function () {
                    var _this = this;
                    this.scrumBoardService.Projects.load().then(function (items) {
                        _this.$rootScope.$applyAsync(function () {
                            _this.projects = items;
                        });
                    });
                    this.scrumBoardService.Sprints.load().then(function (items) {
                        _this.$rootScope.$applyAsync(function () {
                            _this.sprints = items;
                        });
                    });
                    this.scrumBoardService.Boards.load().then(function (items) {
                        _this.$rootScope.$applyAsync(function () {
                            _this.boards = items;
                        });
                    });
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
                        $('#taskBody').focus();
                    });
                };
                AddTaskController.prototype.getProjectLabel = function (projectKey) {
                    var _this = this;
                    if (this.projects) {
                        this.projects.forEach(function (project) {
                            if (project.Key == projectKey) {
                                _this.map[projectKey] = project;
                            }
                        });
                    }
                    if (this.map[projectKey]) {
                        return this.map[projectKey].Title;
                    }
                    return null;
                };
                AddTaskController.prototype.getSprintLabel = function (sprintKey) {
                    var _this = this;
                    if (this.sprints) {
                        this.sprints.forEach(function (item) {
                            if (item.Key == sprintKey) {
                                _this.map[sprintKey] = item;
                            }
                        });
                    }
                    if (this.map[sprintKey]) {
                        return 'Sprint #' + (this.map[sprintKey].Number || 1);
                    }
                    return null;
                };
                AddTaskController.prototype.getBoardLabel = function (boardKey) {
                    var _this = this;
                    if (this.boards) {
                        this.boards.forEach(function (item) {
                            if (item.Key == boardKey) {
                                _this.map[boardKey] = item;
                            }
                        });
                    }
                    if (this.map[boardKey]) {
                        return this.map[boardKey].Title;
                    }
                    return null;
                };
                AddTaskController.prototype.setProjectKey = function (task, key) {
                    this.$rootScope.$applyAsync(function () {
                        task.ProjectKey = key;
                        task.SprintKey = null;
                        task.BoardKey = null;
                    });
                };
                AddTaskController.prototype.setSprintKey = function (task, key) {
                    this.$rootScope.$applyAsync(function () {
                        task.SprintKey = key;
                        task.BoardKey = null;
                    });
                    console.log('setSprintKey', task, key);
                };
                AddTaskController.prototype.setBoardKey = function (task, key) {
                    this.$rootScope.$applyAsync(function () {
                        task.BoardKey = key;
                    });
                    console.log('setBoardKey', task, key);
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
            var AddSprintController = (function () {
                function AddSprintController($scope, $modalInstance, modalContext, scrumBoardService) {
                    this.$scope = $scope;
                    this.$modalInstance = $modalInstance;
                    this.modalContext = modalContext;
                    this.scrumBoardService = scrumBoardService;
                    this.init();
                }
                AddSprintController.prototype.init = function () {
                    var _this = this;
                    this.$scope.model = this.scrumBoardService;
                    this.$scope.data = this.modalContext.sprint;
                    this.$scope.submit = function () {
                        _this.$modalInstance.close(_this.modalContext);
                    };
                    this.$scope.cancel = function () {
                        _this.$modalInstance.dismiss(_this.modalContext);
                    };
                };
                return AddSprintController;
            })();
            modal.AddSprintController = AddSprintController;
        })(modal = common.modal || (common.modal = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
var app;
(function (app) {
    var common;
    (function (common) {
        var modal;
        (function (modal) {
            var models = app.data.models;
            var AddBacklogsController = (function () {
                function AddBacklogsController($scope, $modalInstance, modalContext, scrumBoardService) {
                    this.$scope = $scope;
                    this.$modalInstance = $modalInstance;
                    this.modalContext = modalContext;
                    this.scrumBoardService = scrumBoardService;
                    this.selected = {};
                    this.boards = [];
                    this.other = [];
                    this.init();
                }
                AddBacklogsController.prototype.init = function () {
                    var _this = this;
                    var ctx = this.modalContext;
                    this.$scope.ctx = ctx;
                    this.$scope.data = ctx.data;
                    this.$scope.model = this.scrumBoardService;
                    this.$scope.submit = function () {
                        _this.scrumBoardService.Tasks.load().then(function (items) {
                            var list = [];
                            var targets = _this.getSelected();
                            if (items && targets.length) {
                                items.forEach(function (item) {
                                    if (targets.indexOf(item.Key) >= 0) {
                                        list.push(item);
                                    }
                                });
                            }
                            ctx.data = list;
                        });
                        _this.$modalInstance.close(ctx);
                    };
                    this.$scope.cancel = function () {
                        _this.$modalInstance.dismiss(ctx);
                    };
                    if (ctx.projectKey) {
                        var map = {};
                        var svc = this.scrumBoardService;
                        svc.Boards.load().then(function (items) {
                            var boards = svc.Boards.filterByProject(ctx.projectKey, models.TaskType.Backlog);
                            if (boards) {
                                boards.forEach(function (board) {
                                    map[board.Key] = board;
                                });
                            }
                            _this.$scope.$applyAsync(function () {
                                _this.boards = boards;
                            });
                            svc.Tasks.load().then(function (items) {
                                var other = [];
                                var tasks = svc.Tasks.filterByProject(ctx.projectKey);
                                if (tasks) {
                                    tasks.forEach(function (item) {
                                        if (item.BoardKey in map)
                                            return;
                                        if (item.TaskType == models.TaskType.Backlog) {
                                            other.push(item);
                                        }
                                    });
                                }
                                _this.$scope.$applyAsync(function () {
                                    _this.other = other;
                                });
                            });
                        });
                    }
                };
                AddBacklogsController.prototype.getSelected = function () {
                    var list = [];
                    for (var key in this.selected) {
                        if (this.selected.hasOwnProperty(key) && this.selected[key] === true) {
                            list.push(key);
                        }
                    }
                    return list;
                };
                AddBacklogsController.prototype.getBoardTasks = function (board) {
                    return this.scrumBoardService.Tasks.filter(board.Key);
                };
                return AddBacklogsController;
            })();
            modal.AddBacklogsController = AddBacklogsController;
        })(modal = common.modal || (common.modal = {}));
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
/// <reference path="services/ScrumBoardService.ts" />
/// <reference path="directives/directives.ts" />
/// <reference path="modal/AddProjectController.ts" />
/// <reference path="modal/AddBoardController.ts" />
/// <reference path="modal/AddTaskController.ts" />
/// <reference path="modal/AddSprintController.ts" />
/// <reference path="modal/AddBacklogsController.ts" />
angular.module('myScrumBoard.common', [
    'myScrumBoard.directives',
])
    .service('ScrumBoardService', ['$q', app.common.services.ScrumBoardService])
    .controller('AddProjectController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddProjectController])
    .controller('AddBoardController', ['$scope', '$modalInstance', 'modalContext', app.common.modal.AddBoardController])
    .controller('AddSprintController', ['$scope', '$modalInstance', 'modalContext', 'ScrumBoardService', app.common.modal.AddSprintController])
    .controller('AddTaskController', ['$rootScope', '$scope', '$modalInstance', 'modalContext', 'ScrumBoardService', app.common.modal.AddTaskController])
    .controller('AddBacklogsController', ['$scope', '$modalInstance', 'modalContext', 'ScrumBoardService', app.common.modal.AddBacklogsController]);
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var models = app.data.models;
        var BacklogController = (function () {
            function BacklogController($rootScope, $state, $modal, scrumBoards) {
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$modal = $modal;
                this.scrumBoards = scrumBoards;
            }
            Object.defineProperty(BacklogController.prototype, "boards", {
                get: function () { return this.getBoards(); },
                enumerable: true,
                configurable: true
            });
            BacklogController.prototype.getBoards = function () {
                return this.scrumBoards
                    .Boards
                    .filterByType(app.data.models.TaskType.Backlog);
            };
            BacklogController.prototype.getTasks = function (board) {
                var tasks = this.scrumBoards.Tasks.filter(board.Key);
                //console.log(' - Tasks: ', board.Key, tasks);
                return tasks;
            };
            BacklogController.prototype.index = function () {
                this.$state.go('backlogs.list');
            };
            BacklogController.prototype.openBoard = function (board) {
                this.$state.go('backlogs.item', { key: board.Key });
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
                this.index();
            };
            BacklogController.prototype.cancel = function () {
                this.index();
            };
            BacklogController.prototype.addTaskToBoard = function (board) {
                var _this = this;
                if (!board)
                    board = this.current;
                if (!board)
                    return;
                var task = {
                    Key: Guid.Empty,
                    TaskType: models.TaskType.Default,
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
            BacklogController.prototype.moveTask = function (boardKey, task) {
                var _this = this;
                if (task && !!boardKey) {
                    this.$rootScope.$applyAsync(function () {
                        console.log(' - Move:', task.Key, boardKey);
                        task.BoardKey = boardKey;
                        _this.updateTask(task);
                    });
                }
            };
            BacklogController.prototype.editTask = function (task) {
                var _this = this;
                // Open the modal dialog
                var dialog = this.$modal.open({
                    size: 'md',
                    animation: true,
                    templateUrl: 'views/common/modal/addTask.tpl.html',
                    controller: 'AddTaskController',
                    controllerAs: 'modalCtrl',
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
                this.scrumBoards.Tasks.save();
                this.newTask = null;
            };
            BacklogController.prototype.cancelTask = function () {
                this.newTask = null;
            };
            return BacklogController;
        })();
        controllers.BacklogController = BacklogController;
        var BacklogListController = (function () {
            function BacklogListController(scrumBoards) {
                this.scrumBoards = scrumBoards;
                this.init();
            }
            BacklogListController.prototype.init = function () {
            };
            return BacklogListController;
        })();
        controllers.BacklogListController = BacklogListController;
        var BacklogItemController = (function () {
            function BacklogItemController(scrumBoards, board) {
                this.scrumBoards = scrumBoards;
                this.board = board;
            }
            return BacklogItemController;
        })();
        controllers.BacklogItemController = BacklogItemController;
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
            function ProjectsController($state, $modal, scrumBoards) {
                this.$state = $state;
                this.$modal = $modal;
                this.scrumBoards = scrumBoards;
            }
            ProjectsController.prototype.index = function () {
                this.$state.go('projects.list');
            };
            ProjectsController.prototype.openProject = function (project) {
                this.$state.go('projects.item', { key: project.Key });
            };
            ProjectsController.prototype.newProject = function () {
                var _this = this;
                var project = {
                    Key: Guid.Empty,
                    Title: '',
                    Description: '',
                };
                // Open the modal dialog
                var dialog = this.$modal.open({
                    size: 'md',
                    animation: true,
                    templateUrl: 'views/common/modal/addProject.tpl.html',
                    controller: 'AddProjectController',
                    resolve: {
                        modalContext: function () {
                            return {
                                project: project,
                            };
                        },
                    }
                }).result.then(
                // On Commit
                // On Commit
                function (modalContext) {
                    console.info(' - Modal closed. Updating task.', modalContext);
                    _this.update(modalContext.project);
                }, 
                // Dismissed
                // Dismissed
                function () {
                    console.info(' - Modal dismissed at: ' + new Date());
                    _this.cancel();
                });
            };
            ProjectsController.prototype.update = function (project) {
                var _this = this;
                if (project.Key == Guid.Empty) {
                    project.Key = Guid.New(),
                        this.scrumBoards.Projects.insert(project);
                }
                else {
                    this.scrumBoards.Projects.save().then(function () {
                        _this.index();
                    });
                }
            };
            ProjectsController.prototype.cancel = function () {
                this.index();
            };
            return ProjectsController;
        })();
        controllers.ProjectsController = ProjectsController;
        var ProjectListController = (function () {
            function ProjectListController($rootScope, scrumBoards) {
                this.$rootScope = $rootScope;
                this.scrumBoards = scrumBoards;
                this.projects = [];
                this.init();
            }
            ProjectListController.prototype.init = function () {
                var _this = this;
                this.scrumBoards.Projects.load().then(function (items) {
                    _this.projects = items;
                }).finally(function () {
                    _this.$rootScope.$applyAsync();
                });
            };
            return ProjectListController;
        })();
        controllers.ProjectListController = ProjectListController;
        var ProjectItemController = (function () {
            function ProjectItemController($rootScope, scrumBoards, project) {
                this.$rootScope = $rootScope;
                this.scrumBoards = scrumBoards;
                this.project = project;
            }
            return ProjectItemController;
        })();
        controllers.ProjectItemController = ProjectItemController;
    })(controllers = app.controllers || (app.controllers = {}));
})(app || (app = {}));
/// <reference path="../../data/module.ts" />
/// <reference path="../../common/module.ts" />
var app;
(function (app) {
    var controllers;
    (function (controllers) {
        var models = app.data.models;
        var ControllerUtils = (function () {
            function ControllerUtils() {
            }
            ControllerUtils.TaskDescription = function (type) {
                switch (type) {
                    case models.TaskType.Default: return 'Unassigned Tasks';
                    case models.TaskType.Backlog: return 'Backlog';
                    case models.TaskType.Canceled: return 'Canceled';
                    case models.TaskType.Completed: return 'Completed';
                    case models.TaskType.InProgress: return 'In Progress';
                    case models.TaskType.Testing: return 'Testing';
                    default: return '';
                }
            };
            ControllerUtils.StateDescription = function (state) {
                switch (state) {
                    case models.SprintState.Default: return 'Scheduled';
                    case models.SprintState.Completed: return 'Completed';
                    case models.SprintState.Discarded: return 'Discarded';
                    case models.SprintState.OnHold: return 'On Hold';
                    case models.SprintState.Started: return 'In Progress';
                    default: return '';
                }
            };
            return ControllerUtils;
        })();
        controllers.ControllerUtils = ControllerUtils;
        var SprintController = (function () {
            function SprintController($rootScope, $state, $modal, scrumBoards) {
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$modal = $modal;
                this.scrumBoards = scrumBoards;
                this.projectCache = {};
            }
            SprintController.prototype.getSprints = function () {
                return this.scrumBoards
                    .Sprints
                    .filterByProject(Guid.New());
            };
            SprintController.prototype.index = function () {
                this.$state.go('sprints.active');
            };
            SprintController.prototype.cancel = function () {
                this.index();
            };
            SprintController.prototype.openBoard = function (sprint) {
                this.$state.go('sprints.item', { key: sprint.Key });
            };
            SprintController.prototype.addTask = function (task) {
                var _this = this;
                task = task ? task : {
                    Key: Guid.Empty,
                    Title: '',
                    Description: '',
                    BoardKey: null,
                    ProjectKey: null,
                    SprintKey: null,
                    TaskType: models.TaskType.Default,
                };
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
                    _this.cancel();
                });
            };
            SprintController.prototype.addTaskToBoard = function (board, callback) {
                if (!board)
                    return;
                var task = {
                    Key: Guid.Empty,
                    Title: '',
                    Description: '',
                    BoardKey: board.Key,
                    ProjectKey: board.ProjectKey,
                    SprintKey: board.SprintKey,
                    TaskType: board.TaskType ? board.TaskType : models.TaskType.Default,
                };
                this.addTask(task);
            };
            SprintController.prototype.addTaskToSprint = function (sprint) {
                var board = this.firstOrDefaultBoard(sprint.Key, models.TaskType.Default, function (type) { return {
                    Key: Guid.Empty,
                    Title: ControllerUtils.TaskDescription(type),
                    TaskType: type,
                    SprintKey: sprint.Key,
                    ProjectKey: sprint.ProjectKey,
                }; });
                var task = {
                    Key: Guid.Empty,
                    Title: '',
                    Description: '',
                    TaskType: board.TaskType,
                    ProjectKey: sprint.ProjectKey,
                    SprintKey: sprint.Key,
                    BoardKey: board.Key,
                };
                this.addTask(task);
            };
            SprintController.prototype.addSprint = function (project, state) {
                var _this = this;
                var sprint = {
                    Number: 0,
                    Key: Guid.Empty,
                    State: state ? state : models.SprintState.Started,
                    ProjectKey: project != null ? project.Key : null,
                };
                // Open the modal dialog
                var dialog = this.$modal.open({
                    size: 'md',
                    animation: true,
                    templateUrl: 'views/common/modal/addSprint.tpl.html',
                    controller: 'AddSprintController',
                    resolve: {
                        modalContext: function () {
                            return {
                                sprint: sprint,
                            };
                        },
                    }
                }).result.then(
                // On Commit
                // On Commit
                function (modalContext) {
                    console.info(' - Modal closed. Updating sprint.', modalContext);
                    _this.updateSprint(modalContext.sprint);
                }, 
                // Dismissed
                // Dismissed
                function () {
                    console.info(' - Modal dismissed at: ' + new Date());
                    _this.cancel();
                });
            };
            SprintController.prototype.addBacklogs = function (sprint, board) {
                var _this = this;
                // Open the modal dialog
                var dialog = this.$modal.open({
                    size: 'md',
                    animation: true,
                    templateUrl: 'views/common/modal/addBacklogs.tpl.html',
                    controller: 'AddBacklogsController',
                    controllerAs: 'modalCtrl',
                    resolve: {
                        modalContext: function () {
                            return {
                                data: [],
                                sprint: sprint,
                                projectKey: sprint.ProjectKey,
                            };
                        },
                    }
                }).result.then(
                // On Commit
                // On Commit
                function (modalContext) {
                    var result = modalContext.data;
                    console.info(' - Modal closed. Updating sprint.', result);
                    if (result && result.length) {
                        result.forEach(function (item) {
                            item.TaskType = models.TaskType.Default;
                            item.SprintKey = sprint.Key;
                            item.ProjectKey = sprint.ProjectKey;
                            item.BoardKey = board ? board.Key : _this.firstOrDefaultBoard(sprint.Key, models.TaskType.Default, function (type) { return {
                                Key: Guid.Empty,
                                TaskType: type,
                                SprintKey: sprint.Key,
                                ProjectKey: sprint.ProjectKey,
                                Title: ControllerUtils.TaskDescription(type),
                            }; }).Key;
                        });
                        _this.scrumBoards.Boards.save().then(function () {
                            _this.scrumBoards.Tasks.save();
                        });
                    }
                }, 
                // Dismissed
                // Dismissed
                function () {
                    console.info(' - Modal dismissed at: ' + new Date());
                    _this.cancel();
                });
            };
            SprintController.prototype.updateTask = function (task) {
                var _this = this;
                if (task.Key == Guid.Empty) {
                    task.Key = Guid.New();
                    this.scrumBoards.Tasks.insert(task);
                }
                this.scrumBoards.Tasks.save().finally(function () {
                    _this.refreshData({ task: task });
                    _this.$rootScope.$applyAsync();
                });
            };
            SprintController.prototype.updateSprint = function (sprint) {
                var _this = this;
                if (sprint.Key == Guid.Empty) {
                    sprint.Key = Guid.New();
                    this.scrumBoards.Sprints.insert(sprint);
                }
                this.scrumBoards.Sprints.save().finally(function () {
                    _this.refreshData({ sprint: sprint });
                    _this.$rootScope.$applyAsync();
                });
            };
            SprintController.prototype.refreshData = function (ctx) {
                this.$rootScope.$broadcast('RefreshData', ctx);
            };
            SprintController.prototype.getProjectLabel = function (projectKey) {
                var _this = this;
                if (projectKey in this.projectCache) {
                    return this.projectCache[projectKey].Title;
                }
                else {
                    this.scrumBoards.Projects
                        .findByKey(projectKey)
                        .then(function (result) {
                        _this.projectCache[projectKey] = result;
                    }).finally(function () {
                        _this.$rootScope.$applyAsync();
                    });
                }
                return null;
            };
            SprintController.prototype.getStateDesc = function (state) {
                return ControllerUtils.StateDescription(state);
            };
            SprintController.prototype.getBoardByType = function (sprint, type) {
                var found = null;
                var boards = this.getBoards(sprint.Key);
                if (boards) {
                    boards.forEach(function (item) {
                        if (found)
                            return;
                        if (item.TaskType == (type ? type : models.TaskType.Default)) {
                            found = item;
                        }
                    });
                }
                return found;
            };
            SprintController.prototype.getBoards = function (sprintKey) {
                var _this = this;
                var list = this.scrumBoards.Boards.filterBySprint(sprintKey);
                if (!list.length) {
                    var tasks = this.scrumBoards.Tasks.filterBySprint(sprintKey);
                    if (tasks && tasks.length) {
                        tasks.forEach(function (item) {
                            _this.firstOrDefaultBoard(sprintKey, item.TaskType, function (type) { return {
                                Key: Guid.Empty,
                                Title: ControllerUtils.TaskDescription(type),
                                TaskType: type,
                                SprintKey: sprintKey,
                                ProjectKey: item.ProjectKey,
                            }; });
                        });
                    }
                    list = this.scrumBoards.Boards.filterBySprint(sprintKey);
                }
                return list;
            };
            SprintController.prototype.firstOrDefaultBoard = function (sprintKey, type, defaults) {
                var _this = this;
                var target = null;
                var boards = this.scrumBoards.Boards.filterBySprint(sprintKey, type);
                if (boards.length) {
                    boards.forEach(function (item) {
                        if (target)
                            return;
                        if (item.TaskType == type) {
                            target = item;
                        }
                    });
                }
                if (!target) {
                    boards = defaults ? [defaults(type)] : [];
                    boards.forEach(function (item) {
                        if (item.Key == Guid.Empty) {
                            item.Key = Guid.New();
                            _this.scrumBoards.Boards.insert(item);
                        }
                        if (item.TaskType == type) {
                            target = item;
                        }
                    });
                }
                return target;
            };
            SprintController.prototype.moveTask = function (boardKey, task) {
                var _this = this;
                if (task && !!boardKey) {
                    this.$rootScope.$applyAsync(function () {
                        console.log(' - Move:', task.Key, boardKey);
                        task.BoardKey = boardKey;
                        _this.updateTask(task);
                    });
                }
            };
            return SprintController;
        })();
        controllers.SprintController = SprintController;
        var SprintListController = (function () {
            function SprintListController($rootScope, scrumBoards, project) {
                this.$rootScope = $rootScope;
                this.scrumBoards = scrumBoards;
                this.project = project;
                this.showAll = true;
                this.cached = [];
                this.init();
            }
            Object.defineProperty(SprintListController.prototype, "sprints", {
                get: function () { return this.cached; },
                enumerable: true,
                configurable: true
            });
            SprintListController.prototype.init = function () {
                var _this = this;
                this.scrumBoards.Sprints.load().then(function (items) {
                    _this.cached = [];
                    if (items) {
                        items.forEach(function (item) {
                            if (_this.project && (_this.project.Key == item.ProjectKey)) {
                                _this.cached.push(item);
                            }
                        });
                    }
                }).finally(function () {
                    _this.$rootScope.$applyAsync();
                });
            };
            return SprintListController;
        })();
        controllers.SprintListController = SprintListController;
        var SprintsActiveController = (function () {
            function SprintsActiveController($rootScope, scrumBoards) {
                this.$rootScope = $rootScope;
                this.scrumBoards = scrumBoards;
                this.showAll = false;
                this.cached = [];
                this.active = [];
                this.init();
            }
            Object.defineProperty(SprintsActiveController.prototype, "sprints", {
                get: function () { return this.showAll ? this.cached : this.active; },
                enumerable: true,
                configurable: true
            });
            SprintsActiveController.prototype.init = function () {
                var _this = this;
                this.load();
                this.$rootScope.$on('RefreshData', function (event, data) {
                    _this.load();
                });
            };
            SprintsActiveController.prototype.load = function () {
                var _this = this;
                this.scrumBoards.Sprints.load().then(function (items) {
                    if (items) {
                        var active = [];
                        items.forEach(function (item) {
                            if (item.State == models.SprintState.Started) {
                                active.push(item);
                            }
                        });
                        _this.active = active;
                        _this.cached = items;
                    }
                }).finally(function () {
                    _this.$rootScope.$applyAsync();
                });
            };
            SprintsActiveController.prototype.reload = function () {
                this.$rootScope.$broadcast('RefreshParent');
            };
            return SprintsActiveController;
        })();
        controllers.SprintsActiveController = SprintsActiveController;
        var SprintItemController = (function () {
            function SprintItemController($rootScope, scrumBoards, sprint) {
                this.$rootScope = $rootScope;
                this.scrumBoards = scrumBoards;
                this.sprint = sprint;
                this.boards = [];
                this.init();
            }
            Object.defineProperty(SprintItemController.prototype, "requiresTesting", {
                get: function () { return !!this.sprint; },
                enumerable: true,
                configurable: true
            });
            SprintItemController.prototype.init = function () {
                var _this = this;
                this.scrumBoards.Boards.load().then(function (items) {
                    // Define the boards
                    _this.boards = [
                        // Scheduled Tasks
                        _this.firstOrDefaultBoard(models.TaskType.Default, function (type) { return {
                            Key: Guid.Empty,
                            TaskType: type,
                            Title: ControllerUtils.TaskDescription(type),
                            ProjectKey: _this.sprint ? _this.sprint.ProjectKey : null,
                            SprintKey: _this.sprint ? _this.sprint.Key : null,
                        }; }),
                        // In Progress Tasks
                        _this.firstOrDefaultBoard(models.TaskType.InProgress, function (type) { return {
                            Key: Guid.Empty,
                            TaskType: type,
                            Title: ControllerUtils.TaskDescription(type),
                            ProjectKey: _this.sprint ? _this.sprint.ProjectKey : null,
                            SprintKey: _this.sprint ? _this.sprint.Key : null,
                        }; }),
                        // Testing (if required)
                        _this.firstOrDefaultBoard(models.TaskType.Testing, function (type) { return !_this.requiresTesting ? null : {
                            Key: Guid.Empty,
                            TaskType: type,
                            Title: ControllerUtils.TaskDescription(type),
                            ProjectKey: _this.sprint ? _this.sprint.ProjectKey : null,
                            SprintKey: _this.sprint ? _this.sprint.Key : null,
                        }; }),
                        // Completed Tasks
                        _this.firstOrDefaultBoard(models.TaskType.Completed, function (type) { return {
                            Key: Guid.Empty,
                            TaskType: type,
                            Title: ControllerUtils.TaskDescription(type),
                            ProjectKey: _this.sprint ? _this.sprint.ProjectKey : null,
                            SprintKey: _this.sprint ? _this.sprint.Key : null,
                        }; }),
                    ];
                }).finally(function () {
                    _this.$rootScope.$applyAsync();
                });
            };
            SprintItemController.prototype.getColumnCss = function (size) {
                size = size || this.boards.length;
                if (12 < size) {
                    return 'col-md-1';
                }
                else {
                    return 'col-md-' + Math.floor(12 / size);
                }
            };
            SprintItemController.prototype.firstOrDefaultBoard = function (type, defaults) {
                var _this = this;
                var target = null;
                var sprintKey = this.sprint ? this.sprint.Key : null;
                var boards = this.scrumBoards.Boards.filterBySprint(sprintKey, type);
                if (boards.length) {
                    boards.forEach(function (item) {
                        if (target)
                            return;
                        if (item.TaskType == type) {
                            target = item;
                        }
                    });
                }
                if (!target) {
                    boards = defaults ? [defaults(type)] : [];
                    boards.forEach(function (item) {
                        if (item.Key == Guid.Empty) {
                            item.Key = Guid.New();
                            _this.scrumBoards.Boards.insert(item);
                        }
                        if (item.TaskType == type) {
                            target = item;
                        }
                    });
                }
                return target;
            };
            return SprintItemController;
        })();
        controllers.SprintItemController = SprintItemController;
        var SprintEditController = (function () {
            function SprintEditController(scrumBoards, sprint) {
                this.scrumBoards = scrumBoards;
                this.sprint = sprint;
            }
            return SprintEditController;
        })();
        controllers.SprintEditController = SprintEditController;
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
    .controller('DashboardController', ['ScrumBoardService', app.controllers.DashboardController])
    .controller('ProjectsController', ['$state', '$modal', 'ScrumBoardService', app.controllers.ProjectsController])
    .controller('ProjectListController', ['$rootScope', 'ScrumBoardService', app.controllers.ProjectListController])
    .controller('ProjectItemController', ['$rootScope', 'ScrumBoardService', 'project', app.controllers.ProjectItemController])
    .controller('SprintController', ['$rootScope', '$state', '$modal', 'ScrumBoardService', app.controllers.SprintController])
    .controller('SprintsActiveController', ['$rootScope', 'ScrumBoardService', app.controllers.SprintsActiveController])
    .controller('SprintListController', ['$rootScope', 'ScrumBoardService', 'project', app.controllers.SprintListController])
    .controller('SprintItemController', ['$rootScope', 'ScrumBoardService', 'sprint', app.controllers.SprintItemController])
    .controller('SprintEditController', ['ScrumBoardService', 'sprint', app.controllers.SprintEditController])
    .controller('BacklogController', ['$rootScope', '$state', '$modal', 'ScrumBoardService', app.controllers.BacklogController])
    .controller('BacklogListController', ['ScrumBoardService', app.controllers.BacklogListController])
    .controller('BacklogItemController', ['ScrumBoardService', 'board', app.controllers.BacklogItemController]);
angular.module('myScrumBoard.routes', [
    'ui.router',
])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        // Configure defaults
        $urlRouterProvider
            .when('', '/')
            .when('/', '/projects')
            .when('index.html', '/');
        // Configure client-side routing
        $stateProvider
            .state('default', {
            url: '/',
            /*
            views: {
                'main@': {
                    templateUrl: 'views/dashboard/main.tpl.html',
                    controller: 'DashboardController',
                    controllerAs: 'viewCtrl',
                },
            }
            */
            parent: 'projects',
            views: {
                'contents': {
                    templateUrl: 'views/projects/list.tpl.html',
                    controller: 'ProjectListController',
                    controllerAs: 'childCtrl',
                },
            },
        })
            .state('projects', {
            url: '/projects',
            abstract: true,
            views: {
                'main@': {
                    templateUrl: 'views/projects/main.tpl.html',
                    controller: 'ProjectsController',
                    controllerAs: 'viewCtrl',
                },
            }
        })
            .state('projects.list', {
            url: '',
            parent: 'projects',
            views: {
                'contents': {
                    templateUrl: 'views/projects/list.tpl.html',
                    controller: 'ProjectListController',
                    controllerAs: 'childCtrl',
                },
            },
        })
            .state('projects.item', {
            url: '/{projectKey:string}',
            parent: 'projects',
            views: {
                'contents': {
                    templateUrl: 'views/projects/item.tpl.html',
                    controller: 'ProjectItemController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                project: ['$stateParams', 'ScrumBoardService', function ($stateParams, svc) {
                        return $stateParams.projectKey ? svc.Projects.findByKey($stateParams.projectKey) : null;
                    }]
            },
        })
            .state('sprints', {
            url: '/sprints',
            abstract: true,
            views: {
                'main@': {
                    templateUrl: 'views/sprints/main.tpl.html',
                    controller: 'SprintController',
                    controllerAs: 'viewCtrl',
                },
            }
        })
            .state('sprints.active', {
            url: '',
            parent: 'sprints',
            views: {
                'contents': {
                    templateUrl: 'views/sprints/active.tpl.html',
                    controller: 'SprintsActiveController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                project: ['$stateParams', 'ScrumBoardService', function ($stateParams, svc) {
                        return $stateParams.projectKey ? svc.Projects.findByKey($stateParams.projectKey) : null;
                    }]
            },
        })
            .state('sprints.list', {
            url: '^/{projectKey:string}/sprints',
            parent: 'sprints',
            views: {
                'contents': {
                    templateUrl: 'views/sprints/list.tpl.html',
                    controller: 'SprintListController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                project: ['$stateParams', 'ScrumBoardService', function ($stateParams, svc) {
                        return $stateParams.projectKey ? svc.Projects.findByKey($stateParams.projectKey) : null;
                    }],
            },
        })
            .state('sprints.item', {
            url: '/{key:string}',
            parent: 'sprints',
            views: {
                'contents': {
                    templateUrl: 'views/sprints/item.tpl.html',
                    controller: 'SprintItemController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                sprint: ['$stateParams', 'ScrumBoardService', function ($stateParams, svc) {
                        return $stateParams.key ? svc.Sprints.findByKey($stateParams.key) : null;
                    }]
            },
        })
            .state('sprints.edit', {
            url: '/{key:string}/edit',
            parent: 'sprints',
            views: {
                'contents': {
                    templateUrl: 'views/sprints/edit.tpl.html',
                    controller: 'SprintEditController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                sprint: ['$stateParams', 'ScrumBoardService', function ($stateParams, svc) {
                        return $stateParams.key ? svc.Sprints.findByKey($stateParams.key) : null;
                    }]
            },
        })
            .state('backlogs', {
            url: '/backlogs',
            abstract: true,
            views: {
                'main@': {
                    templateUrl: 'views/backlogs/main.tpl.html',
                    controller: 'BacklogController',
                    controllerAs: 'viewCtrl',
                },
            }
        })
            .state('backlogs.list', {
            url: '',
            parent: 'backlogs',
            views: {
                'contents': {
                    templateUrl: 'views/backlogs/list.tpl.html',
                    controller: 'BacklogListController',
                    controllerAs: 'childCtrl',
                },
            },
        })
            .state('backlogs.item', {
            url: '/{key:string}',
            parent: 'backlogs',
            views: {
                'contents': {
                    templateUrl: 'views/backlogs/item.tpl.html',
                    controller: 'BacklogItemController',
                    controllerAs: 'childCtrl',
                },
            },
            resolve: {
                board: ['$stateParams', 'ScrumBoardService', function ($stateParams, svc) {
                        return $stateParams.key ? svc.Boards.findByKey($stateParams.key) : null;
                    }]
            },
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
