// Inicializar la conexión con socket.io
const socket = io(); //Instancio socket.io

// Obtener referencias a los elementos del DOM
const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');

// Solicitar al usuario su nombre de usuario usando SweetAlert2
let user = Swal.fire({
  title: 'Inicio de Sesion',
  input: 'text',
  text: 'Por favor ingrese su nombre de usuario para continuar',
  inputValidator: (valor) => {
    return !valor && 'Ingrese un valor valido';
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
  console.log(user);
});

// Evento change para detectar cambios en el cuadro de chat
chatBox.addEventListener('change', (e) => {
  if (chatBox.value.trim().length > 0) {
    // Si el input no está vacío, enviar un mensaje al servidor
    socket.emit('mensaje', {
      usuario: user,
      mensaje: chatBox.value,
      hora: new Date().toLocaleString(),
    });
    chatBox.value = ''; // Limpiar el cuadro de chat
  }
});

// Escuchar respuestas del servidor
socket.on('respuesta', (info) => {
  messageLogs.innerHTML = ''; // Limpiar los registros de mensajes
  // Iterar a través del array de mensajes y mostrarlos
  info.forEach((mensaje) => {
    messageLogs.innerHTML += `<p>${mensaje.hora}hs. Usuario ${mensaje.usuario} dice: ${mensaje.mensaje}</p>`;
  });
});
