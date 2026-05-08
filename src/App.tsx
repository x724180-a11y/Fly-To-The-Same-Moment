/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  Plane, 
  MapPin, 
  Trophy, 
  Share2, 
  Download, 
  Instagram, 
  Twitter, 
  MessageSquare,
  ChevronRight,
  Calendar,
  Heart
} from "lucide-react";

// --- Types ---
interface FanJourney {
  from: string;
  team: string;
  to: string;
  date: string;
}

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center transition-all duration-500">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/Sichuan_Airlines_logo.svg')] bg-contain bg-center bg-no-repeat p-1" />
      </div>
      <span className="font-display font-bold tracking-tighter text-xl">SICHUAN AIRLINES</span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest uppercase">
      <a href="#hero" className="hover:text-neon-blue transition-colors">The Moment</a>
      <a href="#journey" className="hover:text-neon-blue transition-colors">Your Journey</a>
      <a href="#map" className="hover:text-neon-blue transition-colors">Global Map</a>
      <a href="#social" className="hover:text-neon-blue transition-colors">Community</a>
    </div>
    <div className="flex items-center gap-4">
      <div className="hidden lg:block h-px w-20 bg-white/20"></div>
      <span className="text-[10px] font-bold tracking-[0.2em] border border-white/30 px-3 py-1 rounded-full text-white/80">FIFA 2026</span>
    </div>
  </nav>
);

const WorldMapSVG = () => (
  <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30 fill-white/10">
    <path d="M150,150 Q250,100 400,140 T700,120 T900,180" fill="none" stroke="rgba(0, 242, 255, 0.4)" strokeWidth="0.5" strokeDasharray="4 4" />
    <path d="M200,400 Q350,300 500,350 T800,300" fill="none" stroke="rgba(0, 242, 255, 0.4)" strokeWidth="0.5" strokeDasharray="4 4" />
    <path d="M450,450 L550,50" fill="none" stroke="rgba(0, 242, 255, 0.1)" strokeWidth="0.2" />
    <path d="M50,180 C70,160 100,150 120,170 S150,200 180,190 S220,150 250,160 S280,200 310,180 S350,140 380,150 S420,200 450,190 S480,150 510,160 S550,200 580,180 S620,140 650,150 S680,200 710,190 S750,150 780,160 S820,200 850,180 S880,140 910,150 S950,200 980,190 V300 C950,320 920,330 900,310 S870,280 840,290 S800,330 770,320 S740,280 710,300 S670,340 640,330 S600,280 570,300 S540,340 510,330 S470,280 440,300 S400,340 370,330 S330,280 300,300 S270,340 240,330 S200,280 170,300 S130,340 100,330 S70,280 40,300 V180 Z" />
  </svg>
);

