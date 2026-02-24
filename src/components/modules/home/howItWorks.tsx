const steps = [
  {
    id: 1,
    title: "Find Your Expert",
    description:
      "Browse through our verified tutors and filters to find the perfect match for your goals.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Schedule a Session",
    description:
      "Pick a date and time that fits your busy schedule and book instantly.",
    icon: "📅",
  },
  {
    id: 3,
    title: "Start Learning",
    description:
      "Join your 1-on-1 session and get personalized mentorship to fast-track your skills.",
    icon: "🚀",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-16">
          Getting started is easy. Follow these three simple steps to begin your
          learning journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
            >
              <div className="text-4xl mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {step.description}
              </p>
              {step.id !== 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-slate-200 text-3xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
