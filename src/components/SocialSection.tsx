import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, Youtube, ExternalLink } from 'lucide-react';

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=800', // Yacht on sea
    likes: '1.2k',
    comments: '48'
  },
  {
    id: 2,
    image: 'https://www.charterworld.com/images/yachts-1/motor%20yacht%20SEA%20SEVEN.jpg', // Yacht luxury exterior
    likes: '856',
    comments: '24'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1569263977004-96c6bd83bb29?auto=format&fit=crop&q=80&w=800', // Coastal scenic
    likes: '2.1k',
    comments: '92'
  },
  {
    id: 4,
    image: 'https://plus.unsplash.com/premium_photo-1661913410775-680f4949a21d?auto=format&fit=crop&q=80&w=800', // Motor yacht interior
    likes: '1.5k',
    comments: '56'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800', // Sopot/Baltic like aesthetic
    likes: '943',
    comments: '31'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&q=80&w=800', // Evening on deck
    likes: '1.8k',
    comments: '64'
  }
];

export const SocialSection = () => {
  return (
    <section className="py-14 md:py-20 px-6 bg-ocean relative overflow-hidden grain-overlay">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-10">
          <div className="space-y-6 max-w-2xl">
            <span className="text-rose uppercase tracking-[0.6em] text-[10px] font-bold block font-display">Social</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-linen leading-[0.9] uppercase tracking-tighter">
              Follow the <br />
              <span className="text-rose font-serif italic lowercase tracking-normal">Horizon.</span>
            </h2>
            <p className="text-xl text-linen/60 font-serif italic leading-relaxed">
              Join our community on Instagram for daily glimpses into the Baltic yachting lifestyle, 
              behind-the-scenes moments, and exclusive charter updates from the Bay of Gdańsk.
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/seaseven_yacht' },
              { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/seaseven_yacht' },
              { icon: Youtube, label: 'Youtube', href: 'https://youtube.com' }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="p-4 bg-linen/5 border border-linen/10 rounded-sm text-linen hover:bg-rose hover:border-rose transition-all duration-500 group"
              >
                <social.icon className="w-6 h-6" />
                <span className="sr-only">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post, i) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/seaseven_yacht"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative aspect-square rounded-sm overflow-hidden bg-linen/5"
            >
              <img
                src={post.image}
                alt={`Instagram post ${post.id}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"

              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-ocean/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 text-linen">
                <Instagram className="w-8 h-8 text-rose" />
                <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" /> View
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.a
            href="https://instagram.com/seaseven_yacht"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-4 px-10 py-5 bg-linen/5 border border-linen/10 rounded-full text-linen font-display font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-linen hover:text-ocean transition-all duration-500"
          >
            @seaseven_yacht
            <Instagram className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};
