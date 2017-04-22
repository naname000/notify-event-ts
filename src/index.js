/**
 * Created by naname on 2017/04/21.
 */
'use strict';

const TeamspeakObserver = require('teamspeak-observer');
const LineAPI = require('line-api');

const notify = new LineAPI.Notify({
    token: process.env.LINE_TOKEN
});

setTimeout(function() {
    console.log('trying to connect ts3 server query console.');

    const observer = new TeamspeakObserver(
        'teamspeak3',
        process.env.TS_PORT,
        process.env.TS_SERVERADMIN,
        process.env.TS_SA_PASSWORD
    );
    console.log('instance created');

// observer.tsquery.sock.setTimeout(1000, function(){
//     console.log('Connection failed. Timed out.');
//     process.exit();
// });
// observer.tsquery.sock.setTimeout(3);

    observer.on(TeamspeakObserver.ONTIMEOUT, function() {
        console.log('Connection failed. Timed out.');
        process.exit();
    });

    observer.on(TeamspeakObserver.ONCONNECTED, () => {
        console.log('connected');
        observer.login();
    });

    observer.on(TeamspeakObserver.ONCLIENTENTERVIEW, (data) => {
        console.log('connection detected');
        notify.send({
            message: data.client_nickname + 'さんがログインしました。'
        });
    });

    console.log('ends');
// TODO パスワード、トークン類の外だし
// TODO 無通信によるタイムアウトの検証。必要があればKeepAliveの実装。
}, 10000);