const FlightRoute = ({ start, end, delay = 0 }: { start: [number, number], end: [number, number], delay?: number, key?: React.Key }) => {
  const path = `M ${start[0]} ${start[1]} Q ${(start[0] + end[0]) / 2} ${(start[1] + end[1]) / 2 - 50} ${end[0]} ${end[1]}`;
  return (
    <g>
      <motion.path
        d={path}
        fill="none"
        stroke="url(#neonGradient)"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 3, delay, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
      />
      <motion.circle
        r="3"
        fill="#00f2ff"
        transition={{ duration: 3, delay, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
      >
        <animateMotion path={path} dur="3s" repeatCount="indefinite" begin={`${delay}s`} />
      </motion.circle>
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f2ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00f2ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#00f2ff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </g>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="map-bg"></div>
      
      <div className="absolute inset-0 z-0 select-none">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <svg viewBox="0 0 1000 500" className="w-full h-full opacity-20">
            <WorldMapSVG />
            <FlightRoute start={[450, 150]} end={[800, 120]} delay={0} />
            <FlightRoute start={[450, 150]} end={[850, 80]} delay={1} />
            <FlightRoute start={[450, 150]} end={[750, 100]} delay={0.5} />
            <FlightRoute start={[450, 150]} end={[820, 180]} delay={1.5} />
          </svg>
        </div>
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        <motion.h1 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          90 MINUTES<br/>
          <span className="text-white">UNITE THE WORLD</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-neon-blue font-display text-xl uppercase font-light tracking-[0.4em] mb-12"
        >
          Fly To The Same Moment
        </motion.p>
        
        <motion.a
          href="#journey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center gap-3 bg-neon-blue text-pitch-dark px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] overflow-hidden neon-glow transition-all"
        >
          <span className="relative z-10">Create Your Fan Journey</span>
          <div className="absolute inset-x-0 bottom-0 top-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </motion.a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-10 flex flex-col gap-1 items-start"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sichuan-red flex items-center justify-center font-bold text-xs">川航</div>
          <span className="text-[10px] font-black tracking-widest text-white/80">SICHUAN AIRLINES</span>
        </div>
      </motion.div>
    </section>
  );
};

const FanCard = ({ journey }: { journey: FanJourney }) => {
  return (
    <motion.div 
      layoutId="fan-card"
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ type: "spring", damping: 12, stiffness: 100 }}
      className="relative w-full max-w-sm aspect-[3/4] bg-neutral-900 border-2 border-white rounded-xl p-8 overflow-hidden flex flex-col group cursor-pointer shadow-2xl"
    >
      <div className="absolute top-0 right-4 bg-sichuan-red py-1 px-4 text-[9px] font-black text-white leading-none z-10">
        2026 WORLD CUP OFFICIAL FAN
      </div>

      <div className="absolute inset-0 bg-white opacity-[0.03] pointer-events-none"></div>
      
      <div className="flex justify-between items-start mb-10">
        <div className="flex flex-col">
          <span className="text-[48px] leading-none mb-2">🇦🇷</span>
          <div className="flex flex-col">
             <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase">Match ID</span>
             <span className="text-xs font-black tracking-widest text-white uppercase italic">WC-2026-TFU</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-start justify-center mb-8 font-display">
        <h3 className="text-4xl font-black leading-tight mb-2 tracking-tight uppercase">
          {journey.team} Fan
        </h3>
        <p className="text-xs font-mono text-neon-blue tracking-tighter uppercase">{journey.from} &gt;&gt;&gt;&gt;&gt;&gt; {journey.to}</p>
      </div>

      <div className="pt-6 border-t border-white/10 flex justify-between items-end text-[10px]">
        <div className="flex flex-col gap-1 uppercase tracking-widest font-black leading-tight">
          <span className="text-white/40">Gate: B42</span>
          <span>Seat: 12A</span>
        </div>
        <div className="text-right flex flex-col gap-1 uppercase tracking-widest font-black leading-tight">
          <span className="text-white/40">Sichuan Airlines</span>
          <span className="text-neon-blue">#FlyToTheSameMoment</span>
        </div>
      </div>
    </motion.div>
  );
};

