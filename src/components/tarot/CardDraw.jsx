
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Sparkles, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";

const TAROT_CARDS = [
{
  name: "The Fool",
  number: 0,
  keywords: ["new beginnings", "innocence", "adventure", "freedom"],
  interpretation: {
    general: "The Fool represents new beginnings, spontaneity, and a leap of faith into the unknown. It signals a time of potential and infinite possibilities, encouraging you to embrace the journey ahead with an open heart.",
    love: "In matters of the heart, The Fool suggests a fresh romantic beginning or taking a risk in love. It may indicate meeting someone new or approaching relationships with childlike wonder and authenticity.",
    career: "For career, this card signals a new professional venture, changing paths, or taking a calculated risk. It's time to trust your instincts and pursue what truly excites you, even if the path ahead is uncertain.",
    finance: "Financially, The Fool advises being open to new opportunities while maintaining awareness. It may indicate unconventional approaches to wealth or investing in yourself and your dreams.",
    family: "In family matters, this card suggests bringing fresh energy and spontaneity to relationships. It may indicate new family dynamics or the courage to be your authentic self with loved ones.",
    health: "For health, The Fool encourages trying new wellness approaches and listening to your body's wisdom. It's about starting fresh with self-care and embracing vitality.",
    spirituality: "The Fool represents the beginning of your spiritual journey, embracing divine innocence, and trusting the universe. It's about taking a leap of faith in your spiritual path and being open to infinite possibilities in your soul's evolution."
  },
  gradient: "from-sky-200 via-blue-300 to-indigo-400"
},
{
  name: "The Magician",
  number: 1,
  keywords: ["manifestation", "power", "skill", "concentration"],
  interpretation: {
    general: "The Magician represents your ability to manifest your desires through willpower and resourcefulness. You have all the tools you need - it's time to harness your personal power and take inspired action.",
    love: "In love, The Magician signals attraction, charisma, and the power to manifest the relationship you desire. Communication flows easily, and you have the ability to create magic in your connections.",
    career: "This card indicates you have the skills and resources to succeed in your professional endeavors. It's time to showcase your talents, communicate your ideas effectively, and transform your vision into reality.",
    finance: "Financially, The Magician suggests you can manifest abundance through your talents and resourcefulness. Multiple income streams may be available to you - use your skills wisely.",
    family: "For family, this card indicates you have the power to improve dynamics through clear communication and taking action. You can be the catalyst for positive change.",
    health: "In health matters, The Magician encourages taking an active role in your wellbeing. You have the power to transform your health through focused intention and utilizing available resources.",
    spirituality: "The Magician represents your power to manifest spiritual growth through conscious intention. You have access to divine wisdom and can channel universal energy for your spiritual development. Master your inner world to transform your outer reality."
  },
  gradient: "from-violet-300 via-purple-400 to-fuchsia-500"
},
{
  name: "The High Priestess",
  number: 2,
  keywords: ["intuition", "sacred knowledge", "divine feminine"],
  interpretation: {
    general: "The High Priestess calls you to trust your intuition and inner wisdom. She represents the subconscious mind, sacred knowledge, and the mysteries waiting to be unveiled through quiet contemplation.",
    love: "In love, this card suggests trusting your intuition about relationships. There may be unspoken emotions or hidden aspects to explore. Listen to your inner voice about matters of the heart.",
    career: "Professionally, The High Priestess advises listening to your gut instincts. There may be information not yet revealed. Take time for reflection before making major decisions.",
    finance: "For finances, trust your intuition about investments and opportunities. Not everything is as it appears - do your inner and outer research before committing.",
    family: "In family matters, this card indicates understanding unspoken dynamics and trusting your instincts about what's really happening beneath the surface.",
    health: "For health, The High Priestess encourages connecting with your body's wisdom and exploring holistic approaches. Listen to what your intuition tells you about your wellbeing.",
    spirituality: "The High Priestess is the guardian of sacred mysteries and divine feminine wisdom. She calls you to deepen your meditation practice, trust your psychic abilities, and explore the hidden realms of consciousness. Your spiritual insights are profound now."
  },
  gradient: "from-indigo-400 via-blue-500 to-slate-700"
},
{
  name: "The Empress",
  number: 3,
  keywords: ["abundance", "nurturing", "fertility", "nature"],
  interpretation: {
    general: "The Empress embodies abundance, creativity, and nurturing energy. She represents the fruition of ideas, material comfort, and connection to nature and beauty.",
    love: "In relationships, The Empress signals deep affection, sensuality, and nurturing love. It may indicate a relationship entering a more stable, abundant phase or the possibility of growing your family.",
    career: "For career, this card suggests creative projects coming to fruition and material success. Nurture your ideas and watch them grow. Your work environment should feel abundant and supportive.",
    finance: "Financially, The Empress brings abundance and material comfort. Your efforts are bearing fruit. Focus on creating sustainable wealth and enjoying life's pleasures.",
    family: "This card strongly indicates nurturing family bonds, possibly pregnancy or new family members, and creating a warm, abundant home environment.",
    health: "For health, The Empress encourages connecting with nature, nourishing your body well, and embracing self-care. Fertility and vitality are highlighted.",
    spirituality: "The Empress represents spiritual abundance and connection to Mother Earth. She encourages you to ground your spirituality in the natural world, nurture your spiritual gifts, and allow your soul to flourish like a well-tended garden."
  },
  gradient: "from-emerald-300 via-green-400 to-teal-600"
},
{
  name: "The Emperor",
  number: 4,
  keywords: ["authority", "structure", "control", "leadership"],
  interpretation: {
    general: "The Emperor represents structure, authority, and taking control of your life. He brings stability through organization, discipline, and establishing clear boundaries and systems.",
    love: "In love, The Emperor suggests stable, committed relationships built on mutual respect. It may indicate a partner who is protective and reliable, or the need to establish healthy boundaries.",
    career: "Professionally, this card signals leadership opportunities, establishing authority, or working within structured systems. It's time to take charge and organize your professional life.",
    finance: "For finances, The Emperor advises creating solid financial plans, establishing budgets, and building long-term stability. Structure and discipline lead to success.",
    family: "In family matters, this card represents the father figure, establishing household rules, and creating stable family structures. Leadership and responsibility are highlighted.",
    health: "For health, The Emperor encourages establishing disciplined routines, following medical advice, and taking a structured approach to wellness.",
    spirituality: "The Emperor brings structure to your spiritual practice. He encourages establishing daily spiritual rituals, taking authority over your spiritual path, and building a strong foundation for your soul's growth through discipline and commitment."
  },
  gradient: "from-red-400 via-orange-500 to-amber-700"
},
{
  name: "The Hierophant",
  number: 5,
  keywords: ["tradition", "conformity", "education", "belief"],
  interpretation: {
    general: "The Hierophant represents tradition, spiritual wisdom, and established institutions. This card suggests seeking guidance from mentors, following conventional paths, or exploring your belief systems.",
    love: "In relationships, this card may indicate traditional commitments like marriage, or relationships blessed by family and community. It can also suggest seeking relationship counseling or guidance.",
    career: "Professionally, The Hierophant favors traditional career paths, working with established institutions, mentorship, or roles in education and spiritual guidance.",
    finance: "For finances, this card suggests conservative approaches, working with financial advisors, or following tried-and-true methods for building wealth.",
    family: "In family matters, traditions, cultural heritage, and family values are emphasized. There may be involvement with religious or educational institutions.",
    health: "For health, The Hierophant advises seeking expert medical advice, following traditional treatments, or exploring the connection between spiritual and physical wellness.",
    spirituality: "The Hierophant represents formal spiritual education, traditional religious practices, and seeking wisdom from spiritual teachers. He encourages you to explore established spiritual paths, honor sacred traditions, and find your place within spiritual community."
  },
  gradient: "from-stone-400 via-gray-500 to-slate-600"
},
{
  name: "The Lovers",
  number: 6,
  keywords: ["love", "harmony", "relationships", "choices"],
  interpretation: {
    general: "The Lovers represents meaningful relationships, important choices, and values alignment. This card speaks to harmony, partnership, and making decisions that honor your authentic self.",
    love: "In romance, this is a powerful card of deep connection, soulmate energy, and relationships built on mutual love and respect. It may indicate an important choice in love.",
    career: "For career, The Lovers suggests partnerships, collaboration, or important decisions about your professional path. Choose work that aligns with your values.",
    finance: "Financially, this card may indicate business partnerships or financial decisions requiring careful consideration of your values and long-term goals.",
    family: "In family matters, The Lovers emphasizes harmony, making choices that honor family values, and the importance of open communication and mutual support.",
    health: "For health, this card encourages balance and making choices that honor your body and wellbeing. Consider how your relationships impact your health.",
    spirituality: "The Lovers represents the sacred union of your higher and lower self, spiritual choices that define your path, and alignment with your soul's purpose. It's about choosing love as your spiritual practice and finding divine union within."
  },
  gradient: "from-rose-300 via-pink-400 to-red-400"
},
{
  name: "The Chariot",
  number: 7,
  keywords: ["control", "willpower", "determination", "victory"],
  interpretation: {
    general: "The Chariot represents triumph through determination and willpower. This card signals victory, forward movement, and the ability to overcome obstacles through focused effort and self-discipline.",
    love: "In love, The Chariot suggests taking control of your romantic destiny. It may indicate overcoming relationship obstacles or pursuing someone with determination and confidence.",
    career: "Professionally, this card signals success through focused effort. Career advancement, winning competitions, or achieving ambitious goals are indicated. Stay determined.",
    finance: "For finances, The Chariot brings success through disciplined effort. You can overcome financial challenges and move toward prosperity through willpower and strategic action.",
    family: "In family matters, this card suggests successfully navigating family challenges, possibly involving travel or moving. Determination helps you overcome any family obstacles.",
    health: "For health, The Chariot encourages taking control of your wellness journey. With determination and willpower, you can overcome health challenges and achieve your fitness goals.",
    spirituality: "The Chariot represents your spiritual journey's momentum and mastery over opposing forces within. It encourages balancing your spiritual and material life, moving forward with confidence on your path, and using willpower to overcome spiritual obstacles."
  },
  gradient: "from-cyan-400 via-blue-500 to-indigo-600"
},
{
  name: "Strength",
  number: 8,
  keywords: ["courage", "patience", "compassion", "inner strength"],
  interpretation: {
    general: "Strength represents inner courage, patience, and compassionate power. This card reminds you that true strength comes from within - through kindness, self-control, and gentle persuasion rather than force.",
    love: "In relationships, Strength suggests patience, compassion, and the courage to be vulnerable. It indicates relationships that require understanding and gentle handling, where love conquers all.",
    career: "Professionally, this card advises using patience and diplomacy to achieve your goals. Your inner confidence and ability to remain calm under pressure will lead to success.",
    finance: "For finances, Strength encourages patient, steady approaches to building wealth. Resist impulsive decisions and trust that consistent, gentle effort will bring results.",
    family: "In family matters, this card highlights the importance of patience, compassion, and emotional strength. Gentle guidance is more effective than force.",
    health: "For health, Strength emphasizes mind-body connection, emotional resilience, and the courage to face health challenges. Inner strength supports physical healing.",
    spirituality: "Strength represents mastery over your ego and lower nature through compassion and patience. It's about spiritual courage, taming your inner beasts with love, and discovering that your greatest spiritual power comes from gentle, persistent faith."
  },
  gradient: "from-amber-400 via-orange-500 to-red-500"
},
{
  name: "The Hermit",
  number: 9,
  keywords: ["introspection", "solitude", "guidance", "wisdom"],
  interpretation: {
    general: "The Hermit represents soul-searching, introspection, and seeking inner wisdom. This card suggests taking time alone to reflect, meditate, and connect with your higher self and inner guidance.",
    love: "In love, The Hermit may indicate a period of solitude before meeting someone meaningful, or needing space within a relationship for self-reflection and personal growth.",
    career: "Professionally, this card suggests working independently, seeking mentorship, or taking time to reflect on your career path. Inner work leads to professional clarity.",
    finance: "For finances, The Hermit advises careful reflection before making financial decisions. Seek expert advice and take time to understand your financial situation deeply.",
    family: "In family matters, this card may indicate needing space from family for personal growth, or becoming a source of wisdom for family members.",
    health: "For health, The Hermit encourages introspection about your wellness, possibly seeking guidance from healers or specialists, and taking quiet time for recovery.",
    spirituality: "The Hermit is the spiritual seeker who withdraws to find inner truth. This card calls you to embrace solitude for spiritual growth, meditation, and deep introspection. You are becoming your own spiritual guide, discovering wisdom within the silence of your soul."
  },
  gradient: "from-slate-500 via-gray-600 to-zinc-800"
},
{
  name: "Wheel of Fortune",
  number: 10,
  keywords: ["destiny", "cycles", "change", "luck"],
  interpretation: {
    general: "The Wheel of Fortune represents life's cycles, destiny, and inevitable change. This card reminds you that nothing is permanent - what goes up must come down, but what goes down will rise again.",
    love: "In love, this card indicates changing relationship dynamics. If single, you may meet someone unexpectedly. Existing relationships enter new phases. Embrace the natural cycles of love.",
    career: "Professionally, expect turning points and changes. New opportunities may arrive unexpectedly. Trust that career ups and downs are part of your journey toward success.",
    finance: "For finances, The Wheel suggests fluctuating fortunes. Stay adaptable and save during abundant times. Good luck may be coming if you've experienced challenges.",
    family: "In family matters, this card indicates changing family dynamics and life transitions. Accept that family relationships naturally evolve through different seasons.",
    health: "For health, The Wheel reminds you that wellness has natural cycles. If experiencing challenges, know that improvement is coming. Maintain healthy habits through all seasons.",
    spirituality: "The Wheel of Fortune represents karmic cycles, divine timing, and the understanding that your spiritual journey has seasons. It teaches acceptance of life's rhythms, trust in divine providence, and the wisdom that what you sow spiritually, you shall reap."
  },
  gradient: "from-yellow-300 via-amber-500 to-orange-600"
},
{
  name: "Justice",
  number: 11,
  keywords: ["fairness", "truth", "law", "balance"],
  interpretation: {
    general: "Justice represents fairness, truth, and karmic balance. This card signals that honesty will be rewarded and dishonesty exposed. Decisions should be made with careful consideration of cause and effect.",
    love: "In relationships, Justice indicates fair treatment, honest communication, and balanced partnerships. Legal matters may affect relationships. Karma is at play in romantic situations.",
    career: "Professionally, this card suggests legal matters, contracts, or situations requiring fair judgment. You'll be evaluated based on merit. Ethical behavior is crucial now.",
    finance: "For finances, Justice indicates legal or contractual matters affecting money. Financial fairness and karma are highlighted. Past financial decisions come to fruition.",
    family: "In family matters, this card suggests resolving conflicts fairly, legal family matters, or the need for balanced give-and-take in family relationships.",
    health: "For health, Justice encourages taking responsibility for your wellness choices. Your current health is a result of past decisions. Make balanced, informed choices now.",
    spirituality: "Justice represents karmic law, spiritual accountability, and divine truth. It reminds you that every spiritual action has consequences, that the universe is inherently fair, and that living in integrity with spiritual principles brings harmony to your soul."
  },
  gradient: "from-blue-300 via-cyan-500 to-teal-600"
},
{
  name: "The Hanged Man",
  number: 12,
  keywords: ["sacrifice", "letting go", "new perspective"],
  interpretation: {
    general: "The Hanged Man represents surrender, new perspectives, and meaningful sacrifice. This card suggests that sometimes the best action is inaction - pausing to see situations from a different angle.",
    love: "In love, this card indicates the need to let go of control, see relationships from a new perspective, or make sacrifices for love. Patience brings clarity.",
    career: "Professionally, The Hanged Man suggests a period of waiting or sacrifice that ultimately leads to enlightenment. Don't force progress - sometimes you must pause to gain clarity.",
    finance: "For finances, this card advises patience with investments and financial matters. Short-term sacrifices may be necessary for long-term gain. Change your perspective on money.",
    family: "In family matters, this card suggests releasing control, accepting family situations you cannot change, and finding peace through surrender and new understanding.",
    health: "For health, The Hanged Man encourages patience with healing, accepting limitations temporarily, and exploring alternative perspectives on wellness.",
    spirituality: "The Hanged Man represents spiritual surrender, seeing life from a higher perspective, and the enlightenment that comes through releasing ego. It's about voluntary sacrifice for spiritual wisdom and understanding that sometimes stillness is the most profound spiritual practice."
  },
  gradient: "from-indigo-400 via-purple-600 to-slate-700"
},
{
  name: "Death",
  number: 13,
  keywords: ["transformation", "endings", "rebirth", "transition"],
  interpretation: {
    general: "Death represents profound transformation and necessary endings. This card rarely means physical death - instead, it signals that major change is necessary for growth. Let go of what no longer serves you.",
    love: "In relationships, Death may indicate the end of one phase and beginning of another. Relationships transform deeply, or endings make way for new love. Embrace necessary change.",
    career: "Professionally, this card signals major career transformations. A job or career phase may end, making way for new opportunities. Release the old to welcome the new.",
    finance: "For finances, Death suggests the end of one financial chapter and the beginning of another. Let go of old money habits to create space for new abundance.",
    family: "In family matters, this card indicates major family transitions, changing roles, or releasing old family patterns. Transformation brings family closer.",
    health: "For health, Death encourages releasing old wellness habits and embracing transformative healing. Major lifestyle changes may be necessary for better health.",
    spirituality: "Death represents profound spiritual transformation, ego death, and spiritual rebirth. It's about shedding your old spiritual self to emerge renewed, releasing attachments that hinder soul growth, and understanding that spiritual death leads to resurrection at a higher level."
  },
  gradient: "from-slate-800 via-gray-900 to-black"
},
{
  name: "Temperance",
  number: 14,
  keywords: ["balance", "moderation", "patience", "purpose"],
  interpretation: {
    general: "Temperance represents balance, moderation, and finding the middle path. This card encourages patience, blending opposing forces harmoniously, and maintaining equilibrium in all areas of life.",
    love: "In relationships, Temperance signals harmony, balanced give-and-take, and patient nurturing of love. It may indicate balancing relationship needs with personal needs.",
    career: "Professionally, this card advises moderation, patience with career progression, and balancing work with life. Avoid extremes and find sustainable work rhythms.",
    finance: "For finances, Temperance encourages balanced spending and saving, avoiding financial extremes, and patient wealth-building. Financial moderation leads to stability.",
    family: "In family matters, this card emphasizes finding balance between different family members' needs, practicing patience, and maintaining family harmony through moderation.",
    health: "For health, Temperance strongly emphasizes balanced lifestyle, moderation in all things, and the mind-body-spirit connection. Avoid extremes in diet and exercise.",
    spirituality: "Temperance represents the alchemical blending of spiritual and material, divine balance, and walking the middle path. It encourages integrating all aspects of your being, practicing moderation in spiritual pursuits, and finding harmony between heaven and earth."
  },
  gradient: "from-sky-300 via-blue-400 to-indigo-500"
},
{
  name: "The Devil",
  number: 15,
  keywords: ["bondage", "materialism", "temptation", "shadow self"],
  interpretation: {
    general: "The Devil represents attachment, restriction, and shadow aspects. This card highlights where you may be bound by unhealthy patterns, addictions, or limiting beliefs. Awareness is the first step to freedom.",
    love: "In relationships, The Devil may indicate codependency, unhealthy attachments, or being drawn to destructive patterns. It's time to examine what's truly binding you in love.",
    career: "Professionally, this card suggests feeling trapped in your career, materialism overshadowing fulfillment, or workplace toxicity. Recognize what's holding you back.",
    finance: "For finances, The Devil warns of materialism, debt, or unhealthy financial attachments. Examine your relationship with money and material possessions.",
    family: "In family matters, this card indicates unhealthy family patterns, codependency, or being bound by family expectations. Liberation comes through awareness.",
    health: "For health, The Devil signals addictions, unhealthy habits, or destructive patterns affecting wellness. Face your shadow to begin healing.",
    spirituality: "The Devil represents spiritual bondage, attachment to material illusions, and the shadow self that must be acknowledged for spiritual growth. It calls you to examine what chains your soul, face your spiritual darkness, and realize that recognizing your bindings is the first step to spiritual liberation."
  },
  gradient: "from-red-600 via-rose-800 to-black"
},
{
  name: "The Tower",
  number: 16,
  keywords: ["upheaval", "chaos", "revelation", "awakening"],
  interpretation: {
    general: "The Tower represents sudden change, upheaval, and breakthrough moments. Though often challenging, this card clears away false structures to reveal truth and create space for authentic rebuilding.",
    love: "In relationships, The Tower indicates sudden revelations or changes that shake foundations. Though difficult, these changes remove illusions and create opportunity for authentic connection.",
    career: "Professionally, this card signals unexpected changes, job loss, or career upheavals. While challenging, these changes free you from situations no longer serving your growth.",
    finance: "For finances, The Tower warns of sudden financial changes or unexpected expenses. Financial structures may crumble, but this creates opportunity to build more solid foundations.",
    family: "In family matters, this card indicates sudden family revelations, disruptions, or breaking free from family constraints. Truth emerges, though it may be uncomfortable.",
    health: "For health, The Tower may indicate sudden health wake-up calls requiring immediate attention. These revelations, while shocking, prompt necessary lifestyle changes.",
    spirituality: "The Tower represents spiritual awakening through crisis, the destruction of false spiritual beliefs, and divine intervention that shatters illusions. It's a spiritual breakthrough that, though painful, liberates your soul from structures built on false foundations."
  },
  gradient: "from-orange-500 via-red-600 to-gray-900"
},
{
  name: "The Star",
  number: 17,
  keywords: ["hope", "faith", "renewal", "spirituality"],
  interpretation: {
    general: "The Star represents hope, healing, and renewed faith. After challenges, this card brings peace, spiritual connection, and trust that everything will work out. Your wishes and dreams are blessed.",
    love: "In relationships, The Star brings hope for love, healing of past wounds, and renewed faith in romance. It's a beautiful omen for soulmate connections and deep spiritual love.",
    career: "Professionally, this card signals renewed hope, inspiration returning, and faith that your career path is guided. Your talents will shine and be recognized.",
    finance: "For finances, The Star brings optimism and faith in financial recovery or abundance. Your financial wishes have cosmic support. Stay hopeful.",
    family: "In family matters, this card indicates healing family wounds, renewed hope for family happiness, and spiritual blessings for family wellbeing.",
    health: "For health, The Star is deeply healing, bringing hope for recovery, renewed vitality, and spiritual support for wellness. Trust in your body's ability to heal.",
    spirituality: "The Star is pure spiritual hope, divine inspiration, and connection to cosmic consciousness. It represents answered prayers, spiritual healing, and your soul's light shining brightly. You are blessed by the universe and guided by celestial forces."
  },
  gradient: "from-sky-200 via-cyan-300 to-blue-500"
},
{
  name: "The Moon",
  number: 18,
  keywords: ["illusion", "intuition", "subconscious", "fear"],
  interpretation: {
    general: "The Moon represents illusion, intuition, and the subconscious realm. This card signals that not everything is as it appears. Trust your intuition but be aware that fears and illusions may cloud your judgment.",
    love: "In relationships, The Moon indicates confusion, hidden emotions, or illusions about love. Trust your intuition but don't make major decisions until clarity emerges.",
    career: "Professionally, this card warns that workplace situations may not be what they seem. Hidden factors are at play. Trust your instincts and wait for clarity before major moves.",
    finance: "For finances, The Moon advises caution - financial situations may be unclear or deceptive. Examine all financial matters carefully and trust your intuitive warnings.",
    family: "In family matters, this card suggests unspoken emotions, family secrets, or unclear family dynamics. Your intuition knows more than appears on the surface.",
    health: "For health, The Moon encourages trusting your instincts about your body, but also seeking clear medical diagnoses. Mental health and sleep are particularly highlighted.",
    spirituality: "The Moon represents the mysterious spiritual journey through the subconscious, dreams, and psychic realms. It calls you to explore your shadow, trust your intuitive gifts, navigate spiritual illusions, and understand that not all spiritual truths are immediately visible."
  },
  gradient: "from-indigo-400 via-violet-600 to-slate-800"
},
{
  name: "The Sun",
  number: 19,
  keywords: ["joy", "success", "celebration", "positivity"],
  interpretation: {
    general: "The Sun represents joy, success, and radiant vitality. This is one of the most positive cards, bringing warmth, happiness, and clarity to all situations. Everything is illuminated and blessed.",
    love: "In relationships, The Sun brings joy, warmth, and successful partnerships. It may indicate engagement, marriage, or simply the happiness of authentic love shining brightly.",
    career: "Professionally, this card signals success, recognition, and career happiness. Your talents shine brightly. Promotions, achievements, and professional joy are indicated.",
    finance: "For finances, The Sun brings abundance, financial success, and confidence about money. Your financial situation is bright and promising. Enjoy your prosperity.",
    family: "In family matters, this card indicates family joy, children bringing happiness, and family celebrations. Warmth and harmony radiate through family relationships.",
    health: "For health, The Sun brings vitality, energy, and radiant wellness. Recovery is swift. Outdoor activities and sunshine support your wellbeing beautifully.",
    spirituality: "The Sun represents spiritual enlightenment, divine joy, and your soul shining at its brightest. It's about spiritual clarity, celebrating your spiritual path, and experiencing the pure bliss of connection with the divine. Your spirit radiates light."
  },
  gradient: "from-yellow-300 via-orange-400 to-amber-500"
},
{
  name: "Judgement",
  number: 20,
  keywords: ["reflection", "reckoning", "inner calling", "absolution"],
  interpretation: {
    general: "Judgement represents awakening, reflection, and answering your higher calling. This card signals a time of reckoning, self-evaluation, and transformation based on past lessons learned.",
    love: "In relationships, Judgement indicates evaluating past relationship patterns, making peace with romantic history, or relationships reaching a point of decision and renewal.",
    career: "Professionally, this card suggests career evaluation, being called to your true vocation, or judgments/decisions affecting your professional path. Past work comes to fruition.",
    finance: "For finances, Judgement indicates financial evaluations, accounting for past financial decisions, or important financial judgments and decisions that transform your relationship with money.",
    family: "In family matters, this card suggests family reconciliation, resolving past family issues, or major family decisions requiring judgment and reflection.",
    health: "For health, Judgement encourages honest health assessments, making peace with your body, and responding to your body's calling for lifestyle changes.",
    spirituality: "Judgement represents spiritual awakening, hearing your soul's calling, and spiritual rebirth. It's about being called to your higher purpose, forgiving past spiritual mistakes, and rising to a new level of spiritual consciousness. Your spiritual reckoning brings profound transformation."
  },
  gradient: "from-violet-300 via-purple-500 to-indigo-700"
},
{
  name: "The World",
  number: 21,
  keywords: ["completion", "accomplishment", "fulfillment", "travel"],
  interpretation: {
    general: "The World represents completion, fulfillment, and achieving wholeness. This card signals the successful conclusion of a journey and the integration of all you've learned. You've come full circle.",
    love: "In relationships, The World indicates reaching relationship goals, deep fulfillment in love, or completing one phase to begin another. Soulmate connections feel complete and whole.",
    career: "Professionally, this card signals career success, completing major projects, achieving your career goals, or international opportunities. You've reached an important milestone.",
    finance: "For finances, The World brings financial completion, achieving financial goals, or success with international finances. Financial cycles complete successfully.",
    family: "In family matters, this card indicates family wholeness, achieving family harmony, or possibly international family connections. Family cycles complete positively.",
    health: "For health, The World signals achieving wellness goals, integrating mind-body-spirit health, or completing a healing journey. You feel whole and healthy.",
    spirituality: "The World represents spiritual completion, cosmic consciousness, and union with the divine. It's the culmination of your spiritual journey, integration of all spiritual lessons, and achievement of enlightenment. You are one with the universe, whole and spiritually fulfilled."
  },
  gradient: "from-emerald-400 via-teal-500 to-cyan-600"
}];


