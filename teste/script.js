function validateForm(event) {
    const name = document.getElementById('todo-name');
    const description = document.getElementById('todo-description');
    const startDateTime = document.getElementById('todo-startdatetime');
    const endDateTime = document.getElementById('todo-enddatetime');
    
    if (!name.value || !description.value || !startDateTime.value || !endDateTime.value) {
      event.preventDefault(); // Impede a submissão do formulário
      
      // Personalize a mensagem de erro
      alert("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
  }