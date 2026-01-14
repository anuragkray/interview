class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class SingleLinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    //Add At First or Zero Index
    addAtZero(value){
        const node = new Node(value);
        [this.head, node.next] = [node,this.head]
        this.size++
    }

    //Add At Last Index
    add(value){
        const node = new Node(value);
        if(!this.head){
            this.head = node;
        }else{
            let current = this.head;
            while(current.next){
                current = current.next
            }
            current.next = node;
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
        const node = new Node(value);
        let current = this.head;
        let previous;
        let count = 0;
        while(count<index){
            previous = current;
            current = current.next;
            count++
        }
        previous.next = node;
        node.next = current;
        this.size++;
    }

    //Delete operation
   delete(index = this.size - 1) {

  if (!this.head || this.size === 0) return;

  if (index < 0 || index >= this.size) return;

  if (index === 0) {
    this.head = this.head.next;
    this.size--;
    return;
  }

  let current = this.head;
  let previous = null;
  let count = 0;

  while (count < index) {
    previous = current;
    current = current.next;
    count++;
  }

  previous.next = current.next;
  this.size--;
}

}

const SingleList = new SingleLinkedList();
SingleList.add(10);
SingleList.add(20);
SingleList.add(30);
SingleList.addAtZero(40);
SingleList.insert("mahakal",1);
SingleList.insert("shiv",0);
SingleList.insert("A",10);
console.log(JSON.stringify(SingleList,null,2));
SingleList.delete(0);
console.log(JSON.stringify(SingleList,null,2));
