import React from "react";

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="testimonial-item bg-gray-800 p-6 rounded-lg">
            <p className="mb-4">
              &quot;OperantNext helped me transition smoothly from academia to
              industry. The industry-aligned curriculum and networking
              opportunities were invaluable.&quot;
            </p>
            <p className="font-bold">
              - Dr. Jane Smith, Former Student, Now Pharmaceutical Researcher
            </p>
          </div>
          <div className="testimonial-item bg-gray-800 p-6 rounded-lg">
            <p className="mb-4">
              &quot;As an industry partner, we&apos;ve seen a significant
              improvement in the readiness of graduates who&apos;ve used
              OperantNext. It&apos;s bridging the skills gap effectively.&quot;
            </p>
            <p className="font-bold">- John Doe, HR Director, PharmaCorp</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
