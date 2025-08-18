// src/components/FeaturesGrid.tsx
export default function FeaturesGrid() {
  const features = [
    {
      title: "Verified Listings",
      description: "All properties are vetted for authenticity and security.",
      icon: "🏠",
    },
    {
      title: "Flexible Payments",
      description: "Pay rent, sales, or leases conveniently and securely.",
      icon: "💳",
    },
    {
      title: "Property Management",
      description: "Easily manage facilities and tenants in one place.",
      icon: "⚙️",
    },
    {
      title: "Nationwide Coverage",
      description: "Discover options across major cities in Nigeria.",
      icon: "🌍",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-12">
          Why Choose Homely?
        </h2>
       
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-4 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
