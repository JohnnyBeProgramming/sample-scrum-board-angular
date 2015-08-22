/// <reference path="../../data/module.ts" />
/// <reference path="../../data/repositories/ProjectRepository.ts" />
/// <reference path="../../data/repositories/SprintRepository.ts" />
/// <reference path="../../data/repositories/BoardRepository.ts" />
/// <reference path="../../data/repositories/GroupRepository.ts" />
/// <reference path="../../data/repositories/TaskRepository.ts" />
/// <reference path="../../data/repositories/UserRepository.ts" />

module app.common.services {

    export class ScrumBoardService {

        public Projects: app.data.repositories.ProjectRepository;
        public Sprints: app.data.repositories.SprintRepository;
        public Boards: app.data.repositories.BoardRepository;
        public Groups: app.data.repositories.GroupRepository;
        public Tasks: app.data.repositories.TaskRepository;
        public Users: app.data.repositories.UserRepository;

        constructor(private $q: any) {
            this.Projects = new app.data.repositories.ProjectRepository($q);
            this.Sprints = new app.data.repositories.SprintRepository($q);
            this.Boards = new app.data.repositories.BoardRepository($q);
            this.Groups = new app.data.repositories.GroupRepository($q);
            this.Tasks = new app.data.repositories.TaskRepository($q);
            this.Users = new app.data.repositories.UserRepository($q);
        }

    }

}