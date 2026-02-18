import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime

def scrape_perks():
    url = "https://www.newline.co/tools/ai-startups-free-credits"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    url_map = {
        "Google Cloud": "https://cloud.google.com/startup",
        "Cloudflare": "https://www.cloudflare.com/startups/",
        "Microsoft": "https://foundershub.startups.microsoft.com/",
        "Amazon Web Services": "https://aws.amazon.com/activate/",
        "DigitalOcean": "https://www.digitalocean.com/hatch",
        "OVHcloud": "https://startup.ovhcloud.com/",
        "Vercel": "https://vercel.com/startups",
        "Anthropic": "https://www.anthropic.com/",
        "Perplexity AI": "https://www.perplexity.ai/",
        "ElevenLabs": "https://elevenlabs.io/grants",
        "OpenAI": "https://openai.com/",
        "MongoDB": "https://www.mongodb.com/startups",
        "Couchbase": "https://www.couchbase.com/startups",
        "Supabase": "https://supabase.com/startups",
        "PlanetScale": "https://planetscale.com/",
        "Mixpanel": "https://mixpanel.com/startups",
        "PostHog": "https://posthog.com/startups",
        "Twilio Segment": "https://segment.com/startups",
        "Amplitude": "https://amplitude.com/startups",
        "Datadog": "https://www.datadoghq.com/startups",
        "Sentry": "https://sentry.io/for/startups",
        "Retool": "https://retool.com/startups",
        "Algolia": "https://www.algolia.com/startups",
        "Notion": "https://www.notion.so/startups",
        "Miro": "https://miro.com/startups",
        "GitHub": "https://github.com/startups",
        "Linear": "https://linear.app/startups",
        "Atlassian": "https://www.atlassian.com/software/startups",
        "Twilio": "https://www.twilio.com/startups",
        "Intercom": "https://www.intercom.com/startups",
        "HubSpot": "https://www.hubspot.com/startups",
        "Zendesk": "https://www.zendesk.com/startups",
        "Figma": "https://www.figma.com/",
        "Canva": "https://www.canva.com/",
        "Freshworks": "https://www.freshworks.com/startups",
        "Stripe": "https://stripe.com/atlas",
        "Dropbox": "https://www.dropbox.com/",
        "Zoho": "https://www.zoho.com/startups",
        "Brex": "https://www.brex.com/startups",
        "Ramp": "https://ramp.com/",
        "Gusto": "https://gusto.com/"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        perks = []
        
        potential_items = soup.find_all(['h3', 'h2'])
        
        for item in potential_items:
            raw_title = item.get_text(strip=True)
            if len(raw_title) < 2: continue
            
            provider_name = raw_title
            perk_title = raw_title
            description = ""
            value = "Unknown"
            eligibility = "Unknown"
            apply_url = url
            
            if ":" in raw_title:
                parts = raw_title.split(":", 1)
                provider_name = parts[0].strip()
                perk_title = parts[1].strip()
            elif " - " in raw_title:
                parts = raw_title.split(" - ", 1)
                provider_name = parts[0].strip()
                perk_title = parts[1].strip()
            
            # Better value extraction from text
            # Often value is like "Up to $100,000" at the start of the description or separate
            
            sibling = item.find_next_sibling()
            desc_parts = []
            
            while sibling and sibling.name not in ['h2', 'h3', 'div', 'section']:
                text = sibling.get_text(strip=True)
                
                if sibling.name == 'p' or sibling.name == 'ul':
                    desc_parts.append(text)
                    
                    if value == "Unknown":
                        # Look for $ amount
                        val_match = re.search(r'(Up to )?\$[\d,]+(\s*[kKmM])?(\+)?', text)
                        if val_match:
                            value = val_match.group(0)
                        elif "€" in text:
                             val_match = re.search(r'(Up to )?€[\d,]+(\s*[kKmM])?', text)
                             if val_match:
                                value = val_match.group(0)
                        elif "Free" in text or "free" in text.lower():
                             if "months free" in text.lower():
                                 value = text.split("free")[0].split()[-2] + " Months Free"
                             elif "year free" in text.lower():
                                 value = "1 Year Free"

                    if "eligib" in text.lower() or "requir" in text.lower():
                        eligibility = text
                
                if sibling.name == 'a' and sibling.has_attr('href'):
                    apply_url = sibling['href']
                elif sibling.find('a', href=True):
                    apply_url = sibling.find('a')['href']
                    
                sibling = sibling.find_next_sibling()
            
            description = " ".join(desc_parts)
            
            # Map URL if available
            if provider_name in url_map:
                apply_url = url_map[provider_name]
            
            # Clean up value if it's still unknown but description has hints
            if value == "Unknown" and description:
                val_match = re.search(r'(Up to )?\$[\d,]+(\s*[kKmM])?(\+)?', description)
                if val_match:
                    value = val_match.group(0)

            # Determine type based on keywords
            type_ = "Tools"
            desc_lower = description.lower()
            if "cloud" in desc_lower or "aws" in desc_lower or "azure" in desc_lower:
                type_ = "Cloud Credits"
            elif "api" in desc_lower:
                type_ = "API"
            elif "education" in desc_lower or "learn" in desc_lower:
                type_ = "Education"
            elif "hardware" in desc_lower:
                type_ = "Hardware"
            
            # Generate tags
            tags = []
            if "ai" in desc_lower: tags.append("ai")
            if "cloud" in desc_lower: tags.append("cloud")
            if "database" in desc_lower: tags.append("database")
            if "analytics" in desc_lower: tags.append("analytics")
            if "marketing" in desc_lower: tags.append("marketing")
            
            if (description or value != "Unknown") and "Subscribe" not in raw_title and "Learn" not in raw_title and "School" not in raw_title and "Requests" not in raw_title and "Community" not in raw_title:
                perks.append({
                    "id": str(len(perks) + 1),
                    "company": provider_name,
                    "title": perk_title,
                    "description": description,
                    "type": type_,
                    "value": value,
                    "eligibility": eligibility if eligibility != "Unknown" else "Startups",
                    "expires": "Ongoing", # Default
                    "link": apply_url,
                    "logo": provider_name[:3].upper(),
                    "tags": tags,
                    "scraped_timestamp": datetime.now().isoformat()
                })
        
        # Deduplicate
        unique_perks = []
        seen = set()
        for p in perks:
            if p['company'] not in seen:
                unique_perks.append(p)
                seen.add(p['company'])
                
        with open('src/lib/perks.json', 'w') as f:
            json.dump(unique_perks, f, indent=2)
        
        print("Successfully updated src/lib/perks.json")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    scrape_perks()
