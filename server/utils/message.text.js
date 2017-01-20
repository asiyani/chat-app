const expect = require('expect');
const {generateMessage} = require('./message');

describe("generateMessage", () => {
    it('Should generate correct message object', () => {
        let message = generateMessage('test@email.com', 'Hi there' );
        
            expect(message).toInclude({from:'test@email.com',text:'Hi there'});
            expect(message.createdAt).toExist();
        
    })
});