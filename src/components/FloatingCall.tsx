export default function FloatingCall() {
  const agentNumber = "07034609530";

  function createRipple(e) {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;

    button.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  }

  return (
    <div className="fixed bottom-6 right-24 group flex items-center">
      <span className="opacity-0 group-hover:opacity-100 transition bg-black text-white 
        text-xs px-3 py-1 rounded-md mr-2">
        Call Agent
      </span>

      <a
        href={`tel:${agentNumber}`}
        className="ripple bg-blue-600 text-white w-14 h-14 rounded-full flex items-center 
        justify-center text-xl shadow-lg animate-pulseSoft hover:bg-blue-700 transition"
        onClick={createRipple}
      >
        📞
      </a>
    </div>
  );
}
