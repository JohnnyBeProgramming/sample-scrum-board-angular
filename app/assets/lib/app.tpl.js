angular.module('myScrumBoard.templates', ['views/backlogs/item.tpl.html', 'views/backlogs/list.tpl.html', 'views/backlogs/main.tpl.html', 'views/backlogs/new.tpl.html', 'views/common/body.tpl.html', 'views/common/footer.tpl.html', 'views/common/heading.tpl.html', 'views/common/toolbar.tpl.html', 'views/dashboard/main.tpl.html', 'views/projects/edit.tpl.html', 'views/projects/item.tpl.html', 'views/projects/list.tpl.html', 'views/projects/main.tpl.html', 'views/sprints/main.tpl.html']);

angular.module('views/backlogs/item.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/backlogs/item.tpl.html',
    '<div>\n' +
    '    <span class="pull-right">\n' +
    '        <a class="btn btn-xs btn-default" href="" ng-click="viewCtrl.cancel()">Cancel</a>\n' +
    '        <a class="btn btn-xs btn-primary" href="" ng-click="viewCtrl.update(viewCtrl.current)">Update</a>\n' +
    '    </span>\n' +
    '    <h3>\n' +
    '        {{ item.Title || \'Project Backlog\' }}\n' +
    '        <small>Large Scale Project</small>\n' +
    '    </h3>\n' +
    '    <div class="row contained">\n' +
    '        <div class="col-md-12" ng-init="item = viewCtrl.current">\n' +
    '            <div class="board">\n' +
    '                <div class="row">\n' +
    '                    <div class="col-md-8">\n' +
    '                        <div ng-if="viewCtrl.newTask">\n' +
    '                            <a href="" ng-click="viewCtrl.cancelTask()" class="pull-right ctrl"><i class="fa fa-times"></i></a>\n' +
    '                            <a href="" ng-click="viewCtrl.updateTask(viewCtrl.newTask)" class="pull-right ctrl"><i class="fa fa-save"></i></a>\n' +
    '                            <h4>\n' +
    '                                <i class="fa fa-file-o"></i> \n' +
    '                                <input type="text" tabindex="1" class="input-no-border" placeholder="Attach New Task" ng-model="viewCtrl.newTask.Title" />\n' +
    '                            </h4>\n' +
    '                            <p>\n' +
    '                                <textarea tabindex="2" class="free-text" rows="5" ng-model="viewCtrl.newTask.Description"></textarea>\n' +
    '                            </p>\n' +
    '                        </div>\n' +
    '                        <div>\n' +
    '                            <a href="" ng-click="viewCtrl.addTask()" ng-if="!viewCtrl.newTask" class="pull-right ctrl"><i class="fa fa-plus"></i></a>\n' +
    '                            <h4>\n' +
    '                                <i class="fa fa-tags"></i> Unassigned Tasks\n' +
    '                            </h4>\n' +
    '                            <div class="tile" ng-repeat="task in viewCtrl.scrumBoards.Tasks.filter(viewCtrl.current.Key)">\n' +
    '                                <h5>{{ task.Title }}</h5>\n' +
    '                                <p>\n' +
    '                                    {{ task.Description }}\n' +
    '                                </p>\n' +
    '                            </div>\n' +
    '                            <div class="tile inactive">\n' +
    '                                <p>\n' +
    '                                    Add Task\n' +
    '                                </p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="col-md-4">\n' +
    '                        <div>\n' +
    '                            <a href="" ng-click="viewCtrl.cancel()" class="pull-right ctrl"><i class="fa fa-trash"></i></a>\n' +
    '                            <h4>\n' +
    '                                <i class="fa fa-file-o"></i> Actions Menu\n' +
    '                            </h4>\n' +
    '                            <div class="thumbnail pad-aside">\n' +
    '                                <div class="btn-group-vertical horz-fill" role="group" aria-label="...">\n' +
    '                                    <a ng-click="viewCtrl.addTask()" ng-disabled="viewCtrl.newTask" class="btn btn-primary horz-fill">Add New Task</a>\n' +
    '                                    <a ng-click="viewCtrl.addGroup()" class="btn btn-info horz-fill disabled">Create Group</a>\n' +
    '                                    <a ng-click="viewCtrl.inviteUser()" class="btn btn-default horz-fill disabled">Invite User</a>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div>\n' +
    '                            <h4>\n' +
    '                                <i class="fa fa-cog"></i> Linked Resources\n' +
    '                            </h4>\n' +
    '                            <div class="thumbnail pad-aside">\n' +
    '                                <form class="form-horizontal">\n' +
    '                                    <div class="form-group">\n' +
    '                                        <label for="lnkProject" class="col-sm-2 control-label">Project</label>\n' +
    '                                        <div class="col-sm-10">\n' +
    '                                            <select id="lnkProject" class="form-control input-sm" ng-model="viewCtrl.current.ProjectKey">\n' +
    '                                                <option value=""> - Select a Project -</option>\n' +
    '                                                <option value="{{ opt.Key }}" ng-repeat="opt in viewCtrl.scrumBoards.Projects.list()">{{ opt.Title }}</option>\n' +
    '                                            </select>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                    <div class="form-group" ng-if="viewCtrl.current.ProjectKey">\n' +
    '                                        <label for="lnkSprint" class="col-sm-2 control-label">Sprint</label>\n' +
    '                                        <div class="col-sm-10">\n' +
    '                                            <select id="lnkSprint" class="form-control input-sm">\n' +
    '                                                <option> - No Sprint Selected - </option>\n' +
    '                                            </select>\n' +
    '                                        </div>\n' +
    '                                    </div>\n' +
    '                                </form>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/backlogs/list.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/backlogs/list.tpl.html',
    '<div>\n' +
    '    <span class="pull-right"></span>\n' +
    '    <h3>\n' +
    '        Project Backlogs\n' +
    '        <small>17 Tasks(s), 2 Groups</small>\n' +
    '    </h3>\n' +
    '    <div class="row contained">\n' +
    '        <div class="col-md-3" ng-repeat="item in viewCtrl.boards">\n' +
    '            <div class="board">\n' +
    '                <a href="" class="pull-right"><i class="fa fa-arrows"></i></a>\n' +
    '                <h4>\n' +
    '                    <a href="" ng-click="viewCtrl.openBoard(item)">\n' +
    '                        <i class="fa fa-sticky-note-o"></i> {{ item.Title || \'Project Backlog\' }}\n' +
    '                    </a>\n' +
    '                </h4>\n' +
    '                <div class="tile" ng-repeat="task in viewCtrl.scrumBoards.Tasks.filter(item.Key)">\n' +
    '                    <h5>{{ task.Title }}</h5>\n' +
    '                    <p>\n' +
    '                        {{ task.Description }}\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '                <div class="tile add">\n' +
    '                    <a href="">\n' +
    '                        <i class="fa fa-plus"></i> Add Task\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/backlogs/main.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/backlogs/main.tpl.html',
    '<div class="container">\n' +
    '    <div class="app-caption">\n' +
    '        <h2>\n' +
    '            <i class="fa fa-sticky-note"></i> Backlogs\n' +
    '            <small>&raquo; <a href="" ng-click="state.pilot=1">Show All Projects</a></small>\n' +
    '        </h2>\n' +
    '        <a class="btn btn-primary" \n' +
    '           ng-click="viewCtrl.createNew()"\n' +
    '           ng-disabled="viewCtrl.tabIndex == 2">Create New Backlog</a>\n' +
    '    </div>\n' +
    '    <div class="app-panel" ng-switch="viewCtrl.tabIndex">\n' +
    '        <div ng-switch-default>\n' +
    '            <div ng-include="\'/views/backlogs/list.tpl.html\'"></div>\n' +
    '        </div>\n' +
    '        <div ng-switch-when="1">\n' +
    '            <div ng-include="\'/views/backlogs/item.tpl.html\'"></div>\n' +
    '        </div>\n' +
    '        <div ng-switch-when="2">\n' +
    '            <div ng-include="\'/views/backlogs/new.tpl.html\'"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/backlogs/new.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/backlogs/new.tpl.html',
    '<div>\n' +
    '    <span class="pull-right"></span>\n' +
    '    <h3>\n' +
    '        Create New Backlog\n' +
    '        <small>6 User(s), 12 Stories, 91 points</small>\n' +
    '    </h3>\n' +
    '    <div class="row contained">\n' +
    '        <div class="col-md-12">\n' +
    '            <form class="board">\n' +
    '                <div class="form-group">\n' +
    '                    <label for="txtProject">Link to Project</label>\n' +
    '                    <select class="form-control" id="txtProject" ng-model="viewCtrl.current.ProjectKey">\n' +
    '                        <option value=""> - Select a Project -</option>\n' +
    '                        <option value="{{ opt.Key }}" ng-repeat="opt in viewCtrl.scrumBoards.Projects.list()">{{ opt.Title }}</option>\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '                <div class="form-group" ng-if="viewCtrl.current.ProjectKey">\n' +
    '                    <label for="txtSprint">Link to Sprint</label>\n' +
    '                    <select class="form-control" id="txtSprint" ng-model="viewCtrl.current.SprintKey">\n' +
    '                        <option value=""> - No Sprint Selected -</option>\n' +
    '                        <option value="{{ opt.Key }}" xng-repeat="opt in viewCtrl.scrumBoards.Projects.list()">{{ opt.Title }}</option>\n' +
    '                    </select>\n' +
    '                </div>\n' +
    '                <p>\n' +
    '                    <a ng-click="viewCtrl.cancel()" class="btn btn-default">Cancel</a>\n' +
    '                    <a ng-click="viewCtrl.insert(viewCtrl.current)" class="btn btn-primary"\n' +
    '                            ng-disabled="!viewCtrl.current.ProjectKey && !viewCtrl.current.SprintKey">\n' +
    '                        Submit\n' +
    '                    </a>\n' +
    '                </p>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/common/body.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/body.tpl.html',
    '<div class="app-body">\n' +
    '    <div ui-view="main"></div>\n' +
    '</div>');
}]);

