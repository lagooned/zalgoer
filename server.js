
var express = require("express")
var app = express()
var port = process.env.PORT || 6969

app.listen(port, () => {
    console.log("Server running on " + port)
})

app.get("/", (req, res, next) => {
    let toBeZalgoed = req.query.string
    res.json(zalgo(toBeZalgoed ? toBeZalgoed : ""))
})


function rand(min, max) {
    return Math.floor(Math.random() * (max-min + 1) + min);
}

function zalgo(text) {

    var zalgo_up = [
        '\u030d' ,'\u030e' ,'\u0304' ,'\u0305'
        ,'\u033f' ,'\u0311' ,'\u0306' ,'\u0310'
        ,'\u0352' ,'\u0357' ,'\u0351' ,'\u0307'
        ,'\u0308' ,'\u030a' ,'\u0342' ,'\u0343'
        ,'\u0344' ,'\u034a' ,'\u034b' ,'\u034c'
        ,'\u0303' ,'\u0302' ,'\u030c' ,'\u0350'
        ,'\u0300' ,'\u0301' ,'\u030b' ,'\u030f'
        ,'\u0312' ,'\u0313' ,'\u0314' ,'\u033d'
        ,'\u0309' ,'\u0363' ,'\u0364' ,'\u0365'
        ,'\u0366' ,'\u0367' ,'\u0368' ,'\u0369'
        ,'\u036a' ,'\u036b' ,'\u036c' ,'\u036d'
        ,'\u036e' ,'\u036f' ,'\u033e' ,'\u035b'
        ,'\u0346' ,'\u031a'
    ];

    var zalgo_mid = [
        '\u0315', '\u031b', '\u0340', '\u0341',
        '\u0358', '\u0321', '\u0322', '\u0327',
        '\u0328', '\u0334', '\u0335', '\u0336',
        '\u034f', '\u035c', '\u035d', '\u035e',
        '\u035f', '\u0360', '\u0362', '\u0338',
        '\u0337', '\u0361', '\u0489'
    ];

    var zalgo_down = [
        '\u0316', '\u0317', '\u0318', '\u0319',
        '\u031c', '\u031d', '\u031e', '\u031f',
        '\u0320', '\u0324', '\u0325', '\u0326',
        '\u0329', '\u032a', '\u032b', '\u032c',
        '\u032d', '\u032e', '\u032f', '\u0330',
        '\u0331', '\u0332', '\u0333', '\u0339',
        '\u033a', '\u033b', '\u033c', '\u0345',
        '\u0347', '\u0348', '\u0349', '\u034d',
        '\u034e', '\u0353', '\u0354', '\u0355',
        '\u0356', '\u0359', '\u035a', '\u0323'
    ];

    // create array, loop through and add zalgo
    var textinArray = text.split('');
    var smax = 15;
    var mmax = 3;

    var tmp = [];
    for (var i in textinArray) {

        var char = textinArray[i];

        if (char != "\n") {

            loop = rand(0,smax);
            midloop = rand(0,mmax);

            // add upward zalgo
            if (rand(0,10) > 2) {

                for (let i = 1; i <= loop; i++) {
                    char = char + zalgo_up[rand(0, zalgo_up.length - 1)];
                }

            }

            // add middle zalgo
            if (rand(0,10) > 2) {

                for(let i = 1; i <= midloop; i++) {
                    char = char + zalgo_mid[rand(0, zalgo_mid.length - 1)];
                }

            }

            // add downward zalgo
            if (rand(0,10) > 2) {

                for (let i = 1; i <= loop; i++) {
                    char = char + zalgo_down[rand(0, zalgo_down.length - 1)];
                }

            }

        }

        tmp.push(char);

    }

    return tmp.join("").replace(/(?:\r\n|\r|\n)/g, '<br />').trim();

}

