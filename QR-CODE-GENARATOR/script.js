const DataForQR = document.querySelector('#data-input');
const QrPlace = document.querySelector('.placement');
const GenarateButton = document.querySelector('#gen');
const DownloadBtn = document.querySelector('#db');
const foreground = document.querySelector('#fg');
const background = document.querySelector('#bg');
const SizeOption = document.querySelector('#size');

const BackgroundColor = '#ffffff';
const ForegroundColor = '#000000';

DataForQR.addEventListener('change', function(){
    if (this.value === ""){
        GenarateButton.disabled = true;
    }else{
        GenarateButton.disabled = false;
    }
})

GenarateButton.addEventListener('click', () => {
    QrPlace.innerHTML = "";
    var qrcode = new QRCode(QrPlace, {
        text: DataForQR.value,
        width: SizeOption.value,
        height: SizeOption.value,
        colorDark : foreground.value,
        colorLight : background.value,
        correctLevel : QRCode.CorrectLevel.H
    });
    qrcode.makeCode(DataForQR.value);
    let data = QrPlace.firstChild.toDataURL('image/png');
    DownloadBtn.addEventListener('click', () => {
        let a = document.createElement('a');
        a.href = data;
        a.download = "qrcode" + String(SizeOption.value);
        a.click();
        a.remove();
    });
});

foreground.value = ForegroundColor;
background.value = BackgroundColor;
GenarateButton.disabled = true;
