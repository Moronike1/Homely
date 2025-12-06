export default function FloatingCall() {
  const agentNumber = "07034609530";

  return (
    <div className="fixed bottom-6 right-24 group flex items-center">
      {/* Tooltip */}
      <span className="
        opacity-0 group-hover:opacity-100 transition bg-black text-white 
        text-xs px-3 py-1 rounded-md mr-2
      ">
        Call Agent
      </span>

      {/* Button */}
      <a
        href={`tel:${agentNumber}`}
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center 
        justify-center shadow-lg text-xl hover:bg-blue-700 transition animate-pulseSoft"
      >
        📞
      </a>
    </div>
  );
}
