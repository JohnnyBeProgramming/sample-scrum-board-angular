angular.module('myScrumBoard.templates', ['views/backlogs/item.tpl.html', 'views/backlogs/list.tpl.html', 'views/backlogs/main.tpl.html', 'views/common/body.tpl.html', 'views/common/footer.tpl.html', 'views/common/heading.tpl.html', 'views/common/modal/addBacklogs.tpl.html', 'views/common/modal/addBoard.tpl.html', 'views/common/modal/addProject.tpl.html', 'views/common/modal/addSprint.tpl.html', 'views/common/modal/addTask.tpl.html', 'views/common/toolbar.tpl.html', 'views/dashboard/main.tpl.html', 'views/projects/edit.tpl.html', 'views/projects/item.tpl.html', 'views/projects/list.tpl.html', 'views/projects/main.tpl.html', 'views/sprints/active.tpl.html', 'views/sprints/edit.tpl.html', 'views/sprints/item.tpl.html', 'views/sprints/list.tpl.html', 'views/sprints/main.tpl.html']);

angular.module('views/backlogs/item.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/backlogs/item.tpl.html',
    '<div>\n' +
    '    <span class="pull-right">\n' +
    '        <a class="btn btn-xs btn-default" href="" ng-click="viewCtrl.cancel()">Cancel</a>\n' +
    '        <a class="btn btn-xs btn-primary" href="" ng-click="viewCtrl.update(childCtrl.board)">Update</a>\n' +
    '    </span>\n' +
    '    <div ng-if="!childCtrl.board">\n' +
    '        <em>Board Not Found....</em>\n' +
    '    </div>\n' +
    '    <div ng-if="childCtrl.board">\n' +
    '        <h3>\n' +
    '            {{ childCtrl.board.Title || \'Project Backlog\' }}\n' +
    '            <small>Large Scale Project</small>\n' +
    '        </h3>\n' +
    '        <div class="row contained">\n' +
    '            <div class="col-md-12">\n' +
    '                <div class="board drop-target" drop-action="viewCtrl.moveTask(item.Key, data)">\n' +
    '                    <div class="row">\n' +
    '                        <div class="col-md-8">\n' +
    '                            <div>\n' +
    '                                <a href="" ng-click="viewCtrl.addTaskToBoard(childCtrl.board)" ng-if="!viewCtrl.newTask" class="pull-right ctrl"><i class="fa fa-plus"></i></a>\n' +
    '                                <h4>\n' +
    '                                    <i class="fa fa-tags"></i> Unassigned Tasks\n' +
    '                                </h4>\n' +
    '                                <ul class="drop-list">\n' +
    '                                    <li class="drag-item" drag-data="task"\n' +
    '                                        ng-dblclick="viewCtrl.editTask(task)"\n' +
    '                                        ng-repeat="task in viewCtrl.scrumBoards.Tasks.filter(childCtrl.board.Key)">\n' +
    '                                        <div class="tile">\n' +
    '                                            <h5>{{ task.Title }}</h5>\n' +
    '                                            <p>\n' +
    '                                                {{ task.Description }}\n' +
    '                                            </p>\n' +
    '                                        </div>\n' +
    '                                    </li>\n' +
    '                                </ul>       \n' +
    '                                <a href="" ng-click="viewCtrl.addTaskToBoard(childCtrl.board)" class="tile add">\n' +
    '                                    <i class="fa fa-plus"></i> Add Task\n' +
    '                                </a>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4">\n' +
    '                            <div>\n' +
    '                                <a href="" ng-click="viewCtrl.cancel()" class="pull-right ctrl"><i class="fa fa-trash"></i></a>\n' +
    '                                <h4>\n' +
    '                                    <i class="fa fa-file-o"></i> Actions Menu\n' +
    '                                </h4>\n' +
    '                                <div class="thumbnail pad-aside">\n' +
    '                                    <div class="btn-group-vertical horz-fill" role="group" aria-label="...">\n' +
    '                                        <a ng-click="viewCtrl.addTaskToBoard(childCtrl.board)" ng-disabled="viewCtrl.newTask" class="btn btn-primary horz-fill">Add New Task</a>\n' +
    '                                        <a ng-click="viewCtrl.addGroup()" class="btn btn-info horz-fill disabled">Create Group</a>\n' +
    '                                        <a ng-click="viewCtrl.inviteUser()" class="btn btn-default horz-fill disabled">Invite User</a>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div>\n' +
    '                                <h4>\n' +
    '                                    <i class="fa fa-cog"></i> Linked Resources\n' +
    '                                </h4>\n' +
    '                                <div class="thumbnail pad-aside">\n' +
    '                                    <form class="form-horizontal">\n' +
    '                                        <div class="form-group">\n' +
    '                                            <label for="lnkProject" class="col-sm-2 control-label">Project</label>\n' +
    '                                            <div class="col-sm-10">\n' +
    '                                                <select id="lnkProject" class="form-control input-sm" ng-model="childCtrl.board.ProjectKey">\n' +
    '                                                    <option value=""> - Select a Project -</option>\n' +
    '                                                    <option value="{{ opt.Key }}" ng-repeat="opt in viewCtrl.scrumBoards.Projects.list()">{{ opt.Title }}</option>\n' +
    '                                                </select>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                        <div class="form-group" ng-if="childCtrl.board.ProjectKey">\n' +
    '                                            <label for="lnkSprint" class="col-sm-2 control-label">Sprint</label>\n' +
    '                                            <div class="col-sm-10">\n' +
    '                                                <select id="lnkSprint" class="form-control input-sm">\n' +
    '                                                    <option> - No Sprint Selected - </option>\n' +
    '                                                </select>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                    </form>\n' +
    '                                </div>\n' +
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
    '            <div class="board drop-target"\n' +
    '                 drop-action="viewCtrl.moveTask(item.Key, data)">\n' +
    '                <a href="" class="pull-right"><i class="fa fa-arrows"></i></a>\n' +
    '                <h4>\n' +
    '                    <a ui-sref="backlogs.item({ key: item.Key })">\n' +
    '                        <i class="fa fa-sticky-note-o"></i> {{ item.Title || \'Project Backlog\' }}\n' +
    '                    </a>\n' +
    '                </h4>\n' +
    '                <ul class="drop-list">\n' +
    '                    <li class="drag-item" drag-data="task"\n' +
    '                        ng-dblclick="viewCtrl.editTask(task)"\n' +
    '                        ng-repeat="task in viewCtrl.getTasks(item)">\n' +
    '                        <div class="tile">\n' +
    '                            <h5>{{ task.Title }}</h5>\n' +
    '                            <p>\n' +
    '                                {{ task.Description }}\n' +
    '                            </p>\n' +
    '                        </div>\n' +
    '                    </li>\n' +
    '                </ul>                \n' +
    '                <a href="" ng-click="viewCtrl.addTaskToBoard(item)" class="tile add">\n' +
    '                    <i class="fa fa-plus"></i> Add Task\n' +
    '                </a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-3">\n' +
    '            <a href="" ng-click="viewCtrl.createNew()" class="board add">\n' +
    '                <i class="fa fa-plus"></i> New Backlog\n' +
    '            </a>\n' +
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
    '            <small>&raquo; <a href="" ng-click="">Show All Projects</a></small>\n' +
    '        </h2>\n' +
    '        <a class="btn btn-primary"\n' +
    '           ng-click="viewCtrl.createNew()">\n' +
    '            Create New Backlog\n' +
    '        </a>\n' +
    '    </div>\n' +
    '    <div class="app-panel">\n' +
    '        <ui-view name="contents">\n' +
    '        </ui-view>\n' +
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

angular.module('views/common/modal/addBacklogs.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/modal/addBacklogs.tpl.html',
    '<div class="app-modal-body">\n' +
    '    <div class="modal-header">\n' +
    '        <h3 class="modal-title">\n' +
    '            <i class="fa fa-tag"></i> Add From Backlog\n' +
    '        </h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body" ng-init="modalCtrl.toggle = {};">\n' +
    '        <div class="inactive-fill"\n' +
    '             ng-if="!modalCtrl.boards.length && !modalCtrl.other.length">\n' +
    '            <em>No Backlogs Available....</em>\n' +
    '        </div>\n' +
    '        <div class="backlog-group"\n' +
    '             ng-if="modalCtrl.boards.length"\n' +
    '             ng-init="modalCtrl.toggle[board.Key] = true"\n' +
    '             ng-repeat="board in modalCtrl.boards">\n' +
    '            <h3 class="group-title" ng-click="modalCtrl.toggle[board.Key] = !modalCtrl.toggle[board.Key]">\n' +
    '                <i class="fa fa-sticky-note"></i>\n' +
    '                {{ board.Title || \'Backloags\' }}\n' +
    '            </h3>\n' +
    '            <div class="group-body" ng-if="modalCtrl.toggle[board.Key]">\n' +
    '                <a class="task"\n' +
    '                   ng-repeat="task in modalCtrl.getBoardTasks(board)"\n' +
    '                   ng-click="modalCtrl.selected[task.Key] = !modalCtrl.selected[task.Key]"\n' +
    '                   ng-class="{ \'selected\': modalCtrl.selected[task.Key] }">\n' +
    '                    <i class="fa"\n' +
    '                       ng-class="{ \'fa-check-square-o\': modalCtrl.selected[task.Key], \'fa-square-o\':!modalCtrl.selected[task.Key] }"></i>\n' +
    '                    <strong>\n' +
    '                        {{ task.Title }}\n' +
    '                    </strong>\n' +
    '                </a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="backlog-group"\n' +
    '             ng-if="modalCtrl.other.length">\n' +
    '            <h3 class="group-title" ng-click="modalCtrl.otherHidden = !modalCtrl.otherHidden">\n' +
    '                <i class="fa fa-sticky-note"></i>\n' +
    '                Other Backlog Tasks\n' +
    '            </h3>\n' +
    '            <div class="group-body"\n' +
    '                 ng-if="!modalCtrl.otherHidden">\n' +
    '                <a class="task"\n' +
    '                   ng-repeat="task in modalCtrl.other"\n' +
    '                   ng-click="modalCtrl.selected[task.Key] = !modalCtrl.selected[task.Key]"\n' +
    '                   ng-class="{ \'selected\': modalCtrl.selected[task.Key] }">\n' +
    '                    <i class="fa"\n' +
    '                       ng-class="{ \'fa-check-square-o\': modalCtrl.selected[task.Key], \'fa-square-o\':!modalCtrl.selected[task.Key] }"></i>\n' +
    '                    <strong>\n' +
    '                        {{ task.Title }}\n' +
    '                    </strong>\n' +
    '                </a>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button type="button" tabindex="4"\n' +
    '                class="btn btn-default"\n' +
    '                ng-click="cancel()">\n' +
    '            Cancel\n' +
    '        </button>\n' +
    '        <button type="button" tabindex="3"\n' +
    '                class="btn btn-primary"\n' +
    '                ng-click="submit()"\n' +
    '                ng-disabled="!modalCtrl.getSelected().length">\n' +
    '            Import\n' +
    '        </button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/common/modal/addBoard.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/modal/addBoard.tpl.html',
    '<div class="app-modal-body">\n' +
    '    <div class="modal-header">\n' +
    '        <h3 class="modal-title">\n' +
    '            <i class="fa fa-sticky-note-o"></i> Create New Board\n' +
    '        </h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <p>\n' +
    '            <label>Board Title</label>\n' +
    '            <input id="boardTitle" \n' +
    '                   tabindex="0" type="text" \n' +
    '                   class="input-no-border horz-fill"\n' +
    '                   placeholder="New Board Title"\n' +
    '                   ng-model="data.Title" />\n' +
    '        </p>\n' +
    '        <p>\n' +
    '            <label>Description</label>\n' +
    '            <textarea id="boardDesc" \n' +
    '                      tabindex="2" rows="5"\n' +
    '                      class="free-text"\n' +
    '                      ng-model="data.Description"></textarea>\n' +
    '        </p>\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button type="button" tabindex="4"\n' +
    '                class="btn btn-default" \n' +
    '                ng-click="cancel()">\n' +
    '            Cancel\n' +
    '        </button>\n' +
    '        <button type="button" tabindex="3"\n' +
    '                class="btn btn-primary" \n' +
    '                ng-click="submit()"\n' +
    '                ng-disabled="!data.Title">\n' +
    '            Create\n' +
    '        </button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/common/modal/addProject.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/modal/addProject.tpl.html',
    '<div class="app-modal-body">\n' +
    '    <div class="modal-header">\n' +
    '        <h3 class="modal-title">\n' +
    '            <i class="fa fa-tags"></i> Create New Project\n' +
    '        </h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <p>\n' +
    '            <label>Project Name</label>\n' +
    '            <input id="projectTitle" \n' +
    '                   tabindex="0" type="text" \n' +
    '                   class="input-no-border horz-fill"\n' +
    '                   placeholder="New Project Name"\n' +
    '                   ng-model="data.Title" />\n' +
    '        </p>\n' +
    '        <p>\n' +
    '            <label>Description</label>\n' +
    '            <textarea id="projectDesc" \n' +
    '                      tabindex="2" rows="5"\n' +
    '                      class="free-text"\n' +
    '                      ng-model="data.Description"></textarea>\n' +
    '        </p>\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button type="button" tabindex="4"\n' +
    '                class="btn btn-default" \n' +
    '                ng-click="cancel()">\n' +
    '            Cancel\n' +
    '        </button>\n' +
    '        <button type="button" tabindex="3"\n' +
    '                class="btn btn-primary" \n' +
    '                ng-click="submit()"\n' +
    '                ng-disabled="!data.Title">\n' +
    '            Create\n' +
    '        </button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/common/modal/addSprint.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/modal/addSprint.tpl.html',
    '<div class="app-modal-body">\n' +
    '    <div class="modal-header">\n' +
    '        <h3 class="modal-title">\n' +
    '            <i class="fa fa-sticky-note-o"></i> Add New Sprint\n' +
    '        </h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <p>\n' +
    '            <label>Project</label>\n' +
    '            <select id="lnkProject" class="form-control input-sm" ng-model="data.ProjectKey">\n' +
    '                <option value=""> - Select a Project -</option>\n' +
    '                <option value="{{ opt.Key }}" ng-repeat="opt in model.Projects.list()">{{ opt.Title }}</option>\n' +
    '            </select>\n' +
    '        </p>\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button type="button" tabindex="4"\n' +
    '                class="btn btn-default" \n' +
    '                ng-click="cancel()">\n' +
    '            Cancel\n' +
    '        </button>\n' +
    '        <button type="button" tabindex="3"\n' +
    '                class="btn btn-primary" \n' +
    '                ng-click="submit()"\n' +
    '                ng-disabled="!data.ProjectKey">\n' +
    '            Create\n' +
    '        </button>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/common/modal/addTask.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/common/modal/addTask.tpl.html',
    '<div class="app-modal-body">\n' +
    '    <div class="modal-header">\n' +
    '        <div class="pull-right padd-title">\n' +
    '            <div class="btn-group btn-group-xs" role="group" aria-label="...">\n' +
    '\n' +
    '                <div class="btn-group btn-group-xs" role="group">\n' +
    '                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
    '                        {{ modalCtrl.getProjectLabel(data.ProjectKey) || \'Select Project\' }}\n' +
    '                        <span class="caret"></span>\n' +
    '                    </button>\n' +
    '                    <ul class="dropdown-menu">\n' +
    '                        <li ng-repeat="item in modalCtrl.projects">\n' +
    '                            <a href="" ng-click="modalCtrl.setProjectKey(data, item.Key)">\n' +
    '                                {{ item.Title }}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="btn-group btn-group-xs" role="group">\n' +
    '                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
    '                        {{ modalCtrl.getSprintLabel(data.SprintKey) || \'Select Sprint\' }}\n' +
    '                        <span class="caret"></span>\n' +
    '                    </button>\n' +
    '                    <ul class="dropdown-menu">\n' +
    '                        <li ng-repeat="item in modalCtrl.sprints"\n' +
    '                            ng-if="!item.ProjectKey || item.ProjectKey == data.ProjectKey">\n' +
    '                            <a href="" ng-click="modalCtrl.setSprintKey(data, item.Key)">\n' +
    '                                Sprint #{{ item.Number }}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '\n' +
    '                <div class="btn-group btn-group-xs" role="group">\n' +
    '                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
    '                        {{ modalCtrl.getBoardLabel(data.BoardKey) || \'No Board\' }}\n' +
    '                        <span class="caret"></span>\n' +
    '                    </button>\n' +
    '                    <ul class="dropdown-menu">\n' +
    '                        <li ng-repeat="item in modalCtrl.boards"\n' +
    '                            ng-if="(!item.ProjectKey || item.ProjectKey == data.ProjectKey) && (!item.SprintKey || item.SprintKey == data.SprintKey)">\n' +
    '                            <a href="" ng-click="modalCtrl.setBoardKey(data, item.Key)">\n' +
    '                                {{ item.Title }}\n' +
    '                            </a>\n' +
    '                        </li>\n' +
    '                    </ul>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <h3 class="modal-title">\n' +
    '            <i class="fa fa-tag"></i> Add New Task\n' +
    '        </h3>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <p>\n' +
    '            <label>Task Name</label>\n' +
    '            <input id="taskTitle"\n' +
    '                   tabindex="0" type="text"\n' +
    '                   class="input-no-border horz-fill"\n' +
    '                   placeholder="Attach New Task"\n' +
    '                   ng-model="data.Title" />\n' +
    '        </p>\n' +
    '        <p>\n' +
    '            <label>Description</label>\n' +
    '            <textarea id="taskBody"\n' +
    '                      tabindex="2" rows="5"\n' +
    '                      class="free-text"\n' +
    '                      ng-model="data.Description"></textarea>\n' +
    '        </p>\n' +
    '    </div>\n' +
    '    <div class="modal-footer">\n' +
    '        <button type="button" tabindex="4"\n' +
    '                class="btn btn-default"\n' +
    '                ng-click="cancel()">\n' +
    '            Cancel\n' +
    '        </button>\n' +
    '        <button type="button" tabindex="3"\n' +
    '                class="btn btn-primary"\n' +
    '                ng-click="submit()"\n' +
    '                ng-disabled="!data.Title">\n' +
    '            Create\n' +
    '        </button>\n' +
    '    </div>\n' +
    '</div>');
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
    '                    <a href="" ui-sref="projects.list">Projects</a>\n' +
    '                </li>\n' +
    '                <li ui-sref-active="active">\n' +
    '                    <a href="" ui-sref="sprints.active">Sprints</a>\n' +
    '                </li>\n' +
    '                <li ui-sref-active="active">\n' +
    '                    <a href="" ui-sref="backlogs.list">Backlogs</a>\n' +
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
    '        <ui-view name="contents">\n' +
    '        </ui-view>\n' +
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
    '        <a class="btn btn-xs btn-default" href="" ng-click="viewCtrl.cancel()">Cancel</a>\n' +
    '        <a class="btn btn-xs btn-primary" href="" ng-click="viewCtrl.update(childCtrl.project)">Update</a>\n' +
    '    </span>\n' +
    '    <h3>\n' +
    '        Current Projects\n' +
    '        <small>2 Items, 1 Active Sprint(s)</small>\n' +
    '    </h3>\n' +
    '    <div class="row contained">\n' +
    '        <div class="col-md-12" ng-if="childCtrl.project">\n' +
    '            <div class="project">\n' +
    '                <a class="pull-right ctrl"><i class="fa fa-trash"></i></a>\n' +
    '                <h4>\n' +
    '                    <a xui-sref="projects.item({ projectKey: childCtrl.project..Key })">\n' +
    '                        <i class="fa fa-tags"></i> {{ childCtrl.project.Title || \'Project Overview\' }}\n' +
    '                    </a>\n' +
    '                    <small>1 Active, 2 Scheduled, 0 Commpleted, 1 Backlog(s)</small>\n' +
    '                </h4>\n' +
    '                <div class="proj-body">\n' +
    '                    <div class="proj-logo">\n' +
    '                        No Logo\n' +
    '                    </div>\n' +
    '                    <div class="proj-info">\n' +
    '                        <h5>\n' +
    '                            <i class="fa fa-tag"></i> Sprint #1\n' +
    '                            <small>4 / 12 Points</small>\n' +
    '                        </h5>\n' +
    '                        <a href="" ui-sref="sprints.list({ projectKey: childCtrl.project.Key })" class="tile add">\n' +
    '                            <i class="fa fa-plus"></i> Add Sprint\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '                    <div class="proj-history">\n' +
    '                        <h5>\n' +
    '                            Project History\n' +
    '                            <small>1 January 2012 to 30 August 2015 (12 Sprints)</small>\n' +
    '                        </h5>\n' +
    '                        <div class="tile empty">\n' +
    '                            <i class="fa fa-info-circle"></i> No Data Avalaible\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="proj-details">\n' +
    '                    ...\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-12">\n' +
    '            <a href="" class="project add">\n' +
    '                <i class="fa fa-plus"></i> Create Project\n' +
    '            </a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/projects/list.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/projects/list.tpl.html',
    '<div>\n' +
    '    <span class="pull-right">\n' +
    '    </span>\n' +
    '    <h3>\n' +
    '        Current Projects\n' +
    '        <small>{{ childCtrl.projects.length }} Items<span ng-if="viewCtrl.countSprintsOfType(app.data.models.TaskType.InProgress)">, {{ viewCtrl.countSprintsOfType(app.data.models.TaskType.InProgress) }} Active Sprint(s)</span></small>\n' +
    '    </h3>\n' +
    '    <div class="row contained">\n' +
    '        <div class="col-md-12" ng-repeat="item in childCtrl.projects">\n' +
    '            <div class="project">\n' +
    '                <a class="pull-right ctrl"><i class="fa fa-trash"></i></a>\n' +
    '                <a ui-sref="projects.item({ projectKey: item.Key })" class="pull-right ctrl"><i class="fa fa-edit"></i></a>\n' +
    '                <h4>\n' +
    '                    <a ui-sref="projects.item({ projectKey: item.Key })">\n' +
    '                        <i class="fa fa-tags"></i> {{ item.Title || \'Project Overview\' }}\n' +
    '                    </a>\n' +
    '                    <small>{{ viewCtrl.countSprintsOfType(app.data.models.SprintState.Started) || 0 }} In Progress,</small>\n' +
    '                    <small>{{ viewCtrl.countSprintsOfType(app.data.models.SprintState.Default) || 0 }} Scheduled,</small>\n' +
    '                    <small>{{ viewCtrl.countSprintsOfType(app.data.models.SprintState.Completed) || 0 }} Commpleted,</small>\n' +
    '                    <small>{{ viewCtrl.countSprintsOfType(app.data.models.SprintState.OnHold) || 0 }} On Hold</small>\n' +
    '                </h4>\n' +
    '                <div class="proj-body">\n' +
    '                    <div class="proj-logo">\n' +
    '                        No Logo\n' +
    '                    </div>\n' +
    '                    <div class="proj-info">\n' +
    '                        <h5>\n' +
    '                            <i class="fa fa-tag"></i> Sprint #1\n' +
    '                            <small>4 / 12 Points</small>\n' +
    '                        </h5>\n' +
    '                        <a href="" ui-sref="sprints.list({ projectKey: item.Key })" class="tile add">\n' +
    '                            <i class="fa fa-plus"></i> Add Sprint\n' +
    '                        </a>\n' +
    '                    </div>\n' +
    '                    <div class="proj-history">\n' +
    '                        <h5>\n' +
    '                            Project History\n' +
    '                            <small ng-if="item.StartedAt">{{ item.StartedAt | date:\'fullDate\' }}</small>\n' +
    '                            <small ng-if="item.ClosedAt"> up to {{ item.ClosedAt | date:\'fullDate\' }}</small>\n' +
    '                            <small>(12 Sprints)</small>\n' +
    '                        </h5>\n' +
    '                        <div class="tile empty">\n' +
    '                            <i class="fa fa-info-circle"></i> No Data Avalaible\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-12">\n' +
    '            <a href="" class="project add"\n' +
    '               ng-click="viewCtrl.newProject()">\n' +
    '                <i class="fa fa-plus"></i> Create Project\n' +
    '            </a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/projects/main.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/projects/main.tpl.html',
    '<div class="container">\n' +
    '    <div class="app-caption">\n' +
    '        <h2>\n' +
    '            <i class="fa fa-tags"></i> Projects\n' +
    '            <small>&raquo; <a href="" ng-click="">Show All Projects</a></small>\n' +
    '        </h2>\n' +
    '        <a class="btn btn-primary" ng-click="viewCtrl.newProject()">New Project</a>\n' +
    '    </div>\n' +
    '    <div class="app-panel">\n' +
    '        <ui-view name="contents"></ui-view>\n' +
    '    </div>\n' +
    '\n' +
    '</div>');
}]);

