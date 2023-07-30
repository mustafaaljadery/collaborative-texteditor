export default function Footer() {
  return (
    <div className="py-1 flex flex-col justify-center bg-gray-100 items-center w-full">
      <p className="text-sm text-[#363636] font-medium">
        Created by:{' '}
        <a
          href="https://maxaljadery.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Max Aljadery
        </a>
      </p>
    </div>
  );
}
