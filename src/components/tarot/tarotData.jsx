// Major Arcana (0-21)
const MAJOR_ARCANA = [
{
  name: "The Fool",
  number: 0,
  arcana: "major",
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
  arcana: "major",
  keywords: ["manifestation", "power", "skill", "concentration"],
  interpretation: {
    general: "The Magician represents your ability to manifest your desires through willpower and resourcefulness. You have all the tools you need - it's time to harness your personal power and take inspired action.",
    love: "In love, The Magician signals attraction, charisma, and the power to manifest the relationship you desire. Communication flows easily, and you have the ability to create magic in your connections.",
    career: "This card indicates you have the skills and resources to succeed in your professional endeavors. It's time to showcase your talents, communicate your ideas effectively, and transform your vision into reality.",
    finance: "Financially, The Magician suggests you can manifest abundance through your talents and resourcefulness. Multiple income streams may be available to you - use your skills wisely.",
    family: "For family, this card indicates you have the power to improve dynamics through clear communication and taking action. You can be the catalyst for positive change.",
    health: "In health matters, The Magician encourages taking an active role in your wellbeing. You have the power to transform your health through focused intention and utilizing available resources.",
    spirituality: "The Magician represents your power to manifest spiritual growth through conscious intention. You have access to divine wisdom and can channel universal energy for your spiritual development."
  },
  gradient: "from-violet-300 via-purple-400 to-fuchsia-500"
},
{
  name: "The High Priestess",
  number: 2,
  arcana: "major",
  keywords: ["intuition", "sacred knowledge", "divine feminine"],
  interpretation: {
    general: "The High Priestess calls you to trust your intuition and inner wisdom. She represents the subconscious mind, sacred knowledge, and the mysteries waiting to be unveiled through quiet contemplation.",
    love: "In love, this card suggests trusting your intuition about relationships. There may be unspoken emotions or hidden aspects to explore. Listen to your inner voice about matters of the heart.",
    career: "Professionally, The High Priestess advises listening to your gut instincts. There may be information not yet revealed. Take time for reflection before making major decisions.",
    finance: "For finances, trust your intuition about investments and opportunities. Not everything is as it appears - do your inner and outer research before committing.",
    family: "In family matters, this card indicates understanding unspoken dynamics and trusting your instincts about what's really happening beneath the surface.",
    health: "For health, The High Priestess encourages connecting with your body's wisdom and exploring holistic approaches. Listen to what your intuition tells you about your wellbeing.",
    spirituality: "The High Priestess is the guardian of sacred mysteries and divine feminine wisdom. She calls you to deepen your meditation practice, trust your psychic abilities, and explore the hidden realms of consciousness."
  },
  gradient: "from-indigo-400 via-blue-500 to-slate-700"
},
{
  name: "The Empress",
  number: 3,
  arcana: "major",
  keywords: ["abundance", "nurturing", "fertility", "nature"],
  interpretation: {
    general: "The Empress embodies abundance, creativity, and nurturing energy. She represents the fruition of ideas, material comfort, and connection to nature and beauty.",
    love: "In relationships, The Empress signals deep affection, sensuality, and nurturing love. It may indicate a relationship entering a more stable, abundant phase or the possibility of growing your family.",
    career: "For career, this card suggests creative projects coming to fruition and material success. Nurture your ideas and watch them grow.",
    finance: "Financially, The Empress brings abundance and material comfort. Your efforts are bearing fruit. Focus on creating sustainable wealth and enjoying life's pleasures.",
    family: "This card strongly indicates nurturing family bonds, possibly pregnancy or new family members, and creating a warm, abundant home environment.",
    health: "For health, The Empress encourages connecting with nature, nourishing your body well, and embracing self-care. Fertility and vitality are highlighted.",
    spirituality: "The Empress represents spiritual abundance and connection to Mother Earth. She encourages you to ground your spirituality in the natural world and nurture your spiritual gifts."
  },
  gradient: "from-emerald-300 via-green-400 to-teal-600"
},
{
  name: "The Emperor",
  number: 4,
  arcana: "major",
  keywords: ["authority", "structure", "control", "leadership"],
  interpretation: {
    general: "The Emperor represents structure, authority, and taking control of your life. He brings stability through organization, discipline, and establishing clear boundaries and systems.",
    love: "In love, The Emperor suggests stable, committed relationships built on mutual respect. It may indicate a partner who is protective and reliable, or the need to establish healthy boundaries.",
    career: "Professionally, this card signals leadership opportunities, establishing authority, or working within structured systems. It's time to take charge and organize your professional life.",
    finance: "For finances, The Emperor advises creating solid financial plans, establishing budgets, and building long-term stability. Structure and discipline lead to success.",
    family: "In family matters, this card represents the father figure, establishing household rules, and creating stable family structures.",
    health: "For health, The Emperor encourages establishing disciplined routines, following medical advice, and taking a structured approach to wellness.",
    spirituality: "The Emperor brings structure to your spiritual practice. He encourages establishing daily spiritual rituals and building a strong foundation for your soul's growth."
  },
  gradient: "from-red-400 via-orange-500 to-amber-700"
},
{
  name: "The Hierophant",
  number: 5,
  arcana: "major",
  keywords: ["tradition", "conformity", "education", "belief"],
  interpretation: {
    general: "The Hierophant represents tradition, spiritual wisdom, and established institutions. This card suggests seeking guidance from mentors, following conventional paths, or exploring your belief systems.",
    love: "In relationships, this card may indicate traditional commitments like marriage, or relationships blessed by family and community.",
    career: "Professionally, The Hierophant favors traditional career paths, working with established institutions, mentorship, or roles in education.",
    finance: "For finances, this card suggests conservative approaches, working with financial advisors, or following tried-and-true methods for building wealth.",
    family: "In family matters, traditions, cultural heritage, and family values are emphasized.",
    health: "For health, The Hierophant advises seeking expert medical advice, following traditional treatments, or exploring the connection between spiritual and physical wellness.",
    spirituality: "The Hierophant represents formal spiritual education, traditional religious practices, and seeking wisdom from spiritual teachers."
  },
  gradient: "from-stone-400 via-gray-500 to-slate-600"
},
{
  name: "The Lovers",
  number: 6,
  arcana: "major",
  keywords: ["love", "harmony", "relationships", "choices"],
  interpretation: {
    general: "The Lovers represents meaningful relationships, important choices, and values alignment. This card speaks to harmony, partnership, and making decisions that honor your authentic self.",
    love: "In romance, this is a powerful card of deep connection, soulmate energy, and relationships built on mutual love and respect.",
    career: "For career, The Lovers suggests partnerships, collaboration, or important decisions about your professional path.",
    finance: "Financially, this card may indicate business partnerships or financial decisions requiring careful consideration of your values.",
    family: "In family matters, The Lovers emphasizes harmony, making choices that honor family values, and open communication.",
    health: "For health, this card encourages balance and making choices that honor your body and wellbeing.",
    spirituality: "The Lovers represents the sacred union of your higher and lower self, spiritual choices that define your path, and alignment with your soul's purpose."
  },
  gradient: "from-rose-300 via-pink-400 to-red-400"
},
{
  name: "The Chariot",
  number: 7,
  arcana: "major",
  keywords: ["control", "willpower", "determination", "victory"],
  interpretation: {
    general: "The Chariot represents triumph through determination and willpower. This card signals victory, forward movement, and the ability to overcome obstacles through focused effort.",
    love: "In love, The Chariot suggests taking control of your romantic destiny. It may indicate overcoming relationship obstacles or pursuing someone with determination.",
    career: "Professionally, this card signals success through focused effort. Career advancement and achieving ambitious goals are indicated.",
    finance: "For finances, The Chariot brings success through disciplined effort. You can overcome financial challenges through willpower and strategic action.",
    family: "In family matters, this card suggests successfully navigating family challenges. Determination helps you overcome any family obstacles.",
    health: "For health, The Chariot encourages taking control of your wellness journey. With determination, you can achieve your health goals.",
    spirituality: "The Chariot represents your spiritual journey's momentum and mastery over opposing forces within."
  },
  gradient: "from-cyan-400 via-blue-500 to-indigo-600"
},
{
  name: "Strength",
  number: 8,
  arcana: "major",
  keywords: ["courage", "patience", "compassion", "inner strength"],
  interpretation: {
    general: "Strength represents inner courage, patience, and compassionate power. True strength comes from within - through kindness, self-control, and gentle persuasion rather than force.",
    love: "In relationships, Strength suggests patience, compassion, and the courage to be vulnerable. Love conquers all.",
    career: "Professionally, this card advises using patience and diplomacy to achieve your goals. Inner confidence leads to success.",
    finance: "For finances, Strength encourages patient, steady approaches to building wealth. Resist impulsive decisions.",
    family: "In family matters, this card highlights the importance of patience, compassion, and emotional strength.",
    health: "For health, Strength emphasizes mind-body connection, emotional resilience, and the courage to face health challenges.",
    spirituality: "Strength represents mastery over your ego through compassion and patience. Your greatest spiritual power comes from gentle, persistent faith."
  },
  gradient: "from-amber-400 via-orange-500 to-red-500"
},
{
  name: "The Hermit",
  number: 9,
  arcana: "major",
  keywords: ["introspection", "solitude", "guidance", "wisdom"],
  interpretation: {
    general: "The Hermit represents soul-searching, introspection, and seeking inner wisdom. This card suggests taking time alone to reflect and connect with your higher self.",
    love: "In love, The Hermit may indicate a period of solitude before meeting someone meaningful, or needing space for self-reflection.",
    career: "Professionally, this card suggests working independently, seeking mentorship, or taking time to reflect on your career path.",
    finance: "For finances, The Hermit advises careful reflection before making financial decisions. Seek expert advice.",
    family: "In family matters, this card may indicate needing space from family for personal growth.",
    health: "For health, The Hermit encourages introspection about your wellness and taking quiet time for recovery.",
    spirituality: "The Hermit is the spiritual seeker who withdraws to find inner truth. Embrace solitude for spiritual growth."
  },
  gradient: "from-slate-500 via-gray-600 to-zinc-800"
},
{
  name: "Wheel of Fortune",
  number: 10,
  arcana: "major",
  keywords: ["destiny", "cycles", "change", "luck"],
  interpretation: {
    general: "The Wheel of Fortune represents life's cycles, destiny, and inevitable change. Nothing is permanent - what goes up must come down, but what goes down will rise again.",
    love: "In love, this card indicates changing relationship dynamics. Embrace the natural cycles of love.",
    career: "Professionally, expect turning points and changes. New opportunities may arrive unexpectedly.",
    finance: "For finances, The Wheel suggests fluctuating fortunes. Stay adaptable and save during abundant times.",
    family: "In family matters, this card indicates changing family dynamics and life transitions.",
    health: "For health, The Wheel reminds you that wellness has natural cycles. Maintain healthy habits through all seasons.",
    spirituality: "The Wheel of Fortune represents karmic cycles, divine timing, and the understanding that your spiritual journey has seasons."
  },
  gradient: "from-yellow-300 via-amber-500 to-orange-600"
},
{
  name: "Justice",
  number: 11,
  arcana: "major",
  keywords: ["fairness", "truth", "law", "balance"],
  interpretation: {
    general: "Justice represents fairness, truth, and karmic balance. Honesty will be rewarded and dishonesty exposed.",
    love: "In relationships, Justice indicates fair treatment, honest communication, and balanced partnerships.",
    career: "Professionally, this card suggests legal matters, contracts, or situations requiring fair judgment.",
    finance: "For finances, Justice indicates legal or contractual matters affecting money. Financial karma is highlighted.",
    family: "In family matters, this card suggests resolving conflicts fairly and balanced give-and-take.",
    health: "For health, Justice encourages taking responsibility for your wellness choices.",
    spirituality: "Justice represents karmic law, spiritual accountability, and divine truth."
  },
  gradient: "from-blue-300 via-cyan-500 to-teal-600"
},
{
  name: "The Hanged Man",
  number: 12,
  arcana: "major",
  keywords: ["sacrifice", "letting go", "new perspective"],
  interpretation: {
    general: "The Hanged Man represents surrender, new perspectives, and meaningful sacrifice. Sometimes the best action is inaction.",
    love: "In love, this card indicates the need to let go of control, see relationships from a new perspective, or make sacrifices for love.",
    career: "Professionally, The Hanged Man suggests a period of waiting that leads to enlightenment. Don't force progress.",
    finance: "For finances, this card advises patience with investments. Short-term sacrifices may be necessary for long-term gain.",
    family: "In family matters, this card suggests releasing control and finding peace through surrender.",
    health: "For health, The Hanged Man encourages patience with healing and exploring alternative perspectives on wellness.",
    spirituality: "The Hanged Man represents spiritual surrender and the enlightenment that comes through releasing ego."
  },
  gradient: "from-indigo-400 via-purple-600 to-slate-700"
},
{
  name: "Death",
  number: 13,
  arcana: "major",
  keywords: ["transformation", "endings", "rebirth", "transition"],
  interpretation: {
    general: "Death represents profound transformation and necessary endings. This card rarely means physical death - instead, major change is necessary for growth.",
    love: "In relationships, Death may indicate the end of one phase and beginning of another. Embrace necessary change.",
    career: "Professionally, this card signals major career transformations. Release the old to welcome the new.",
    finance: "For finances, Death suggests the end of one financial chapter and the beginning of another.",
    family: "In family matters, this card indicates major family transitions and releasing old patterns.",
    health: "For health, Death encourages releasing old wellness habits and embracing transformative healing.",
    spirituality: "Death represents profound spiritual transformation, ego death, and spiritual rebirth."
  },
  gradient: "from-slate-800 via-gray-900 to-black"
},
{
  name: "Temperance",
  number: 14,
  arcana: "major",
  keywords: ["balance", "moderation", "patience", "purpose"],
  interpretation: {
    general: "Temperance represents balance, moderation, and finding the middle path. Blend opposing forces harmoniously.",
    love: "In relationships, Temperance signals harmony, balanced give-and-take, and patient nurturing of love.",
    career: "Professionally, this card advises moderation, patience with career progression, and balancing work with life.",
    finance: "For finances, Temperance encourages balanced spending and saving, avoiding financial extremes.",
    family: "In family matters, this card emphasizes finding balance between different family members' needs.",
    health: "For health, Temperance strongly emphasizes balanced lifestyle and moderation in all things.",
    spirituality: "Temperance represents the alchemical blending of spiritual and material, divine balance."
  },
  gradient: "from-sky-300 via-blue-400 to-indigo-500"
},
{
  name: "The Devil",
  number: 15,
  arcana: "major",
  keywords: ["bondage", "materialism", "temptation", "shadow self"],
  interpretation: {
    general: "The Devil represents attachment, restriction, and shadow aspects. Awareness is the first step to freedom.",
    love: "In relationships, The Devil may indicate codependency or unhealthy attachments. Examine what's binding you.",
    career: "Professionally, this card suggests feeling trapped in your career or materialism overshadowing fulfillment.",
    finance: "For finances, The Devil warns of materialism, debt, or unhealthy financial attachments.",
    family: "In family matters, this card indicates unhealthy family patterns or being bound by expectations.",
    health: "For health, The Devil signals addictions or unhealthy habits affecting wellness.",
    spirituality: "The Devil represents spiritual bondage and the shadow self that must be acknowledged for growth."
  },
  gradient: "from-red-600 via-rose-800 to-black"
},
{
  name: "The Tower",
  number: 16,
  arcana: "major",
  keywords: ["upheaval", "chaos", "revelation", "awakening"],
  interpretation: {
    general: "The Tower represents sudden change, upheaval, and breakthrough moments. It clears away false structures to reveal truth.",
    love: "In relationships, The Tower indicates sudden revelations or changes that shake foundations.",
    career: "Professionally, this card signals unexpected changes or career upheavals that free you from stagnation.",
    finance: "For finances, The Tower warns of sudden financial changes or unexpected expenses.",
    family: "In family matters, this card indicates sudden family revelations or breaking free from constraints.",
    health: "For health, The Tower may indicate sudden health wake-up calls requiring immediate attention.",
    spirituality: "The Tower represents spiritual awakening through crisis and the destruction of false beliefs."
  },
  gradient: "from-orange-500 via-red-600 to-gray-900"
},
{
  name: "The Star",
  number: 17,
  arcana: "major",
  keywords: ["hope", "faith", "renewal", "spirituality"],
  interpretation: {
    general: "The Star represents hope, healing, and renewed faith. Your wishes and dreams are blessed.",
    love: "In relationships, The Star brings hope for love, healing of past wounds, and renewed faith in romance.",
    career: "Professionally, this card signals renewed hope, inspiration returning, and faith that your career path is guided.",
    finance: "For finances, The Star brings optimism and faith in financial recovery or abundance.",
    family: "In family matters, this card indicates healing family wounds and renewed hope for family happiness.",
    health: "For health, The Star is deeply healing, bringing hope for recovery and renewed vitality.",
    spirituality: "The Star is pure spiritual hope, divine inspiration, and connection to cosmic consciousness."
  },
  gradient: "from-sky-200 via-cyan-300 to-blue-500"
},
{
  name: "The Moon",
  number: 18,
  arcana: "major",
  keywords: ["illusion", "intuition", "subconscious", "fear"],
  interpretation: {
    general: "The Moon represents illusion, intuition, and the subconscious realm. Not everything is as it appears.",
    love: "In relationships, The Moon indicates confusion, hidden emotions, or illusions about love.",
    career: "Professionally, this card warns that workplace situations may not be what they seem.",
    finance: "For finances, The Moon advises caution - financial situations may be unclear or deceptive.",
    family: "In family matters, this card suggests unspoken emotions or family secrets.",
    health: "For health, The Moon encourages trusting your instincts. Mental health and sleep are highlighted.",
    spirituality: "The Moon represents the mysterious spiritual journey through the subconscious and psychic realms."
  },
  gradient: "from-indigo-400 via-violet-600 to-slate-800"
},
{
  name: "The Sun",
  number: 19,
  arcana: "major",
  keywords: ["joy", "success", "celebration", "positivity"],
  interpretation: {
    general: "The Sun represents joy, success, and radiant vitality. This is one of the most positive cards, bringing warmth and clarity.",
    love: "In relationships, The Sun brings joy, warmth, and successful partnerships.",
    career: "Professionally, this card signals success, recognition, and career happiness. Your talents shine brightly.",
    finance: "For finances, The Sun brings abundance, financial success, and confidence about money.",
    family: "In family matters, this card indicates family joy and celebrations. Warmth radiates through relationships.",
    health: "For health, The Sun brings vitality, energy, and radiant wellness. Recovery is swift.",
    spirituality: "The Sun represents spiritual enlightenment, divine joy, and your soul shining at its brightest."
  },
  gradient: "from-yellow-300 via-orange-400 to-amber-500"
},
{
  name: "Judgement",
  number: 20,
  arcana: "major",
  keywords: ["reflection", "reckoning", "inner calling", "absolution"],
  interpretation: {
    general: "Judgement represents awakening, reflection, and answering your higher calling. A time of reckoning and transformation.",
    love: "In relationships, Judgement indicates evaluating past patterns, making peace with romantic history, or renewal.",
    career: "Professionally, this card suggests career evaluation or being called to your true vocation.",
    finance: "For finances, Judgement indicates financial evaluations and accounting for past decisions.",
    family: "In family matters, this card suggests family reconciliation and resolving past issues.",
    health: "For health, Judgement encourages honest health assessments and responding to your body's calling.",
    spirituality: "Judgement represents spiritual awakening, hearing your soul's calling, and spiritual rebirth."
  },
  gradient: "from-violet-300 via-purple-500 to-indigo-700"
},
{
  name: "The World",
  number: 21,
  arcana: "major",
  keywords: ["completion", "accomplishment", "fulfillment", "travel"],
  interpretation: {
    general: "The World represents completion, fulfillment, and achieving wholeness. You've come full circle.",
    love: "In relationships, The World indicates reaching relationship goals and deep fulfillment in love.",
    career: "Professionally, this card signals career success, completing major projects, or international opportunities.",
    finance: "For finances, The World brings financial completion and achieving financial goals.",
    family: "In family matters, this card indicates family wholeness and achieving family harmony.",
    health: "For health, The World signals achieving wellness goals and integrating mind-body-spirit health.",
    spirituality: "The World represents spiritual completion, cosmic consciousness, and union with the divine."
  },
  gradient: "from-emerald-400 via-teal-500 to-cyan-600"
}
];

