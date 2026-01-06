import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'contact@luminaryforge.tech', href: 'mailto:contact@luminaryforge.tech' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: 'San Francisco, CA', href: '#' },
  ];

  return (
    <footer className="bg-dark-charcoal border-t border-neon-green/20 mt-32">
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(57, 255, 20, 0.3)',
                    '0 0 40px rgba(57, 255, 20, 0.5)',
                    '0 0 20px rgba(57, 255, 20, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 bg-neon-green/10 border-2 border-neon-green rounded-lg flex items-center justify-center"
              >
                <span className="text-neon-green font-heading font-bold text-xl">L</span>
              </motion.div>
              <div>
                <h3 className="text-neon-green font-heading font-bold text-xl">Luminaryforge</h3>
                <p className="text-neon-green/60 font-paragraph text-xs">Tech Solutions</p>
              </div>
            </div>
            <p className="text-foreground/70 font-paragraph text-sm leading-relaxed">
              Forging the future of technology with cutting-edge solutions in web development, app creation, UI/UX design, 3D modeling, game development, and digital marketing.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-neon-green font-heading font-bold text-xl mb-6">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-foreground/70 hover:text-neon-green transition-colors group"
                >
                  <item.icon size={18} className="text-neon-green group-hover:scale-110 transition-transform" />
                  <span className="font-paragraph text-sm">{item.text}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-neon-green font-heading font-bold text-xl mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 bg-neon-green/10 border border-neon-green/30 rounded-lg flex items-center justify-center hover:bg-neon-green/20 hover:border-neon-green transition-colors"
                >
                  <social.icon size={20} className="text-neon-green" />
                </motion.a>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-foreground/70 font-paragraph text-sm mb-4">
                Ready to start your project?
              </p>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-neon-green text-primary-foreground font-paragraph font-semibold px-6 py-3 rounded-lg hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] transition-shadow"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-neon-green/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground/60 font-paragraph text-sm">
              © {currentYear} Luminaryforge Tech. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-foreground/60 hover:text-neon-green font-paragraph text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground/60 hover:text-neon-green font-paragraph text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
