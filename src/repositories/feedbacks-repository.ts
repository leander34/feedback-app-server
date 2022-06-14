// essa interface pertece a camada de dados da aplicação
export interface FeedbackCreateData {
    type: string;
    commet: string;
    screenshot?: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>
    // update: (data: FeedbackCreateData) => Promise<void>
    // delete: (data: FeedbackCreateData) => Promise<void>
}

// nesse arquivo colocamos todas as ações que podemos fazer com os feedbacks da aplicação. Nesse caso como é uma aplicação simples, só vamos ter um tipo de verbo que é o de criar novos feedbacks, mas se nessa aplicação tivessemos funções de deletar ou atualizar feedbacks, colocariamos aqui também
