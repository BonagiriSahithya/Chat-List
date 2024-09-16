export { ChatHandler, chat_names}

const chat_names = ["Annaya", "Vadhina","Praveen anna", "Srija Akka", "Anjan anna","Amulya", "Rahul anna"];
const chat_names_length = chat_names.length;
const chat_msg = ["I'll ping you later",
    "How are you",
    "lol",
    "Nope I didnt get you"];
const chat_msg_length = chat_msg.length;
const chat_img_length = 7;

class ChatHandler{

    constructor(chat_template, chat_list){
        this.hashmap = new Map();
        this.linked_list = null;
        this.chat_template = chat_template;
        this.chat_list = chat_list;
        let clock = new Date();
        this.hours = clock.getHours();
        this.mins = clock.getMinutes();
    }

    getTime(){
        this.mins += 1;
        if(this.mins === 60){
            this.hours += 1;
            this.mins = 0;
        }

        if(this.hours === 24){
            this.hours = 0;
        }

        return ("0" + this.hours).slice(-2)+":"+("0" + this.mins).slice(-2);
    }

    createNode(id){
        let node = {};
        node['next'] = null;
        node['prev'] = null;
        let chat_item = this.chat_template.cloneNode(true);
        chat_item.querySelector('#Name').innerText = chat_names[id%chat_names_length];
        chat_item.querySelector('#Message').innerText = chat_msg[id%chat_msg_length];
        console.log("./images/avatar" + eval(1+(id%chat_img_length)) + ".jpeg");
        chat_item.querySelector('#Image').src = "./images/avatar" + eval(1+(id%chat_img_length)) + ".jpeg";
        node['chat_item'] = chat_item;
        return node;
    }
    newMsg(id){
        let node = null;
        if((id in this.hashmap ) === false){
            node = this.createNode(id);
            this.hashmap[id] = node;
        } else{
            node = this.getNodeFromList(id);
        }

        if(this.linked_list === null){
            this.linked_list = node;
        } else{
            node['next'] = this.linked_list;
            if(this.linked_list!==null)
                this.linked_list['prev'] = node;
            this.linked_list = node;
        }
        this.updateList();
    }
    deleteMsg(id){
        let node = this.getNodeFromList(id);
        delete this.hashmap[id];
        this.updateList();
    }
    getNodeFromList(id){
        let node = this.hashmap[id];
        let prevNode = node['prev'];
        let nextNode = node['next'];
        if(prevNode!==null)
            prevNode['next'] = nextNode;
        if(nextNode!==null)
            nextNode['prev'] = prevNode;
        if(node===this.linked_list){
            this.linked_list = nextNode;
        }
        node['next'] = null;
        node['prev'] = null;
        return node;
    }

    updateList(){
        let innerHTML = '';
        let head = this.linked_list;
        while(head!==null){
            let element = head['chat_item'];
            if(head===this.linked_list){
                element.className = "ks-item ks-active";
                element.querySelector('#Time').innerText = this.getTime();
            } else{
                element.className = "ks-item";
            }
            innerHTML += element.outerHTML;
            head = head['next'];
        }
        this.chat_list.innerHTML = innerHTML;
    }

}
