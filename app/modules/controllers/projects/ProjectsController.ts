module app.controllers {

    import models = app.data.models;

    export class ProjectsController {

        constructor(private $state: any, private $modal: any, private scrumBoards: app.common.services.ScrumBoardService) {}

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
                    console.info(' - Modal closed. Updating task.', modalContext);
                    this.update(modalContext.project);
                },
                // Dismissed
                () => {
                    console.info(' - Modal dismissed at: ' + new Date());
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
    }

    export class ProjectListController {

        public projects: models.IProject[] = [];

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService) {
            this.init();
        }

        public init() {
            this.scrumBoards.Projects.load().then((items) => {
                this.projects = items;
            }).finally(() => {
                this.$rootScope.$applyAsync();
            });

        }
    }

    export class ProjectItemController {

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService, public project?: models.IProject) {}

    }

}