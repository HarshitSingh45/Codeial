const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailers');

// every worker has process function, this function tells the worker whenever a new task is added into this queue, you need to run the code inside this process function
queue.process('emails', function(job, done){
    console.log('emails worker is processing the job', job.data);

    commentsMailer.newComment(job.data);

    done();

})