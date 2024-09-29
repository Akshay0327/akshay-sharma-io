const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

const today = new Date();
const year = today.getFullYear();
const copyright = document.createElement('p');
copyright.innerHTML = `<span>Akshay</span><span>&#169</span><span>${year}</span>`;
footer.appendChild(copyright);

const skillsList = ['JavaScript', 'HTML', 'CSS', 'GitHub'];
const skillsSections = document.getElementById('skills');
const skillUL = skillsSections.querySelector('ul');

for(let skill of skillsList){
    let skillItem = document.createElement('li');
    skillItem.innerHTML = skill;
    skillUL.appendChild(skillItem);
}


//Message Handling

let messageForm = document.querySelector("[name='leave_message']");
let messageSection = document.getElementById('message-section');
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let name = event.target.usersName.value;
    let email = event.target.usersEmail.value;
    let message = event.target.usersMessage.value;
    let newMessage = document.createElement('li');
    newMessage.classList.add('message-item');
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> wrote: <span>${message}</span>`;

    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.className = 'edit-button';
    editButton.addEventListener('click', () => editMessage(newMessage, name, email, message));

    let removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
        newMessage.remove();
        if (messageList.childElementCount === 0) {
            messageSection.hidden = true;
        }
    });
    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);
    messageSection.hidden = false;

    messageForm.reset();
});

function editMessage(messageItem, name, email, message) {
    
    let editForm = document.createElement('form');
    editForm.className = 'edit-message-form';
    editForm.innerHTML = `
        <input type="text" name="usersName" value="${name}" required />
        <input type="email" name="usersEmail" value="${email}" required />
        <textarea name="usersMessage" required>${message}</textarea>
        <button type="submit">Save</button>
    `;

    
    messageItem.replaceWith(editForm);

    
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let updatedName = event.target.usersName.value;
        let updatedEmail = event.target.usersEmail.value;
        let updatedMessage = event.target.usersMessage.value;

        
        messageItem.innerHTML = `
            <a href="mailto:${updatedEmail}">${updatedName}</a> wrote: <span>${updatedMessage}</span>
        `;

        
        let editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'edit-button';
        editButton.addEventListener('click', () => editMessage(messageItem, updatedName, updatedEmail, updatedMessage));

        let removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', () => {
            messageItem.remove();
            if (messageList.childElementCount === 0) {
                messageSection.hidden = true;
            }
        });

        messageItem.appendChild(editButton);
        messageItem.appendChild(removeButton);

        
        editForm.replaceWith(messageItem);
    });
}
