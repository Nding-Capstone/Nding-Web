

function getRankData(){
    var first = getCookie('first');
    var second = getCookie('second');
    var third = getCookie('third');
    var score = getCookie('score');


    setData(first, score[0], 'first');
    setData(second, score[1], 'second');
    setData(third, score[2], 'third');


}

function getCookie(cname){
    var name = cname+"=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                var data=c.substring(name.length, c.length).slice(2,);
                return JSON.parse(data);
            }
        }
        return "";
}

function setData(cookie, scoreD, rank){
    var title = document.getElementById(rank+'Title');
    var singer = document.getElementById(rank+'Singer');
    var img = document.getElementById(rank + 'Img');
    var box = document.getElementById(rank+'Box');
    var score = document.getElementById(rank + 'Score');

    title.innerHTML = cookie.title;
    singer.innerHTML = cookie.singer;
    score.innerHTML = scoreD+'%';
    box.addEventListener("click", function(){

        location.href = cookie.link});
    img.src = 'image/'+cookie.title+'.png';
}
window.onload = function(){
    getRankData();
}
