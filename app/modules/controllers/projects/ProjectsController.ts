module app.controllers {

    import models = app.data.models;

    export class ProjectsController {

        public cache: any = {};
        public projects: models.IProject[] = [];

        constructor(public $rootScope: any, public $state: any, public $modal: any, public scrumBoards: app.common.services.ScrumBoardService) {
            this.init();
        }

        public init() {
            this.scrumBoards.Projects.load().then((items) => {
                this.projects = items;
            }).finally(() => {
                this.$rootScope.$applyAsync();
            });
        }

        public index() {
            this.$state.go('projects.list');
        }

        public openProject(project: models.IProject) {
            this.$state.go('projects.item', { key: project.Key });
        }

        public newProject() {
            var project: models.IProject = {
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
                    modalContext: () => {
                        return {
                            project: project,
                        };
                    },
                }
            }).result.then(
                // On Commit
                (modalContext) => {
                    this.update(modalContext.project);
                },
                // Dismissed
                () => {
                    this.cancel();
                });
        }

        public update(project: models.IProject) {
            if (project.Key == Guid.Empty) {
                project.Key = Guid.New(),
                this.scrumBoards.Projects.insert(project);
            } else {
                this.scrumBoards.Projects.save().then(() => {
                    this.index();
                });
            }
        }

        public cancel() {
            this.index();
        }

        public countSprintsOfType(state: models.SprintState, projectKey?: string): number {
            var count = 0;
            var sprints = this.scrumBoards.Sprints.list();
            if (sprints) {
                sprints.forEach((item) => {
                    if (projectKey && (projectKey != item.ProjectKey)) return;
                    if (item.State == state) {
                        count++;
                    }
                });
            }
            return count;
        }

    }

    export class ProjectListController {

        constructor(public $rootScope: any, public $state: any, public $modal: any, public scrumBoards: app.common.services.ScrumBoardService) {
            this.init();
        }

        public init() {
        }
    }

    export class ProjectItemController {

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService, public project?: models.IProject) { }

    }
    
}