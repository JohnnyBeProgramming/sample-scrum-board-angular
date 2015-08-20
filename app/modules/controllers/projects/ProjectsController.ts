module app.controllers {

    export class ProjectsController {

        public tabIndex: number = 0;

        constructor(private scrumBoards: app.common.services.ScrumBoardService) {

        }

    }

}