angular.module('views/common/footer.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/footer.tpl.html',
    '<div class="app-footer">\n' +
    '    This is a Sample AngularJS application built for demo purposes only...\n' +
    '</div>');
}]);

angular.module('views/common/heading.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/heading.tpl.html',
    '<pre>Heading</pre>');
}]);

angular.module('views/common/toolbar.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/toolbar.tpl.html',
    '<nav class="navbar navbar-default">\n' +
    '    <div class="container-fluid">\n' +
    '        <!-- Brand and toggle get grouped for better mobile display -->\n' +
    '        <div class="navbar-header">\n' +
    '            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-toolbar-menu" aria-expanded="false">\n' +
    '                <span class="sr-only">Toggle navigation</span>\n' +
    '                <span class="icon-bar"></span>\n' +
    '                <span class="icon-bar"></span>\n' +
    '                <span class="icon-bar"></span>\n' +
    '            </button>\n' +
    '            <a class="navbar-brand" href="" ui-sref="default">\n' +
    '                <i class="fa fa-home"></i> Scrum Boards\n' +
    '            </a>\n' +
    '        </div>\n' +
    '\n' +
    '        <!-- Collect the nav links, forms, and other content for toggling -->\n' +
    '        <div class="collapse navbar-collapse" id="app-toolbar-menu">\n' +
    '            <ul class="nav navbar-nav">\n' +
    '                <li ui-sref-active="active">\n' +
    '                    <a href="" ui-sref="projects">Projects</a>\n' +
    '                </li>\n' +
    '                <li ui-sref-active="active">\n' +
    '                    <a href="" ui-sref="sprints">Sprints</a>\n' +
    '                </li>\n' +
    '                <li ui-sref-active="active">\n' +
    '                    <a href="" ui-sref="backlogs">Backlogs</a>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '            <form class="navbar-form navbar-right hidden" role="search">\n' +
    '                <div class="form-group">\n' +
    '                    <input type="text" class="form-control" placeholder="Search">\n' +
    '                </div>\n' +
    '                <button type="submit" class="btn btn-default">Submit</button>\n' +
    '            </form>\n' +
    '            <ul class="nav navbar-nav navbar-right">\n' +
    '                <li class="dropdown disabled">\n' +
    '                    <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">\n' +
    '                        <i class="fa fa-user"></i> Username <span class="caret"></span>\n' +
    '                    </a>\n' +
    '                    <ul class="dropdown-menu">\n' +
    '                        <li><a href="">Profile</a></li>\n' +
    '                        <li><a href="">Accounts</a></li>\n' +
    '                        <li><a href="" class="disabled">Administration</a></li>\n' +
    '                        <li role="separator" class="divider"></li>\n' +
    '                        <li><a href="">Sign Out</a></li>\n' +
    '                    </ul>\n' +
    '                </li>\n' +
    '            </ul>\n' +
    '        </div><!-- /.navbar-collapse -->\n' +
    '    </div><!-- /.container-fluid -->\n' +
    '</nav>');
}]);

