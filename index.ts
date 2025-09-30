import 'dotenv/config';
import { runLLM } from './src/llm';
import { addMessages, getMessages } from './src/memory';

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message');
  process.exit(1);
}

// Save the new user message
await addMessages([{ role: 'user', content: userMessage }]);

// Load previous messages from memory including user new message
const messages = await getMessages();

// Run the LLM with all the messages in memory
const response = await runLLM({
  messages,
});

// Save the assistant response to memory
await addMessages([
  {
    role: 'assistant',
    content: response.choices[0].message.content,
  },
]);

// > npm start "hi"
//===============================
console.log(response.choices[0].message.content);
// **Hi** is a common, informal greeting used to say "hello" in English[1][2][5]. It is more casual than "hello" and is appropriate in most everyday situations, except those that require formal language[1][2].

// The term "hi" originated as a variant of "hey" or "hy," and its first recorded use in American English comes from the speech of a Kansas Indigenous person in 1862[4]. Besides greeting, "hi" can also be an exclamation to attract attention[2][4].

// Other meanings for "HI" include:
// - The abbreviation for the U.S. state of **Hawaii**[2][3].
// - A Japanese kana (ひ, ヒ)[3].
// - The ISO 639-1 code for the **Hindi** language[3].
// - Scientific and technical terms such as **hydrogen iodide** and **health informatics**[3].

// In summary, "hi" is most typically recognized worldwide as an informal way to greet someone in English[1][2][5].

// > npm start "hello"
//===============================
// console.log(response);
// {
//   id: 'c4cafb3d-90ee-4878-9516-06b6342ad768',
//   model: 'sonar-pro',
//   created: 1759097577,
//   usage: {
//     prompt_tokens: 1,
//     completion_tokens: 202,
//     total_tokens: 203,
//     search_context_size: 'low',
//     cost: {
//       input_tokens_cost: 0,
//       output_tokens_cost: 0.003,
//       request_cost: 0.006,
//       total_cost: 0.009
//     }
//   },
//   citations: [
//     'https://en.wikipedia.org/wiki/Hello',
//     'https://en.wikipedia.org/wiki/Hello_(Adele_song)',
//     'https://supersimple.com/song/hello/',
//     'https://www.youtube.com/watch?v=mHONNcZbwDY',
//     'https://www.hello-products.com',
//     'https://www.hellomagazine.com/us/',
//     'https://open.spotify.com/track/1Yk0cQdMLx5RzzFTYwmuld',
//     'https://www.youtube.com/watch?v=DfG6VKnjrVw'
//   ],
//   search_results: [
//     {
//       title: 'Hello - Wikipedia',
//       url: 'https://en.wikipedia.org/wiki/Hello',
//       date: '2002-06-09',
//       last_updated: '2025-09-25',
//       snippet: 'Hello is a salutation or greeting in the English language. It is first attested in writing from 1826. The greeting "Hello" became associated with telephones ...'
//     },
//     {
//       title: 'Hello (Adele song) - Wikipedia',
//       url: 'https://en.wikipedia.org/wiki/Hello_(Adele_song)',
//       date: '2015-10-22',
//       last_updated: '2025-09-14',
//       snippet: '"Hello" is a song recorded by British singer-songwriter Adele, released on 23 October 2015 by XL Recordings as the lead single from her third studio album, ...'
//     },
//     {
//       title: 'Hello! - Super Simple Songs',
//       url: 'https://supersimple.com/song/hello/',
//       date: '2022-06-27',
//       last_updated: '2025-08-28',
//       snippet: 'Start off your lesson with “Hello!”, a fun and energetic song to talk about how you feel as you greet each other.'
//     },
//     {
//       title: 'Lionel Richie - Hello (Official Music Video) - YouTube',
//       url: 'https://www.youtube.com/watch?v=mHONNcZbwDY',
//       date: '2020-11-20',
//       last_updated: '2025-09-17',
//       snippet: 'Lionel Richie - Hello (Official Music Video) · Comments. 35K. Anyone here in 2025? 1:29:26 · Go to channel. Lionel Richie Greatest Hits 2025 ...'
//     },
//     {
//       title: 'Hello Products',
//       url: 'https://www.hello-products.com',
//       date: '2025-08-19',
//       last_updated: '2025-09-11',
//       snippet: 'friendly products for friendly people. vegan, cruelty free, and thoughtfully formulated for everyone.'
//     },
//     {
//       title: 'HELLO! US Edition - Latest news and Photos',
//       url: 'https://www.hellomagazine.com/us/',
//       date: '2025-09-28',
//       last_updated: '2025-09-28',
//       snippet: 'HELLO! US edition brings you the latest celebrity & royal news from the US & around the world, magazine exclusives, celeb babies, weddings, pregnancies and ...'
//     },
//     {
//       title: 'Hello - song and lyrics by Adele - Spotify',
//       url: 'https://open.spotify.com/track/1Yk0cQdMLx5RzzFTYwmuld',
//       date: '2025-06-01',
//       last_updated: null,
//       snippet: 'Listen to Hello on Spotify. Song · Adele · 2015. ... Hello. Adele. 4:55 · Send My Love (To Your New Lover). Adele. 3:43 · I Miss You.'
//     },
//     {
//       title: 'Adele - Hello (Live at the NRJ Awards) - YouTube',
//       url: 'https://www.youtube.com/watch?v=DfG6VKnjrVw',
//       date: '2015-11-09',
//       last_updated: '2025-08-29',
//       snippet: "... Hello' is taken from the new album, 25, out November 20. http://adele.com Available now from iTunes http://smarturl.it/itunes25 Available ..."
//     }
//   ],
//   object: 'chat.completion',
//   choices: [
//     {
//       index: 0,
//       finish_reason: 'stop',
//       message: [Object],
//       delta: [Object]
//     }
//   ]
// }
