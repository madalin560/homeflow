// Simple method which cannot be called
const abstractMethod = () => {
    throw new TypeError('Cannot call abstract methods. Must be overridden by subclasses without calling super.');
};

const Interface = (methods) => {
    const Intf = class {
        constructor() {
            if (this.constructor === Intf) {
                throw new TypeError('Cannot construct instance of an interface directly');
            }

            const self = this;
            methods.forEach((method) => {
                // check that abstract method is implemented by concrete subclasses
                if (typeof self[method] !== 'function') {
                    throw new TypeError(`Abstract methods ${method} must be implemented by concrete subclasses`);
                }
            });
        }
    };

    // create abstract methods
    methods.forEach((method) => {
        Intf.prototype[method] = abstractMethod;
    });

    return Intf;
};

const AbstractClass = (superClass, abstractMethods) => {
    const Abstract = class extends superClass {
        constructor() {
            // test methods
            if (!abstractMethods) {
                throw new TypeError('Must pass a list of abstract methods');
            }

            super();

            const self = this;

            if (this.constructor === Abstract) {
                throw new TypeError('Cannot construct instance of abstract class directly');
            }

            abstractMethods.forEach((method) => {
                if (self[method] === abstractMethod) {
                    throw new TypeError(`Abstract methods ${method} must be implemented by concrete subclasses`);
                }
            });
        }
    };

    // create abstract methods
    abstractMethods.forEach((method) => {
        Abstract.prototype[method] = abstractMethod;
    });

    return Abstract;
};

export {AbstractClass, Interface};
