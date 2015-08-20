/// <reference path="../common/utils/Guid.ts" />
/// <reference path="models/Project.ts" />
/// <reference path="models/Board.ts" />
/// <reference path="models/Group.ts" />
/// <reference path="models/Task.ts" />

module app.data {

    export class SampleData {

        public static Projects: models.IProject[] = [
            {
                Key: Guid.New(),
                Title: 'Simple Project',
                Description: 'This is a basic project example.',
            },
            {
                Key: Guid.New(),
                Title: 'Large Scale Project',
                Description: 'This is a larger project with many groups, users and sprints.',
            },
        ];

        public static Groups: models.IGroup[] = [
            {
                Key: Guid.New(),
                Title: 'ToDo',
                Description: 'A brief explanation goes here.',
            },
        ];

        public static Boards: models.IBoard[] = [
        // --------------------------------------------------------------
            {
                Key: Guid.New(),
                Title: 'Scheduled Tasks',
                TaskType: models.TaskType.Scheduled,
                ProjectKey: SampleData.Projects[0].Key,
                SprintKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Scheduled Tasks',
                TaskType: models.TaskType.Scheduled,
                ProjectKey: SampleData.Projects[1].Key,
                SprintKey: null,
            },
        // --------------------------------------------------------------

        // --------------------------------------------------------------
            {
                Key: Guid.New(),
                Title: 'Tasks In Progress',
                TaskType: models.TaskType.InProgress,
                ProjectKey: SampleData.Projects[0].Key,
                SprintKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Tasks In Progress',
                TaskType: models.TaskType.InProgress,
                ProjectKey: SampleData.Projects[1].Key,
                SprintKey: null,
            },
        // --------------------------------------------------------------


        // --------------------------------------------------------------
            {
                Key: Guid.New(),
                Title: 'Tasks In Testing',
                TaskType: models.TaskType.Testing,
                ProjectKey: SampleData.Projects[0].Key,
                SprintKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Tasks In Testing',
                TaskType: models.TaskType.Testing,
                ProjectKey: SampleData.Projects[1].Key,
                SprintKey: null,
            },
        // --------------------------------------------------------------

        // --------------------------------------------------------------
            {
                Key: Guid.New(),
                Title: 'Backlogs',
                TaskType: models.TaskType.Backlog,
                ProjectKey: SampleData.Projects[0].Key,
                SprintKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Backlogs',
                TaskType: models.TaskType.Backlog,
                ProjectKey: SampleData.Projects[1].Key,
                SprintKey: null,
            },
        // --------------------------------------------------------------
        ];

        public static Tasks: models.ITask[] = [
        // --------------------------------------------------------------
            {
                Key: Guid.New(),
                Title: 'Reminder',
                Description: 'Create some more tasks and assign more work.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Creative Design',
                Description: 'Create a mockup of the UI and draw some layouts.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Scaffold web application',
                Description: 'Create the HTML, CSS and javascript folder structures for the web app.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Add Grunt Build',
                Description: 'Create a build folder and install and setup grunt for continous builds.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Create Git Repository',
                Description: 'Create a clean new repo to store the code.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Commit Initial Release',
                Description: 'Publish to the git repository.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
        // --------------------------------------------------------------
            {
                Key: Guid.New(),
                Title: 'Do some task for me',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[1].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Do some task for me',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[6].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Do some task for me',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[6].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Do some task for me',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[6].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Do some task for me',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[7].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                Title: 'Do some task for me',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[7].Key,
                GroupKey: null,
            },
        // --------------------------------------------------------------

        ];


    }
} 