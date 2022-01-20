module.exports.help = {
  name: 'minesweeper',
  description: "Start minesweeper on discord",
  aliases: []
};

module.exports.run = (message, args, client) => {
    var cases = {};

    for (let x = 0; x < 10; x++) {
        cases[x] = {};

        for (let y = 0; y < 10; y++) {
            cases[x][y] = {
                mined: false,
                value: 0
            };
        };
      //this thing generates all cells
    };

    let numberOfMines = functions.random(5, 10);
    for (let i = 0; i < numberOfMines; i++) {
        const x = functions.random(9);
        const y = functions.random(9);

        cases[x][y].mined = true;
    };

    const getNumberOfMines = (xx, yy) => {
        const x = parseInt(xx);
        const y = parseInt(yy);

        if (cases[x][y].mined) {
            return false;
        }
        
        let counter = 0;
        const hasLeft = y > 0;
        const hasRight = y < (9 - 1);
        const hasTop = x > 0;
        const hasBottom = x < (9 - 1);
        // top left
        counter += +(hasTop && hasLeft && cases[x - 1][y - 1].mined);
        // top
        counter += +(hasTop && cases[x - 1][y].mined);
        // top right
        counter += +(hasTop && hasRight && cases[x - 1][y + 1].mined);
        // left
        counter += +(hasLeft && cases[x][y - 1].mined);
        // right
        counter += +(hasRight && cases[x][y + 1].mined);
        // bottom left
        counter += +(hasBottom && hasLeft && cases[x + 1][y - 1].mined);
        // bottom
        counter += +(hasBottom && cases[x + 1][y].mined);
        // bottom right
        counter += +(hasBottom && hasRight && cases[x + 1][y + 1].mined);
        return counter;
    };

    //Here we update the value of every cells
    Object.keys(cases).forEach((x) => {
        Object.keys(cases[x]).forEach((y) => {
            const selected = cases[x][y];
            if (!selected.mined) {
                cases[x][y].value = getNumberOfMines(x, y);
            };
        });
    });

    let content = '';
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {       
            const emojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣'];
            const selected = cases[x][y];
            if (selected.mined) content+='||:bomb:||'
            else content+=`||${emojis[selected.value]}||`;
        };

        content+= '\n'
    };
  
        //This is an inline reply with discord.js v13
        const object = {
            data: {
                    message_reference: {
                    message_id: message.id,
                },
                content: content
            }
        };

        client.api.channels[message.channel.id].messages.post(object);
}
