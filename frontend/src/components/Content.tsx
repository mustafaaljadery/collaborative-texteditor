import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

interface Props {
  text: string;
  setText: Dispatch<SetStateAction<any>>;
  socket: any;
  router: any;
}

export default function Content({
  text,
  setText,
  socket,
  router,
}: Props) {
  const [divHeight, setDivHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    //@ts-ignore
    setDivHeight(ref?.current?.clientHeight);
  }, [ref, ref?.current]);

  return (
    <div ref={ref} className="h-full w-full flex-1">
      <MDEditor
        height={divHeight}
        value={text}
        onChange={(e) => {
          socket.emit('send-text', e, router.asPath.split('#')[1]);
          setText(e || '');
        }}
      />
    </div>
  );
}
