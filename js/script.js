const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if(url === '') {
        alert('Please enter an URL');
    } else {
        showSpinner();

        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);

            setTimeout(() => {
                const saveURL = qr.querySelector('img').src;

                createSaveBTN(saveURL);
            }, 50)
        }, 1000);
    };
};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
    qr.innerHTML = '';

    const saveBTN = document.getElementById('save-link');

    if(saveBTN){
        saveBTN.remove();
    }
};

const createSaveBTN = (saveURL) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveURL;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit)
