import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import Content from '@/components/Content';

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [text, setText] = useState('');
  const router = useRouter();
  const socket = io('http://localhost:5000');

  useEffect(() => {
    if (router.isReady) {
      socket.on('connect', () => {
        setConnected(true);
      });

      socket.on('receive-text', (text: string) => {
        setText(text);
      });

      if (router.asPath.split('#')[1]) {
        socket.emit('join-room', String(router.asPath.split('#')[1]));
      } else {
        const number = Math.floor(Math.random() * 10000000);
        router.push('/#' + number);
      }
    }
  }, [router.isReady]);

  return (
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <Header />
      <div className="flex flex-row flex-1 h-full w-full">
        <Sidebar connected={connected} />
        <Content
          text={text}
          setText={setText}
          socket={socket}
          router={router}
        />
      </div>
      <Footer />
    </div>
  );
}