angular.module('views/dashboard/main.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/dashboard/main.tpl.html',
    '<div class="container">\n' +
    '    <div class="app-caption">\n' +
    '        <h2>\n' +
    '            <i class="fa fa-home"></i> Dashboard\n' +
    '            <small>&raquo; <a href="" ng-click="state.pilot=1">Show All Projects</a></small>\n' +
    '        </h2>\n' +
    '        <a class="btn btn-primary" ng-click="">Add Item</a>\n' +
    '    </div>\n' +
    '    <div class="app-panel">\n' +
    '        <div class="row">\n' +
    '            <div class="col-md-6">\n' +
    '                <div class="thumbnail">\n' +
    '                    <h3>Tasks <small>This Week</small></h3>\n' +
    '                    <p>\n' +
    '                        <b><i class="fa fa-user"></i> Urgent Priority</b>\n' +
    '                        <ul>\n' +
    '                            <li>Task Item #11</li>\n' +
    '                        </ul>\n' +
    '                    </p>\n' +
    '                    <p>\n' +
    '                        <b><i class="fa fa-user"></i> Medium Priority</b>\n' +
    '                        <ul>\n' +
    '                            <li>Task Item #11</li>\n' +
    '                            <li>Task Item #12</li>\n' +
    '                            <li>Task Item #13</li>\n' +
    '                        </ul>\n' +
    '                    </p>\n' +
    '                    <p>\n' +
    '                        <b><i class="fa fa-user"></i> Low Priority</b>\n' +
    '                        <ul>\n' +
    '                            <li>Task Item #11</li>\n' +
    '                            <li>Task Item #12</li>\n' +
    '                            <li>Task Item #13</li>\n' +
    '                            <li>Task Item #14</li>\n' +
    '                            <li>Task Item #15</li>\n' +
    '                            <li>Task Item #16</li>\n' +
    '                            <li>Task Item #17</li>\n' +
    '                        </ul>\n' +
    '                    </p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="col-md-6">\n' +
    '                <div class="thumbnail" style="min-height: 200px;">\n' +
    '                    <h3>Sprint #123 <small>Burndown Graph</small></h3>\n' +
    '                </div>\n' +
    '                <div class="thumbnail" style="min-height: 160px;">\n' +
    '                    <h3>Recent Activity <small>All Projects</small></h3>\n' +
    '                    <ul>\n' +
    '                        <li>Comment from user #11</li>\n' +
    '                        <li>Comment from user #12</li>\n' +
    '                        <li>Comment from user #13</li>\n' +
    '                        <li>Comment from user #14</li>\n' +
    '                        <li>Comment from user #15</li>\n' +
    '                        <li>Comment from user #16</li>\n' +
    '                        <li>Comment from user #17</li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/projects/edit.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/projects/edit.tpl.html',
    '<div>\n' +
    '    <span class="pull-right">\n' +
    '        <a class="btn btn-primary" href="" ng-click="state.pilot=1">Save</a>\n' +
    '    </span>\n' +
    '    <br />\n' +
    '    <h3>\n' +
    '        Large Scale Project\n' +
    '        <small>6 User(s), 12 Stories, 91 points</small>\n' +
    '    </h3>\n' +
    '    <div class="row contained">\n' +
    '        <div class="col-md-4"><div class="board">...</div></div>\n' +
    '        <div class="col-md-4"><div class="board">...</div></div>\n' +
    '        <div class="col-md-4"><div class="board">...</div></div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/projects/item.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/projects/item.tpl.html',
    '<div>\n' +
    '    <span class="pull-right">\n' +
    '        <a class="btn btn-default" href="" ng-click="state.pilot=2">Edit</a>\n' +
    '        <a class="btn btn-primary" href="" ng-click="state.pilot=0">Done</a>\n' +
    '    </span>\n' +
    '    <br />\n' +
    '    <h3>\n' +
    '        Large Scale Project\n' +
    '        <small>6 User(s), 12 Stories, 91 points</small>\n' +
    '    </h3>\n' +
    '    <div class="row contained">\n' +
    '        <div class="col-md-2"><div class="board">Sprint 1</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 2</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 3</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 4</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 5</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 6</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 7</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 8</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 9</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Sprint 10</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Testing</div></div>\n' +
    '        <div class="col-md-2"><div class="board">Backlog</div></div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/projects/list.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/projects/list.tpl.html',
    '<div>\n' +
    '    <p>\n' +
    '        <h3>Simple Project Name <small>1 User(s), 3 Stories, 12 points</small></h3>\n' +
    '        <div class="row contained">\n' +
    '            <div class="col-md-3 btn btn-default">Previous (2 sprints)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Current (4 of 12 points)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Upcomming (2 sprints)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Backlog (4 items)</div>\n' +
    '        </div>\n' +
    '    </p>\n' +
    '    <p>\n' +
    '        <h3>Large Scale Project <small>1 User(s), 3 Stories, 12 points</small></h3>\n' +
    '        <div class="row contained">\n' +
    '            <div class="col-md-3 btn btn-default">Previous (2 sprints)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Current (4 of 12 points)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Upcomming (2 sprints)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Backlog (4 items)</div>\n' +
    '        </div>\n' +
    '    </p>\n' +
    '    <p>\n' +
    '        <h3>Future Dated Project <small>1 User(s), 3 Stories, 12 points</small></h3>\n' +
    '        <div class="row contained">\n' +
    '            <div class="col-md-3 btn btn-default">Previous (2 sprints)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Current (4 of 12 points)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Upcomming (2 sprints)</div>\n' +
    '            <div class="col-md-3 btn btn-default">Backlog (4 items)</div>\n' +
    '        </div>\n' +
    '    </p>\n' +
    '</div>');
}]);

