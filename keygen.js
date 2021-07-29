let storage = new Set();

const btn = document.querySelector('.btn a');
const keysList = document.querySelector('.keys');
const copyBlock = document.querySelector('.copy');
const copyComplete = document.querySelector('.copy__wrapper');

btn.addEventListener('click', (e) => {
    e.preventDefault;

    generateKeys(4,4);
    
})

window.addEventListener('mousemove', (e) => {
    if (copyBlock.classList.contains('active') && storage.size > 0) {
        copyComplete.style.top = window.event.clientY+35 +'px';
        copyComplete.style.left = window.event.clientX-23 +'px';
    }
})

keysList.addEventListener('click', (e) => {
    e.preventDefault;
    const keys = document.querySelectorAll('.keys__item');
    keys.forEach((item, i) => {
        if (e.target === item) {
            item.select();
            document.execCommand("copy");
            copyComplete.style.display = 'block';
            setTimeout(()=>{copyComplete.style.display = 'none'}, 5000);
        }
    })
})

const generateKeys = (size, group) => {
    const lenght = size * group;
    const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z']
    //const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'V', 'X', 'Y', 'Z', '$', '!', '@', '#', '%', '^', '&', '*', '(', ')']

    let initialKey = '';
    for (let i = 1; i <= lenght; i++) {
        let value = symbols[Math.floor(Math.random() * symbols.length)];
        initialKey += value;
    }
    let key = initialKey.match(/.{4}/g).join('-');
    if (storage.has(key)) {
        console.log(`Ключ совпал: ${key}. Генерирую новый...`);
        generateKeys(size, group);
    } else {
        storage.add(key);
        const div = document.createElement('input');
        div.classList.add('keys__item');
        div.setAttribute("readonly", true)
        div.value = key;
        setTimeout(()=>{div.style.opacity = '1';div.style.left='0'}, 100);
        keysList.append(div);
        let a = keysList.scrollHeight;
        keysList.scrollTop = a;
        
        copyBlock.classList.add('active');
    }

    if (storage.size >= 10) {
        keysList.style.overflowY = 'scroll';
    }
    
}

const switchThemeBtn = document.querySelector('#myswitch');

const body = document.body;

switchThemeBtn.addEventListener('change', switchTheme);

function switchTheme () {
    body.classList.toggle('light-theme');
    if (body.classList.contains('light-theme')) { 
	    localStorage.setItem('theme', 'light');
    } else {
	    localStorage.setItem('theme', 'dark');
    }
}

function theme() {
    if (localStorage.getItem('theme') == 'dark') {
        body.classList.remove('light-theme');
    } else if (localStorage.getItem('theme') == 'light') {
        body.classList.add('light-theme');
        switchThemeBtn.checked=true;
    } else {
        body.classList.add('dark-theme');
	    localStorage.setItem('theme', 'dark');
    }
}
theme();