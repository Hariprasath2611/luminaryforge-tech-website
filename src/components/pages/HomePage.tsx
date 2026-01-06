// HPI 1.6-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Code, Smartphone, Palette, Box, Gamepad2, 
  TrendingUp, Mail, Send, Cpu, Zap, Layers, Globe, 
  Terminal, Shield, ChevronDown 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { CompanyServices } from '@/entities';
import { Image } from '@/components/ui/image';

// --- Utility Components & Hooks ---

// Mandatory AnimatedElement for scroll reveals
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string; // CSS delay string
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

// Custom Hook for Parallax
function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// --- Main Component ---

export default function HomePage() {
  // --- 1. Data Fidelity Protocol: Identification & Canonization ---
  const [featuredServices, setFeaturedServices] = useState<CompanyServices[]>([]);
  const [allServices, setAllServices] = useState<CompanyServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Canonical Data Source: Service Icons Mapping
  const serviceIcons = {
    'Web Development': Code,
    'App Development': Smartphone,
    'UI/UX Design': Palette,
    '3D Design': Box,
    'Game Development': Gamepad2,
    'Digital Marketing': TrendingUp,
  };

  // Canonical Data Source: Code Lines for Background
  const codeLines = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    code: generateRandomCode(),
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
    left: `${Math.random() * 100}%`,
    fontSize: Math.random() > 0.7 ? '0.8rem' : '0.6rem',
    opacity: Math.random() * 0.3 + 0.1
  }));

  function generateRandomCode() {
    const snippets = [
      'const forge = new Technology();',
      'function innovate() { return future; }',
      'import { creativity } from "luminary";',
      'export default Excellence;',
      'async function build() { await deploy(); }',
      'class Innovation extends Technology {}',
      'const result = await transform();',
      'return { success: true, data: innovation };',
      'interface Future { tech: Advanced; }',
      'type Solution = Creative & Efficient;',
      'system.init({ mode: "turbo" });',
      '<Forge />',
      'while(alive) { create(); }'
    ];
    return snippets[Math.floor(Math.random() * snippets.length)];
  }

  // --- 2. Data Fetching (Preserved Logic) ---
  useEffect(() => {
    const loadServices = async () => {
      try {
        const { items } = await BaseCrudService.getAll<CompanyServices>('companyservices');
        setAllServices(items);
        setFeaturedServices(items.filter(service => service.isFeatured));
      } catch (error) {
        console.error("Failed to load services", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadServices();
  }, []);

  // --- Scroll Hooks for Parallax ---
  const { scrollYProgress } = useScroll();
  const yHero = useParallax(scrollYProgress, 300);
  const yText = useParallax(scrollYProgress, -100);

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
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        .clip-diagonal-reverse {
          clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
        }
        .scrolling-text-container {
          overflow: hidden;
          white-space: nowrap;
        }
        .scrolling-text-inner {
          display: inline-block;
          animation: scroll-left 20s linear infinite;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(57, 255, 20, 0.3); }
          50% { border-color: rgba(57, 255, 20, 0.6); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
      `}</style>

      <Header />

      {/* --- HERO SECTION: The Digital Foundry --- */}
      <section className="relative h-screen w-full max-w-[120rem] mx-auto flex flex-col items-center justify-center overflow-hidden">
        {/* Dynamic Background Layer */}
        <div className="absolute inset-0 bg-dark-charcoal z-0">
          <div className="absolute inset-0 grid-bg opacity-30" />
          {/* Code Rain */}
          {codeLines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ y: '-100vh', opacity: 0 }}
              animate={{ y: '100vh', opacity: line.opacity }}
              transition={{
                duration: line.duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                delay: line.delay,
              }}
              className="absolute font-paragraph text-neon-green whitespace-nowrap pointer-events-none"
              style={{ left: line.left, fontSize: line.fontSize }}
            >
              {line.code}
            </motion.div>
          ))}
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-charcoal via-transparent to-dark-charcoal pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col items-center text-center">
          <motion.div 
            style={{ y: yText }}
            className="relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-neon-green opacity-50" />
            
            <AnimatedElement>
              <span className="inline-block py-1 px-3 border border-neon-green/30 rounded-full text-neon-green text-xs tracking-[0.2em] uppercase mb-6 bg-neon-green/5 animate-pulse-border">
                System Online v2.0
              </span>
            </AnimatedElement>

            <AnimatedElement delay="0.1s">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold leading-[0.9] tracking-tighter text-white mb-8 mix-blend-difference">
                FORGING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-600">
                  THE FUTURE
                </span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay="0.2s">
              <p className="text-lg md:text-xl font-paragraph text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Luminaryforge Tech combines brutalist efficiency with cyberpunk aesthetics to engineer digital realities. We don't just build software; we architect experiences.
              </p>
            </AnimatedElement>

            <AnimatedElement delay="0.3s">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.a 
                  href="#services" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-neon-green text-dark-charcoal font-heading font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    EXPLORE SERVICES <motion.div whileHover={{ x: 5 }}><ArrowRight className="w-5 h-5" /></motion.div>
                  </span>
                </motion.a>
                <motion.a 
                  href="#contact" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 border border-neon-green/30 text-neon-green font-heading font-bold text-lg hover:bg-neon-green/10 transition-colors"
                >
                  INITIATE CONTACT
                </motion.a>
              </div>
            </AnimatedElement>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neon-green/50"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll to Initialize</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- MARQUEE SECTION: The Pulse --- */}
      <div className="w-full bg-neon-green text-dark-charcoal py-4 overflow-hidden border-y border-dark-charcoal relative z-20">
        <div className="scrolling-text-container">
          <div className="scrolling-text-inner font-heading font-bold text-4xl md:text-6xl uppercase tracking-tighter">
            Innovation // Design // Development // Strategy // 3D Modeling // Game Logic // User Experience // Innovation // Design // Development // Strategy // 3D Modeling // Game Logic // User Experience //
          </div>
        </div>
      </div>

      {/* --- ABOUT SECTION: The Core Identity (Sticky Layout) --- */}
      <section className="relative w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24 bg-dark-charcoal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <AnimatedElement>
                <div className="w-12 h-1 bg-neon-green mb-8" />
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
                  WHO <br /> WE ARE
                </h2>
                <p className="font-paragraph text-neon-green/80 text-sm tracking-widest uppercase mb-8">
                  // System Identity
                </p>
                <div className="hidden lg:block p-6 border border-neon-green/20 bg-neon-green/5 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <Terminal className="w-6 h-6 text-neon-green" />
                    <span className="font-heading font-bold text-white">Status Report</span>
                  </div>
                  <div className="space-y-2 font-paragraph text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Uptime:</span> <span className="text-neon-green">99.99%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects:</span> <span className="text-neon-green">100+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Team:</span> <span className="text-neon-green">15+ Units</span>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="lg:col-span-8 space-y-24">
            <AnimatedElement>
              <p className="text-2xl md:text-3xl lg:text-4xl font-heading leading-tight text-gray-200">
                Luminaryforge Tech is a <span className="text-neon-green">premier software development</span> entity. We exist at the intersection of raw code and artistic vision.
              </p>
            </AnimatedElement>

            <AnimatedElement delay="0.2s">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="p-8 border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-white/5 group"
                >
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    <Cpu className="w-10 h-10 text-neon-green mb-6 group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-white mb-4">Technical Mastery</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our code is clean, efficient, and scalable. We build systems that endure the rapid evolution of the digital landscape.
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="p-8 border border-white/10 hover:border-neon-green/50 transition-colors duration-500 bg-white/5 group"
                >
                  <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    <Zap className="w-10 h-10 text-neon-green mb-6 group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-white mb-4">Rapid Deployment</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Speed is a feature. We utilize agile methodologies to deliver high-impact solutions without compromising integrity.
                  </p>
                </motion.div>
              </div>
            </AnimatedElement>

            <AnimatedElement>
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
                    alt="Luminaryforge Team collaborating on a digital project" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-dark-charcoal to-transparent z-20"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-paragraph text-neon-green text-sm mb-2">// THE HUMAN ELEMENT</p>
                  <p className="text-white font-heading text-2xl">Expert developers, designers, and strategists working in unison.</p>
                </motion.div>
              </motion.div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION: The Arsenal (Horizontal Scroll) --- */}
      <section id="services" className="relative w-full max-w-[120rem] mx-auto py-32 bg-dark-charcoal overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-green/5 to-transparent pointer-events-none" />
        
        <div className="px-6 md:px-12 lg:px-24 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <AnimatedElement>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-white">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-500">ARSENAL</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-md">
              Comprehensive technology solutions tailored to forge your digital dominance.
            </p>
          </AnimatedElement>
          
          <AnimatedElement delay="0.2s">
            <Link to="/services" className="flex items-center gap-2 text-neon-green font-heading font-bold hover:text-white transition-colors">
              VIEW ALL PROTOCOLS <ArrowRight className="w-5 h-5" />
            </Link>
          </AnimatedElement>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="w-full overflow-x-auto pb-12 scrollbar-hide px-6 md:px-12 lg:px-24">
          <div className="flex gap-8 w-max">
            {allServices.map((service, index) => {
              const IconComponent = serviceIcons[service.serviceName as keyof typeof serviceIcons] || Code;
              return (
                <AnimatedElement key={service._id || index} delay={`${index * 0.1}s`} className="w-[400px] md:w-[450px]">
                  <Link to={`/services#${service._id}`} className="block h-full group">
                    <motion.div 
                      className="h-full glass-panel p-1 rounded-2xl transition-all duration-500 group-hover:border-neon-green/50 group-hover:shadow-[0_0_30px_rgba(57,255,20,0.15)] relative overflow-hidden"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Hover Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative bg-dark-charcoal/80 rounded-xl h-full p-8 flex flex-col">
                        {/* Image Area */}
                        <div className="relative h-48 w-full mb-8 rounded-lg overflow-hidden border border-white/5 group-hover:border-neon-green/30 transition-colors">
                          {service.serviceImage ? (
                            <motion.div whileHover={{ scale: 1.15 }} transition={{ duration: 0.5 }} className="w-full h-full">
                              <Image 
                                src={service.serviceImage} 
                                alt={service.serviceName || 'Service'} 
                                width={450} 
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                          ) : (
                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity }}>
                                <IconComponent className="w-16 h-16 text-white/20" />
                              </motion.div>
                            </div>
                          )}
                          <motion.div 
                            className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <IconComponent className="w-6 h-6 text-neon-green" />
                          </motion.div>
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-neon-green transition-colors">
                          {service.serviceName}
                        </h3>
                        <p className="text-gray-400 font-paragraph text-sm leading-relaxed mb-8 flex-grow">
                          {service.shortDescription || "Advanced digital solution for modern enterprises."}
                        </p>

                        {/* Footer */}
                        <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                          <span className="text-xs font-paragraph text-gray-500 uppercase tracking-wider">
                            // Service ID: {index + 1 < 10 ? `0${index + 1}` : index + 1}
                          </span>
                          <motion.span 
                            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-neon-green group-hover:border-neon-green group-hover:text-black transition-all"
                            whileHover={{ rotate: 90 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </AnimatedElement>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION: The Blueprint (New Content) --- */}
      <section className="relative w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24 bg-dark-charcoal border-t border-white/5">
        <div className="text-center mb-24">
          <AnimatedElement>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
              THE <span className="text-neon-green">BLUEPRINT</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our systematic approach to forging digital excellence.
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/30 to-transparent" />

          {[
            { icon: Layers, title: "Discovery", desc: "We analyze your requirements and deconstruct the challenge." },
            { icon: Palette, title: "Design", desc: "We forge the visual identity and user experience architecture." },
            { icon: Terminal, title: "Development", desc: "We write clean, robust code to bring the vision to life." },
            { icon: Globe, title: "Deployment", desc: "We launch your solution and ensure optimal performance." }
          ].map((step, idx) => (
            <AnimatedElement key={idx} delay={`${idx * 0.2}s`} className="relative">
              <motion.div 
                className="bg-dark-charcoal border border-white/10 p-8 rounded-2xl hover:border-neon-green/40 transition-colors group h-full"
                whileHover={{ y: -10, borderColor: 'rgba(57, 255, 20, 0.4)' }}
              >
                <motion.div 
                  className="w-16 h-16 bg-dark-charcoal border border-neon-green/30 rounded-xl flex items-center justify-center mb-6 relative z-10 group-hover:bg-neon-green/10 transition-colors shadow-[0_0_20px_rgba(57,255,20,0.1)]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                >
                  <step.icon className="w-8 h-8 text-neon-green" />
                  <motion.div 
                    className="absolute -top-3 -right-3 w-6 h-6 bg-neon-green text-black font-bold text-xs flex items-center justify-center rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {idx + 1}
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            </AnimatedElement>
          ))}
        </div>
      </section>

      {/* --- STATS SECTION: Proof of Power --- */}
      <section className="w-full max-w-[120rem] mx-auto py-24 bg-neon-green/5 border-y border-neon-green/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-12 lg:px-24">
          {[
            { label: "Projects Forged", value: "100+" },
            { label: "Happy Clients", value: "50+" },
            { label: "Expert Units", value: "15+" },
            { label: "Years Active", value: "5+" }
          ].map((stat, idx) => (
            <AnimatedElement key={idx} delay={`${idx * 0.1}s`} className="text-center">
              <motion.div 
                className="text-4xl md:text-6xl font-heading font-bold text-white mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-neon-green font-paragraph text-sm uppercase tracking-widest">{stat.label}</div>
            </AnimatedElement>
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION: Signal Uplink --- */}
      <section id="contact" className="relative w-full max-w-[120rem] mx-auto py-32 px-6 md:px-12 lg:px-24 bg-dark-charcoal overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon-green/5 to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <AnimatedElement>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-8">
              INITIATE <br /> <span className="text-neon-green">SEQUENCE</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-lg">
              Ready to upgrade your digital presence? Establish a connection with our team. We are standing by.
            </p>
            
            <div className="space-y-8">
              <motion.div 
                className="flex items-center gap-6 group"
                whileHover={{ x: 10 }}
              >
                <motion.div 
                  className="w-14 h-14 border border-neon-green/30 rounded-full flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-all text-neon-green"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mail className="w-6 h-6" />
                </motion.div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Email Frequency</p>
                  <a href="mailto:contact@luminaryforge.tech" className="text-2xl font-heading font-bold text-white hover:text-neon-green transition-colors">
                    contact@luminaryforge.tech
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-6 group"
                whileHover={{ x: 10 }}
              >
                <motion.div 
                  className="w-14 h-14 border border-neon-green/30 rounded-full flex items-center justify-center group-hover:bg-neon-green group-hover:text-black transition-all text-neon-green"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Shield className="w-6 h-6" />
                </motion.div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Security Protocol</p>
                  <p className="text-xl font-heading font-bold text-white">
                    Encrypted Communication
                  </p>
                </div>
              </motion.div>
            </div>
          </AnimatedElement>

          <AnimatedElement delay="0.3s">
            <div className="glass-panel p-8 md:p-12 rounded-3xl relative">
              <div className="absolute top-0 right-0 p-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
              </div>
              
              <form className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-paragraph text-neon-green uppercase tracking-wider">Identity</label>
                    <input 
                      type="text" 
                      id="name"
                      className="w-full bg-dark-charcoal/80 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all"
                      placeholder="ENTER NAME"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-paragraph text-neon-green uppercase tracking-wider">Comms Channel</label>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full bg-dark-charcoal/80 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all"
                      placeholder="ENTER EMAIL"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-paragraph text-neon-green uppercase tracking-wider">Transmission</label>
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full bg-dark-charcoal/80 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-green focus:outline-none focus:ring-1 focus:ring-neon-green transition-all resize-none"
                    placeholder="ENTER MESSAGE DATA..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-neon-green text-dark-charcoal font-heading font-bold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all flex items-center justify-center gap-2 group"
                >
                  TRANSMIT DATA <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}