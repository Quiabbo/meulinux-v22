import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight, Star, Cpu, Code, Gamepad2, ShieldAlert, Flag, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { SEO } from '../components/SEO';
import { CATEGORIES } from '../constants';
import { useDistros } from '../hooks/useDistros';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';
import { DISTRO_TRANSLATIONS } from '../data/distroTranslations';

const defaultTranslations = {
  pt: {
    heroTitle: "Encontre o Linux ideal",
    heroSubtitle: "Descubra qual distro combina com você",
    heroDescription: "",
    searchPlaceholder: "Pesquise por distros Linux...",
    searchButton: "Buscar",
    beginnerText: "É iniciante no Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "Para fazer uma busca mais personalizada.",
    postDownloadTitle: "O que fazer depois de instalar sua distro?",
    viewArticle: "Saiba mais",
    distroListTitle: "Encontre e baixe a sua distro Linux",
    backToTop: "Voltar ao topo",
    allDistros: "Todas as distros",
    learnMore: "Conhecer e Baixar",
    categories: {
      "Todas as distros": "Todas as distros",
      "Melhor para começar": "Melhor para começar",
      "PC fraco": "PC fraco",
      "Programação": "Programação",
      "Jogos": "Jogos",
      "Hacking": "Hacking",
      "Brasileiras": "Brasileiras"
    },
    viewMore: "Ver mais distros",
    viewAll: "Ver todas as distros",
    personalizedSearch: "Quero fazer uma busca mais personalizada"
  },
  en: {
    heroTitle: "Find the ideal Linux",
    heroSubtitle: "Discover which distro matches you",
    heroDescription: "",
    searchPlaceholder: "Search for Linux distros...",
    searchButton: "Search",
    beginnerText: "New to Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "For a more personalized search.",
    postDownloadTitle: "What to do after downloading your distro?",
    viewArticle: "Learn more",
    distroListTitle: "Find and download your Linux distro",
    backToTop: "Back to top",
    allDistros: "All distros",
    learnMore: "Learn and Download",
    categories: {
      "Todas as distros": "All distros",
      "Melhor para começar": "Best to start",
      "PC fraco": "Low-end PC",
      "Programação": "Programming",
      "Jogos": "Gaming",
      "Hacking": "Hacking",
      "Brasileiras": "Brazilian"
    },
    viewMore: "View more distros",
    viewAll: "View all distros",
    personalizedSearch: "I want a more personalized search"
  },
  es: {
    heroTitle: "Encuentra el Linux ideal",
    heroSubtitle: "Descubre qué distro combina contigo",
    heroDescription: "",
    searchPlaceholder: "Busca distros Linux...",
    searchButton: "Buscar",
    beginnerText: "¿Eres nuevo en Linux?",
    beginnerLink: "DistroMatch",
    beginnerSubtext: "Para una búsqueda más personalizada.",
    postDownloadTitle: "¿Qué fazer después de descargar tu distro?",
    viewArticle: "Saber más",
    distroListTitle: "Encuentra y descarga tu distro Linux",
    backToTop: "Volver arriba",
    allDistros: "Todas as distros",
    learnMore: "Conocer y Descargar",
    categories: {
      "Todas as distros": "Todas las distros",
      "Melhor para começar": "Mejor para empezar",
      "PC fraco": "PC básico",
      "Programação": "Programación",
      "Jogos": "Juegos",
      "Hacking": "Hacking",
      "Brasileiras": "Brasileñas"
    },
    viewMore: "Ver más distros",
    viewAll: "Ver todas as distros",
    personalizedSearch: "Quiero una búsqueda más personalizada"
  }
};

// Simple mapping for distro subtitles and descriptions that need translation
// In a real app, these would be in a CMS or a more robust translation file

