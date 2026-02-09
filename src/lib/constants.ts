export const CATEGORIES = [
  {
    slug: "nutrition",
    title: "Healthy Diets & Nutrition",
    description: "Don't just share recipes; understand the why behind the food.",
    icon: "🥗",
  },
  {
    slug: "yoga",
    title: "Yoga & Mindful Movement",
    description: "Accessible practices so beginners never feel intimidated.",
    icon: "🧘",
  },
  {
    slug: "routines",
    title: "Routines & Habit Building",
    description: "Turn information into action with sustainable daily habits.",
    icon: "⏰",
  },
  {
    slug: "mental-wellness",
    title: "Mental & Holistic Wellness",
    description: "Health isn't just physical — address the inner work.",
    icon: "🧠",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: CategorySlug;
  coverImage: string;
  readingTime: number;
  publishedAt: string;
  published: boolean;
}

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "1",
    slug: "gut-health-101",
    title: "Gut Health 101: Probiotics, Fermented Foods & Mental Clarity",
    excerpt: "Discover the fascinating link between your gut microbiome and your brain, and learn which fermented foods can boost both digestion and mental clarity.",
    content: `Your gut is often called your "second brain," and for good reason. The gut-brain axis is a complex communication network that links your intestinal function with emotional and cognitive centers of the brain.

## The Microbiome Connection

Your gut contains trillions of bacteria — collectively known as the microbiome. These tiny organisms do far more than help digest food. They produce neurotransmitters like serotonin (about 95% of your body's serotonin is made in the gut), influence inflammation levels, and even affect your mood and decision-making.

## Fermented Foods That Matter

**Kimchi & Sauerkraut** — These lacto-fermented vegetables are rich in Lactobacillus, a strain linked to reduced anxiety. Start with a tablespoon per meal.

**Kefir** — This fermented milk drink contains up to 61 different strains of bacteria and yeasts, making it one of the most diverse probiotic sources available.

**Kombucha** — While lower in probiotics than kefir, kombucha offers beneficial organic acids and polyphenols that support gut lining integrity.

**Miso** — A staple of Japanese cuisine, miso paste contains Aspergillus oryzae, which has been shown to reduce digestive issues and support nutrient absorption.

## Building Your Gut-Friendly Routine

1. **Start slow** — Introduce one fermented food at a time to avoid digestive discomfort
2. **Diversify** — Different fermented foods contain different bacterial strains
3. **Feed your bacteria** — Eat prebiotic-rich foods like garlic, onions, and bananas
4. **Reduce sugar** — Excess sugar feeds harmful bacteria and yeast
5. **Stay consistent** — It takes about 3-4 weeks to notice meaningful changes

## The Mental Clarity Payoff

Patients who improve their gut health often report better focus, reduced brain fog, and more stable moods. While probiotics aren't a replacement for mental health treatment, they're an increasingly recognized complement to overall wellness strategies.`,
    category: "nutrition",
    coverImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=450&fit=crop",
    readingTime: 6,
    publishedAt: "2025-12-15",
    published: true,
  },
  {
    id: "2",
    slug: "anti-inflammatory-eating",
    title: "Anti-Inflammatory Eating: Best Foods to Reduce Pain & Bloating",
    excerpt: "Chronic inflammation is behind many modern health issues. Learn which foods fight inflammation naturally and how to build an anti-inflammatory plate.",
    content: `Chronic low-grade inflammation is increasingly linked to everything from joint pain and bloating to heart disease and depression. The good news? Your plate is one of the most powerful tools you have.

## Understanding Inflammation

Not all inflammation is bad. Acute inflammation is your body's natural healing response. But when inflammation becomes chronic — triggered by stress, poor sleep, and inflammatory foods — it starts damaging healthy tissue.

## Top Anti-Inflammatory Foods

**Fatty Fish** — Salmon, mackerel, and sardines are rich in omega-3 fatty acids (EPA and DHA), which directly reduce inflammatory markers.

**Berries** — Blueberries, strawberries, and blackberries contain anthocyanins, powerful antioxidants that reduce inflammation at the cellular level.

**Turmeric** — Curcumin, the active compound in turmeric, is one of nature's most potent anti-inflammatories. Pair with black pepper to increase absorption by 2,000%.

**Extra Virgin Olive Oil** — Contains oleocanthal, which has effects similar to ibuprofen. Use it raw on salads for maximum benefit.

**Leafy Greens** — Spinach, kale, and Swiss chard are packed with vitamins and antioxidants that combat oxidative stress.

## Foods to Minimize

- Refined sugars and high-fructose corn syrup
- Processed meats
- Excessive alcohol
- Refined carbohydrates (white bread, pastries)
- Trans fats and seed oils

## A Sample Anti-Inflammatory Day

**Breakfast**: Overnight oats with blueberries, walnuts, and a drizzle of honey
**Lunch**: Grilled salmon over mixed greens with olive oil dressing
**Snack**: Turmeric golden milk latte
**Dinner**: Roasted sweet potatoes with sautéed kale and chickpeas`,
    category: "nutrition",
    coverImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=450&fit=crop",
    readingTime: 5,
    publishedAt: "2025-12-10",
    published: true,
  },
  {
    id: "3",
    slug: "yoga-for-desk-workers",
    title: "Yoga for Desk Workers: 5-Minute Flows to Fix Tech Neck",
    excerpt: "Spending hours at a desk? These quick yoga flows will release tension in your neck, shoulders, and hips — no mat required.",
    content: `If you spend more than four hours a day at a desk, your body is quietly accumulating tension. "Tech neck," tight hip flexors, and rounded shoulders aren't just uncomfortable — they can lead to chronic pain and postural issues.

## The Desk Worker's Dilemma

Sitting compresses your hip flexors, rounds your thoracic spine, and pushes your head forward. Over time, this creates a cascade of muscular imbalances that yoga is uniquely suited to address.

## Flow 1: The Neck Reset (2 minutes)

1. **Ear-to-shoulder stretches** — Gently tilt your right ear toward your right shoulder. Hold for 5 breaths. Repeat left side.
2. **Chin tucks** — Draw your chin straight back (like making a double chin). Hold 5 seconds, repeat 10 times.
3. **Neck circles** — Slowly circle your head in one direction for 30 seconds, then reverse.

## Flow 2: The Shoulder Opener (2 minutes)

1. **Eagle arms** — Cross your right arm under your left, wrap forearms, press palms together. Lift elbows to shoulder height. Hold 5 breaths each side.
2. **Thread the needle** — From tabletop position, thread your right arm under your left, resting your right shoulder and temple on the floor. Hold 5 breaths each side.
3. **Cow face arms** — Reach your right arm up, bend the elbow. Reach your left arm behind your back. Try to clasp fingers (use a strap or towel if needed).

## Flow 3: The Hip Unlocker (1 minute)

1. **Seated figure four** — Cross your right ankle over your left knee. Gently press the right knee away from you. Hold 30 seconds each side.
2. **Standing crescent** — Step your right foot back into a lunge. Raise your arms overhead and lean slightly to the left. Hold 5 breaths each side.

## Make It a Habit

Set a timer for every 90 minutes of desk work. Choose one flow and do it. That's just 6-10 minutes of movement across an 8-hour workday, but it can dramatically reduce pain and stiffness.`,
    category: "yoga",
    coverImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop",
    readingTime: 5,
    publishedAt: "2025-12-08",
    published: true,
  },
  {
    id: "4",
    slug: "breathwork-guide",
    title: "The Breathwork Guide: Kill Anxiety in Under Two Minutes",
    excerpt: "Simple breathing techniques like Box Breathing and 4-7-8 can calm your nervous system almost instantly. Here's exactly how to do them.",
    content: `Your breath is the fastest tool you have to shift your nervous system from fight-or-flight to rest-and-digest. Unlike supplements or exercise, breathwork works in seconds and costs nothing.

## Why Breathwork Works

When you're anxious, your breathing becomes shallow and rapid, signaling danger to your brain. By consciously slowing and deepening your breath, you activate the vagus nerve, which triggers your parasympathetic (calming) nervous system.

## Technique 1: Box Breathing

Used by Navy SEALs to stay calm under pressure.

1. **Inhale** through your nose for 4 counts
2. **Hold** your breath for 4 counts
3. **Exhale** through your mouth for 4 counts
4. **Hold** empty for 4 counts
5. Repeat 4 rounds

**Best for**: Acute stress, pre-presentation jitters, insomnia

## Technique 2: 4-7-8 Breathing

Developed by Dr. Andrew Weil, this technique is called a "natural tranquilizer."

1. **Inhale** through your nose for 4 counts
2. **Hold** for 7 counts
3. **Exhale** completely through your mouth for 8 counts
4. Repeat 3-4 rounds

**Best for**: Falling asleep, panic attacks, generalized anxiety

## Technique 3: Physiological Sigh

Discovered by Stanford neuroscientist Andrew Huberman, this is the fastest known way to calm down.

1. Take a **double inhale** through your nose (one short, one long)
2. Follow with a **long, slow exhale** through your mouth
3. Just one or two of these can noticeably reduce stress

**Best for**: Immediate relief during a stressful moment

## Building a Breathwork Practice

Start with just 2 minutes of box breathing each morning. As it becomes habitual, you'll find yourself naturally turning to breath techniques when stress arises, instead of reaching for your phone or a snack.`,
    category: "yoga",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop",
    readingTime: 4,
    publishedAt: "2025-12-05",
    published: true,
  },
  {
    id: "5",
    slug: "low-dopamine-morning",
    title: "The Low-Dopamine Morning: Why Your Phone Ruins Your Focus",
    excerpt: "Checking your phone first thing floods your brain with dopamine, making everything else feel boring. Here's a better way to start your day.",
    content: `That morning scroll through Instagram or email might feel harmless, but it's quietly sabotaging your focus, creativity, and motivation for the entire day.

## The Dopamine Problem

Dopamine isn't just the "pleasure chemical" — it's the molecule of motivation and anticipation. When you wake up, your dopamine levels are naturally rising, preparing you for a productive day. But when you immediately check your phone, you get a massive hit of dopamine from novelty, notifications, and social validation.

The problem? Your brain adjusts. After that initial flood, your baseline drops, making everything else — work, exercise, cooking — feel boring by comparison.

## The Low-Dopamine Morning Protocol

The idea is simple: delay high-dopamine activities for the first 60-90 minutes after waking.

### What to Avoid
- Social media and news apps
- Email and work messages
- Online shopping or browsing
- Video content (YouTube, TikTok, etc.)

### What to Do Instead

**1. Sunlight exposure (5-10 minutes)** — Go outside or sit by a window. Morning sunlight sets your circadian rhythm and triggers healthy cortisol release.

**2. Hydrate** — Drink a full glass of water. Your body is dehydrated after 7-8 hours of sleep.

**3. Movement** — A 10-minute walk, stretching routine, or yoga flow. Movement generates dopamine naturally and sustainably.

**4. Journaling or planning** — Write 3 things you're grateful for, or outline your top 3 priorities for the day.

**5. A mindful breakfast** — Sit down and eat without screens. Notice the flavors, textures, and experience.

## What the Research Says

Dr. Anna Lembke, author of *Dopamine Nation*, explains that regularly flooding your brain with easy dopamine creates a "dopamine deficit state" — where you need more stimulation to feel the same level of satisfaction. A low-dopamine morning helps reset this balance.

## Start Small

You don't have to go from scrolling TikTok to a silent meditation overnight. Start by delaying your phone by just 15 minutes. Add 15 minutes each week until you reach the 60-90 minute mark.`,
    category: "routines",
    coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop",
    readingTime: 5,
    publishedAt: "2025-12-01",
    published: true,
  },
  {
    id: "6",
    slug: "circadian-rhythm-alignment",
    title: "Circadian Rhythm Alignment: Fix Your Sleep With Sunlight & Timing",
    excerpt: "Your body has an internal clock that controls sleep, energy, and metabolism. Learn how to work with it, not against it.",
    content: `Your circadian rhythm is a 24-hour internal clock that governs nearly every process in your body — from sleep and hormone release to digestion and immune function. When it's aligned, you feel energized during the day and sleepy at night. When it's disrupted, everything suffers.

## How Modern Life Breaks Your Clock

- **Artificial light at night** confuses your brain about what time it is
- **Irregular sleep schedules** prevent your body from establishing a pattern
- **Late-night eating** activates metabolic processes when they should be winding down
- **Lack of morning sunlight** fails to properly "set" your clock each day

## The Alignment Protocol

### Morning (6-9 AM)
- Get outside within 30 minutes of waking for 10+ minutes of sunlight
- Eat breakfast within 1-2 hours of waking
- Exercise or do light movement

### Midday (12-2 PM)
- Get another burst of sunlight exposure
- Eat your largest meal of the day
- Take a short walk after lunch

### Evening (6-9 PM)
- Eat dinner at least 3 hours before bed
- Dim lights and use warm-toned bulbs
- Put on blue-light blocking glasses if using screens
- Start your wind-down routine

### Night (9-11 PM)
- Keep your bedroom cool (65-68°F / 18-20°C)
- Make the room as dark as possible
- Maintain a consistent bedtime (±30 minutes, even on weekends)

## The Weekend Trap

"Social jet lag" — staying up late and sleeping in on weekends — can shift your circadian rhythm by 2-3 hours. This is equivalent to flying across time zones every weekend. Try to keep your wake time within one hour of your weekday schedule.

## Results Timeline

Most people notice improved energy within 3-5 days of consistent circadian alignment. Full adaptation typically takes 2-3 weeks. Be patient — you're literally reprogramming your biology.`,
    category: "routines",
    coverImage: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&h=450&fit=crop",
    readingTime: 6,
    publishedAt: "2025-11-28",
    published: true,
  },
  {
    id: "7",
    slug: "digital-detox-strategies",
    title: "Digital Detox Strategies: Reduce Screen Time Without Disappearing",
    excerpt: "You don't need to throw your phone in a lake. These realistic strategies help you reclaim attention without missing out on life.",
    content: `The average person spends over 7 hours a day looking at screens. While technology is essential for modern life, excessive screen time is linked to anxiety, poor sleep, neck pain, and diminished attention spans. The solution isn't to go off-grid — it's to be intentional.

## The Attention Economy

Apps are designed by teams of engineers whose job is to keep you scrolling. Infinite feeds, notification badges, and autoplay are all features engineered to capture your attention. Understanding this isn't about blame — it's about recognizing the game so you can choose not to play.

## Tier 1: Quick Wins (Start Here)

**Turn off non-essential notifications** — Keep calls, texts, and calendar alerts. Turn off everything else. This alone can reduce phone pickups by 30-40%.

**Grayscale mode** — Color is a key driver of screen appeal. Switching your phone to grayscale makes it significantly less engaging.

**Move social apps off your home screen** — Place them in a folder on your second or third screen. The extra friction makes mindless opening less likely.

## Tier 2: Boundary Setting

**No-phone zones** — Designate the bedroom and dining table as phone-free areas. Buy a $10 alarm clock so your phone doesn't need to be in the bedroom.

**Batch your checking** — Instead of checking email/social media throughout the day, designate 2-3 specific times (e.g., 9 AM, 1 PM, 6 PM).

**The 10-minute rule** — When you feel the urge to check your phone, wait 10 minutes. The craving usually passes.

## Tier 3: Lifestyle Redesign

**Replace, don't remove** — The reason screen time fills our days is because it fills a need (connection, entertainment, boredom relief). Find analog replacements: books, puzzles, cooking, walking, conversation.

**Weekly phone-free blocks** — Start with 2-hour blocks on weekends. Go for a hike, visit a farmers' market, or have a phone-free dinner with friends.

**Digital sabbath** — One day per month, go completely screen-free (except for emergencies). Many people report this is the single most refreshing practice they adopt.

## Tracking Progress

Use your phone's built-in screen time tracker (Screen Time on iOS, Digital Wellbeing on Android) to establish a baseline. Aim for a 20% reduction in the first month.`,
    category: "mental-wellness",
    coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=450&fit=crop",
    readingTime: 6,
    publishedAt: "2025-11-25",
    published: true,
  },
  {
    id: "8",
    slug: "forest-bathing",
    title: "The Power of Forest Bathing: Proven Benefits of Time in Nature",
    excerpt: "Shinrin-yoku, or 'forest bathing,' isn't just a walk in the woods. Science shows it lowers cortisol, boosts immunity, and improves mood.",
    content: `In the 1980s, the Japanese Ministry of Agriculture, Forestry, and Fisheries coined the term "shinrin-yoku" — forest bathing. It's not exercise. It's not hiking. It's the simple act of being present in a forest environment, engaging all five senses.

## The Science Is Compelling

**Cortisol reduction** — A 2019 study published in *Frontiers in Psychology* found that just 20 minutes in a natural setting significantly reduced cortisol levels. Participants who spent 20-30 minutes had the steepest drops.

**Immune boost** — Trees release phytoncides (organic compounds) that, when inhaled, increase the activity of natural killer (NK) cells — a type of white blood cell that fights infection and cancer. Effects can last up to 30 days after a single forest visit.

**Blood pressure** — Multiple studies show forest environments lower both systolic and diastolic blood pressure more effectively than urban walks of the same duration.

**Mental health** — Research from Stanford found that walking in nature reduced activity in the subgenual prefrontal cortex — a brain region associated with rumination and depressive thoughts.

## How to Forest Bathe

This isn't about covering distance or getting your heart rate up. It's about presence.

1. **Choose a natural setting** — A forest is ideal, but a large park with mature trees works too
2. **Leave your phone behind** (or put it on airplane mode)
3. **Walk slowly** — Much slower than your normal pace
4. **Engage your senses** — Notice the colors of the leaves, the texture of bark, the smell of soil, the sound of birds, the feel of breeze on your skin
5. **Sit down** — Find a spot that draws you. Sit for at least 10 minutes and simply observe
6. **Stay for 2+ hours** — While even 20 minutes helps, the immune benefits require longer exposure

## No Forest Nearby?

Urban nature still counts. Studies show that even views of greenery from a window, indoor plants, and recordings of nature sounds provide measurable stress reduction. A city park with trees is far better than nothing.

## Making It a Practice

Aim for one extended nature session per week (1-2 hours) and brief daily exposure (even 10 minutes in a garden or tree-lined street). Track how you feel before and after to build motivation.`,
    category: "mental-wellness",
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop",
    readingTime: 7,
    publishedAt: "2025-11-20",
    published: true,
  },
];

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return SAMPLE_ARTICLES.filter((a) => a.category === category && a.published);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return SAMPLE_ARTICLES.find((a) => a.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
