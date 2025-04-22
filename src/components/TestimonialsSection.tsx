import React from 'react';
import {Star} from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "Digital Marketing Manager",
        quote: "Blinkly has transformed our campaign tracking. The analytics are incredibly detailed yet easy to understand.",
        avatar: "/placeholder.svg",
        rating: 5
    },
    {
        id: 2,
        name: "David Chen",
        role: "Content Creator",
        quote: "My link-in-bio page looks professional and drives more clicks than anything I've used before.",
        avatar: "/placeholder.svg",
        rating: 5
    },
    {
        id: 3,
        name: "Emma Rodriguez",
        role: "E-commerce Manager",
        quote: "The QR codes have helped us bridge our offline and online customer experience seamlessly.",
        avatar: "/placeholder.svg",
        rating: 4
    }
];

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="container-section">
            <h2 className="section-title">What People Are Saying</h2>
            <p className="section-description">
                Don't just take our word for it – hear from some of our satisfied customers.
            </p>

            <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:gap-6 lg:gap-8 max-w-7xl mx-auto">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1 relative"
                    >
                        {/* Speech bubble pointer */}
                        <div className="absolute w-4 h-4 bg-white rotate-45 -bottom-2 left-10"></div>

                        <div className="flex items-center space-x-4 mb-4">
                            <div
                                className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-blinkly-blue to-blinkly-violet">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold">{testimonial.name}</h4>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>

                        <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>

                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
