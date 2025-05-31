export default class Queue {
    constructor(capacity) {
        if (capacity <= 0) {
            throw new Error("The capacity should be greater than 0.");
        }
        this.queue = new Array(capacity);
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.queue.length;
    }

    insert(element) {
        if (this.isFull()) {
            throw new Error("queue is full");
        }
        this.queue[this.size++] = element;
    }

    poll() {
        if (this.isEmpty()) {
            throw new Error("queue is empty");
        }

        let first = this.queue[0];
        for(let i = 0; i < this.size; i++){
            this.queue[i] = this.queue[i+1];
        }
        this.queue[this.size-1] = undefined;
        this.size--;

        return first;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue[0];
    }

    display() {
        if (this.isEmpty()) {
            console.log("queue is empty");
        } else {
            for (let i = 0; i < this.size; i++) {
                console.log(this.queue[i]);
            }
        }
    }
    

    getSize() {
        return this.size;
    }
}