export default function CardDraw({ category, onBack }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnCard, setDrawnCard] = useState(null);
  const [reading, setReading] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fairyDust, setFairyDust] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const drawCard = async () => {
    setIsDrawing(true);
    setIsFlipped(false);
    setReading(null);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    setDrawnCard(randomCard);
    setIsDrawing(false);

    setTimeout(() => {
      setIsFlipped(true);
      playWindChime();
      createFairyDust();
      generateReading(randomCard);
    }, 500);
  };

  const playWindChime = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  const createFairyDust = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1
      });
    }
    setFairyDust(particles);
    setTimeout(() => setFairyDust([]), 2500);
  };

  const speakReading = () => {
    if ('speechSynthesis' in window && reading) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        // Remove subtitles (formatted as **Subtitle**) for speech
        const utterance = new SpeechSynthesisUtterance(reading.replace(/\*\*(.*?)\*\*\n?/g, ''));
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const generateReading = async (card) => {
    setIsGenerating(true);
    try {
      let categoryKey = "general";
      if (category.id === "love") categoryKey = "love";else
      if (category.id === "career") categoryKey = "career";else
      if (category.id === "finance") categoryKey = "finance";else
      if (category.id === "family") categoryKey = "family";else
      if (category.id === "health") categoryKey = "health";else
      if (category.id === "spirituality") categoryKey = "spirituality";

      const baseInterpretation = card.interpretation[categoryKey];

      const prompt = `You are a wise and compassionate tarot reader. A person has drawn "${card.name}" for a reading about ${category.name}.

Core card interpretation: ${baseInterpretation}

The card's keywords are: ${card.keywords.join(", ")}.

Based on this traditional tarot meaning, provide a personalized, uplifting reading that:
1. Expands on the core interpretation provided for ${category.name} specifically
2. Offers specific, actionable guidance relevant to ${category.name}
3. Highlights opportunities and positive potentials
4. Ends with an inspiring affirmation or message

Structure your response as 3-4 paragraphs, each with a short subtitle (3-5 words) that summarizes that paragraph.
Format each paragraph as: **Subtitle**\n[Paragraph text]\n\n

Keep the tone warm, mystical, and encouraging. Make it feel personal and meaningful.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: prompt
      });

      setReading(result);
    } catch (error) {
      setReading("The universe's message is unclear at this moment. Please try drawing another card.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Header with Art Deco styling */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-amber-200 hover:text-amber-100 hover:bg-amber-900/30 border border-amber-700/40"
          style={{ fontFamily: "'Cinzel', serif" }}>

          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
          <h2 className="text-2xl font-semibold text-amber-100 tracking-wider"
          style={{ fontFamily: "'Cinzel', serif" }}>
            {category.name}
          </h2>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
        </div>
        <div className="w-20" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        {!drawnCard ?
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center">

            <div className="mb-8">
              {/* Art Deco sunburst */}
              <div className="w-40 h-40 mx-auto mb-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {[...Array(16)].map((_, i) =>
                <motion.div
                  key={i}
                  className="absolute w-1 bg-gradient-to-t from-amber-500/60 to-transparent"
                  style={{
                    height: '80px',
                    transformOrigin: 'bottom center',
                    transform: `rotate(${i * 22.5}deg)`,
                    bottom: '50%'
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1
                  }} />

                )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-4 border-amber-300/50">
                    <Sparkles className="w-10 h-10 text-amber-950" />
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-4" />
                <h3 className="text-3xl font-semibold text-amber-100 mb-2 tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}>
                  Focus on Your Question
                </h3>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4" />
              </div>
              
              <p className="text-amber-200/80 text-lg max-w-md mx-auto mb-8 tracking-wide"
            style={{ fontFamily: "'Cinzel', serif" }}>Take a deep breath. 
Clear your mind. 
When you're ready, draw your card.</p>
            </div>

            <Button
            onClick={drawCard}
            disabled={isDrawing}
            className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 px-10 py-6 text-lg rounded-none border-2 border-amber-400/50 shadow-2xl shadow-amber-900/50 tracking-wider relative overflow-hidden group"
            style={{ fontFamily: "'Cinzel', serif" }}>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              {isDrawing ?
            <span className="flex items-center gap-2 relative z-10">
                  <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>

                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Drawing Your Card...
                </span> :

            <span className="relative z-10">Draw Your Card</span>
            }
            </Button>
          </motion.div> :

        <div className="w-full relative">
            {/* Fairy Dust Particles */}
            <AnimatePresence>
              {fairyDust.map((particle) =>
            <motion.div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`
              }}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0],
                y: [0, -50, -100]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: "easeOut"
              }}>

                  <Sparkles
                className="text-amber-400"
                size={Math.random() * 12 + 8}
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))'
                }} />

                </motion.div>
            )}
            </AnimatePresence>

            {/* Card Display */}
            <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8">

              <div className="perspective-1000 mx-auto max-w-sm">
                <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="relative w-full aspect-[2/3] preserve-3d">

                  {/* Card Back */}
                  <div className="absolute inset-0 backface-hidden">
                    <Card className="w-full h-full bg-gradient-to-br from-stone-900 to-amber-950 border-4 border-amber-600/60 shadow-2xl shadow-amber-900/80 rounded-none relative overflow-hidden">
                      <div className="absolute inset-4 border-2 border-amber-500/40">
                        <div className="absolute inset-2 border border-amber-500/30" />
                      </div>
                      
                      <CardContent className="p-0 h-full flex items-center justify-center relative">
                        <div className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                                 repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.2) 20px, rgba(251, 191, 36, 0.2) 22px),
                                 repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(251, 191, 36, 0.2) 20px, rgba(251, 191, 36, 0.2) 22px)
                               `
                      }} />

                        <div className="text-center relative z-10">
                          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-700 opacity-40 blur-3xl" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Card Front */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <Card className="w-full h-full bg-black border-4 border-amber-700 shadow-2xl shadow-amber-900/80 rounded-none relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${drawnCard.gradient} opacity-40`}>
                        <div className="absolute inset-0">
                          <motion.div
                          className="absolute top-0 left-0 w-full h-full"
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"]
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                               radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
                                               radial-gradient(circle at 40% 20%, rgba(0, 0, 0, 0.2) 0%, transparent 30%)`,
                            backgroundSize: "200% 200%"
                          }} />

                        </div>
                        <div className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `
                                 radial-gradient(ellipse at top, rgba(255, 255, 255, 0.2), transparent 50%),
                                 radial-gradient(ellipse at bottom, rgba(0, 0, 0, 0.4), transparent 50%)
                               `
                      }} />

                      </div>
                      
                      <div className="absolute inset-4 border-2 border-amber-500/60">
                        <div className="absolute inset-2 border border-amber-400/40" />
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400" />
                      </div>
                      
                      <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center relative z-10">
                        <div className="text-7xl mb-6 font-bold text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      style={{ fontFamily: "'Cinzel', serif" }}>
                          {drawnCard.number}
                        </div>
                        
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4" />
                        
                        <h3 className="text-3xl font-bold text-amber-100 mb-4 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "'Cinzel', serif" }}>
                          {drawnCard.name}
                        </h3>
                        
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />
                        
                        <div className="flex flex-wrap gap-2 justify-center">
                          {drawnCard.keywords.slice(0, 3).map((keyword, i) =>
                        <span
                          key={i}
                          className="px-3 py-1 bg-amber-900/80 border border-amber-600/60 text-sm text-amber-100 tracking-wide backdrop-blur-sm"
                          style={{ fontFamily: "'Cinzel', serif" }}>

                              {keyword}
                            </span>
                        )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Reading */}
            {isFlipped &&
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto">

                <Card className="bg-gradient-to-br from-stone-900/90 to-amber-950/90 backdrop-blur-xl border-2 border-amber-700/50 rounded-none relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/40" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-500/40" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-500/40" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/40" />
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500" />
                      <h4 className="text-2xl font-semibold text-amber-100 tracking-wider"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                        Your Reading
                      </h4>
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500" />
                    </div>
                    
                    {isGenerating ?
                <div className="text-center py-8">
                        <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 mx-auto mb-4">

                          <Sparkles className="w-full h-full text-amber-400" />
                        </motion.div>
                        <p className="text-amber-200/70 tracking-wide"
                  style={{ fontFamily: "'Cinzel', serif" }}>
                          The cards are speaking...
                        </p>
                      </div> :

                <>
                        <div className="flex justify-end mb-4">
                          <Button
                      onClick={speakReading}
                      variant="ghost"
                      size="sm"
                      className="text-amber-300 hover:text-amber-100 hover:bg-amber-900/30"
                      style={{ fontFamily: "'Cinzel', serif" }}>

                            <Volume2 className={`w-4 h-4 mr-2 ${isSpeaking ? 'animate-pulse' : ''}`} />
                            {isSpeaking ? 'Stop' : 'Listen'}
                          </Button>
                        </div>
                        <div className="space-y-6">
                          {reading && reading.split('\n\n').filter((p) => p.trim()).map((paragraph, index) => {
                      // Parse subtitles wrapped in **Subtitle**
                      const subtitleMatch = paragraph.match(/^\*\*(.*?)\*\*/);
                      const subtitle = subtitleMatch ? subtitleMatch[1].trim() : null;
                      const content = subtitleMatch ?
                      paragraph.replace(/^\*\*(.*?)\*\*\s*/, '').trim() :
                      paragraph.trim();

                      return (
                        <div key={index} className="space-y-3">
                                {subtitle &&
                          <h5 className="text-lg font-bold text-amber-300 tracking-wide"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {subtitle}
                                  </h5>
                          }
                                <p className="text-amber-100/90 leading-relaxed tracking-wide"
                          style={{ fontFamily: "'Playfair Display', serif" }}>
                                  {content}
                                </p>
                              </div>);

                    })}
                        </div>
                      </>
                }
                  </CardContent>
                </Card>

                <div className="text-center mt-8">
                  <Button
                onClick={() => {
                  setDrawnCard(null);
                  setReading(null);
                  setIsFlipped(false);
                  if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    setIsSpeaking(false);
                  }
                }}
                className="bg-gradient-to-r from-stone-800 to-amber-900 hover:from-stone-700 hover:to-amber-800 text-amber-200 hover:text-amber-100 border-2 border-amber-600/60 rounded-none tracking-wider"
                style={{ fontFamily: "'Cinzel', serif" }}>

                    Draw Another Card
                  </Button>
                </div>
              </motion.div>
          }
          </div>
        }
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>);

}