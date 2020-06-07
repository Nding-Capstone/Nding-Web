

function runModel(callback){
    console.log('runModel in js')
    fetch('/process/runModel')
    .then(function(req,res){
        callback();
    })
}

function showNextButton(){
    console.log('callback');
    
    var ment = document.getElementById('loadingMent');
    var next = document.getElementById('nextButton');
    //var icon = document.getElementById('loadIcon');
    
    //icon.style.display = 'none';
    ment.innerHTML = "안무 검색이 완료되었습니다!";
    next.style.display = 'block';
}

function playVideo(index){
    var cnt=0;
    var tmp = index;
    var charIndex='';
    var img = document.getElementById('showSkeleton');
    var dir = './test_out/input/'
    
    if(index==149){
        return setTimeout(playVideo,70, 0);
    }
    
    
    while(tmp > 0){
        tmp = parseInt(tmp/10);
        cnt = cnt+1;
    }

    tmp = index;

    
    
    for(var i=0;i<5-cnt;i++){
        charIndex = charIndex+'0';
    }

    if(index!=0){
        charIndex = charIndex + tmp;
    }


    

    img.src = dir + charIndex + '.jpg';

    console.log(dir + charIndex + '.jpg');



    
    return setTimeout(playVideo,70, index+1)
}


window.onload = function(){
    setTimeout(playVideo, 1000, 0);
    runModel(showNextButton);
}
