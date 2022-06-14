import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";


export class PrismaFeedbackRepository implements FeedbacksRepository {
    async create({ type, commet, screenshot }: FeedbackCreateData) {
        await prisma.feedback.create({ 
        data: {
            type,
            commet,
            screenshot
        }
    })
    };
}

// Como estamos trabalhando com o Prisma, criamos um pasta chamada prisma e implementos os ações/verbos/funcoes que queremos que sejam feitas
// aqui dentro fazemos a criação de feedback