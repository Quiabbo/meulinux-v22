import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowRight, Cpu, MemoryStick, User, Target, Video } from 'lucide-react';
import { useDistros } from '../hooks/useDistros';
import { Link } from 'react-router-dom';
import { AnimatedGrid } from '../components/AnimatedGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { DonationSection } from '../components/DonationSection';
import { DISTRO_TRANSLATIONS } from '../data/distroTranslations';

const translations = {
  pt: {
    title_match: "Match",
    subtitle: "Responda algumas perguntas simples e descubra qual a distro Linux ideal para você.",
    intro_block: "Não existe uma “melhor distro Linux”. Existe a melhor distro para o seu perfil.",
    label_processor: "Tipo de computador",
    label_memory: "Quanto de RAM você tem",
    label_experience: "Seu nível com Linux",
    label_objective: "O que você quer fazer",
    label_video: "Placa de vídeo",
    button_search: "Buscar",
    results_title: "Resultados para você:",
    button_learn_more: "Conhecer e Baixar",
    options_experience: ["Seu nível com Linux", "Iniciante", "Intermediário", "Avançado"],
    options_objective: ["O que você quer fazer", "Desenvolvimento", "Design", "Educação", "Hacking", "Geral"],
    options_video: [
      "Placa de vídeo",
      "Integrado Intel (HD, UHD, Iris Xe)",
      "Integrado AMD (Radeon Vega/RDNA)",
      "NVIDIA (Antiga, série 900 ou anterior)",
      "NVIDIA (Moderna, série 1000 ou mais recente)",
      "AMD (Antiga, anterior a RDNA)",
      "AMD (Moderna, RDNA ou mais recente)"
    ],
    options_processor: [
      "Tipo de computador",
      "Antigo (32-bit, ex: Pentium 4)",
      "Básico (64-bit, ex: Intel Atom, Celeron Dual-Core)",
      "Intermediário (64-bit, ex: Core i3, Ryzen 3)",
      "Moderno (64-bit, ex: Core i5/i7, Ryzen 5/7)",
      "Avançado (64-bit, ex: Core i9, Ryzen 9)",
      "Baseado em ARM (64-bit, ex: Raspberry Pi)"
    ],
    options_memory: [
      "Quanto de RAM você tem",
      "Menos de 1 GB",
      "1 GB",
      "2 GB",
      "4 GB",
      "8 GB+"
    ],
    recommendation_labels: {
      recommended: "Recomendado para você",
      best_choice: "⭐ Melhor escolha",
      good_alternative: "👍 Boa alternativa",
      more_knowledge: "⚠️ Exige mais conhecimento"
    },
    donation_title1: "Te ajudei?",
    donation_title2: "Que tal um café para o dev? ☕"
  },
  en: {
    title_match: "Match",
    subtitle: "Discover the ideal Linux distro for you. Answer a few simple questions and receive personalized recommendations for your computer and your objective.",
    intro_block: "There is no \"best Linux distro\". There is the best distro for your profile.",
    label_processor: "Computer type",
    label_memory: "How much RAM do you have",
    label_experience: "Your Linux level",
    label_objective: "What do you want to do",
    label_video: "Video card",
    button_search: "Search",
    results_title: "Results for you:",
    button_learn_more: "Learn and Download",
    options_experience: ["Your Linux level", "Beginner", "Intermediate", "Advanced"],
    options_objective: ["What do you want to do", "Development", "Design", "Education", "Hacking", "General"],
    options_video: [
      "Video card",
      "Integrated Intel (HD, UHD, Iris Xe)",
      "Integrated AMD (Radeon Vega/RDNA)",
      "NVIDIA (Old, 900 series or older)",
      "NVIDIA (Modern, 1000 series or newer)",
      "AMD (Old, pre-RDNA)",
      "AMD (Modern, RDNA or newer)"
    ],
    options_processor: [
      "Computer type",
      "Old (32-bit, e.g., Pentium 4)",
      "Basic (64-bit, e.g., Intel Atom, Celeron Dual-Core)",
      "Intermediate (64-bit, e.g., Core i3, Ryzen 3)",
      "Modern (64-bit, e.g., Core i5/i7, Ryzen 5/7)",
      "Advanced (64-bit, e.g., Core i9, Ryzen 9)",
      "ARM-based (64-bit, e.g., Raspberry Pi)"
    ],
    options_memory: [
      "How much RAM do you have",
      "Less than 1 GB",
      "1 GB",
      "2 GB",
      "4 GB",
      "8 GB+"
    ],
    recommendation_labels: {
      recommended: "Recommended for you",
      best_choice: "⭐ Best choice",
      good_alternative: "👍 Good alternative",
      more_knowledge: "⚠️ Requires more knowledge"
    },
    donation_title1: "Did I help you?",
    donation_title2: "How about a coffee for the dev? ☕"
  },
  es: {
    title_match: "Match",
    subtitle: "Descubre la distro Linux ideal para ti. Responde algunas preguntas simples y recibe recomendaciones personalizadas para tu computadora y tu objetivo.",
    intro_block: "No existe una \"mejor distro Linux\". Existe la mejor distro para tu perfil.",
    label_processor: "Tipo de computadora",
    label_memory: "Cuánta RAM tienes",
    label_experience: "Tu nivel con Linux",
    label_objective: "Qué quieres hacer",
    label_video: "Tarjeta de video",
    button_search: "Buscar",
    results_title: "Resultados para ti:",
    button_learn_more: "Conocer y Descargar",
    options_experience: ["Tu nivel con Linux", "Principiante", "Intermedio", "Avanzado"],
    options_objective: ["Qué quieres hacer", "Desarrollo", "Diseño", "Educación", "Hacking", "General"],
    options_video: [
      "Tarjeta de video",
      "Integrado Intel (HD, UHD, Iris Xe)",
      "Integrado AMD (Radeon Vega/RDNA)",
      "NVIDIA (Antigua, serie 900 o anterior)",
      "NVIDIA (Moderna, serie 1000 o más reciente)",
      "AMD (Antigua, anterior a RDNA)",
      "AMD (Moderna, RDNA o más reciente)"
    ],
    options_processor: [
      "Tipo de computadora",
      "Antiguo (32-bit, ej: Pentium 4)",
      "Básico (64-bit, ej: Intel Atom, Celeron Dual-Core)",
      "Intermedio (64-bit, ej: Core i3, Ryzen 3)",
      "Moderno (64-bit, ej: Core i5/i7, Ryzen 5/7)",
      "Avanzado (64-bit, ej: Core i9, Ryzen 9)",
      "Basado en ARM (64-bit, ej: Raspberry Pi)"
    ],
    options_memory: [
      "Cuánta RAM tienes",
      "Menos de 1 GB",
      "1 GB",
      "2 GB",
      "4 GB",
      "8 GB+"
    ],
    recommendation_labels: {
      recommended: "Recomendado para ti",
      best_choice: "⭐ Mejor elección",
      good_alternative: "👍 Buena alternativa",
      more_knowledge: "⚠️ Requiere más conocimiento"
    },
    donation_title1: "¿Te ayudé?",
    donation_title2: "¿Qué tal un café para el dev? ☕"
  }
};

