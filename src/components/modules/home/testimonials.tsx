const Testimonials = () => {
  const reviews = [
    {
      name: "John Doe",
      role: "Software Student",
      text: "Found an amazing Next.js tutor who helped me build my portfolio in 2 weeks!",
    },
    {
      name: "Sarah Smith",
      role: "UI Designer",
      text: "The 1-on-1 sessions are worth every penny. Very high quality and interactive.",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          What our students say
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="max-w-md p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-left hover:-translate-y-2 transition-transform"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">★★★★★</div>
              <p className="text-slate-600 mb-6 italic">"{rev.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-slate-500">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
