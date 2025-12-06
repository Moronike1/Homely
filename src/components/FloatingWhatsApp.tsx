export default function FloatingWhatsApp() {
  const agentNumber = "2347034609530";

  return (
    <div className="fixed bottom-[88px] right-6 group flex items-center">
      {/* Tooltip */}
      <span className="
        opacity-0 group-hover:opacity-100 transition bg-black text-white 
        text-xs px-3 py-1 rounded-md mr-2
      ">
        Chat on WhatsApp
      </span>

      {/* Button */}
      <a
        href={`https://wa.me/${agentNumber}?text=Hello, I want to make an enquiry`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white w-14 h-14 rounded-full flex items-center 
        justify-center shadow-lg text-xl hover:bg-green-700 transition animate-pulseSoft"
      >
        💬
      </a>
    </div>
  );
}
