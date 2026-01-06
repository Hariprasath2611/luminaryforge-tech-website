import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Code, Smartphone, Palette, Box, Gamepad2, TrendingUp, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { CompanyServices } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ServicesPage() {
  const [services, setServices] = useState<CompanyServices[]>([]);
  const location = useLocation();

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    // Scroll to service if hash is present
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash, services]);

  const loadServices = async () => {
    const { items } = await BaseCrudService.getAll<CompanyServices>('companyservices');
    setServices(items);
  };

  const serviceIcons = {
    'Web Development': Code,
    'App Development': Smartphone,
    'UI/UX Design': Palette,
    '3D Design': Box,
    'Game Development': Gamepad2,
    'Digital Marketing': TrendingUp,
  };

  const parseCapabilities = (capabilities: string | undefined): string[] => {
    if (!capabilities) return [];
    return capabilities.split('\n').filter(cap => cap.trim().length > 0);
  };

  return (
    <div className="min-h-screen bg-dark-charcoal text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-neon-green mb-6"
              animate={{
                textShadow: [
                  '0 0 20px rgba(57, 255, 20, 0.5)',
                  '0 0 40px rgba(57, 255, 20, 0.8)',
                  '0 0 20px rgba(57, 255, 20, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl font-paragraph text-foreground/80 max-w-3xl mx-auto"
            >
              Comprehensive technology solutions designed to elevate your business
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="space-y-32">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[service.serviceName as keyof typeof serviceIcons] || Code;
            const capabilities = parseCapabilities(service.capabilities);
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={service._id}
                id={service._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="scroll-mt-32"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                  {/* Content */}
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-neon-green/10 border-2 border-neon-green/30 rounded-xl flex items-center justify-center">
                          <IconComponent size={32} className="text-neon-green" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-neon-green">
                          {service.serviceName}
                        </h2>
                      </div>

                      <p className="text-lg font-paragraph text-foreground/80 mb-6 leading-relaxed">
                        {service.shortDescription}
                      </p>

                      <p className="text-base font-paragraph text-foreground/70 mb-8 leading-relaxed">
                        {service.detailedDescription}
                      </p>

                      {capabilities.length > 0 && (
                        <div className="bg-neon-green/5 border border-neon-green/20 rounded-2xl p-6">
                          <h3 className="text-xl font-heading font-bold text-neon-green mb-4">
                            Key Capabilities
                          </h3>
                          <ul className="space-y-3">
                            {capabilities.map((capability, capIndex) => (
                              <motion.li
                                key={capIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: capIndex * 0.1, duration: 0.5 }}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle2 size={20} className="text-neon-green flex-shrink-0 mt-1" />
                                <span className="text-base font-paragraph text-foreground/80">
                                  {capability}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <motion.a
                        href="/#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block mt-8 bg-neon-green text-primary-foreground font-paragraph font-semibold px-8 py-4 rounded-lg hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] transition-shadow"
                      >
                        Get Started
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Image */}
                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="relative"
                    >
                      {service.serviceImage ? (
                        <div className="relative group">
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative overflow-hidden rounded-2xl border-2 border-neon-green/30"
                          >
                            <Image
                              src={service.serviceImage}
                              alt={service.serviceName || 'Service'}
                              width={800}
                              className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.div>
                          {/* Decorative corner accent */}
                          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-neon-green/50 rounded-tr-2xl" />
                          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-neon-green/50 rounded-bl-2xl" />
                        </div>
                      ) : (
                        <div className="relative bg-neon-green/5 border-2 border-neon-green/30 rounded-2xl h-[500px] flex items-center justify-center">
                          <IconComponent size={120} className="text-neon-green/30" />
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[120rem] mx-auto px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-neon-green/5 border border-neon-green/20 rounded-2xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green to-transparent" />
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-neon-green to-transparent" />
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-neon-green to-transparent" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-neon-green mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl font-paragraph text-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with our expert team and cutting-edge solutions.
            </p>
            <motion.a
              href="/#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-neon-green text-primary-foreground font-paragraph font-semibold px-10 py-5 rounded-lg hover:shadow-[0_0_50px_rgba(57,255,20,0.7)] transition-shadow"
            >
              Contact Us Today
            </motion.a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
