module app.data.models {

    export function LoadAppState(): AppState {
        return new AppState();
    }

    export class AppState {
        active: boolean;
        lastError: Error;
        pilot: number;
    }

} 