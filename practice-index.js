class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class SingleLinked{
    constructor(){
        this.head = null;
        this.size = 0;
    }
    //Add At First
    addAtZero(value){
        const newNode = new Node(value);
        [this.head,newNode.next]=
        [newNode, this.head];
        this.size++
    }
    //Add At Last index
    add(value){
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode
        }else{
            let current = this.head;
            while(current.next){
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    //Add Me At Any Index
    addAt(index,value){
        
        const newNode = new Node(value);
        let current = this.head;
        let previous;
        let count = 0;
        while(count < index){
            previous = current;
            current = current.next;
            count++
        }
        previous.next = newNode;
        newNode.next = current
        this.size++
        //--
        
    }
}
const list = new SingleLinked();
list.add(10);
list.add(20);
list.add(30);
list.addAtZero("ADD Me At Zero");
list.addAt(1,"100")
console.log(JSON.stringify(list,null,2));