export const DistroMatch = () => {
  const { lang } = useLanguage();
  const t = translations[lang];
  const DISTROS = useDistros();

  const [filters, setFilters] = useState({
    processor: t.options_processor[0],
    memory: t.options_memory[0],
    experience: t.options_experience[0],
    objective: t.options_objective[0],
    video: t.options_video[0]
  });
  const [results, setResults] = useState<typeof DISTROS>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    const currentLang = lang as keyof typeof translations;
    const t = translations[currentLang];

    // Helper to get index of selected option
    const getIdx = (val: string, options: string[]) => options.indexOf(val);

    const scoredDistros = DISTROS.map(distro => {
      let score = 0;
      
      // 1. Experience Score
      const expIdx = getIdx(filters.experience, t.options_experience);
      if (expIdx === 1) { // Iniciante / Beginner / Principiante
        if (distro.categories.includes('Melhor para começar')) score += 15;
        if (['arch-linux', 'gentoo', 'slackware', 'kali-linux', 'black-arch'].includes(distro.id)) score -= 20;
      } else if (expIdx === 3) { // Avançado / Advanced / Avanzado
        if (['arch-linux', 'gentoo', 'slackware', 'void', 'alpine', 'black-arch'].includes(distro.id)) score += 15;
        if (distro.categories.includes('Melhor para começar')) score -= 5;
      } else if (expIdx === 2) { // Intermediário
        score += 5;
      }

      // 2. Objective Score
      const objIdx = getIdx(filters.objective, t.options_objective);
      if (objIdx === 1) { // Desenvolvimento
        if (distro.categories.includes('Programação')) score += 15;
      } else if (objIdx === 2) { // Design
        if (['ubuntu-studio', 'deepin', 'elementary-os', 'solus'].includes(distro.id)) score += 15;
      } else if (objIdx === 3) { // Educação
        if (['edubuntu', 'endless-os', 'raspberry-pi-os'].includes(distro.id)) score += 15;
      } else if (objIdx === 4) { // Hacking
        if (distro.categories.includes('Hacking')) score += 20;
      } else if (objIdx === 5) { // Geral
        if (distro.categories.includes('Melhor para começar')) score += 10;
      }

      // 3. Hardware Score (Processor & Memory)
      const procIdx = getIdx(filters.processor, t.options_processor);
      const memIdx = getIdx(filters.memory, t.options_memory);
      
      const isLowEnd = procIdx <= 2 || memIdx <= 3; // Antigo/Básico or <= 2GB
      const isVeryLowEnd = procIdx === 1 || memIdx <= 2; // Antigo or <= 1GB
      
      if (isVeryLowEnd) {
        if (['tinycore', 'antix', 'bodhi', 'alpine', 'minios'].includes(distro.id)) score += 25;
        if (distro.categories.includes('PC fraco')) score += 15;
      } else if (isLowEnd) {
        if (distro.categories.includes('PC fraco')) score += 15;
        if (['ubuntu-linux', 'fedora-linux', 'pop-os', 'kubuntu', 'deepin'].includes(distro.id)) score -= 10;
      } else {
        // High end
        if (['fedora-linux', 'pop-os', 'manjaro', 'opensuse', 'tuxedo-os', 'bazzite'].includes(distro.id)) score += 10;
      }

      // 4. Video Score
      const vidIdx = getIdx(filters.video, t.options_video);
      if (vidIdx === 3 || vidIdx === 4) { // NVIDIA
        if (['pop-os', 'zorin-os', 'ubuntu-linux', 'linux-mint', 'manjaro', 'regata-os', 'tuxedo-os'].includes(distro.id)) score += 10;
      }
      if (vidIdx === 6) { // AMD Modern
        if (['bazzite', 'steam-os', 'nobara', 'fedora-linux'].includes(distro.id)) score += 10;
      }

      // 5. ARM Check
      if (procIdx === 6) { // ARM
        if (['raspberry-pi-os', 'ubuntu-linux', 'debian-linux', 'fedora-linux'].includes(distro.id)) score += 30;
        else score -= 50; // Most distros don't support ARM easily
      }

      return { ...distro, score };
    });

    // Sort by score and take top results
    const matched = scoredDistros
      .filter(d => d.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    const resultsWithLabels = (matched.length > 0 ? matched : [DISTROS[0]]).map((distro, index) => {
      let label = t.recommendation_labels.recommended;
      if (index === 0) label = t.recommendation_labels.best_choice;
      else if (index === 1) label = t.recommendation_labels.good_alternative;
      
      // Special case for advanced distros if user is not advanced
      const expIdx = getIdx(filters.experience, t.options_experience);
      if (expIdx < 3 && ['arch-linux', 'gentoo', 'slackware', 'void', 'alpine', 'black-arch'].includes(distro.id)) {
        label = t.recommendation_labels.more_knowledge;
      }
      
      return { ...distro, recommendationLabel: label };
    });

    setResults(resultsWithLabels);
    setHasSearched(true);
    
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="bg-dark text-white py-24 relative overflow-hidden">
        <AnimatedGrid />
        <div className="container-custom relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display mb-4"
          >
            <span className="font-normal">Distro</span><span className="font-bold">{t.title_match}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/70"
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-white distro-card p-8 rounded-[6px] shadow-xl -mt-32 relative z-10 mb-16" role="search" aria-label="Filtros de busca de distros">
            <div className="mb-8 p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg">
              <p className="text-dark font-medium italic">
                {t.intro_block}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="processor" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <Cpu size={14} className="text-primary" /> {t.label_processor}
                </label>
                <select 
                  id="processor"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.processor}
                  onChange={(e) => setFilters({...filters, processor: e.target.value})}
                >
                  {t.options_processor.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="memory" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <MemoryStick size={14} className="text-primary" /> {t.label_memory}
                </label>
                <select 
                  id="memory"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.memory}
                  onChange={(e) => setFilters({...filters, memory: e.target.value})}
                >
                  {t.options_memory.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="experience" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <User size={14} className="text-primary" /> {t.label_experience}
                </label>
                <select 
                  id="experience"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.experience}
                  onChange={(e) => setFilters({...filters, experience: e.target.value})}
                >
                  {t.options_experience.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="objective" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <Target size={14} className="text-primary" /> {t.label_objective}
                </label>
                <select 
                  id="objective"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.objective}
                  onChange={(e) => setFilters({...filters, objective: e.target.value})}
                >
                  {t.options_objective.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="video" className="text-xs font-bold text-dark uppercase ml-1 flex items-center gap-1">
                  <Video size={14} className="text-primary" /> {t.label_video}
                </label>
                <select 
                  id="video"
                  className="bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={filters.video}
                  onChange={(e) => setFilters({...filters, video: e.target.value})}
                >
                  {t.options_video.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full mt-6 bg-primary text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2 focus:ring-4 focus:ring-primary/20 outline-none"
              aria-label={t.button_search}
            >
              <Search size={20} aria-hidden="true" /> {t.button_search}
            </button>
          </div>

          {/* Results */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-3xl font-display font-bold mb-8">{t.results_title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((distro, i) => {
                   const trans = DISTRO_TRANSLATIONS[lang]?.[distro.id];
                   const subtitle = trans?.subtitle || distro.subtitle;
                   
                   return (
                     <motion.div
                       key={distro.id}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.1 }}
                     >
                       <Link 
                         to={`/${distro.id}`}
                         className="bg-white distro-card rounded-[6px] p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100 block h-full relative overflow-hidden"
                       >
                         {(distro as any).recommendationLabel && (
                           <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                             {(distro as any).recommendationLabel}
                           </div>
                         )}
                         <div className="h-16 w-16 mb-4 flex items-center justify-center bg-gray-50 rounded-[6px] distro-card">
                           <img src={distro.logo} alt={distro.name} className="max-h-12 max-w-12 object-contain" referrerPolicy="no-referrer" />
                         </div>
                         <h3 className="text-xl font-bold mb-2 text-dark">{distro.name}</h3>
                         <p className="text-gray-500 text-sm mb-6 line-clamp-2">{subtitle}</p>
                         <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                           {t.button_learn_more} <ArrowRight size={18} />
                         </div>
                       </Link>
                     </motion.div>
                   );
                 })}
               </div>
            </motion.div>
          )}
        </div>
      </section>
      {hasSearched && <DonationSection titleLine1={t.donation_title1} titleLine2={t.donation_title2} />}
    </div>
  );
};
