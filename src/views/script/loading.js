

async function runModel(callback){
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
    console.log(next);
    ment.innerHTML = "안무 검색이 완료되었습니다!"
    next.style.display = 'block';
}

runModel(showNextButton);