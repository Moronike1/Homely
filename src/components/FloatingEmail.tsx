export default function FloatingEmail() {
  const email = "moronikeoluwafemi@gmail.com";

  return (
    <div className="fixed bottom-[88px] right-44 group flex items-center">
      {/* Tooltip */}
      <span className="
        opacity-0 group-hover:opacity-100 transition bg-black text-white 
        text-xs px-3 py-1 rounded-md mr-2
      ">
        Send Email
      </span>

      {/* Button */}
      <a
        href={`mailto:${email}?subject=Property Enquiry&body=Hello, I would like to inquire about a property.`}
        className="bg-purple-600 text-white w-14 h-14 rounded-full flex items-center 
        justify-center shadow-lg text-xl hover:bg-purple-700 transition animate-pulseSoft"
      >
        ✉️
      </a>
    </div>
  );
}
