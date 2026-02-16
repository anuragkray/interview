class Node{
    constructor(value){
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
const list = new Node(10);
console.log("LIST",list);

class DoubleList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    //Adding 
    //[prev<--data-->next]
    
    add(value){
        const node = new Node(value);
        if(!this.head){
            this.head = node;
            this.tail = node;
        }else{
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }
}