const JourneyGenerator = () => {
  const [formData, setFormData] = useState<FanJourney>({
    from: "CHENGDU (TFU)",
    team: "ARGENTINA",
    to: "Los Angeles",
    date: "June 12, 2026"
  });
  const [generated, setGenerated] = useState<FanJourney | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setGenerated(formData);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <section id="journey" className="py-24 px-6 min-h-screen flex items-center bg-pitch-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        <div className="flex flex-col justify-center text-left">
          <h2 className="text-neon-blue font-black tracking-widest text-lg uppercase mb-4">Fan Journey</h2>
          <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none"
          >
            BECOME<br/>
            <span className="text-white/20 uppercase font-black">THE BRIDGE</span>
          </motion.h3>

          <motion.form 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             onSubmit={handleGenerate} 
             className="glass-card p-10 rounded-[2rem] space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-black ml-1">Departure City</label>
                <input 
                  required
                  type="text" 
                  value={formData.from}
                  onChange={(e) => setFormData({...formData, from: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-neon-blue transition-colors text-white font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-black ml-1">Supported Team</label>
                <input 
                  required
                  type="text" 
                  value={formData.team}
                  onChange={(e) => setFormData({...formData, team: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-neon-blue transition-colors text-white font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-black ml-1">Destination</label>
                <select 
                  value={formData.to}
                  onChange={(e) => setFormData({...formData, to: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-neon-blue transition-colors text-white appearance-none font-bold"
                >
                  <option className="bg-neutral-900">Los Angeles</option>
                  <option className="bg-neutral-900">Mexico City</option>
                  <option className="bg-neutral-900">Vancouver</option>
                  <option className="bg-neutral-900">Toronto</option>
                  <option className="bg-neutral-900">New York</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full py-5 bg-neon-blue text-pitch-dark rounded-full font-black uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 neon-glow"
            >
              {isGenerating ? "Processing..." : "Generate My Card"}
            </button>
          </motion.form>
        </div>

        <div className="flex items-center justify-center min-h-[500px]">
          <AnimatePresence mode="wait">
            {generated ? (
              <div key="result" className="flex flex-col items-center gap-8 w-full">
                <FanCard journey={generated} />
                <motion.button 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setGenerated(null)}
                  className="text-white/40 hover:text-neon-blue transition-colors text-[10px] font-black uppercase tracking-widest"
                >
                  Create Another Card
                </motion.button>
              </div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-sm aspect-[3/4] bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Plane className="w-8 h-8 text-white/20" />
                </div>
                <h4 className="text-xl font-display font-medium text-white/40 mb-2">Awaiting Your Journey</h4>
                <p className="text-white/20 text-sm">Fill in the fields to generate your digital fan card</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const GlobalFanMap = () => {
  const fans = [
    { label: "CHENGDU", x: 200, y: 200, tx: 750, ty: 225 },
    { label: "LOS ANGELES", x: 750, y: 225, tx: 200, ty: 200 },
    { label: "VANCOUVER", x: 800, y: 175, tx: 200, ty: 200 },
    { label: "NEW YORK", x: 880, y: 210, tx: 200, ty: 200 },
  ];

  return (
    <section id="map" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-left mb-16 max-w-xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black mb-6 tracking-tighter uppercase"
          >
            GLOBAL<br/><span className="text-neon-blue">MIGRATION</span>
          </motion.h2>
        </div>

        <div className="relative aspect-[21/9] bg-pitch-dark rounded-3xl border border-white/5 overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 p-8 md:p-20">
             <div className="map-bg scale-150"></div>
             <svg viewBox="0 0 1000 500" className="w-full h-full relative z-10">
               <WorldMapSVG />
               <FlightRoute start={[200, 200]} end={[750, 225]} delay={0} />
               <FlightRoute start={[200, 200]} end={[800, 175]} delay={1} />
               <FlightRoute start={[200, 200]} end={[880, 210]} delay={0.5} />
               
               {fans.map((fan, i) => (
                 <g key={i}>
                   <circle cx={fan.x} cy={fan.y} r="3" fill="#00f3ff" />
                   <text x={fan.x + 10} y={fan.y} className="text-[10px] font-black fill-white/60 uppercase select-none">{fan.label}</text>
                 </g>
               ))}
             </svg>
          </div>
          
          <div className="absolute bottom-8 left-8 flex flex-col gap-4 z-20">
             <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 text-[10px]">
                <div className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse neon-glow"></div>
                <span className="font-black tracking-widest uppercase">Live Tracking: 12,482 Fans in Air</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StickerGallery = () => {
  const stickers = [
    { emoji: "⚽", label: "GOAL!!! VIBES", color: "bg-[#FFCC00]" },
    { emoji: "❤️", label: "90 MINS ONE HEART", color: "bg-[#00f3ff]" },
    { emoji: "🦁", label: "IT'S COMING HOME", color: "bg-[#FF4444]" },
    { emoji: "🏮", label: "CHENGDU CREW", color: "bg-sichuan-red" },
    { emoji: "🎺", label: "FAN ZONE", color: "bg-[#00FF00]" },
    { emoji: "🏟️", label: "STADIUM POWER", color: "bg-[#ffffff]" },
  ];

  return (
    <section className="py-24 px-6 bg-pitch-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="sticker-container p-12 flex flex-wrap items-center justify-around gap-12">
          {stickers.map((sticker, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: i * 0.1 }}
              whileHover={{ scale: 1.2, rotate: i % 2 === 0 ? 10 : -10 }}
              style={{ rotate: i % 2 === 0 ? -10 : 5 }}
              className={`w-32 h-32 ${sticker.color} rounded-full flex flex-col items-center justify-center p-4 shadow-xl cursor-pointer`}
            >
              <span className="text-4xl mb-1">{sticker.emoji}</span>
              <span className="text-[9px] font-black text-black leading-none text-center uppercase whitespace-pre-wrap">{sticker.label.replace(' ', '\n')}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialFeed = () => {
  const posts = [
    { user: "@li_wei88", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400", team: "Brazil" },
    { user: "@soccer_king", img: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=400", team: "Argentina" },
    { user: "@world_traveler", img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=400", team: "France" },
    { user: "@fanatic_2026", img: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&q=80&w=400", team: "Mexico" },
  ];

  return (
    <section id="social" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-neon-blue font-display font-medium tracking-[0.4em] text-xs uppercase mb-4 block">Shared Moments</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">JOIN THE #FLYTHESAMEMOMENT MOVEMENT</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 rounded-[2rem] overflow-hidden border border-white/10 group cursor-pointer"
            >
              <div className="relative aspect-[4/5]">
                 <img src={post.img} alt="Fan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[50%] group-hover:grayscale-0" />
                 <div className="absolute inset-0 bg-gradient-to-t from-pitch-dark/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest">{post.user}</span>
                    <Heart className="w-4 h-4 text-white/40 group-hover:text-red-500 transition-colors" />
                 </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded-md text-white/60">#FlyToTheSameMoment</span>
                  <span className="text-[10px] bg-neon-blue/20 px-2 py-1 rounded-md text-neon-blue">#FIFA2026</span>
                </div>
                <p className="text-xs text-white/60 line-clamp-2 italic leading-relaxed">
                  "Can't believe I'm actually heading to the match. Chengdu to the world! Thanks Sichuan Airlines for the smooth ride. ✈️⚽"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24 px-6 bg-pitch-dark border-t border-white/5 overflow-hidden font-display relative">
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
      <div className="mb-24 w-full">
         <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[92px] font-black relative z-10 leading-[0.8] tracking-tighter uppercase"
         >
          EVERY FAN BEGINS<br/>
          <span className="text-white/20 italic">WITH A JOURNEY.</span>
         </motion.h2>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-sichuan-red rounded-lg flex items-center justify-center font-black text-white text-xl">川航</div>
           <div className="text-left">
             <span className="font-black tracking-widest text-xl block">SICHUAN AIRLINES</span>
             <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">Official Partner of Global Fans</span>
           </div>
        </div>

        <div className="flex gap-4">
          <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-4 rounded-full border border-white/10 hover:border-neon-blue hover:text-neon-blue transition-colors">
            <Instagram className="w-5 h-5" />
          </motion.a>
          <motion.a whileHover={{ scale: 1.1 }} href="#" className="p-4 rounded-full border border-white/10 hover:border-neon-blue hover:text-neon-blue transition-colors">
            <Twitter className="w-5 h-5" />
          </motion.a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full mt-24 pt-12 border-t border-white/5 text-[10px] uppercase tracking-widest font-black text-white/30">
        <div>© 2026 SICHUAN AIRLINES. #FlyToTheSameMoment</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Mission</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <JourneyGenerator />
      <GlobalFanMap />
      <StickerGallery />
      <SocialFeed />
      <Footer />
    </div>
  );
}
