import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Check, Loader2, Image as ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { motion } from "framer-motion";

const TAROT_PROMPTS = [
  { name: "The Fool", number: 0, prompt: "An ethereal young figure with shimmering cosmic patterns woven into tattered flowing robes, standing at the edge of a swirling dark fantasy nebula cliff. Eyes reflect distant galaxies, a star-studded path stretches into the unknown void. A small glowing astral dog companion leaps playfully beside them. Ancient cosmic ruins float in the background. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep purples and blues with golden cosmic dust, dramatic lighting, highly detailed, 8k." },
  { name: "The Magician", number: 1, prompt: "A powerful cosmic sorcerer figure channeling swirling nebula energy between raised hands, one pointing to distant galaxies above, one to a dark planetary surface below. Ethereal glowing tools float around them - a luminous wand, crystalline cup, spectral sword, and golden pentacle. An infinity symbol of stars burns above their head. Ancient cosmic temple ruins in background. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep purples and blues with golden cosmic dust, dramatic lighting, highly detailed, 8k." },
  { name: "The High Priestess", number: 2, prompt: "A mysterious veiled feminine figure seated on a throne between two towering cosmic pillars - one of dark matter, one of pure starlight. She holds an ancient glowing scroll of celestial secrets. A luminous crescent moon crown adorns her head. Behind her, a veil of shimmering nebula conceals deeper mysteries. Dark reflective waters at her feet mirror distant galaxies. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep purples and blues with silver moonlight accents, dramatic lighting, highly detailed, 8k." },
  { name: "The Empress", number: 3, prompt: "A radiant cosmic goddess reclining on a throne of living stardust and flowering nebulae. She wears a crown of twelve stars and robes that flow into rivers of galaxies. Lush bioluminescent cosmic gardens bloom around her with ethereal plants and glowing fruits. A heart-shaped shield of golden light rests beside her. Planets orbit gently in the background like celestial children. Style of Alex Aliume and Chesley Bonestell, digital painting, rich emerald greens and deep purples with golden cosmic dust, warm nurturing light, highly detailed, 8k." },
  { name: "The Emperor", number: 4, prompt: "A powerful cosmic ruler seated on a massive throne carved from asteroid rock and ancient cosmic metals, adorned with ram skull motifs made of stars. He wears armor forged from compressed starlight and holds an ankh scepter crackling with nebula energy. His stern gaze surveys a vast empire of ordered star systems. Geometric sacred patterns of constellations form behind him. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep reds and oranges with golden cosmic dust, powerful dramatic lighting, highly detailed, 8k." },
  { name: "The Hierophant", number: 5, prompt: "An ancient cosmic pope figure seated between two pillars of crystallized wisdom in a vast cathedral of stars. He wears elaborate robes embroidered with sacred geometries and constellations, a triple crown of orbiting moons. One hand raised in blessing channels divine light, the other holds a triple cross staff of intertwined galaxies. Two robed disciples kneel before him on a floor of ancient star maps. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep purples and stone grays with golden sacred light, reverent atmosphere, highly detailed, 8k." },
  { name: "The Lovers", number: 6, prompt: "Two ethereal figures - one masculine, one feminine - floating in an embrace within a heart-shaped nebula, their forms partially merging into swirling cosmic energy. Above them, a radiant angelic being made of pure starlight blesses their union with outstretched wings of aurora. Below, the tree of life and tree of knowledge grow from a shared cosmic garden. Twin suns illuminate the scene. Style of Alex Aliume and Chesley Bonestell, digital painting, rich rose pinks and deep purples with golden cosmic dust, romantic ethereal lighting, highly detailed, 8k." },
  { name: "The Chariot", number: 7, prompt: "A triumphant cosmic warrior standing in a magnificent chariot made of meteoric iron and crystallized starlight, pulled by two powerful sphinx creatures - one of dark matter, one of pure light. The warrior wears armor decorated with celestial symbols and holds the reins of pure energy. A canopy of stars forms above. The chariot races across a bridge of light between galaxies, leaving trails of cosmic dust. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep blues and cyans with golden cosmic dust, dynamic triumphant lighting, highly detailed, 8k." },
  { name: "Strength", number: 8, prompt: "A serene feminine figure gently closing the jaws of a massive cosmic lion made of swirling nebulae and burning stars. Her touch radiates calm golden light that tames the beast's fierce energy. She wears flowing robes of soft starlight, an infinity symbol of gentle stars above her head. The lion's mane flows into rivers of galaxies. A peaceful cosmic meadow of glowing flowers surrounds them. Style of Alex Aliume and Chesley Bonestell, digital painting, rich amber and orange with soft golden light, gentle yet powerful atmosphere, highly detailed, 8k." },
  { name: "The Hermit", number: 9, prompt: "An ancient hooded sage standing alone atop a desolate cosmic mountain peak, holding a lantern containing a trapped star that illuminates the infinite darkness. His weathered robes are woven from the fabric of space itself. A long staff of crystallized time supports his contemplation. Below, endless void stretches with distant galaxies. The figure gazes inward while lighting the way for seekers far below. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep grays and silvers with golden lantern light piercing darkness, solitary contemplative atmosphere, highly detailed, 8k." },
  { name: "Wheel of Fortune", number: 10, prompt: "A massive cosmic wheel spinning in the center of the universe, made of interlocking galaxies and orbital rings inscribed with alchemical symbols. Mysterious creatures ride the wheel - a sphinx of starlight at the top, a serpent of dark matter descending, a jackal-headed figure of nebulae rising. The four corners hold winged cosmic beings representing the fixed signs. Lightning of pure creation energy crackles around the wheel. Style of Alex Aliume and Chesley Bonestell, digital painting, rich gold and deep purples with dynamic energy, spinning motion and cosmic power, highly detailed, 8k." },
  { name: "Justice", number: 11, prompt: "A blindfolded cosmic judge seated on a throne of balanced scales between order and chaos. In one hand, a sword of pure crystallized truth cuts through nebulae. In the other, perfectly balanced scales weigh galaxies of light against galaxies of shadow. The figure wears robes of mathematical precision, sacred geometry forming the patterns. Twin pillars of cosmic law frame the scene. A level horizon of stars stretches infinitely behind. Style of Alex Aliume and Chesley Bonestell, digital painting, rich blues and teals with silver justice light, balanced symmetrical composition, highly detailed, 8k." },
  { name: "The Hanged Man", number: 12, prompt: "A serene figure suspended upside-down from a cosmic tree that grows from nothing into everything, roots in stars, branches in void. The figure hangs by one ankle, other leg crossed, arms behind back forming a triangle, surrounded by a halo of enlightenment. Their peaceful face shows transcendence, not suffering. Galaxies swirl differently from this inverted perspective. Golden light emanates from within their being. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep purples and indigos with golden spiritual light, peaceful suspended atmosphere, highly detailed, 8k." },
  { name: "Death", number: 13, prompt: "A skeletal cosmic reaper in flowing robes of pure void, riding a pale horse made of dying stars across a battlefield where old galaxies crumble and new ones begin to form. The figure carries a black banner emblazoned with a white rose of rebirth. Before them, kings and paupers of light equally fall and transform. Behind them, dawn breaks over a new universe being born from the ashes. Style of Alex Aliume and Chesley Bonestell, digital painting, rich blacks and deep grays with hints of golden rebirth light breaking through, transformative apocalyptic atmosphere, highly detailed, 8k." },
  { name: "Temperance", number: 14, prompt: "A radiant angelic figure with iridescent wings of aurora light standing with one foot in a pool of liquid starlight, one on solid cosmic ground. They pour luminous essence between two chalices in an eternal flow that never spills - liquid light and liquid shadow mixing into perfect balance. A path of stepping stones leads to distant mountains where a crown of light awaits. Irises of pure light bloom at their feet. Style of Alex Aliume and Chesley Bonestell, digital painting, rich sky blues and soft golds with harmonious balanced light, serene alchemical atmosphere, highly detailed, 8k." },
  { name: "The Devil", number: 15, prompt: "A massive horned shadow entity perched on a cubic black hole throne, half goat, half bat, with hypnotic spiral galaxies for eyes. Chains of dark matter loosely bind two smaller humanoid figures to the throne - chains they could easily remove but choose not to. An inverted pentagram of dying stars burns above. The creature holds a torch pointing downward, its dark flame consuming light. Tempting treasures of corrupted gold float nearby. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep reds and blacks with sickly green shadows, oppressive seductive darkness, highly detailed, 8k." },
  { name: "The Tower", number: 16, prompt: "A colossal cosmic tower built from crystallized false beliefs shatters as a bolt of divine lightning from a supernova strikes its crown. Figures of light tumble through space as the structure crumbles. The crown - a symbol of material achievement - is blown off and falls into the void. Flames of purifying cosmic fire consume the old order. Through the destruction, a new dawn of clarity breaks on the horizon. Debris transforms into seeds of new creation. Style of Alex Aliume and Chesley Bonestell, digital painting, rich oranges and reds against dark cosmic chaos with white lightning, explosive dramatic destruction, highly detailed, 8k." },
  { name: "The Star", number: 17, prompt: "A serene nude figure kneels at the edge of a cosmic pool, pouring starlight from two vessels - one into the water of the subconscious, one onto the land of the material world. Above her, one great eight-pointed star of hope blazes surrounded by seven smaller stars representing the chakras. Her form glows with inner light. The landscape is peaceful, with an ibis of wisdom perched nearby and cosmic flowers blooming. Healing energy radiates everywhere. Style of Alex Aliume and Chesley Bonestell, digital painting, rich soft blues and cyans with brilliant white starlight, serene hopeful healing atmosphere, highly detailed, 8k." },
  { name: "The Moon", number: 18, prompt: "A haunting cosmic landscape under a massive moon with a mysterious face, dripping luminescent dew into a dark reflective pool. A winding path leads between two ominous towers of shadow into unknown darkness. A wolf and a domesticated dog howl at the moon - the wild and tamed aspects of mind. A cosmic crayfish emerges from the primordial waters of the subconscious. Everything shimmers with deceptive beauty and hidden danger. Illusions dance in the moonlight. Style of Alex Aliume and Chesley Bonestell, digital painting, rich deep indigos and violets with silver moonlight, mysterious unsettling dreamlike atmosphere, highly detailed, 8k." },
  { name: "The Sun", number: 19, prompt: "A radiant cosmic sun with a benevolent face blazes gloriously, its rays reaching across the universe bringing life and joy. Below, a joyful child of light rides a white horse made of pure starlight through a garden of massive cosmic sunflowers. A red banner of vitality waves triumphantly. Everything is illuminated - no shadows can hide here. The child's innocence and joy are infectious. Golden light bathes every surface in warmth and clarity. Style of Alex Aliume and Chesley Bonestell, digital painting, rich brilliant golds and warm oranges with radiant sunshine, joyful triumphant celebratory atmosphere, highly detailed, 8k." },
  { name: "Judgement", number: 20, prompt: "A colossal cosmic angel emerges from swirling clouds of nebulae, blowing a trumpet that sends waves of awakening energy across the universe. Below, figures of light rise from cosmic tombs and crystalline coffins, arms raised in resurrection and liberation. Families reunite across the barriers of time and space. The trumpet's call echoes through dimensions, awakening souls to their higher purpose. A cross of balanced cosmic energy marks the banner of transformation. Style of Alex Aliume and Chesley Bonestell, digital painting, rich violets and purples with brilliant white resurrection light, transcendent awakening atmosphere, highly detailed, 8k." },
  { name: "The World", number: 21, prompt: "A dancing cosmic figure floats within a great wreath made of intertwined galaxies, celebrating the completion of the universal journey. They hold two wands of mastery, their form expressing perfect integration and wholeness. In the four corners, the four cosmic creatures watch - lion of fire, bull of earth, eagle of water, angel of air - representing mastered elements and fixed signs. The entire universe seems to dance in harmony. A sense of arrival and fulfillment pervades everything. Style of Alex Aliume and Chesley Bonestell, digital painting, rich emeralds and teals with golden completion light, triumphant fulfilling celebratory atmosphere, highly detailed, 8k." }
];

