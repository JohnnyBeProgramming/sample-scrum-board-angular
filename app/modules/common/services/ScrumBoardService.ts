/// <reference path="../../data/module.ts" />

module app.common.services {

    export class ScrumBoardService {

        public Projects: app.data.repositories.ProjectRepository;
        public Boards: app.data.repositories.BoardRepository;
        public Groups: app.data.repositories.GroupRepository;
        public Tasks: app.data.repositories.TaskRepository;
        public Users: app.data.repositories.UserRepository;

        constructor(private $q: any) {
            this.Projects = new app.data.repositories.ProjectRepository($q);
            this.Boards = new app.data.repositories.BoardRepository($q);
            this.Groups = new app.data.repositories.GroupRepository($q);
            this.Tasks = new app.data.repositories.TaskRepository($q);
            this.Users = new app.data.repositories.UserRepository($q);
        }

    }

}