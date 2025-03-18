interface IMessages {
    startCommand: (username: string) => string;
}

export const messages: IMessages = {
    startCommand: (username: string) => {
        return `@${username}\nAssalomu Alaykum👋🏻\nПривет👋🏻\nHello👋🏻\n\nTilni tanlang!\nВыберите язык!\nSelect language!`
    }
}