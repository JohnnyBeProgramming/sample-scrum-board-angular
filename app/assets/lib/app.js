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
            var BoardRepository = (function () {
                function BoardRepository($q) {
                    this.$q = $q;
                }
                return BoardRepository;
            })();
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
            var TaskRepository = (function () {
                function TaskRepository($q) {
                    this.$q = $q;
                }
                return TaskRepository;
            })();
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
/// <reference path="services/ScrumBoardService.ts" />
/// <reference path="directives/directives.ts" />
angular.module('myScrumBoard.common', [
    'myScrumBoard.directives',
])
    .service('ScrumBoardService', ['$q', app.common.services.ScrumBoardService]);
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
                },
            }
        })
            .state('projects', {
            url: '/projects',
            views: {
                'main@': {
                    templateUrl: 'views/projects/main.tpl.html',
                },
            }
        })
            .state('sprints', {
            url: '/sprints',
            views: {
                'main@': {
                    templateUrl: 'views/sprints/main.tpl.html',
                },
            }
        })
            .state('backlogs', {
            url: '/backlogs',
            views: {
                'main@': {
                    templateUrl: 'views/backlogs/main.tpl.html',
                },
            }
        });
    }]);
/// <reference path="imports.d.ts" />
/// <reference path="data/module.ts" />
/// <reference path="common/module.ts" />
/// <reference path="routes.ts" />
angular.module('myScrumBoard', [
    'myScrumBoard.common',
    'myScrumBoard.routes',
    'myScrumBoard.data',
])
    .run(['$rootScope', 'ScrumBoardState', function ($rootScope, ScrumBoardState) {
        console.debug('Starting application...');
        $rootScope.myApp = {
            state: ScrumBoardState,
        };
    }]);
