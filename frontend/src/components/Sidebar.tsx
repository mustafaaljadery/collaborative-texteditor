import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface Props {
  connected: boolean;
}

export default function Sidebar({ connected }: Props) {
  const router = useRouter();
  return (
    <div className="min-w-[340px] p-4 bg-[#F3F3F3] flex flex-col">
      <div className="flex flex-row space-x-3">
        <div
          className={
            'h-[10px] w-[10px] my-auto rounded-full ' +
            (connected ? 'bg-[#008140]' : 'bg-[#FF0000]')
          }
        />
        {!connected ? (
          <p className="text-sm my-auto font-medium text-[#363636]">
            Connecting...
          </p>
        ) : (
          <p className="text-sm my-auto italic font-medium text-[#363636]">
            You are connected!
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-col w-full space-y-2">
        <p className="text-base font-semibold">Share Link</p>
        <div className="border w-full rounded flex flex-row bg-white space-x-3 py-1.5 px-2">
          <input
            value={`http://localhost:3000${router.asPath}`}
            className="w-full text-sm font-regular text-gray-600 focus:ring-0 focus:outline-none focus:border-none"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000${router.asPath}`
              );
              toast.success('Copied to clipboard!', {
                className: 'text-sm text-[#363636] font-medium',
              });
            }}
            className="my-auto h-full px-2 hover:bg-gray-300 rounded bg-gray-200 text-[#363636] text-sm font-medium"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
