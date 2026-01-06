import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Zap, Shield, Users, TrendingUp, Award, 
  Lightbulb, Rocket, Target, Clock, Code, Layers 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// Animated Element Component
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, threshold = 0.1, delay = '0s' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.add('is-visible');
        observer.unobserve(element);
      }
    }, { threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div 
      ref={ref} 
      className={`reveal-base ${className || ''}`}
      style={{ transitionDelay: delay } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

export default function WhyChooseUsPage() {
  const reasons = [
    {
      icon: Zap,
      title: 'Lightning-Fast Delivery',
      description: 'We prioritize speed without sacrificing quality. Our agile methodology ensures rapid deployment of your digital solutions.',
      color: 'from-neon-green to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'Your data is protected with military-grade encryption and compliance with international security standards.',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our team consists of seasoned developers, designers, and strategists with decades of combined experience.',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Solutions',
      description: 'Built to grow with your business. Our architecture supports seamless scaling as your needs evolve.',
      color: 'from-orange-400 to-red-500'
    },
    {
      icon: Award,
      title: 'Award-Winning Work',
      description: 'Recognized for excellence in design, development, and innovation across multiple industry awards.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation-Driven',
      description: 'We stay ahead of the curve, constantly exploring new technologies and methodologies to benefit your project.',
      color: 'from-indigo-400 to-blue-500'
    },
    {
      icon: Rocket,
      title: 'Proven Track Record',
      description: 'Over 100+ successful projects delivered across diverse industries and markets worldwide.',
      color: 'from-green-400 to-emerald-500'
    },
    {
      icon: Target,
      title: 'Strategic Focus',
      description: 'We align our efforts with your business goals, ensuring every solution drives measurable results.',
      color: 'from-pink-400 to-rose-500'
    },
  ];

  const benefits = [
    { icon: Clock, text: '24/7 Support & Maintenance' },
    { icon: Code, text: 'Clean, Maintainable Code' },
    { icon: Layers, text: 'Modern Tech Stack' },
    { icon: CheckCircle, text: '100% Satisfaction Guarantee' },
  ];

  return (
    <div className="min-h-screen bg-dark-charcoal text-foreground font-paragraph selection:bg-neon-green selection:text-dark-charcoal overflow-clip">
      <style>{`
        .reveal-base {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-base.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .glass-panel {
          background: rgba(18, 18, 18, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(57, 255, 20, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .grid-bg {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(57, 255, 20, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(57, 255, 20, 0.05) 1px, transparent 1px);
        }
      `}</style>

      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24 bg-dark-charcoal">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        
        <div className="relative z-10">
          <AnimatedElement>
            <div className="mb-8">
              <span className="inline-block py-1 px-3 border border-neon-green/30 rounded-full text-neon-green text-xs tracking-[0.2em] uppercase bg-neon-green/5">
                Why Choose Us
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tighter text-white mb-8">
              THE REASONS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-600">
                TO PARTNER WITH US
              </span>
            </h1>
            <p className="text-lg md:text-xl font-paragraph text-gray-400 max-w-3xl mb-12 leading-relaxed">
              We're not just another development agency. We're your strategic partner in digital transformation, committed to delivering excellence at every step of your journey.
            </p>
          </AnimatedElement>

          <AnimatedElement delay="0.2s">
            <motion.div 
              className="relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 group"
              whileHover={{ borderColor: 'rgba(57, 255, 20, 0.5)' }}
            >
              <div className="absolute inset-0 bg-neon-green/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Image 
                  src="https://static.wixstatic.com/media/5283f4_85b89e1e1837427fa45066b85d892665~mv2.png?originWidth=896&originHeight=448" 
                  alt="Luminaryforge Team working together" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatedElement>
        </div>
      </section>

      {/* Reasons Grid */}
      <section className="relative w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24 bg-dark-charcoal border-t border-white/5">
        <AnimatedElement className="mb-24">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-white text-center mb-6">
            OUR <span className="text-neon-green">COMPETITIVE ADVANTAGES</span>
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto">
            Eight core reasons why leading companies choose Luminaryforge Tech for their digital initiatives.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <AnimatedElement key={index} delay={`${index * 0.1}s`}>
                <motion.div 
                  className="glass-panel p-8 rounded-2xl h-full flex flex-col group hover:border-neon-green/50 transition-all duration-500"
                  whileHover={{ y: -10 }}
                >
                  <motion.div 
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${reason.color} p-2.5 mb-6 group-hover:scale-110 transition-transform`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <IconComponent className="w-full h-full text-white" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-white mb-4 group-hover:text-neon-green transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    {reason.description}
                  </p>
                </motion.div>
              </AnimatedElement>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24 bg-dark-charcoal border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedElement>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-8">
              WHAT YOU GET <br />
              <span className="text-neon-green">WITH LUMINARYFORGE</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Beyond exceptional code and stunning design, we provide a complete partnership experience designed to ensure your success.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <AnimatedElement key={index} delay={`${index * 0.1}s`}>
                    <motion.div 
                      className="flex items-center gap-4 group"
                      whileHover={{ x: 10 }}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-full border border-neon-green/30 flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-all text-neon-green flex-shrink-0"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.div>
                      <span className="text-lg font-heading font-bold text-white group-hover:text-neon-green transition-colors">
                        {benefit.text}
                      </span>
                    </motion.div>
                  </AnimatedElement>
                );
              })}
            </div>
          </AnimatedElement>

          <AnimatedElement delay="0.2s">
            <motion.div 
              className="relative h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 group"
              whileHover={{ borderColor: 'rgba(57, 255, 20, 0.5)' }}
            >
              <div className="absolute inset-0 bg-neon-green/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700" />
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Image 
                  src="https://static.wixstatic.com/media/5283f4_85b89e1e1837427fa45066b85d892665~mv2.png?originWidth=896&originHeight=448" 
                  alt="Luminaryforge Team collaborating" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatedElement>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24 bg-dark-charcoal border-t border-white/5">
        <AnimatedElement className="text-center">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-8">
            READY TO TRANSFORM <br />
            <span className="text-neon-green">YOUR DIGITAL FUTURE?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            Let's discuss how Luminaryforge Tech can help you achieve your business goals through innovative digital solutions.
          </p>
          
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-block px-12 py-5 bg-neon-green text-dark-charcoal font-heading font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative">GET IN TOUCH TODAY</span>
          </motion.a>
        </AnimatedElement>
      </section>

      <Footer />
    </div>
  );
}
