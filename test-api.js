// 简单的API测试脚本
const https = require('https');
const querystring = require('querystring');

// 测试登录API
function testLoginApi() {
    const postData = querystring.stringify({
        device_id: 'device_test_' + Date.now()
    });

    const options = {
        hostname: 'mineadmin.thebbxxzm.top',
        port: 443,
        path: '/api/web/loginApi',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'Node.js Test Client'
        }
    };

    console.log('测试登录API...');
    console.log('请求数据:', postData);
    console.log('请求URL:', `https://${options.hostname}${options.path}`);

    const req = https.request(options, (res) => {
        console.log('响应状态:', res.statusCode);
        console.log('响应头:', res.headers);

        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('响应数据:', data);
            try {
                const jsonData = JSON.parse(data);
                console.log('解析后的数据:', JSON.stringify(jsonData, null, 2));
            } catch (e) {
                console.log('响应不是有效的JSON');
            }
        });
    });

    req.on('error', (e) => {
        console.error('请求错误:', e.message);
    });

    req.write(postData);
    req.end();
}

// 测试用户信息API
function testUserInfoApi() {
    const postData = querystring.stringify({});

    const options = {
        hostname: 'mineadmin.thebbxxzm.top',
        port: 443,
        path: '/api/web/memberinfo',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'Node.js Test Client'
        }
    };

    console.log('\n测试用户信息API...');
    console.log('请求URL:', `https://${options.hostname}${options.path}`);

    const req = https.request(options, (res) => {
        console.log('响应状态:', res.statusCode);
        console.log('响应头:', res.headers);

        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('响应数据:', data);
            try {
                const jsonData = JSON.parse(data);
                console.log('解析后的数据:', JSON.stringify(jsonData, null, 2));
            } catch (e) {
                console.log('响应不是有效的JSON');
            }
        });
    });

    req.on('error', (e) => {
        console.error('请求错误:', e.message);
    });

    req.write(postData);
    req.end();
}

// 运行测试
console.log('开始API测试...\n');
testLoginApi();

// 延迟2秒后测试用户信息API
setTimeout(() => {
    testUserInfoApi();
}, 2000); 