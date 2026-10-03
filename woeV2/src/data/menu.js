import {
  Building2, Sun, Sparkles, Heart, Dumbbell, Baby, Leaf, GraduationCap,
  PartyPopper, Cake, Star, Briefcase, BookOpen,
} from "lucide-react";

export const MENU = [
  {
    id: "community", icon: Building2, tint: "bg-teal/5 border-teal/25", chip: "bg-teal text-cream",
    title: "On-Site Community Programs",
    sub: "For apartments, HOAs, churches, gyms, community centers & neighborhoods.",
    groups: [
      { label: "Pop-Up Play Days", items: ["Obstacle Course Challenge", "Field Day Games", "Relay Race Day", "Parachute Play", "Giant Lawn Games", "Sports Sampler Day", "Water Play Day", "Bubble & Movement Party", "Color Run / Movement Run"] },
      { label: "Sports & Fitness Clubs", items: ["Soccer", "Basketball", "Football", "Baseball", "Multi-Sport", "Speed & Agility", "Youth Bootcamp", "Kids Conditioning"] },
      { label: "Family Fitness Nights", items: ["Parent vs. Kid Challenges", "Family Field Day", "Family Dance Fitness", "Mom + Me / Dad + Me", "Family Olympics"] },
    ],
  },
  {
    id: "seasonal", icon: Sun, tint: "bg-sun/20 border-sun", chip: "bg-sun text-teal-deep",
    title: "Seasonal, School-Break & Holiday",
    sub: "Camps, themes & celebrations that bring people together all year long.",
    groups: [
      { label: "School-Break Mini-Camps", items: ["Spring Break Explorer Camp", "Summer Movement Camp", "Winter Break Active Camp", "Sports Sampler Camp", "Dance + Movement Camp", "Adventure Challenge Camp", "Fitness & Games Camp"] },
      { label: "Holiday Pop-Ups", items: ["Halloween Spooky Obstacle Course", "Thanksgiving Turkey Trot", "Winter Wonderland Party", "Reindeer Games", "New Year's Fitness Kickoff", "Valentine's Family Dance", "Easter Egg Fitness Hunt", "Fourth of July Field Day"] },
    ],
  },
  {
    id: "specialized-youth", icon: Sparkles, tint: "bg-sky/20 border-sky", chip: "bg-sky text-teal-deep",
    title: "Specialized Youth Programs",
    sub: "Specific experiences that build confidence, skills & lifelong healthy habits.",
    groups: [
      { label: "Toddler Movement & Sensory (1–3)", items: ["Crawl, Climb & Explore", "Music & Movement", "Sensory Stations", "Balance & Coordination", "Parent + Toddler Fitness"] },
      { label: "Youth Yoga & Mindfulness", items: ["Animal Yoga", "Calm Kids Club", "Stretch & Breathe", "Focus & Balance", "Confidence Through Movement"] },
      { label: "Adventure & Tactical Play", items: ["Foam Blaster Arena", "Capture the Flag", "Ninja Training", "Agility Tag", "Team Strategy Games"] },
    ],
  },
  {
    id: "learning", icon: BookOpen, tint: "bg-sun/25 border-sun", chip: "bg-teal text-cream", wide: true,
    title: "Learning & Enrichment Experiences",
    sub: "Making learning fun — movement-powered education for curious minds of every ability.",
    groups: [
      { label: "Learning Adventures", items: ["Educational Field Trips", "Nature & Science Walks", "Museum & Park Learning Days", "Hands-On Discovery Activities"] },
      { label: "Enrichment Clubs", items: ["Learning-Through-Play Sessions", "After-School Learning Adventures", "Story + Movement Time", "Brain-Boost Games"] },
      { label: "Inclusive & Special Needs", items: ["Special Needs 1:1 & Small Groups", "Sensory-Friendly Sessions", "Respite Care Support", "Adaptive Movement & Play"] },
    ],
  },
  {
    id: "private", icon: Heart, tint: "bg-coral/10 border-coral/40", chip: "bg-coral text-cream",
    title: "Private & Small-Group Experiences",
    sub: "Personalized sessions at your home, backyard, park or private space.",
    groups: [
      { label: "1:1 Youth Coaching", items: ["Coordination Development", "Sports Fundamentals", "Agility & Balance Training", "Confidence Building", "Fitness & Conditioning", "Special Needs 1:1 Support", "Respite Care Sessions"] },
      { label: "Small-Group Sessions", items: ["Sibling Fitness", "Neighborhood Sports Club", "Homeschool Groups", "Backyard Bootcamps", "Friends Fitness Club"] },
      { label: "Dance & Rhythm", items: ["Hip-Hop Basics", "Creative Movement", "Rhythm Games", "Kids Dance Fitness", "Freestyle Sessions"] },
    ],
  },
  {
    id: "adult", icon: Dumbbell, tint: "bg-tang/15 border-tang/50", chip: "bg-tang text-cream",
    title: "Adult Fitness, Wellness & Dance",
    sub: "Classes for all fitness levels. Move, feel good, belong.",
    groups: [
      { label: "High-Energy Fitness", items: ["Zumba", "Hip-Hop Fitness", "Dance Cardio", "Bootcamp", "Strength Circuit", "Functional Fitness"] },
      { label: "Dance Classes", items: ["Heels", "Afrobeats", "Line Dance", "Dance Fitness", "Family Dance"] },
      { label: "Low-Impact Wellness", items: ["Stretch & Mobility", "Gentle Fitness", "Chair Fitness", "Stress-Relief Movement"] },
    ],
  },
  {
    id: "parent-baby", icon: Baby, tint: "bg-sage/25 border-sage", chip: "bg-sage text-teal-deep",
    title: "Parent + Baby Programs",
    sub: "Stay active. Meet other parents. Build community.",
    groups: [
      { label: "Stroller Fitness", items: ["Stroller Walk + Workout", "Stroller Bootcamp", "Mom + Baby Fitness", "Walk & Stretch"] },
      { label: "Parent Connection", items: ["Moms Move Together", "New Parent Wellness Hour", "Parent + Baby Stretch", "Stroller Social Club"] },
    ],
  },
  {
    id: "senior", icon: Leaf, tint: "bg-sky/15 border-sky", chip: "bg-sky text-teal-deep",
    title: "Senior & Active-Adult Programs",
    sub: "Fun, engaging movement for active adults & senior communities.",
    groups: [
      { label: "Gentle & Social Movement", items: ["Senior Mobility & Balance", "Chair Fitness", "Gentle Stretch", "Beginner Strength", "Walking Club", "Fall-Prevention Movement", "Dance Through the Decades", "Senior Field Day", "Grandparent + Grandchild Fitness Day"] },
    ],
  },
  {
    id: "school", icon: GraduationCap, tint: "bg-teal/5 border-teal/25", chip: "bg-teal text-cream",
    title: "School & Youth Enrichment",
    sub: "After-school programs, recess enrichment, PE support & special events.",
    groups: [
      { label: "School Day Support", items: ["After-School Clubs (multi-sport, dance, fitness)", "Recess Enrichment", "PE Support", "Field Day & School Events", "Wellness Week Activities", "Back-to-School Play Day", "End-of-Year Celebrations"] },
    ],
  },
  {
    id: "gatherings", icon: PartyPopper, tint: "bg-coral/10 border-coral/40", chip: "bg-coral text-cream",
    title: "Family Gatherings & Kids Party Crew",
    sub: "You enjoy the gathering. We create theirs.",
    groups: [
      { label: "We Entertain the Kids At", items: ["Thanksgiving & Friendsgiving", "Holiday Parties", "Adult Birthdays & Dinner Parties", "Weddings & Receptions", "Family Reunions", "Game-Day Kids Zones", "BBQs, Graduations & Showers"] },
    ],
  },
  {
    id: "birthday", icon: Cake, tint: "bg-sun/20 border-sun", chip: "bg-sun text-teal-deep",
    title: "Birthday Party Experiences",
    sub: "The ultimate active party — coaches, equipment, setup, games, activity plan & cleanup included.",
    groups: [
      { label: "Party Themes", items: ["Sports Party", "Adventure Party", "Dance Party", "Glow Party", "Explorer Party (a mix of everything)"] },
    ],
  },
  {
    id: "signature", icon: Star, tint: "bg-sage/25 border-sage", chip: "bg-sage text-teal-deep",
    title: "Special & Signature Events",
    sub: "Unique experiences for unforgettable moments.",
    groups: [
      { label: "Signature Experiences", items: ["Glow Experiences", "Silent Disco Events", "Fitness Festivals", "Community Field Days", "Sports Carnivals", "Family Fun Runs", "Movement Festivals"] },
    ],
  },
  {
    id: "corporate", icon: Briefcase, tint: "bg-tang/15 border-tang/50", chip: "bg-tang text-cream",
    title: "Corporate & Employee Family Experiences",
    sub: "Make wellness more family-inclusive.",
    groups: [
      { label: "Workplace Wellness", items: ["Corporate Family Field Days", "Employee Wellness Events", "Team-Building Fitness", "Kids Activity Zones", "Corporate Holiday Parties", "Company Picnics", "Family Olympics", "Wellness Festivals"] },
    ],
  },
];
