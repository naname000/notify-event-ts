/**
 * Created by naname on 2017/04/21.
 */
'use strict';
const TeamspeakObserver = require('teamspeak-observer');
const LineAPI = require('line-api');

const notify = new LineAPI.Notify({
    token: 'eeYj7TJebqyX08jbbW3PMIvG56bC0L7JBsEZ69XX9y9'
})
const observer = new TeamspeakObserver('127.0.0.1', 10011, 'serveradmin', 'sLkn8BnK');
observer.on(TeamspeakObserver.ONCONNECTED, () => observer.login());
observer.on(TeamspeakObserver.ONCLIENTENTERVIEW, (data) => {
    notify.send({
        message: data.client_nickname + 'さんがログインしました。'
    });
});

// TODO パスワード、トークン類の外だし
// TODO 無通信によるタイムアウトの検証。必要があればKeepAliveの実装。