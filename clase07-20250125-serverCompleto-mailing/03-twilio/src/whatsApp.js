const accountSid = 'twilio id';
const authToken = 'twilio token';

// const client = require('twilio')(accountSid, authToken);
import twilio from "twilio"

const client=twilio(accountSid, authToken)

client.messages
    .create({
        from: 'whatsapp:+14155238886',
        contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: '{"1":"12/1","2":"3pm"}',
        to: 'whatsapp:+5491154200776'
    })
    .then(message => console.log(message.sid))
    // .done();