export default function GenerateImages() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedCards, setCompletedCards] = useState([]);
  const [error, setError] = useState(null);

  const generateAllImages = async () => {
    setIsGenerating(true);
    setError(null);
    setCompletedCards([]);

    for (let i = 0; i < TAROT_PROMPTS.length; i++) {
      const card = TAROT_PROMPTS[i];
      setCurrentIndex(i);

      try {
        // Generate the image
        const result = await base44.integrations.Core.GenerateImage({
          prompt: card.prompt
        });

        // Save to database
        await base44.entities.TarotCardImage.create({
          card_name: card.name,
          card_number: card.number,
          image_url: result.url,
          prompt_used: card.prompt
        });

        setCompletedCards(prev => [...prev, { ...card, image_url: result.url }]);
      } catch (err) {
        console.error(`Error generating ${card.name}:`, err);
        setError(`Error generating ${card.name}. Continuing...`);
      }

      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsGenerating(false);
  };

  const progress = (completedCards.length / TAROT_PROMPTS.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-100 mb-4 tracking-wider"
              style={{ fontFamily: "'Cinzel', serif" }}>
            Generate Tarot Card Images
          </h1>
          <p className="text-amber-200/70 mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
            Generate AI images for all 22 Major Arcana cards
          </p>

          {!isGenerating && completedCards.length === 0 && (
            <Button
              onClick={generateAllImages}
              className="bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-amber-50 px-8 py-4 text-lg"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate All 22 Cards
            </Button>
          )}

          {isGenerating && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-amber-200">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span style={{ fontFamily: "'Cinzel', serif" }}>
                  Generating: {TAROT_PROMPTS[currentIndex]?.name}...
                </span>
              </div>
              <Progress value={progress} className="h-3 bg-amber-900/50" />
              <p className="text-amber-300/70 text-sm">
                {completedCards.length} of {TAROT_PROMPTS.length} complete
              </p>
            </div>
          )}

          {error && (
            <p className="text-red-400 mt-4">{error}</p>
          )}
        </div>

        {/* Completed Cards Grid */}
        {completedCards.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {completedCards.map((card, index) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-stone-900/80 border-amber-700/50 overflow-hidden">
                  <div className="aspect-[2/3] relative">
                    {card.image_url ? (
                      <img
                        src={card.image_url}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-amber-900/30">
                        <ImageIcon className="w-12 h-12 text-amber-500/50" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-amber-100 text-sm font-medium text-center"
                       style={{ fontFamily: "'Cinzel', serif" }}>
                      {card.name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {completedCards.length === TAROT_PROMPTS.length && (
          <div className="text-center mt-8">
            <p className="text-green-400 text-xl" style={{ fontFamily: "'Cinzel', serif" }}>
              ✨ All cards generated successfully! Check the database. ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}