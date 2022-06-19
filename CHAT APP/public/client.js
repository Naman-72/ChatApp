const socket = io()

let Name ='';

do {
    Name = prompt('What is your name ?')
} while (!Name);
socket.emit("user_join",Name);
socket.on('new_user',(x)=>{
    msg={
        message : "User Joined",
        user : x
    }
    appendMessage(msg,'notif')
})
socket.on('user_left',(x)=>{
    msg={
        message : "User Left",
        user : x
    }
    appendMessage(msg,'notif')
})
let textarea = document.querySelector('#textarea')
textarea.addEventListener('keyup',(e)=>{
    if(e.key ==='Enter')
    {
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    msg={
        message : message.trim(),
        user : Name
    }
    appendMessage(msg,'outgoing')
    autoscroll()
    textarea.value='';
    // send to server
    socket.emit('message',msg)
}


let chatarea = document.querySelector('.chat-area')
function appendMessage(msg,type)
{
    let mainDiv = document.createElement('div')
    if (type === 'user_left')
    {

    }
    mainDiv.classList.add('message',type)
    let markup=`
    <h3>${ msg.user }</h3>
    <p>${ msg.message }</p>
      `
    mainDiv.innerHTML = markup
    chatarea.appendChild(mainDiv)
}


socket.on('message1',(msg)=>{
    appendMessage(msg,'incoming')
    autoscroll()
})


function autoscroll(){
    chatarea.scrollTop = chatarea.scrollHeight
}
