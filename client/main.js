/**
 * Created by mario on 29/07/17.
 */
var socket = io.connect('http://192.168.100.21:6677', {'forceNew': true})
socket.on('messages', function (data) {
    console.log(data);

    render(data);
});

function render( data ) {
    var html = data.map(function (message, index) {
        console.log(message);
        return (`<div class="message">
            <strong>${message.nickname}</strong>
            <span>${message.text}</span>
            </div>`);
    }).join(' ');

    document.getElementById('messages').innerHTML = html;
}

function addMessage(form) {
    console.log(form);
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    }

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}