
if (localStorage.getItem('nodesAllContent') != null) {
    document.getElementById('index-box-content').innerHTML = localStorage.getItem('nodesAllContent');
}


// View More functions

function viewMore(noteTitle, noteText, noteColor) {
    let viewMoreModal = document.querySelector('.view-more-modal');
    let fundoEscuro = document.querySelector('.fundo-escuro');
    let noteLineColor = document.querySelector('.note-line-color-view-more');

    let viewMoreModalTitleDOM = document.querySelector('.view-more-modal-title');
    let viewMoreModalTextDOM = document.querySelector('.view-more-modal-text');

    viewMoreModalTitleDOM.innerHTML = `${noteTitle}`;
    viewMoreModalTextDOM.innerHTML = `${noteText}`;

    viewMoreModal.style.visibility = 'visible';
    viewMoreModal.style.opacity = '1';
    viewMoreModal.style.marginTop= '0';

    fundoEscuro.style.visibility = 'visible';
    fundoEscuro.style.opacity = '1';

    noteLineColor.style.backgroundColor = noteColor;
}

function closeViewMore() {
    let viewMoreModal = document.querySelector('.view-more-modal');
    let fundoEscuro = document.querySelector('.fundo-escuro');

    viewMoreModal.style.visibility = 'hidden';
    viewMoreModal.style.opacity = '0';
    viewMoreModal.style.marginTop= '-10%';

    fundoEscuro.style.visibility = 'hidden';
    fundoEscuro.style.opacity = '0';
}

// Save notes

function saveNotes() {
    let nodesAllContent = document.getElementById('dentro-index-box-content');
    localStorage.setItem('nodesAllContent', nodesAllContent.outerHTML);
}


// Create Note Modal functions

function openCreateNoteModal() {
    let createNoteModal = document.querySelector('.create-note-modal');
    let fundoEscuro = document.querySelector('.fundo-escuro');

    createNoteModal.style.visibility = 'visible';
    createNoteModal.style.opacity = '1';
    createNoteModal.style.marginTop= '0';

    fundoEscuro.style.visibility = 'visible';
    fundoEscuro.style.opacity = '1';
}

function closeCreateNoteModal() {
    let createNoteModal = document.querySelector('.create-note-modal');
    let fundoEscuro = document.querySelector('.fundo-escuro');

    createNoteModal.style.visibility = 'hidden';
    createNoteModal.style.opacity = '0';
    createNoteModal.style.marginTop= '-10%';

    fundoEscuro.style.visibility = 'hidden';
    fundoEscuro.style.opacity = '0';


    let cnTitle = document.getElementById('cnmf-title');
    let cnText = document.getElementById('cnmf-text');
    let cnColor = document.getElementById('cnmf-color-input');

    cnTitle.value = '';
    cnText.value = '';
    cnColor.value = '#0084ff';
}

// Add Note functions

function createNote() {
    let cnTitle = document.getElementById('cnmf-title').value;
    let cnText = document.getElementById('cnmf-text').value;
    let cnColor = document.getElementById('cnmf-color-input').value;
    

    let cnTextLB = cnText.replaceAll('\n', '<br>');


    if (cnTextLB.length > 200) {
        var tresPontos = '...';
    } else {
        var tresPontos = '';
    }

    let noteBox = document.createElement('div');
    noteBox.id = 'newNoteBox';
    noteBox.classList.add('note-box');

    noteBox.innerHTML = `
        <div class="note-line-color" style="background-color: ${cnColor};"></div>
        <h2>${cnTitle}</h2>
        <p>${cnTextLB.slice(0, 200) + tresPontos}</p>
        <div class="note-buttons-box">
            <button class="note-view-more-button" onclick="viewMore('${cnTitle}', '${cnTextLB}', '${cnColor}')">Ver mais</button>
            <button class="note-edit-button"><i class="fas fa-pen"></i></button>
            <button class="note-trash-button"><i class="fas fa-trash-alt"></i></button>
        </div>
    
    `;

    document.getElementById('dentro-index-box-content').insertBefore(noteBox, document.getElementById('dentro-index-box-content').children[0]);

    saveNotes();
    removeNodeButtonLoopVerify();
    editNoteGetOldValues();

}

function removeNodeButtonLoopVerify() {
    var removeNodeButton = document.querySelectorAll('.note-trash-button');

    for (var i = 0; i < removeNodeButton.length; i++){
        removeNodeButton[i].onclick = function(e) {
            e.preventDefault();
            var li = this.parentNode.parentNode;
            li.parentNode.removeChild(li);
            
            saveNotes();

        }


    }
}

removeNodeButtonLoopVerify()



// Create Note Modal set color

function cnmfColorSelect() {
    let allSelectors = document.querySelectorAll('.cnmf-color-label');
    let allRadios = document.querySelectorAll('.cnmf-color-radio');
    let colorInput = document.getElementById('cnmf-color-input');


    setTimeout(
        ()=> {
            for (var i = 0; i < allRadios.length; i++) {
                if (allRadios[i].checked) {
                    for (var j = 0; j < allSelectors.length; j++) {
                        allSelectors[j].style.borderBottom = '10px solid white';
                        let colorHexToSet = allRadios[i].getAttribute('colorhex');
                        colorInput.value = colorHexToSet;
                    }

                    allSelectors[i].style.borderBottom = '10px solid rgb(115, 187, 255)';
                }
            }
        }, 10)
}

