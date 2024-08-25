class EventHandler<
  TCallback extends EventHandler.Callback<any, any> = () => void
> {
  // #listeners = new Map<string, TCallback[]>();
  #listeners = new Set<TCallback>();
  #triggered?: Parameters<TCallback>;

  addListener(callback: TCallback) {
    // this.#listeners.has(event) || this.#listeners.set(event, []);
    // this.#listeners.get(event)!.push(callback);
    this.#listeners.add(callback);

    if (this.#triggered) {
      callback(this.#triggered);
    }
  }

  hasListener(callback: TCallback) {
    return this.#listeners.has(callback);
  }

  hasListeners() {
    return this.#listeners.size > 0;
  }

  get onEvent(): EventHandler.Methods<TCallback> {
    return {
      addListener: this.addListener.bind(this),
      hasListener: this.hasListener.bind(this),
      removeListener: this.removeListener.bind(this),
    };
  }

  removeListener(callback: TCallback | true) {
    if (callback === true) {
      // remove all
      // this.#listeners.delete(event);
      this.#listeners.clear();
    } else {
      // let listeners = this.#listeners.get(event);
      // if (listeners) {
      //   this.#listeners.set(
      //     event,
      //     listeners.filter((value) => !(value === callback))
      //   );
      // }
      this.#listeners.delete(callback);
    }
  }

  trigger(context?: any, ...args: Parameters<TCallback>) {
    // this.#triggeredEvents.set(event, args);
    // let listeners = this.#listeners.get(event);
    // if (listeners && listeners.length) {
    //   listeners.forEach((listener) => {
    //     listener(...args);
    //   });
    // }

    this.#triggered = args;
    if (this.#listeners.size > 0) {
      this.#listeners.forEach((callback) => {
        callback(...args);
      }, context);
    }
  }
}

namespace EventHandler {
  export type Callback<TArgs, TReturn> = (
    ...args: TArgs[]
  ) => TReturn;
  export interface Methods<
    TCallback extends EventHandler.Callback<any, void>
  > {
    addListener: (callback: TCallback) => void;
    hasListener: (callback: TCallback) => void;
    removeListener: (callback: TCallback) => void;
  }
}

export default EventHandler;
