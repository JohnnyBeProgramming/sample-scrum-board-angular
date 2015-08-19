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


    }
} 