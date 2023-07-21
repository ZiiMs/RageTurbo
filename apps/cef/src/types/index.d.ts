

interface Events {
  [key: string]: any;
}

interface EventManager {
  events: Events;
  addHandler: Function;
  removeHandler: Function;
}

declare global {
  interface Window {
    EventManager: EventManager;
  }
}

export {};
