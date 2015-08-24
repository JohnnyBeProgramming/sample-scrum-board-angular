/// <reference path="../common/utils/Guid.ts" />
/// <reference path="models/IProject.ts" />
/// <reference path="models/ISprint.ts" />
/// <reference path="models/IBoard.ts" />
/// <reference path="models/IGroup.ts" />
/// <reference path="models/ITask.ts" />

module app.data {

    export class SampleData {

        public static Projects: models.IProject[] = [
            {
                Key: Guid.New(),
                Title: 'Simple Project',
                Description: 'This is a basic project example.',
                StartedAt: new Date('2015-01-01'),
                ClosedAt: new Date('2015-11-01'),
            },
            {
                Key: Guid.New(),
                Title: 'Large Scale Project',
                Description: 'This is a larger project with many groups, users and sprints.',
                StartedAt: new Date('2015-03-11'),
            },
        ];

        public static Sprints: models.ISprint[] = [
            // --------------------------------------------------------------
            {
                Number: 1,
                Key: Guid.New(),
                State: models.SprintState.Started,
                ProjectKey: SampleData.Projects[0].Key,
            },
            {
                Number: 2,
                Key: Guid.New(),
                State: models.SprintState.Default,
                ProjectKey: SampleData.Projects[0].Key,
            },
            // --------------------------------------------------------------
            {
                Number: 1,
                Key: Guid.New(),
                State: models.SprintState.Completed,
                ProjectKey: SampleData.Projects[1].Key,
            },
            {
                Number: 2,
                Key: Guid.New(),
                State: models.SprintState.Completed,
                ProjectKey: SampleData.Projects[1].Key,
            },
            {
                Number: 3,
                Key: Guid.New(),
                State: models.SprintState.Started,
                ProjectKey: SampleData.Projects[1].Key,
            },
            {
                Number: 4,
                Key: Guid.New(),
                State: models.SprintState.OnHold,
                ProjectKey: SampleData.Projects[1].Key,
            },
            {
                Number: 5,
                Key: Guid.New(),
                State: models.SprintState.Default,
                ProjectKey: SampleData.Projects[1].Key,
            },
            {
                Number: 6,
                Key: Guid.New(),
                State: models.SprintState.Default,
                ProjectKey: SampleData.Projects[1].Key,
            },
            {
                Number: 7,
                Key: Guid.New(),
                State: models.SprintState.Discarded,
                ProjectKey: SampleData.Projects[1].Key,
            },
            // --------------------------------------------------------------
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
                TaskType: models.TaskType.Default,
                ProjectKey: SampleData.Projects[0].Key,
                SprintKey: SampleData.Sprints[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Scheduled Tasks',
                TaskType: models.TaskType.Default,
                ProjectKey: SampleData.Projects[1].Key,
                SprintKey: SampleData.Sprints[0].Key,
            },
            // --------------------------------------------------------------

            // --------------------------------------------------------------
            {
                Key: Guid.New(),
                Title: 'Tasks In Progress',
                TaskType: models.TaskType.InProgress,
                ProjectKey: SampleData.Projects[0].Key,
                SprintKey: SampleData.Sprints[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Tasks In Progress',
                TaskType: models.TaskType.InProgress,
                ProjectKey: SampleData.Projects[1].Key,
                SprintKey: SampleData.Sprints[4].Key,
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
                TaskType: models.TaskType.Completed,
                Description: 'Create some more tasks and assign more work.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Creative Design',
                TaskType: models.TaskType.Testing,
                Description: 'Create a mockup of the UI and draw some layouts.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Scaffold web application',
                TaskType: models.TaskType.InProgress,
                Description: 'Create the HTML, CSS and javascript folder structures for the web app.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Add Grunt Build',
                TaskType: models.TaskType.Default,
                Description: 'Create a build folder and install and setup grunt for continous builds.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                Title: 'Create Git Repository',
                TaskType: models.TaskType.Completed,
                Description: 'Create a clean new repo to store the code.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Backlog,
                Title: 'Do Sanity Checks',
                Description: 'Publish to the git repository.',
                ProjectKey: SampleData.Projects[0].Key,
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Backlog,
                Title: 'Get Feedback from product owners',
                Description: 'Publish to the git repository.',
                ProjectKey: SampleData.Projects[0].Key,
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Backlog,
                Title: 'Publish release notes',
                Description: 'Publish to the git repository.',
                ProjectKey: SampleData.Projects[0].Key,
                BoardKey: null,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Canceled,
                Title: 'Canceled Task',
                Description: 'This is a sample of a canceled task.',
                BoardKey: SampleData.Boards[0].Key,
                GroupKey: SampleData.Groups[0].Key,
            },
            // --------------------------------------------------------------
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Default,
                Title: 'Do some task for me #1',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[1].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Default,
                Title: 'Do some task for me #2',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[6].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Default,
                Title: 'Do some task for me #3',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[6].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Default,
                Title: 'Do some task for me #4',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[6].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Default,
                Title: 'Do some task for me #5',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[7].Key,
                GroupKey: null,
            },
            {
                Key: Guid.New(),
                TaskType: models.TaskType.Default,
                Title: 'Do some task for me #5',
                Description: 'This is an example taskthat is just that: an example.',
                BoardKey: SampleData.Boards[7].Key,
                GroupKey: null,
            },
            // --------------------------------------------------------------

        ];

        public static Users: models.IUser[] = [];
    }
} 