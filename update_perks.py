import json
from datetime import datetime

# User provided data
raw_perks = [
   { 
     "company": "AWS", 
     "title": "AWS Activate Portfolio", 
     "description": "Higher tier credits for startups backed by VCs or accelerators.", 
     "type": "Cloud Credits", 
     "value": "Up to $100,000", 
     "eligibility": "Funded by VC/Accelerator (requires Org ID)", 
     "expires": "1-2 Years", 
     "link": " https://aws.amazon.com/activate/portfolio/ ", 
     "tags": ["cloud", "infrastructure", "ai"] 
   }, 
   { 
     "company": "Google Cloud", 
     "title": "Start Tier", 
     "description": "Entry-level cloud credits for early-stage startups.", 
     "type": "Cloud Credits", 
     "value": "$2,000", 
     "eligibility": "Bootstrapped, <5 years old, functional website", 
     "expires": "2 Years", 
     "link": " https://cloud.google.com/startup/apply ", 
     "tags": ["cloud", "infrastructure", "google"] 
   }, 
   { 
     "company": "Google Cloud", 
     "title": "Scale / AI Tier", 
     "description": "Massive credits for funded or AI-first startups to cover scaling costs.", 
     "type": "Cloud Credits", 
     "value": "Up to $350,000", 
     "eligibility": "Seed to Series A funded (or AI-First)", 
     "expires": "2 Years", 
     "link": " https://cloud.google.com/startup/apply ", 
     "tags": ["cloud", "ai", "infrastructure"] 
   }, 
   { 
     "company": "Microsoft Azure", 
     "title": "Founders Hub", 
     "description": "Credits that scale with your startup, plus free access to GitHub Enterprise and OpenAI.", 
     "type": "Cloud Credits", 
     "value": "$1,000 - $150,000", 
     "eligibility": "Open to everyone (LinkedIn required)", 
     "expires": "1 Year+", 
     "link": " https://foundershub.startups.microsoft.com/signup ", 
     "tags": ["cloud", "ai", "openai", "productivity"] 
   }, 
   { 
     "company": "DigitalOcean", 
     "title": "Hatch", 
     "description": "Cloud credits for developers building on simple, scalable infrastructure.", 
     "type": "Cloud Credits", 
     "value": "$1,000 - $25,000", 
     "eligibility": "Series A or earlier, new customers", 
     "expires": "12 Months", 
     "link": " https://www.digitalocean.com/hatch ", 
     "tags": ["cloud", "hosting", "infrastructure"] 
   }, 
   { 
     "company": "Cloudflare", 
     "title": "Cloudflare for Startups", 
     "description": "Enterprise-grade security, CDN, and edge compute credits.", 
     "type": "Cloud Credits", 
     "value": "Up to $250,000", 
     "eligibility": "<5 years old, <$5M funding", 
     "expires": "1 Year", 
     "link": " https://www.cloudflare.com/forstartups/ ", 
     "tags": ["security", "edge", "cdn"] 
   }, 
   { 
     "company": "Vercel", 
     "title": "Vercel for Startups", 
     "description": "Credits for the frontend cloud, including Next.js hosting.", 
     "type": "Hosting", 
     "value": "$20,000+", 
     "eligibility": "VC-backed or Partner Accelerator", 
     "expires": "12 Months", 
     "link": " https://vercel.com/startups ", 
     "tags": ["frontend", "hosting", "nextjs"] 
   }, 
   { 
     "company": "OpenAI", 
     "title": "OpenAI for Startups", 
     "description": "API credits for building with GPT-4 and other models.", 
     "type": "API", 
     "value": "$2,500", 
     "eligibility": "Linked to \"Partner\" VCs/Accelerators", 
     "expires": "1 Year", 
     "link": " https://openai.com/form/startup-credits/ ", 
     "tags": ["ai", "llm", "api"] 
   }, 
   { 
     "company": "Anthropic", 
     "title": "Anthropic Startup Program", 
     "description": "Credits for building with Claude models.", 
     "type": "API", 
     "value": "$25,000", 
     "eligibility": "Series A or earlier, Partner Network", 
     "expires": "1 Year", 
     "link": " https://www.anthropic.com/startups ", 
     "tags": ["ai", "llm", "claude"] 
   }, 
   { 
     "company": "Mistral AI", 
     "title": "Mistralship", 
     "description": "Support and credits for building on open-weight models.", 
     "type": "API", 
     "value": "Varies", 
     "eligibility": "Early-stage GenAI startups", 
     "expires": "1 Year", 
     "link": " https://mistral.ai/news/mistralship/ ", 
     "tags": ["ai", "open-source", "llm"] 
   }, 
   { 
     "company": "Perplexity", 
     "title": "Perplexity for Startups", 
     "description": "API credits for search and answer engine integration.", 
     "type": "API", 
     "value": "$5,000", 
     "eligibility": "AI-native startups", 
     "expires": "1 Year", 
     "link": " https://www.perplexity.ai/enterprise ", 
     "tags": ["ai", "search", "api"] 
   }, 
   { 
     "company": "Cohere", 
     "title": "Cohere Startup Program", 
     "description": "Credits for NLP models, embeddings, and RAG.", 
     "type": "API", 
     "value": "$10,000", 
     "eligibility": "Associated with partner incubators/VCs", 
     "expires": "1 Year", 
     "link": " https://cohere.com/startups ", 
     "tags": ["ai", "nlp", "rag"] 
   }, 
   { 
     "company": "Hugging Face", 
     "title": "Hugging Face for Startups", 
     "description": "Compute credits for running open-source models.", 
     "type": "Tools", 
     "value": "~$100k Compute", 
     "eligibility": "Partner network (IBM/OVH) or ZeroGPU grants", 
     "expires": "Varies", 
     "link": " https://huggingface.co/support ", 
     "tags": ["ai", "open-source", "gpu"] 
   }, 
   { 
     "company": "Supabase", 
     "title": "Supabase Startup Program", 
     "description": "Credits for the open-source Firebase alternative.", 
     "type": "Tools", 
     "value": "$1,000 + Pro Plan", 
     "eligibility": "Founders with <$5M raised", 
     "expires": "1 Year", 
     "link": " https://supabase.com/startups ", 
     "tags": ["database", "backend", "postgres"] 
   }, 
   { 
     "company": "MongoDB", 
     "title": "MongoDB for Startups", 
     "description": "Credits for MongoDB Atlas and free certification.", 
     "type": "Tools", 
     "value": "$2,500", 
     "eligibility": "Series A or earlier, <5 years old", 
     "expires": "12 Months", 
     "link": " https://www.mongodb.com/startups ", 
     "tags": ["database", "nosql"] 
   }, 
   { 
     "company": "Neon", 
     "title": "Neon Startup Program", 
     "description": "Credits for serverless Postgres with branching.", 
     "type": "Tools", 
     "value": "$100,000", 
     "eligibility": "Early-stage startups", 
     "expires": "12 Months", 
     "link": " https://neon.tech/startups ", 
     "tags": ["database", "postgres", "serverless"] 
   }, 
   { 
     "company": "PostHog", 
     "title": "PostHog for Startups", 
     "description": "Generous credits for product analytics and session replay.", 
     "type": "Tools", 
     "value": "$50,000", 
     "eligibility": "<2 years old, <$5M raised", 
     "expires": "1 Year", 
     "link": " https://posthog.com/startups ", 
     "tags": ["analytics", "product", "observability"] 
   }, 
   { 
     "company": "Algolia", 
     "title": "Algolia for Startups", 
     "description": "Credits for search and discovery APIs.", 
     "type": "API", 
     "value": "$10,000", 
     "eligibility": "<3 years old, <$5M funding", 
     "expires": "1 Year", 
     "link": " https://www.algolia.com/startups ", 
     "tags": ["search", "api"] 
   }, 
   { 
     "company": "Stripe", 
     "title": "Stripe Atlas Perks", 
     "description": "Fee-free processing and partner discounts for incorporated companies.", 
     "type": "Tools", 
     "value": "$20,000+ processing", 
     "eligibility": "Using Atlas for incorporation", 
     "expires": "1 Year", 
     "link": " https://stripe.com/atlas ", 
     "tags": ["finance", "payments", "incorporation"] 
   }, 
   { 
     "company": "Notion", 
     "title": "Notion for Startups", 
     "description": "Free access to the Plus plan with AI.", 
     "type": "Tools", 
     "value": "6 Months Free", 
     "eligibility": "Partner code required (e.g. from Stripe/AWS)", 
     "expires": "6 Months", 
     "link": " https://www.notion.so/startups ", 
     "tags": ["productivity", "docs", "ai"] 
   }, 
   { 
     "company": "Linear", 
     "title": "Linear for Startups", 
     "description": "Free access to the issue tracking tool.", 
     "type": "Tools", 
     "value": "6 Months Free", 
     "eligibility": "<50 employees, new workspace", 
     "expires": "6 Months", 
     "link": " https://linear.app/startups ", 
     "tags": ["project-management", "productivity"] 
   }, 
   { 
     "company": "GitHub", 
     "title": "Student Developer Pack", 
     "description": "A massive bundle of free tools for students.", 
     "type": "Education", 
     "value": "$100k+ Value", 
     "eligibility": "Valid Student ID /.edu email", 
     "expires": "While Student", 
     "link": " https://education.github.com/pack ", 
     "tags": ["student", "tools", "free"] 
   }, 
   { 
     "company": "Mixpanel", 
     "title": "Mixpanel for Startups", 
     "description": "Credits for product analytics.", 
     "type": "Tools", 
     "value": "$50,000", 
     "eligibility": "<5 years old, <$8M raised", 
     "expires": "1 Year", 
     "link": " https://mixpanel.com/startups ", 
     "tags": ["analytics", "product"] 
   }, 
   { 
     "company": "Segment", 
     "title": "Segment for Startups", 
     "description": "Credits for Customer Data Platform (CDP) usage.", 
     "type": "Tools", 
     "value": "$50,000", 
     "eligibility": "<2 years old, <$5M funding", 
     "expires": "1 Year", 
     "link": " https://segment.com/startups ", 
     "tags": ["analytics", "data", "cdp"] 
   }, 
   { 
     "company": "Intercom", 
     "title": "Intercom for Startups", 
     "description": "Discount on customer service platform.", 
     "type": "Tools", 
     "value": "100% off (Year 1)", 
     "eligibility": "Early-stage (<$1M funding)", 
     "expires": "1 Year", 
     "link": " https://www.intercom.com/early-stage ", 
     "tags": ["support", "chat", "customer-service"] 
   }, 
   { 
     "company": "HubSpot", 
     "title": "HubSpot for Startups", 
     "description": "Discounts on CRM and marketing tools.", 
     "type": "Tools", 
     "value": "30-90% Off", 
     "eligibility": "Seed to Series A", 
     "expires": "1-3 Years", 
     "link": " https://www.hubspot.com/startups ", 
     "tags": ["crm", "marketing", "sales"] 
   }, 
   { 
     "company": "Deepgram", 
     "title": "Deepgram Startup Program", 
     "description": "Credits for voice-to-text and audio AI.", 
     "type": "API", 
     "value": "$4,000", 
     "eligibility": "Voice AI startups", 
     "expires": "1 Year", 
     "link": " https://deepgram.com/startup-program ", 
     "tags": ["ai", "voice", "audio"] 
   }, 
   { 
     "company": "Airtable", 
     "title": "Airtable for Startups", 
     "description": "Credits for the low-code database platform.", 
     "type": "Tools", 
     "value": "$2,000", 
     "eligibility": "Seed/Series A, VC partner", 
     "expires": "N/A", 
     "link": " https://airtable.com/startups ", 
     "tags": ["database", "low-code", "productivity"] 
   }, 
   { 
     "company": "Retool", 
     "title": "Retool for Startups", 
     "description": "Credits to build internal tools quickly.", 
     "type": "Tools", 
     "value": "$25,000", 
     "eligibility": "Early-stage, <5 years old", 
     "expires": "12 Months", 
     "link": " https://retool.com/startups ", 
     "tags": ["internal-tools", "low-code"] 
   } 
]

def process_perks():
    cleaned_perks = []
    
    for i, p in enumerate(raw_perks):
        # Generate ID
        p['id'] = str(i + 1)
        
        # Clean link (remove whitespace and backticks)
        p['link'] = p['link'].strip().replace('`', '')
        
        # Generate Logo text (first 3 chars)
        p['logo'] = p['company'][:3].upper()
        
        # Add timestamp
        p['scraped_timestamp'] = datetime.now().isoformat()
        
        cleaned_perks.append(p)
        
    # Write to file
    with open('src/lib/perks.json', 'w') as f:
        json.dump(cleaned_perks, f, indent=2)
        
    print(f"Successfully wrote {len(cleaned_perks)} perks to src/lib/perks.json")

if __name__ == "__main__":
    process_perks()
