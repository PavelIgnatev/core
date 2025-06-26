import { makeRequestGpt } from './makeRequestGpt';

const randomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const styles = [
  {
    name: 'sincere',
    description:
      'Honest, open tone without pretense. Says it like it is, direct and human.',
    tone: 'simple and direct, like talking to a friend',
  },
  {
    name: 'emotional',
    description:
      'Shows real feelings, but restrained. Emotions are there, but controlled.',
    tone: 'concerned, but not hysterical',
  },
  {
    name: 'honest',
    description: 'Factual, without embellishment. Calls things by their names.',
    tone: 'straightforward and specific',
  },
  {
    name: 'conversational',
    description:
      'Natural speaking style, real expressions. How people actually talk.',
    tone: 'casual and natural',
  },
];

export const getSpamBotReason = async (accountId: string) => {
  const reasons = [
    'but not all my contacts know about my account, and I urgently need to reach them for important matters',
    "even though I haven't engaged in spam, mass messaging, or committed any violations of Telegram's terms of service",
    "because I need to access communication with important business contacts and clients, but I can't reach them anymore",
    'because I need to urgently send messages for work purposes and coordinate with my team members',
    'since this is the only way to reach some important people who are not in my mutual contacts list',
    'but I have family members and close friends who need to be contacted urgently through this account',
    'because I use this account for professional communication and this restriction severely impacts my work',
    'since I need to communicate with medical professionals and emergency contacts who are not mutual contacts',
    'but I have important business deals and projects that require immediate communication with non-mutual contacts',
    'because I run a small business and need to contact customers and suppliers who are not in my mutual contacts',
    'since I provide customer support services and this restriction prevents me from helping people who need assistance',
    'but I need to coordinate volunteer work and community activities with people outside my mutual contacts',
  ];

  const impacts = [
    'work is stalled',
    'clients are being lost',
    'family is worried',
    'projects are failing',
    'people cannot reach me',
    'business is stuck',
    'important contacts are unreachable',
    'deals are falling through',
  ];

  const facts = [
    'Never violated rules, never spammed, never did suspicious activities',
    'Have not engaged in any violations or spam activities',
    'Never broke any terms of service or sent unsolicited messages',
    'Have always followed platform guidelines and never spammed anyone',
    'Never participated in any suspicious behavior or rule violations',
    'Have not committed any violations of community standards',
    'Never engaged in mass messaging or any prohibited activities',
    'Have always used the account responsibly without any violations',
    'Never sent spam or engaged in any suspicious activities',
    'Have not violated any platform rules or engaged in unwanted messaging',
    'Never did anything against terms of service or community guidelines',
    'Have always maintained proper account usage without any violations',
  ];

  const selectedStyle = randomElement(styles);
  const selectedReason = randomElement(reasons);
  const selectedImpact = randomElement(impacts);
  const selectedFact = randomElement(facts);

  return await makeRequestGpt(
    accountId,
    [
      {
        role: 'system',
        content: `## CONTEXT
You help write an appeal to Telegram support.

## GENERATION STYLE: ${selectedStyle.name.toUpperCase()}
${selectedStyle.description}

## STYLE RULES
- Tone: ${selectedStyle.tone}
- Maximum 3 sentences
- Up to 300 characters
- No direct addressing of support
- No greetings
- Natural English speech, how people actually talk
- No questions or exclamations
- Specifics instead of general phrases`,
      },
      {
        role: 'user',
        content: `Write an appeal about lifting messaging restrictions in "${selectedStyle.name}" style. 

SITUATION: I can only message mutual contacts, ${selectedReason}. 

FACT: ${selectedFact}.

IMPACT: ${selectedImpact}.

Start with stating the fact, then mention the impact. Style should be ${selectedStyle.tone}. Maximum 300 characters, 3 sentences.`,
      },
    ],
    '',
    'ENGLISH',
    true,
    false,
    2,
    false,
    'SPAMBOT-REASON',
    { temperature: 1, presence_penalty: 0.8, p: 0.85 }
  );
};
