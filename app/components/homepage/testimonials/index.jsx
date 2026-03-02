import { testimonials } from "@/utils/data/testimonials";
import { FaStar } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa6";

function TestimonialCard({ testimonial }) {
  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 hover:border-white/20 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-amber-400" size={16} />
          ))}
        </div>
        <FaQuoteRight className="text-white/10" size={32} />
      </div>

      <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-gray-400 text-xs">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div id="testimonials" className="relative z-50 border-t my-12 lg:my-24 border-white/10">
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex flex-col items-center my-8 lg:my-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          What Clients Say
        </h2>
        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Trusted by forward-thinking teams to deliver exceptional results
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
