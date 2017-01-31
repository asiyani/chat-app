const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');

describe("generateMessage", () => {
    it('Should generate correct message object', () => {
        let message = generateMessage('test@email.com', 'Hi there' );
        
            expect(message).toInclude({from:'test@email.com',text:'Hi there'});
            expect(message.createdAt).toExist();
        
    })
});


describe('generateLocationMessage', () => {
    it('should generate correct location message', () => {
        let message =  generateLocationMessage('Admin', 55.3049, -92.94)

        expect(message.from).toBe('Admin');
        expect(message.url).toBe('https://www.google.com/maps?q=55.3049,-92.94');
        expect(message.createdAt).toExist();
    });
});