angular.module('views/sprints/active.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/sprints/active.tpl.html',
    '<div>\n' +
    '    <h3>\n' +
    '        Active Sprints\n' +
    '        <small>5 Pending Tasks, 2 In Progress, 2 Completed</small>\n' +
    '    </h3>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-3" ng-repeat="item in childCtrl.sprints">\n' +
    '            <div class="row contained">\n' +
    '                <div class="container-title">\n' +
    '                    <a href="" class="pull-right"><i class="fa fa-arrows"></i></a>\n' +
    '                    {{ viewCtrl.getProjectLabel(item.ProjectKey) || \'Loading...\' }}\n' +
    '                </div>\n' +
    '                <div class="col-md-12">\n' +
    '                    <span class="pull-right">\n' +
    '                        <span class="label label-success">Active</span>\n' +
    '                    </span>\n' +
    '                    <div class="board">\n' +
    '                        <h4>\n' +
    '                            <a ui-sref="sprints.item({ key: item.Key })">\n' +
    '                                <i class="fa fa-tag"></i>\n' +
    '                                <b>Sprint #{{ (item.Number || \'1\') }}</b>\n' +
    '                            </a>\n' +
    '                        </h4>\n' +
    '                        <div class="tile" ng-repeat="boards in viewCtrl.getBoards(item.Key)">\n' +
    '                            <div class="board-group">\n' +
    '                                {{ boards.Title }}\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div>\n' +
    '                            <a href="" ng-click="viewCtrl.addBacklogs(item)" class="tile aside">\n' +
    '                                <i class="fa fa-share"></i> From Backlog\n' +
    '                            </a>\n' +
    '                            <a href="" ng-click="viewCtrl.addTaskToSprint(item)" class="tile aside">\n' +
    '                                <i class="fa fa-plus"></i> Add Task\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-3">\n' +
    '            <a href="" ng-click="viewCtrl.addSprint()" class="board add">\n' +
    '                <i class="fa fa-plus"></i> Add Sprint\n' +
    '            </a>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/sprints/edit.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/sprints/edit.tpl.html',
    '<div>\n' +
    '    <div ng-if="!childCtrl.sprint">\n' +
    '        <em>Sprint Not Found....</em>\n' +
    '    </div>\n' +
    '    <span class="pull-right" ng-if="childCtrl.sprint">\n' +
    '        <a class="btn btn-xs btn-default" href="" ng-click="viewCtrl.cancel()">Cancel</a>\n' +
    '        <a class="btn btn-xs btn-primary" href="" ng-click="viewCtrl.update(childCtrl.sprint)">Update</a>\n' +
    '    </span>\n' +
    '    <div ng-if="childCtrl.sprint">\n' +
    '        <h3>\n' +
    '            Sprint #{{ (childCtrl.sprint.Number || 1) }}\n' +
    '            <small>{{ viewCtrl.getProjectLabel(childCtrl.sprint.ProjectKey) }}</small>\n' +
    '        </h3>\n' +
    '        <div class="row contained">\n' +
    '            <div class="col-md-12">\n' +
    '                <div class="board">\n' +
    '                    <div class="row">\n' +
    '                        <div class="col-md-8">\n' +
    '                            <div>\n' +
    '                                <a href="" ng-click="viewCtrl.addTask()" ng-if="!viewCtrl.newTask" class="pull-right ctrl"><i class="fa fa-plus"></i></a>\n' +
    '                                <h4>\n' +
    '                                    <i class="fa fa-tags"></i> Unassigned Tasks\n' +
    '                                </h4>\n' +
    '                                <div class="tile" ng-repeat="task in viewCtrl.scrumBoards.Tasks.filter(childCtrl.sprint.Key)">\n' +
    '                                    <a href="" ng-click="viewCtrl.cancelTask()" class="pull-right ctrl"><i class="fa fa-times"></i></a>\n' +
    '                                    <a href="" ng-click="viewCtrl.updateTask(viewCtrl.newTask)" class="pull-right ctrl"><i class="fa fa-save"></i></a>\n' +
    '                                    <h5>{{ task.Title }}</h5>\n' +
    '                                    <p>\n' +
    '                                        {{ task.Description }}\n' +
    '                                    </p>\n' +
    '                                </div>\n' +
    '                                <a href="" ng-click="viewCtrl.addTask()" class="tile add">\n' +
    '                                    <i class="fa fa-plus"></i> Add Task\n' +
    '                                </a>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div class="col-md-4">\n' +
    '                            <div>\n' +
    '                                <a href="" ng-click="viewCtrl.cancel()" class="pull-right ctrl"><i class="fa fa-trash"></i></a>\n' +
    '                                <h4>\n' +
    '                                    <i class="fa fa-file-o"></i> Actions Menu\n' +
    '                                </h4>\n' +
    '                                <div class="thumbnail pad-aside">\n' +
    '                                    <div class="btn-group-vertical horz-fill" role="group" aria-label="...">\n' +
    '                                        <a ng-click="viewCtrl.addTask()" ng-disabled="viewCtrl.newTask" class="btn btn-primary horz-fill">Add New Task</a>\n' +
    '                                        <a ng-click="viewCtrl.addGroup()" class="btn btn-info horz-fill disabled">Create Group</a>\n' +
    '                                        <a ng-click="viewCtrl.inviteUser()" class="btn btn-default horz-fill disabled">Invite User</a>\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div>\n' +
    '                                <h4>\n' +
    '                                    <i class="fa fa-cog"></i> Linked Resources\n' +
    '                                </h4>\n' +
    '                                <div class="thumbnail pad-aside">\n' +
    '                                    <form class="form-horizontal">\n' +
    '                                        <div class="form-group">\n' +
    '                                            <label for="lnkProject" class="col-sm-2 control-label">Project</label>\n' +
    '                                            <div class="col-sm-10">\n' +
    '                                                <select id="lnkProject" class="form-control input-sm" ng-model="childCtrl.sprint.ProjectKey">\n' +
    '                                                    <option value=""> - Select a Project -</option>\n' +
    '                                                    <option value="{{ opt.Key }}" ng-repeat="opt in viewCtrl.scrumBoards.Projects.list()">{{ opt.Title }}</option>\n' +
    '                                                </select>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                        <div class="form-group" ng-if="childCtrl.sprint.ProjectKey">\n' +
    '                                            <label for="lnkSprint" class="col-sm-2 control-label">Sprint</label>\n' +
    '                                            <div class="col-sm-10">\n' +
    '                                                <select id="lnkSprint" class="form-control input-sm">\n' +
    '                                                    <option> - No Sprint Selected - </option>\n' +
    '                                                </select>\n' +
    '                                            </div>\n' +
    '                                        </div>\n' +
    '                                    </form>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);

angular.module('views/sprints/item.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/sprints/item.tpl.html',
    '<div>\n' +
    '    <div ng-if="!childCtrl.sprint">\n' +
    '        <em>Sprint Not Found....</em>\n' +
    '    </div>\n' +
    '    <span class="pull-right" ng-if="childCtrl.sprint">\n' +
    '        <a class="btn btn-xs btn-default" href="" ng-click="viewCtrl.cancel()">Cancel</a>\n' +
    '        <a class="btn btn-xs btn-primary" href="" ng-click="viewCtrl.updateSprint(childCtrl.sprint)">Update</a>\n' +
    '    </span>\n' +
    '    <div ng-if="childCtrl.sprint">\n' +
    '        <h3>\n' +
    '            {{ viewCtrl.getProjectLabel(childCtrl.sprint.ProjectKey) }}\n' +
    '            <small>\n' +
    '                Sprint #{{ (childCtrl.sprint.Number || 1) }}\n' +
    '            </small>\n' +
    '        </h3>\n' +
    '        <div class="row contained" ng-if="childCtrl.boards.length">\n' +
    '            <div ng-class="childCtrl.getColumnCss(childCtrl.boards.length)"\n' +
    '                 ng-repeat="board in childCtrl.boards track by board.Key">\n' +
    '                <div class="board drop-target"\n' +
    '                     drop-action="viewCtrl.moveTask(item.Key, data)">\n' +
    '                    <div>\n' +
    '                        <h4>\n' +
    '                            <i class="fa fa-tag"></i> {{ board.Title || \'Board\' }}\n' +
    '                        </h4>\n' +
    '                        <ul class="drop-list">\n' +
    '                            <li class="drag-item" drag-data="task"\n' +
    '                                ng-dblclick="viewCtrl.editTask(task)"\n' +
    '                                ng-repeat="task in viewCtrl.scrumBoards.Tasks.filter(board.Key) track by task.Key">\n' +
    '                                <div class="tile">\n' +
    '                                    <h5>{{ task.Title }}</h5>\n' +
    '                                    <p>\n' +
    '                                        {{ task.Description }}\n' +
    '                                    </p>\n' +
    '                                </div>\n' +
    '                            </li>\n' +
    '                        </ul>     \n' +
    '                        <div ng-if="board.TaskType <= 2">\n' +
    '                            <a href="" ng-click="viewCtrl.addBacklogs(childCtrl.sprint, board)" class="tile aside">\n' +
    '                                <i class="fa fa-share"></i> From Backlog\n' +
    '                            </a>\n' +
    '                            <a href="" ng-click="viewCtrl.addTaskToBoard(board)" class="tile aside">\n' +
    '                                <i class="fa fa-plus"></i> Add Task\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('views/sprints/list.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/sprints/list.tpl.html',
    '<div>\n' +
    '    <span class="pull-right">\n' +
    '        Status: <span class="label label-success">Active</span>\n' +
    '    </span>\n' +
    '    <h3>\n' +
    '        Project Sprints\n' +
    '        <small>5 Pending Tasks, 2 In Progress, 2 Completed</small>\n' +
    '    </h3>\n' +
    '    <div class="row">\n' +
    '        <div class="col-md-9">\n' +
    '            <div class="row contained">\n' +
    '                <div class="col-md-3" ng-repeat="item in childCtrl.sprints">\n' +
    '                    <div class="board drop-target" \n' +
    '                         drop-action="viewCtrl.moveTask(item.Key, data)"> \n' +
    '                        <h4>\n' +
    '                            <a ui-sref="sprints.item({ key: item.Key })">\n' +
    '                                <i class="fa fa-tag"></i>\n' +
    '                                Sprint #{{ (item.Number || \'1\') }}\n' +
    '                            </a>\n' +
    '                            <small>\n' +
    '                                {{ viewCtrl.getStateDesc(item.State) || \'Loading...\' }}\n' +
    '                            </small>\n' +
    '                        </h4>\n' +
    '                        <ul class="drop-list">\n' +
    '                            <li class="drag-item" drag-data="task"\n' +
    '                                ng-dblclick="viewCtrl.editTask(task)"\n' +
    '                                ng-repeat="task in viewCtrl.getTasks(item)">\n' +
    '                                <div class="tile">\n' +
    '                                    <h5>{{ task.Title }}</h5>\n' +
    '                                    <p>\n' +
    '                                        {{ task.Description }}\n' +
    '                                    </p>\n' +
    '                                </div>\n' +
    '                            </li>\n' +
    '                        </ul>     \n' +
    '                        <div ng-if="true">\n' +
    '                            <a href="" ng-click="viewCtrl.addTaskToBoard(item)" class="tile aside">\n' +
    '                                <i class="fa fa-plus"></i> Add Task\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="col-md-3">\n' +
    '                    <a href="" ng-click="viewCtrl.createNew()" class="board add">\n' +
    '                        <i class="fa fa-plus"></i> New Sprint\n' +
    '                    </a>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="col-md-3">\n' +
    '            <div class="row contained">\n' +
    '                <div class="col-md-12">\n' +
    '                    <div class="board">\n' +
    '                        <h4>\n' +
    '                            <a ui-sref="sprints.item({ key: item.Key })">\n' +
    '                                <i class="fa fa-sticky-note-o"></i>\n' +
    '                                Project Backlog\n' +
    '                            </a>\n' +
    '                        </h4>\n' +
    '                        <div class="tile" ng-repeat="board in viewCtrl.getBoards(item.Key)">\n' +
    '                            <h5>{{ board.Title }}</h5>\n' +
    '                            <p>\n' +
    '                                {{ board.Description }}\n' +
    '                            </p>\n' +
    '                        </div>\n' +
    '                        <div ng-if="true">\n' +
    '                            <a href="" ng-click="viewCtrl.addTaskToBoard(item)" class="tile aside">\n' +
    '                                <i class="fa fa-plus"></i> Add Task\n' +
    '                            </a>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);

angular.module('views/sprints/main.tpl.html', []).run(['$templateCache', function($templateCache) {
  $templateCache.put('views/sprints/main.tpl.html',
    '<div class="container">\n' +
    '    <div class="app-caption">\n' +
    '        <h2>\n' +
    '            <i class="fa fa-tag"></i> Sprints\n' +
    '            <small>&raquo; <a href="" ng-click="">Show All Projects</a></small>\n' +
    '        </h2>\n' +
    '        <a class="btn btn-success disabled" ng-click="">Complete Current</a>\n' +
    '        <a class="btn btn-primary" ng-click="viewCtrl.addSprint()">Add New Sprint</a>\n' +
    '    </div>\n' +
    '    <div class="app-panel">\n' +
    '        <ui-view name="contents">\n' +
    '        </ui-view>\n' +
    '    </div>\n' +
    '</div>');
}]);
