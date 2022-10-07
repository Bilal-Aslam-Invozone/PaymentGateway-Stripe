const mailSend = require('@invozone/node-email');
const emailQueueProcessor = async(job, done) => {
    const email= job.data.data.customer_details.email;
    const name = job.data.data.customer_details.name;
    
      const msgObj = {
              from: 'invoswift@invozone.com',
              to: email,
              cc: 'cc.user@invozone.com',
              bcc: 'bcc.user@invozone.com',
              subject: 'Test Email',
              templateName: 'exampleTemplate.ejs',
          };
          const dataObject = {
              name: name,
          };
          const path = require('path').resolve(__dirname, '../email/src/templates/exampleTemplate.ejs')
          // const data = await ejs.renderFile(path, dataObject);
        
          const result = await mailSend(msgObj, dataObject,path);
          if(!result) {
            console.log(msgObj);
            throw new Error('Failed to send Email. Please check logs for details');
            return;
            }
           
            console.log(result, "Email Sent Successfully")
            setTimeout(() => {
                done();
            }, 4000);
    
    };
    module.exports = emailQueueProcessor;