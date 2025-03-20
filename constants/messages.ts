interface IMessages {
    startCommand: (username: string) => string;
}

export const messages: IMessages = {
    startCommand: (username: string) => {
        return `@${username}\nAssalomu Alaykum👋🏻\nHello👋🏻\nПривет👋🏻\n\nTilni tanlang! 🇺🇿\nSelect language! 🇺🇸\nВыберите язык! 🇷🇺`
    },
}