cnmfColorSelect();











// Edit Note Modal functions

function openEditNoteModal() {
    let editNoteModal = document.querySelector('.edit-note-modal');
    let fundoEscuro = document.querySelector('.fundo-escuro');

    editNoteModal.style.visibility = 'visible';
    editNoteModal.style.opacity = '1';
    editNoteModal.style.marginTop= '0';

    fundoEscuro.style.visibility = 'visible';
    fundoEscuro.style.opacity = '1';
}

function editNoteGetOldValues() {

    let editNodeButton = document.querySelectorAll('.note-edit-button');
    let confirmNoteEditButton = document.getElementById('enmf-buttton-confirm');

    for (var i = 0; i < editNodeButton.length; i++){
        editNodeButton[i].onclick = function(e) {
            e.preventDefault();
            let oldNoteTitleToEdit = this.parentNode.parentNode.getElementsByTagName('h2')[0].innerHTML.replaceAll('<br>', '\n'); // get first h2
            let oldNoteTextToEdit = this.parentNode.parentNode.getElementsByTagName('p')[0].innerHTML.replaceAll('<br>', '\n'); // get first p
            //let teste = this.parentNode.parentNode.getElementsByTagName('div')[0];
            //var oldNoteColorToEdit = window.getComputedStyle(teste, null).getPropertyValue('background-color'); // get first div

            

            

            let enTitle = document.getElementById('enmf-title');
            let enText = document.getElementById('enmf-text');
            let enColor = document.getElementById('enmf-color-input');

            enTitle.value = oldNoteTitleToEdit;
            enText.value = oldNoteTextToEdit;
            enColor.value = '#0084ff';
            openEditNoteModal();


            let noteTitleToEdit = this.parentNode.parentNode.getElementsByTagName('h2')[0]; // get first h2
            let noteTextToEdit = this.parentNode.parentNode.getElementsByTagName('p')[0]; // get first p
            let noteLineColorToEdit = this.parentNode.parentNode.getElementsByTagName('div')[0]; // get first div

            let noteViewMoreBtnToEdit = this.parentNode.getElementsByTagName('button')[0]; // get first button (view more -> onclick="viewMore()")


            //console.log('teste');

            //li.parentNode.appendChild(document.createTextNode('teste'));
            //saveNotes();

            confirmNoteEditButton.onclick = function(e) {
                e.preventDefault();

                let newNoteTitle = document.getElementById('enmf-title').value;
                let newNoteText = document.getElementById('enmf-text').value.replaceAll('\n', '<br>');
                let newNoteColor = enColor.value;

                if (newNoteText.length > 200) {
                    var tresPontos = '...';
                } else {
                    var tresPontos = '';
                }

                noteTitleToEdit.innerHTML = newNoteTitle;
                noteTextToEdit.innerHTML = newNoteText.slice(0, 200) + tresPontos;
                noteLineColorToEdit.style.backgroundColor = newNoteColor;

                noteViewMoreBtnToEdit.setAttribute('onclick', `viewMore('${newNoteTitle}', '${newNoteText}', '${newNoteColor}')`);
                closeEditNoteModal();
                //console.log('atualizado');
                saveNotes();

            }

            

        }


    }
}
editNoteGetOldValues();



function closeEditNoteModal() {
    let editNoteModal = document.querySelector('.edit-note-modal');
    let fundoEscuro = document.querySelector('.fundo-escuro');

    editNoteModal.style.visibility = 'hidden';
    editNoteModal.style.opacity = '0';
    editNoteModal.style.marginTop= '-10%';

    fundoEscuro.style.visibility = 'hidden';
    fundoEscuro.style.opacity = '0';


    let enTitle = document.getElementById('enmf-title');
    let enText = document.getElementById('enmf-text');
    let enColor = document.getElementById('enmf-color-input');

    enTitle.value = '';
    enText.value = '';
    enColor.value = '#0084ff';
}



// Edit Note Modal set color

function enmfColorSelect() {
    let allSelectors = document.querySelectorAll('.enmf-color-label');
    let allRadios = document.querySelectorAll('.enmf-color-radio');
    let colorInput = document.getElementById('enmf-color-input');


    setTimeout(
        ()=> {
            for (var i = 0; i < allRadios.length; i++) {
                if (allRadios[i].checked) {
                    for (var j = 0; j < allSelectors.length; j++) {
                        allSelectors[j].style.borderBottom = '10px solid white';
                        let colorHexToSet = allRadios[i].getAttribute('colorhex');
                        colorInput.value = colorHexToSet;
                    }

                    allSelectors[i].style.borderBottom = '10px solid rgb(115, 187, 255)';
                }
            }
        }, 10)
}

enmfColorSelect();


