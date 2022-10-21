import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
@WebSocketGateway(81,{
    cors: {
        origin: '*'
    },
})
export class Gatway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect{
    @WebSocketServer()server: Server;

    afterInit(server: any){
        console.log('Inicio ❤');
    }

    handleConnection(client: any, ...args: any[]) {
        //console.log('Alguien se conecto al Socket')
    }

    handleDisconnect(client: any) {
        //console.log('Alguien se desconecto' );
    }

    @SubscribeMessage('event_join')
        handleJoinRoom(client: Socket, room: string) {
        client.join(`room_${room}`);
        console.log('Se unio a la sala ')
    }

    //Recepcion del mensaje
    @SubscribeMessage('event_message')handleIncommingMessage(
        client: Socket,
        payload,
    ) {
        console.log('DATO LLEGO DESDE EL FRONT' + payload)
        this.server.to(`room_UNO`).emit('new_message',payload);
    }

    @SubscribeMessage('newMessage')newMessage(
        client: Socket,
        payload,
    ) {
        console.log('newMessage')
        this.server.to(`room_UNO`).emit('new_message_user',payload);
    }


    @SubscribeMessage('event_leave')
        handleRoomLeave(client: Socket, room:string) {
        console.log(`Alguien salio de la sala room_${room}`)
        client.leave(`room_${room}`);
    }

}