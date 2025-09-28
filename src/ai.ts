import Perplexity from '@perplexity-ai/perplexity_ai';

// Initialize client with explicit API key
const perplexity: Perplexity = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY,
});

export default perplexity;
