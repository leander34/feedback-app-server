// cada use-case tem apenas um metodo, uma única responsabilidade
// nesse caso, executar a submissão de um feedback

import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

// essa interface pertence a cada de aplição (camada que lida com a regra de negócio da aplicação)
interface SubmitFeedbackUseCaseRequest {
    type: string;
    commet: string;
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        // no nosso caso estamos usando o prisma
        // mas se estivessemos utilizando orm, passariamos ele, já que nossa aplicação é totalmente independente dele
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}
    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, commet, screenshot } = request

        if(!type) {
            throw new Error('Type is required.')
        }

        if(!commet) {
            throw new Error('Commet is required.')
        }
        
        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }
        await this.feedbacksRepository.create({
            type,
            commet,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
            '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${commet}</p>`,
            screenshot ? `<img src="${screenshot}" />` : '',
            '</div>'
        ].join('\n')
        })
    }
}