export const Home = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const { lang } = useLanguage();
  const translations = useTranslations('home', defaultTranslations);
  const t = translations[lang];
  const DISTROS = useDistros();
  
  const [selectedCategory, setSelectedCategory] = useState("Todas as distros");
  const [displayLimit, setDisplayLimit] = useState(12);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory("Todas as distros");
    setDisplayLimit(12);
  }, [lang]);

  useEffect(() => {
    const s = searchParams.get('search');
    if (s) setSearch(s);
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory === "Todas as distros") {
      setDisplayLimit(12);
    } else if (selectedCategory === "Brasileiras") {
      setDisplayLimit(5);
    } else if (selectedCategory === "PC fraco") {
      setDisplayLimit(4);
    } else {
      setDisplayLimit(4);
    }
  }, [selectedCategory]);

  const filteredDistros = DISTROS.filter(distro => {
    const matchesSearch = distro.name.toLowerCase().includes(search.toLowerCase()) || 
                         distro.subtitle.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Todas as distros" || distro.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const sortedDistros = [...filteredDistros].sort((a, b) => {
    if (selectedCategory === "Todas as distros") {
      const famousOrder = ['ubuntu-linux', 'linux-mint', 'fedora-linux', 'pop-os', 'debian-linux', 'opensuse', 'zorin-os', 'kali-linux'];
      const indexA = famousOrder.indexOf(a.id);
      const indexB = famousOrder.indexOf(b.id);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    }

    if (selectedCategory === "PC fraco") {
      const pcFracoOrder = ['mx-linux', 'bodhi', 'minios', 'tinycore', 'antix'];
      const indexA = pcFracoOrder.indexOf(a.id);
      const indexB = pcFracoOrder.indexOf(b.id);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    }

    if (selectedCategory === "Jogos") {
      if (a.id === 'zorin-os') return 1;
      if (b.id === 'zorin-os') return -1;
      return 0;
    }

    return 0;
  });

  const displayedDistros = sortedDistros.slice(0, displayLimit);

  const categoryIcons: Record<string, React.ReactNode> = {
    "Todas as distros": <LayoutGrid size={18} />,
    "Melhor para começar": <Star size={18} />,
    "PC fraco": <Cpu size={18} />,
    "Programação": <Code size={18} />,
    "Jogos": <Gamepad2 size={18} />,
    "Hacking": <ShieldAlert size={18} />,
    "Brasileiras": <Flag size={18} />
  };

  const getTranslatedDistro = (distro: typeof DISTROS[0]) => {
    if (lang === 'pt') return distro;
    const trans = DISTRO_TRANSLATIONS[lang]?.[distro.id];
    if (!trans) return distro;
    return {
      ...distro,
      subtitle: trans.subtitle || distro.subtitle,
      description: trans.description || distro.description
    };
  };

  const handleViewMore = () => {
    setDisplayLimit(filteredDistros.length);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Meu Linux | Encontre, Baixe e Aprenda Tudo Sobre Distros Linux"
        description="Descubra o mundo Linux com o Meu Linux. Encontre as melhores distribuições, guias de instalação, tutoriais de pós-instalação e muito mais para iniciantes e avançados."
        canonical="https://meulinux.com.br/"
      />
      {/* Hero Section */}
      <section className="relative bg-dark text-white py-24 overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: Content */}
            <div className="text-left">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl md:text-3xl font-display font-bold mb-1 text-primary leading-tight"
              >
                {t.heroTitle}
              </motion.h1>
              {t.heroSubtitle && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-base md:text-lg font-sans font-normal mb-2 text-white leading-tight"
                >
                  {t.heroSubtitle}
                </motion.div>
              )}
              {t.heroDescription && (
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-white/80 mb-8"
                >
                  {t.heroDescription}
                </motion.p>
              )}

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="relative mb-12 max-w-lg"
              >
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-white text-dark rounded-[6px] py-4 px-8 pl-14 pr-32 text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 search-input"
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6 search-icon" />
                  <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-[6px] font-bold hover:bg-primary/90 transition-all"
                  >
                    {t.searchButton}
                  </button>
                </form>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-lg hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <Link to="/distromatch" className="block w-full h-full text-white/80 no-underline">
                  <p>
                    <strong>{t.beginnerText}</strong> Use o <span className="text-primary font-bold hover:underline" aria-label="Ferramenta Distro Match"><span className="font-normal">Distro</span>Match</span>
                    <br />
                    {t.beginnerSubtext}
                  </p>
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Banner */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <a 
                href="https://iatutor.meulinux.com.br/" 
                target="_blank" 
                rel="noreferrer"
                className="block group relative"
              >
                <img 
                  src="https://meulinux.com.br/wp-content/uploads/2026/02/8888-1.png" 
                  alt="Aprenda Linux e DevOps"
                  className="relative rounded-[6px] shadow-2xl border-2 border-primary hover:scale-[1.02] transition-transform duration-500 w-full"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/linux/800/400';
                  }}
                />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Post-Download Section */}
      <section className="py-4 bg-primary text-white">
        <div className="container-custom flex items-center justify-center gap-6">
          <h2 className="text-lg md:text-xl font-bold">{t.postDownloadTitle}</h2>
          <Link 
            to="/pos-instalacao"
            className="border-2 border-white text-white px-6 py-2 rounded-[6px] hover:bg-white hover:text-primary transition-all text-sm md:text-base whitespace-nowrap font-normal"
          >
            {t.viewArticle}
          </Link>
        </div>
      </section>

      {/* Distro List Section */}
      <section ref={resultsRef} className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">{t.distroListTitle}</h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-[6px] text-sm font-medium transition-all flex items-center gap-2 home-filter-btn ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-lg active scale-105' 
                    : 'bg-[#E2E2E2] text-dark hover:bg-gray-300'
                }`}
              >
                {categoryIcons[cat]}
                {t.categories[cat as keyof typeof t.categories] || cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {displayedDistros.map((distro, i) => {
              const translatedDistro = getTranslatedDistro(distro);
              return (
                <motion.div
                  key={distro.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    to={`/${distro.id}`}
                    className="bg-white distro-card rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 block h-full"
                  >
                    <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-xl distro-card">
                      <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-dark">{distro.name}</h3>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2">{translatedDistro.subtitle}</p>
                    <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                      {t.learnMore} <ArrowRight size={18} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {filteredDistros.length > displayLimit && (
              <button 
                onClick={handleViewMore}
                className="bg-primary text-white px-8 py-3 rounded-[6px] font-bold hover:bg-primary/90 transition-all shadow-lg flex items-center gap-2"
              >
                {selectedCategory === "Todas as distros" ? t.viewAll : t.viewMore}
              </button>
            )}
            <Link 
              to="/distromatch"
              className="bg-dark text-white px-8 py-3 rounded-[6px] font-bold hover:bg-dark/90 transition-all shadow-lg flex items-center gap-2"
            >
              {t.personalizedSearch}
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};
