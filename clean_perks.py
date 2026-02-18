import json

def clean_perks():
    with open('src/lib/perks.json', 'r') as f:
        perks = json.load(f)
    
    # Filter out known bad titles/companies
    bad_companies = [
        "The newline Guide to Building Your First GraphQL Server with Node and TypeScript",
        "Free Credits & Discounts for Startups",
        "Save Money on Your Startup's Tech Stack",
        "Looking for AI Jobs?",
        "Tools",
        "Masterclasses",
        "Tutorials",
        "Fullstack React with TypeScript",
        "Learn",
        "School",
        "Requests",
        "Community"
    ]
    
    clean_list = [p for p in perks if p['company'] not in bad_companies]
    
    # Re-index IDs
    for i, p in enumerate(clean_list):
        p['id'] = str(i + 1)
        
    with open('src/lib/perks.json', 'w') as f:
        json.dump(clean_list, f, indent=2)
    
    print(f"Cleaned perks. New count: {len(clean_list)}")

if __name__ == "__main__":
    clean_perks()
