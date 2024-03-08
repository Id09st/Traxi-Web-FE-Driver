import React, { useEffect } from 'react';
import { useSocket } from 'src/contexts/SocketContexts';

const SomeComponent: React.FC = () => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('someEvent', (data) => {
        console.log(data);
      });

      // Gửi sự kiện
      socket.emit('anotherEvent', { my: 'data' });
    }

    return () => {
      socket?.off('someEvent');
    };
  }, [socket]);

  return <div>Component sử dụng Socket.IO</div>;
};

export default SomeComponent;
