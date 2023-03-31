const WebSocketServer = require('ws').Server
const web_socket = new WebSocketServer({ port: 50007 })
import {deviceTypes,msgTypes} from './constants'

var mobileData = '0'
var webData = '0'

web_socket.on('connection', (currSocket:WebSocket) =>
{
    console.log('Connection established')

    currSocket.send('Your connection is established');
    currSocket.addEventListener('message', (message:any) =>
    {
        try
        {
            const audioData = JSON.parse(message.data)
            switch(audioData.msgType)
            {
                case msgTypes.mobileDataUpdate:
                {
                    switch(audioData.device)
                    {
                        case deviceTypes.mobile:
                            mobileData = audioData.data
                         
                            currSocket.send(JSON.stringify({msgType: msgTypes.txt_response, data: 'mobileFFT updated', device: deviceTypes.mobile}))
                            break;
                        case deviceTypes.web:
                            webData = audioData.data
                            currSocket.send(JSON.stringify({msgType:  msgTypes.txt_response, data: 'webFFT updated', device: deviceTypes.web}))
                            break;
                    }
                    break;
                }
                case msgTypes.getData:
                {
                    switch(audioData.device)
                    {
                        case deviceTypes.mobile:
                            currSocket.send(JSON.stringify({msgType: msgTypes.audioData_Response, data: mobileData, device: deviceTypes.mobile}))
                            break;
                        case deviceTypes.web:
                            currSocket.send(JSON.stringify({msgType: msgTypes.audioData_Response, data: webData, device: deviceTypes.web}))
                            break;
                    }
                    break;
                }
            }
        }
        catch
        {
            //console.log('error', message.data)
        }
        
    })
})



