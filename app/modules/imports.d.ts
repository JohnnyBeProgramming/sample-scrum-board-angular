/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/firebase/firebase.d.ts" />

interface Window {
    WhichBrowser: () => void;
    isNaN: (input: any) => boolean;
    isFinite: (input: any) => boolean;
}
declare var moment: any;