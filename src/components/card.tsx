function Card({ index, content }: { index: number, content: string }) {
    return (
        <div className="w-60 h-60 p-4 bg-white shadow-md rounded-lg flex flex-col items-center justify-center text-lg font-mono text-center">
            <p className="text-gray-500">Card {index + 1}</p>
            <p className="mt-2 text-black max-w-56 px-1">{content}</p>
        </div>
    );
};

export default Card;