angular.module('views/projects/main.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/projects/main.tpl.html',
    '<div class="container">\n' +
    '    <div class="app-caption">\n' +
    '        <h2>\n' +
    '            <i class="fa fa-tags"></i> Projects\n' +
    '            <small>&raquo; <a href="" ng-click="state.pilot=1">Show All Projects</a></small>\n' +
    '        </h2>\n' +
    '        <a class="btn btn-primary" ng-click="state.pilot = 2">New Project</a>\n' +
    '    </div>\n' +
    '    <div class="app-panel" ng-switch="state.pilot">\n' +
    '        <div ng-switch-default>\n' +
    '            <div ng-include="\'/views/projects/list.tpl.html\'"></div>\n' +
    '        </div>\n' +
    '        <div ng-switch-when="1">\n' +
    '            <div ng-include="\'/views/projects/item.tpl.html\'"></div>\n' +
    '        </div>\n' +
    '        <div ng-switch-when="2">\n' +
    '            <div ng-include="\'/views/projects/edit.tpl.html\'"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '</div>');
}]);

angular.module('views/sprints/main.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/sprints/main.tpl.html',
    '<div class="container">\n' +
    '    <div class="app-caption">\n' +
    '        <h2>\n' +
    '            <i class="fa fa-tag"></i> Sprints\n' +
    '            <small>&raquo; <a href="" ng-click="state.pilot=1">Show All Projects</a></small>\n' +
    '        </h2>\n' +
    '        <a class="btn btn-success" ng-click="">Complete Current</a>\n' +
    '        <a class="btn btn-primary" ng-click="">New Sprint</a>\n' +
    '    </div>\n' +
    '    <div class="app-panel">\n' +
    '        ...\n' +
    '    </div>\n' +
    '</div>');
}]);
