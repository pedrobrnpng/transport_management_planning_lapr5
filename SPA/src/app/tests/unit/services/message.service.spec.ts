import { TipoTripulante } from 'src/app/models/tipoTripulante';
import { MessageService } from '../../../services/message.service';

describe('Service: Message', () => {
    let messageService: MessageService= new MessageService();

    it('should log', () => {
        messageService.log("message");
        expect(messageService.message).toBe("message");
    });

    it('should clear',() => {
        messageService.clear();
        expect(messageService.message).toBe("");
    });
});