// Minor Arcana - Wands (Fire, Creativity, Action)
const WANDS = [
  { name: "Ace of Wands", number: 22, suit: "wands", keywords: ["inspiration", "new opportunities", "growth", "potential"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Two of Wands", number: 23, suit: "wands", keywords: ["planning", "decisions", "discovery", "progress"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Three of Wands", number: 24, suit: "wands", keywords: ["expansion", "foresight", "overseas", "leadership"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Four of Wands", number: 25, suit: "wands", keywords: ["celebration", "harmony", "marriage", "home"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Five of Wands", number: 26, suit: "wands", keywords: ["conflict", "competition", "tension", "diversity"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Six of Wands", number: 27, suit: "wands", keywords: ["victory", "success", "recognition", "progress"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Seven of Wands", number: 28, suit: "wands", keywords: ["challenge", "perseverance", "defense", "maintaining"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Eight of Wands", number: 29, suit: "wands", keywords: ["speed", "action", "movement", "quick decisions"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Nine of Wands", number: 30, suit: "wands", keywords: ["resilience", "persistence", "boundaries", "last stand"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Ten of Wands", number: 31, suit: "wands", keywords: ["burden", "responsibility", "hard work", "accomplishment"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Page of Wands", number: 32, suit: "wands", keywords: ["exploration", "excitement", "freedom", "discovery"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Knight of Wands", number: 33, suit: "wands", keywords: ["energy", "passion", "adventure", "impulsiveness"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "Queen of Wands", number: 34, suit: "wands", keywords: ["confidence", "determination", "warmth", "vibrancy"], gradient: "from-orange-400 via-red-500 to-amber-600" },
  { name: "King of Wands", number: 35, suit: "wands", keywords: ["leadership", "vision", "entrepreneur", "honor"], gradient: "from-orange-400 via-red-500 to-amber-600" }
];

// Minor Arcana - Cups (Water, Emotions, Relationships)
const CUPS = [
  { name: "Ace of Cups", number: 36, suit: "cups", keywords: ["love", "new feelings", "intuition", "creativity"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Two of Cups", number: 37, suit: "cups", keywords: ["partnership", "unity", "love", "connection"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Three of Cups", number: 38, suit: "cups", keywords: ["celebration", "friendship", "community", "joy"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Four of Cups", number: 39, suit: "cups", keywords: ["contemplation", "apathy", "reevaluation", "discontent"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Five of Cups", number: 40, suit: "cups", keywords: ["loss", "grief", "disappointment", "regret"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Six of Cups", number: 41, suit: "cups", keywords: ["nostalgia", "memories", "innocence", "reunion"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Seven of Cups", number: 42, suit: "cups", keywords: ["choices", "fantasy", "illusion", "wishful thinking"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Eight of Cups", number: 43, suit: "cups", keywords: ["departure", "withdrawal", "search", "disappointment"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Nine of Cups", number: 44, suit: "cups", keywords: ["satisfaction", "wishes fulfilled", "comfort", "happiness"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Ten of Cups", number: 45, suit: "cups", keywords: ["harmony", "marriage", "happiness", "alignment"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Page of Cups", number: 46, suit: "cups", keywords: ["creative opportunities", "intuition", "curiosity", "possibility"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Knight of Cups", number: 47, suit: "cups", keywords: ["romance", "charm", "imagination", "beauty"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "Queen of Cups", number: 48, suit: "cups", keywords: ["compassion", "calm", "comfort", "intuition"], gradient: "from-blue-400 via-cyan-500 to-teal-600" },
  { name: "King of Cups", number: 49, suit: "cups", keywords: ["emotional balance", "diplomacy", "compassion", "control"], gradient: "from-blue-400 via-cyan-500 to-teal-600" }
];

// Minor Arcana - Swords (Air, Intellect, Conflict)
const SWORDS = [
  { name: "Ace of Swords", number: 50, suit: "swords", keywords: ["clarity", "breakthrough", "truth", "new ideas"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Two of Swords", number: 51, suit: "swords", keywords: ["indecision", "stalemate", "choices", "blocked emotions"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Three of Swords", number: 52, suit: "swords", keywords: ["heartbreak", "sorrow", "grief", "rejection"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Four of Swords", number: 53, suit: "swords", keywords: ["rest", "recovery", "contemplation", "passivity"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Five of Swords", number: 54, suit: "swords", keywords: ["conflict", "defeat", "winning at all costs", "betrayal"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Six of Swords", number: 55, suit: "swords", keywords: ["transition", "change", "moving on", "recovery"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Seven of Swords", number: 56, suit: "swords", keywords: ["deception", "strategy", "resourcefulness", "sneakiness"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Eight of Swords", number: 57, suit: "swords", keywords: ["restriction", "imprisonment", "helplessness", "self-limiting"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Nine of Swords", number: 58, suit: "swords", keywords: ["anxiety", "worry", "fear", "nightmares"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Ten of Swords", number: 59, suit: "swords", keywords: ["ending", "failure", "collapse", "rock bottom"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Page of Swords", number: 60, suit: "swords", keywords: ["curiosity", "restlessness", "mental energy", "vigilance"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Knight of Swords", number: 61, suit: "swords", keywords: ["action", "impulsiveness", "defending beliefs", "haste"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "Queen of Swords", number: 62, suit: "swords", keywords: ["independence", "perception", "clear thinking", "direct"], gradient: "from-slate-400 via-gray-500 to-zinc-600" },
  { name: "King of Swords", number: 63, suit: "swords", keywords: ["intellect", "authority", "truth", "ethics"], gradient: "from-slate-400 via-gray-500 to-zinc-600" }
];

// Minor Arcana - Pentacles (Earth, Material, Practical)
const PENTACLES = [
  { name: "Ace of Pentacles", number: 64, suit: "pentacles", keywords: ["opportunity", "prosperity", "new venture", "manifestation"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Two of Pentacles", number: 65, suit: "pentacles", keywords: ["balance", "adaptability", "time management", "prioritization"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Three of Pentacles", number: 66, suit: "pentacles", keywords: ["teamwork", "collaboration", "skill", "implementation"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Four of Pentacles", number: 67, suit: "pentacles", keywords: ["security", "conservation", "frugality", "control"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Five of Pentacles", number: 68, suit: "pentacles", keywords: ["hardship", "loss", "isolation", "worry"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Six of Pentacles", number: 69, suit: "pentacles", keywords: ["generosity", "charity", "giving", "prosperity"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Seven of Pentacles", number: 70, suit: "pentacles", keywords: ["patience", "investment", "long-term view", "perseverance"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Eight of Pentacles", number: 71, suit: "pentacles", keywords: ["apprenticeship", "education", "quality", "engagement"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Nine of Pentacles", number: 72, suit: "pentacles", keywords: ["luxury", "self-sufficiency", "accomplishment", "reward"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Ten of Pentacles", number: 73, suit: "pentacles", keywords: ["wealth", "inheritance", "family", "establishment"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Page of Pentacles", number: 74, suit: "pentacles", keywords: ["manifestation", "financial opportunity", "skill development"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Knight of Pentacles", number: 75, suit: "pentacles", keywords: ["efficiency", "routine", "conservatism", "methodical"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "Queen of Pentacles", number: 76, suit: "pentacles", keywords: ["nurturing", "practical", "security", "abundance"], gradient: "from-green-400 via-emerald-500 to-teal-600" },
  { name: "King of Pentacles", number: 77, suit: "pentacles", keywords: ["wealth", "business", "leadership", "security"], gradient: "from-green-400 via-emerald-500 to-teal-600" }
];

// Add interpretations to Minor Arcana cards
const addMinorInterpretations = (cards, element) => {
  const elementMeanings = {
    wands: { theme: "passion, creativity, and action", area: "creative endeavors and personal will" },
    cups: { theme: "emotions, relationships, and intuition", area: "emotional wellbeing and connections" },
    swords: { theme: "intellect, conflict, and truth", area: "mental clarity and communication" },
    pentacles: { theme: "material world, finances, and stability", area: "practical matters and security" }
  };

  return cards.map(card => ({
    ...card,
    arcana: "minor",
    interpretation: {
      general: `${card.name} speaks to ${elementMeanings[card.suit].theme}. Its keywords - ${card.keywords.join(", ")} - guide you toward understanding ${elementMeanings[card.suit].area}.`,
      love: `In matters of love, ${card.name} brings energy of ${card.keywords.slice(0, 2).join(" and ")}. This card encourages you to explore how these themes manifest in your relationships.`,
      career: `For your career, ${card.name} suggests focusing on ${card.keywords[0]} and ${card.keywords[1]}. These energies can help guide your professional path forward.`,
      finance: `Financially, ${card.name} indicates themes of ${card.keywords.slice(0, 2).join(" and ")}. Consider how these aspects relate to your material situation.`,
      family: `In family matters, ${card.name} brings awareness to ${card.keywords[0]} and ${card.keywords[1]}. These themes may be important in your family dynamics.`,
      health: `For health, ${card.name} encourages attention to ${card.keywords[0]}. This energy supports your overall wellbeing journey.`,
      spirituality: `Spiritually, ${card.name} invites you to explore ${card.keywords.slice(0, 2).join(" and ")}. These themes can deepen your spiritual understanding.`
    }
  }));
};

export const TAROT_CARDS = [
  ...MAJOR_ARCANA,
  ...addMinorInterpretations(WANDS, "fire"),
  ...addMinorInterpretations(CUPS, "water"),
  ...addMinorInterpretations(SWORDS, "air"),
  ...addMinorInterpretations(PENTACLES, "earth")
];