class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class SingleLinkedList{
    constructor(head){
        this.head = head;
        this.size = 0;
    }

    //Add At First or Zero Index
    addAtZero(value){
        let newNode = new Node(value);
        [this.head, newNode.next] = [newNode,this.head]
        this.size++
    }

    //Add At Last Index
    add(value){
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
        }else{
            let current = this.head;
            while(current.next){
                current = current.next
            }
            current.next = newNode;
        }
        this.size++
    }

    //Add At Any Index
    insert(value,index){
        //Handle Edge Case
        if(index < 0 || index > this.size){
            console.log("Invalid Index");
            return
        }
        //Handle another edge case
        if(index === 0){
            this.addAtZero(value);
            return
        }
        const newNode = new Node(value);
        let current = this.head;
        let previous;
        let count = 0;
        while(count<index){
            previous = current;
            current = current.next;
            count++
        }
        previous.next = newNode;
        newNode.next = current.next
        this.size++;
    }
}

const SingleList = new SingleLinkedList();
SingleList.add(10);
SingleList.add(20);
SingleList.add(30);
SingleList.addAtZero(40);
SingleList.insert("mahakal",1);
SingleList.insert("shiv",0);
SingleList.insert("A",10)
console.log(JSON.stringify(SingleList,null,2));