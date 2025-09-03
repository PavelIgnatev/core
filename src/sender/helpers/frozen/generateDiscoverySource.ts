const discoverySourceResponses = [
  // Друзья и знакомые
  "friend",
  "close friend", 
  "best friend",
  "childhood friend",
  "old friend",
  "mutual friend",
  "friend from school",
  "friend from university",
  "friend from work",
  "neighbor friend",
  "online friend",
  "gaming friend",
  "travel friend",

  // Семья
  "family member",
  "brother",
  "sister", 
  "cousin",
  "uncle",
  "aunt",
  "parent",
  "father",
  "mother",
  "sibling",
  "relative",
  "family friend",
  "distant relative",
  "extended family",
  "in-law",

  // Коллеги и работа
  "colleague",
  "coworker",
  "work colleague", 
  "office colleague",
  "business partner",
  "work friend",
  "team member",
  "supervisor",
  "manager",
  "employee",
  "former colleague",
  "business associate",
  "professional contact",
  "work mentor",
  "industry colleague",

  // Образование
  "classmate",
  "schoolmate",
  "university friend",
  "study partner",
  "lab partner",
  "roommate",
  "dormmate",
  "teacher",
  "professor",
  "tutor",
  "study group member",
  "course instructor",
  "academic advisor",
  "fellow student",

  // Соседи и сообщество  
  "neighbor",
  "community member",
  "local resident",
  "church member",
  "club member",
  "gym buddy",
  "sports teammate",
  "volunteer partner",
  "hobby group member",
  "activity partner",

  // Онлайн и технологии
  "online recommendation",
  "internet search",
  "app store discovery",
  "Google search",
  "tech blog",
  "review website",
  "forum discussion",
  "social media post",
  "YouTube video",
  "podcast mention",
  "technology news",
  "online article",
  "comparison website",
  "software review",

  // Реклама и маркетинг
  "advertisement",
  "online ad", 
  "social media ad",
  "banner ad",
  "promotional email",
  "marketing campaign",
  "sponsored content",
  "influencer recommendation",
  "celebrity endorsement",
  "brand partnership",
  "promotional offer",
  "targeted advertising",

  // СМИ и новости
  "news article",
  "newspaper story",
  "magazine feature",
  "TV news report",
  "radio mention",
  "documentary",
  "tech news website",
  "business publication",
  "industry magazine",
  "media coverage",

  // Самостоятельное открытие
  "personal research",
  "own investigation",
  "curiosity search",
  "technology exploration",
  "app browsing",
  "store exploration",
  "random discovery",
  "accidental find",
  "trial and error",
  "personal interest",

  // Профессиональные источники
  "IT specialist",
  "tech consultant",
  "software developer", 
  "system administrator",
  "digital marketer",
  "social media manager",
  "business consultant",
  "startup founder",
  "entrepreneur",
  "technology enthusiast",

  // Сервисы и платформы
  "customer support",
  "service provider",
  "technical support",
  "software installer", 
  "computer repair person",
  "phone store employee",
  "electronics retailer",
  "telecom representative",
  "internet provider",
  "technology retailer",

  // Специфические контексты
  "travel companion",
  "conference attendee",
  "workshop participant",
  "seminar speaker",
  "training instructor",
  "course facilitator",
  "event organizer",
  "meetup member",
  "networking contact",
  "industry professional",

  // Международные и культурные
  "international friend",
  "foreign colleague",
  "exchange student",
  "language partner",
  "cultural exchange participant",
  "overseas contact",
  "global business partner",
  "international client",
  "multicultural friend",
  "cross-border colleague",

  // Деловые и предпринимательские
  "business owner",
  "startup colleague",
  "investor contact",
  "venture partner",
  "freelance collaborator",
  "contractor",
  "supplier contact",
  "client representative",
  "vendor representative",
  "business mentor",

  // Образовательные и развивающие
  "workshop leader",
  "conference speaker",
  "industry expert",
  "thought leader",
  "innovation specialist",
  "technology advocate",
  "digital transformation consultant",
  "communication specialist",
  "efficiency expert",
  "productivity coach",

  // Персональные сервисы
  "personal assistant",
  "administrative staff",
  "executive assistant",
  "project coordinator",
  "team leader",
  "department head",
  "organizational consultant",
  "workflow specialist",
  "operations manager",
  "communications director"
];

const randomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const templates = [
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    const source3 = randomElement(discoverySourceResponses);
    return `I heard about it from a ${source1}, who mentioned it after discussing with a ${source2}. They originally found out through a ${source3}.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `A ${source1} recommended it to me during a conversation. Later I found out they learned about it from a ${source2} who had been using it for a while.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `I discovered it through a ${source1} who was very enthusiastic about it. They said a ${source2} had told them about all the useful features.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I found out about Telegram from a ${source1} who was using it for communication. They showed me how it worked and I decided to try it myself.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `My ${source1} suggested I try it because they thought I would find it useful. They had learned about it from a ${source2} at work.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I came across it through ${source1} and decided to give it a try. The features looked interesting and it seemed like a good communication platform.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `Someone mentioned it during a conversation with a ${source1}. I later asked a ${source2} about it and they confirmed it was worth trying.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I learned about it from a ${source1} who was already using it regularly. They explained the benefits and helped me set up my account.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `It was recommended by a ${source1} who praised its security features. A ${source2} also confirmed it was better than other messaging apps.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I first heard about it from a ${source1} during a casual conversation. They were impressed with how fast and reliable it was.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `A ${source1} told me about it when I was looking for a better messaging app. They said a ${source2} had introduced them to it months earlier.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I was introduced to it by a ${source1} who needed a secure way to communicate. They walked me through the setup process.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `My attention was drawn to it by a ${source1} who mentioned its group chat features. A ${source2} later showed me additional capabilities.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I started using it after a ${source1} demonstrated how it worked. The interface seemed user-friendly and I decided to switch.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `It came up in discussion with a ${source1} about messaging alternatives. They mentioned learning about it from a ${source2} who worked in tech.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `A ${source1} convinced me to try it by explaining its advantages over other platforms. I was impressed with the file sharing capabilities.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `I became aware of it through a ${source1} who was using it for work communication. They got the recommendation from a ${source2}.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I was told about it by a ${source1} who appreciated its privacy features. They helped me understand why it was worth switching to.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `The suggestion came from a ${source1} during a discussion about secure messaging. A ${source2} had originally recommended it to them.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I learned about Telegram from a ${source1} who was enthusiastic about its features. They showed me how different it was from other apps.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `A ${source1} brought it to my attention when we were talking about communication tools. They had heard about it from a ${source2}.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I got interested in it after a ${source1} explained its unique features. The cloud synchronization aspect particularly appealed to me.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `My ${source1} recommended it as a better alternative to what I was using. They said a ${source2} had convinced them to make the switch.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `I discovered it when a ${source1} mentioned they were using it for group coordination. The bot features seemed particularly useful.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `It was suggested by a ${source1} who valued its encryption capabilities. A ${source2} had initially told them about the security benefits.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `A ${source1} introduced me to it when I needed a more reliable messaging solution. They demonstrated several features I hadn't seen before.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `I heard positive things about it from a ${source1} who used it daily. They mentioned learning about it from a ${source2} in their network.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `The recommendation came from a ${source1} who needed to share large files easily. They showed me how much more efficient it was.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `I was told about it by a ${source1} who appreciated the customization options. A ${source2} had originally pointed out these features to them.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    return `A ${source1} mentioned it while we were discussing communication preferences. They highlighted the cross-platform compatibility as a major advantage.`;
  },
  () => {
    const source1 = randomElement(discoverySourceResponses);
    const source2 = randomElement(discoverySourceResponses);
    return `My interest was sparked by a ${source1} who used it for business purposes. They had been introduced to it by a ${source2} who understood its professional applications.`;
  }
];

export const generateDiscoverySource = (): string => {
  const template = randomElement(templates);
  return template();
};