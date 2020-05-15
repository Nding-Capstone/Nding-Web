
module.exports = {
    run: function(){
        const {spawn} = require('child_process');

        console.log('skeleton 실행됨');

        var largeDataSet = [];
        // spawn new child process to call the python script
        // const python = spawn('python', ['test_out/script3.py']);
        const python = spawn('python', ['./models/extract_skeleton_vector.py']);
        
        // collect data from script
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            largeDataSet.push(data);
        });
        
        // in close event we are sure that stream is from child process is closed
        python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
           
        });

    }
}