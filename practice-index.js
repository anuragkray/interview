class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class SingleList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    initial(value){
        const node = new Node(value);
        [this.head,node.next]=
        [node, this.head];
        this.size++;
    }
    //add
    add(value){
        const node = new Node(value);
        if(!this.head){
            this.head = node;
        }else{
            let current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        this.size++
    }
}
const list = new SingleList()
list.add(10);
list.add(20);
list.initial("Initial");
list.add(30);
list.add(40);
console.log(JSON.stringify(list, null, 2));