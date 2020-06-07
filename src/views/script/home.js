
function checkVideo(){

    const inputFile = document.getElementById('file');
    let video = document.getElementById('video');

    document.getElementById('videoIcon').style.display = 'none';
    document.getElementById('fileCheck').style.display = 'inline-block';
    // document.getElementById('fileUpload').style.display = 'none';



    const fReader = new FileReader();
    fReader.readAsDataURL(inputFile.files[0]);
    fReader.onloadend = function(event){
        video.src = event.target.result;
        video.ondurationchange = function() {
            setCookie("length",video.duration,1,"/");
            console.log(getCookie('length'));
          };
        document.getElementById('nextBtn').value = inputFile.files[0].name;
    }

} // checkVideo()

function setCookie(cookieName, cookieValue, cookieExpire, cookiePath, cookieDomain, cookieSecure){
    var cookieText=escape(cookieName)+'='+escape(cookieValue);
    document.cookie=cookieText;
}


function getCookie(cookieName){
    var cookieValue=null;
    if(document.cookie){
        var array=document.cookie.split((escape(cookieName)+'='));
        if(array.length >= 2){
            var arraySub=array[1].split(';');
            cookieValue=unescape(arraySub[0]);
        }
    }
    return cookieValue;
}
