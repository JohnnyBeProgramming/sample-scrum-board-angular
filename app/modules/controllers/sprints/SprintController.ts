/// <reference path="../../data/module.ts" />
/// <reference path="../../common/module.ts" />

module app.controllers {

    import models = app.data.models;

    export class SprintController {

        constructor(private $state: any, private $modal: any, private scrumBoards: app.common.services.ScrumBoardService) {
            console.log(' - Sprint Controller...');
        }

        public getSprints(): ng.IPromise<models.ISprint[]> {
            return this.scrumBoards
                .Sprints
                .filterByProject(Guid.New());
        }

        public index() {
            this.$state.go('sprints.list');
        }

        public openBoard(sprint: models.ISprint) {
            this.$state.go('sprints.item', { key: sprint.Key });
        }

        public cancel() {
            this.index();
        }

    }

    export class SprintItemController {

        constructor(public sprint: models.ISprint, private scrumBoards: app.common.services.ScrumBoardService) {
            console.log(' - Sprint Child Controller...', sprint);
        }

    }
}