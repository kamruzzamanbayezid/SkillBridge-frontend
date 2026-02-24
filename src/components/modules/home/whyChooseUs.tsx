const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">
              Why SkillBridge
            </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
              Elevate your learning with personalized mentorship
            </h2>
            <p className="text-slate-600">
              We don&apos;t just provide courses; we provide a bridge between
              students and the world&apos;s most talented mentors.
            </p>

            <ul className="space-y-4 pt-4">
              {[
                "Verified Expert Tutors",
                "1-on-1 Personalized Focus",
                "Flexible Scheduling",
                "Affordable Learning Paths",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-slate-700 font-medium"
                >
                  <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-white p-8 rounded-3xl shadow-sm space-y-3 mt-8">
              <h4 className="text-3xl font-bold text-blue-600">98%</h4>
              <p className="text-sm font-medium text-slate-500">
                Student Satisfaction
              </p>
            </div>
            <div className="bg-blue-600 p-8 rounded-3xl shadow-blue-500/20 space-y-3">
              <h4 className="text-3xl font-bold text-white">10k+</h4>
              <p className="text-sm font-medium text-blue-100">
                Learning Sessions
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm col-span-2 border border-slate-100">
              <p className="text-slate-600 italic">
                &ldquo;This platform changed how I learn. The mentors are
                actually industry experts!&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
