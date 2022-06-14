// test('sum 2 + 2', () => {
//     expect(2 + 2).toBe(4)
// })

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// switch de teste 
// varios tests para um único arquivo

// espioes no jest é a meneira de descobrir que as funcoes estão sendo chamadas

const createFeedbackSpy = jest.fn() // criando as funções espiãs que serão monitoradas pelo jest
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commet: 'exemple commet',
            screenshot: 'data:image/pbg;base64,ofkoafoanfaf'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled() //e eu espero que a função seja tenha sido chamada
        expect(sendMailSpy).toHaveBeenCalled()
    })

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            commet: 'exemple commet',
            screenshot: 'data:image/pbg;base64,ofkoafoanfaf'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without commet', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commet: '',
            screenshot: 'data:image/pbg;base64,ofkoafoanfaf'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            commet: 'Exemple bug',
            screenshot: 'test.png'
        })).rejects.toThrow();
    })

    
})