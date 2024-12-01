export type SubsriberFn = () => void;

export class Subsriber<T> {
    private listeners: SubsriberFn[] = [];
    private _state = {} as T;

    constructor(state: T) {
        this._state = state;
    }

    subscribe(listener: SubsriberFn) {
        this.listeners.push(listener);
    }

    unsubscribe(listener: Function) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }

    notify() {
        this.listeners.forEach((listener) => listener());
    }

    getListeners() {
        return this.listeners;
    }

    getState() {
        return this._state;
    }

    setState(newState: T | ((state: T) => T)) {
        this._state =
            typeof newState === "function"
                ? (newState as (state: T) => T)(this._state)
                : newState;

        this.notify();
    }
}

export const createSubscriber = <T>(state: T) => new Subsriber<T>(state);
