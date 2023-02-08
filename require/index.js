const superagent = require('../superagent');
const {machineIdSync} = require('node-machine-id');
const crypto = require("crypto");
let md5 = crypto.createHash('md5');
let uniqueId = md5.update(machineIdSync()).digest('hex'); // 获取机器唯一识别码并MD5，方便机器人上下文关联
const TXHOST = 'https://api.tianapi.com/'; // 天行host


async function getWAReply(word) {
    let url = TXHOST + 'pyqwenan/index';
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: 'ce2a030ed35a04dc4493500c765a803c',
            userid: uniqueId
        }
    });

    if (content.code === 200) {
        let response = content.newslist[0].reply;
        console.log('天行对接的图灵机器人:', content);
        return response;
    } else {
        return '知识匮乏';
    }
}

// 天行对接的图灵机器人
async function getTXTLReply(word) {
    let url = TXHOST + 'robot/index';
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: 'ce2a030ed35a04dc4493500c765a803c',
            question: word,
            userid: uniqueId
        }
    });

    if (content.code === 200) {
        let response = content.newslist[0].reply;
        console.log('天行对接的图灵机器人:', content);
        return response;
    } else {
        return '我好像迷失在无边的网络中了，接口调用错误：' + content.msg;
    }
}

module.exports = {
    getTXTLReply,
    getWAReply
};
