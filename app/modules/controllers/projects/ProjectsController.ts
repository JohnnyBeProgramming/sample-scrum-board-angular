module app.controllers {

    import models = app.data.models;

    export class ProjectsController {

        constructor(private $state: any, private $modal: any, private scrumBoards: app.common.services.ScrumBoardService) {
            console.log(' - Projects Controller...');
        }

        public index() {
            this.$state.go('projects.list');
        }

        public openProject(project: models.IProject) {
            this.$state.go('projects.item', { key: project.Key });
        }

        public cancel() {
            this.index();
        }
    }

    export class ProjectListController {

        public projects: models.IProject[] = [];

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService) {
            console.log(' - Sprint Projects Controller...');
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

        constructor(private $rootScope: any, private scrumBoards: app.common.services.ScrumBoardService, public project?: models.IProject) {
            console.log(' - Project Item Controller...', project);
        }

    }

}