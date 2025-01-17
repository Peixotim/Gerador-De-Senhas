function getCharTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    const charTypes = [];

    if (uppercase) charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (lowercase) charTypes.push('abcdefghijklmnopqrstuvwxyz');
    if (number) charTypes.push('0123456789');
    if (specialCharacter) charTypes.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');

    return charTypes;
}

function getPasswordSize() {
    const size = parseInt(document.querySelector('#size').value, 10);

    if (isNaN(size) || size < 4 || size > 128) {
        message('Tamanho inválido! Digite um número entre 4 e 128.', 'danger');
        return null;
    }

    return size;
}

function generatePassword(size, charTypes) {
    let passwordGenerated = '';
    const selectedChars = charTypes.join('');

    // Garante pelo menos um caractere de cada tipo
    charTypes.forEach(type => {
        passwordGenerated += type[Math.floor(Math.random() * type.length)];
    });

    // Preenche o restante da senha
    while (passwordGenerated.length < size) {
        passwordGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    // Embaralha a senha gerada
    passwordGenerated = passwordGenerated.split('').sort(() => Math.random() - 0.5).join('');

    return passwordGenerated;
}

function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    })
    .showToast();
}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    const charTypes = getCharTypes();

    if (!size) return;

    if (!charTypes.length) {
        message('Selecione pelo menos um tipo de caractere!', 'danger');
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

document.querySelector('#copy').addEventListener('click', function () {
    const password = document.querySelector('#password').textContent;

    if (!password) {
        message('Nenhuma senha para copiar!', 'danger');
        return;
    }

    navigator.clipboard.writeText(password);
    message('Senha copiada com sucesso!', 'success');
});