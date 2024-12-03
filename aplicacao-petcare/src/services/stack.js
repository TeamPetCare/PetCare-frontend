export default class Stack {
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("The capacity should be greater than 0.");
        }
        this.capacity = capacity;
        this.stack = [];
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    isFull() {
        return this.stack.length === this.capacity;
    }

    push(element) {
        if (this.isFull()) {
            this.stack.shift();
        }
        this.stack.push(element); 
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Stack is empty");
        }
        return this.stack.pop();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.stack[this.stack.length - 1];
    }

    display() {
        if (this.isEmpty()) {
            console.log("Stack is empty");
        } else {
            console.log("Stack contents (top to bottom):", this.stack.slice().reverse());
        }
    }

    size() {
        return this.stack.length;
    }
}