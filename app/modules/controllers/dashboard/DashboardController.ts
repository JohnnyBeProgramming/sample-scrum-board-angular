module app.controllers {

    export class DashboardController {

        public tabIndex: number = 0;

        constructor(private scrumBoards: app.common.services.ScrumBoardService) {

        }

    }

}