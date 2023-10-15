const socket = io();

socket.on("message",(message)=>{
  console.log(message);
  const div=document.createElement('div');
  div.className="chatBoxdiv";
  div.innerHTML=`<p class="chatBoxPara">${message}</p>`;
  chatBox.appendChild(div);
})
const chatBox=document.getElementById("chatBox");
const message = document.getElementById('text_input');
const btn = document.getElementById('submit');
btn.addEventListener('click', () => {
  const messageInput=message.value;
  socket.emit("user-message",messageInput );
})