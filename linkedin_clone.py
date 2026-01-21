import os
import json
import sqlite3
import networkx as nx
from groq import Groq
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class LinkedInClone:
    def __init__(self, model="llama-3.1-8b-instant"):
        """
        Initializes the LinkedInClone with a Groq client and an SQLite database.
        """
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables.")
        
        self.client = Groq(api_key=api_key)
        self.model = model
        self.db_path = "linkedin_data.db"
        self.network = nx.DiGraph()
        self._init_db()
        # self.seed_ceos()
        self.seed_jobs()

    def _init_db(self):
        """Initializes the SQLite database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS profiles (
                id TEXT PRIMARY KEY,
                name TEXT,
                headline TEXT,
                summary TEXT,
                experience TEXT,
                education TEXT,
                skills TEXT,
                photo_url TEXT,
                profile_json TEXT,
                profile_markdown TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sender TEXT,
                recipient TEXT,
                message TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS jobs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                company TEXT,
                location TEXT,
                description TEXT,
                posted_by TEXT,
                salary_range TEXT,
                qualifications TEXT,
                level TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS saved_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                item_id TEXT,
                item_type TEXT,
                item_data TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
        conn.close()

    def seed_ceos(self):
        """Seeds the database with high-detail celebrity profiles."""
        ceos = [
            {
                "id": "elon_musk",
                "name": "Elon Musk",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society.jpg",
                "headline": "Technoking of Tesla | SpaceX Chief Engineer",
                "summary": "Pioneering sustainable energy, multi-planetary life, and neural interfaces through Tesla, SpaceX, and Neuralink.",
                "experience": "CEO @ Tesla (2008-Present), Founder @ SpaceX (2002-Present), Owner @ X (2022-Present)",
                "education": "University of Pennsylvania (Physics & Economics)",
                "skills": "Rocketry, EV Architecture, First Principles Thinking, Artificial Intelligence"
            },
            {
                "id": "satya_nadella",
                "name": "Satya Nadella",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/7/78/MS-CEO-Satya-Nadella_%28cropped%29.jpg",
                "headline": "CEO @ Microsoft",
                "summary": "Transforming Microsoft into a cloud-first, mobile-first company while leading the industry in AI integration.",
                "experience": "CEO @ Microsoft (2014-Present), EVP Cloud & Enterprise @ Microsoft",
                "education": "University of Wisconsin-Milwaukee (CS), University of Chicago (MBA)",
                "skills": "Cloud Computing, Enterprise Software, Cultural Transformation, Strategic Leadership"
            },
            {
                "id": "sundar_pichai",
                "name": "Sundar Pichai",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/4/41/Sundar_Pichai_World_Economic_Forum_2020.jpg",
                "headline": "CEO @ Alphabet & Google",
                "summary": "Leading Google's mission to organize the world's information and make it universally accessible and useful.",
                "experience": "CEO @ Google (2015-Present), Product Lead for Chrome & Android",
                "education": "IIT Kharagpur (Metallurgy), Stanford (MS), Wharton (MBA)",
                "skills": "Product Management, Ecosystem Growth, Search Algorithms, Innovation"
            },
            {
                "id": "jensen_huang",
                "name": "Jensen Huang",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Jensen_Huang_%2853755452292%29_%28cropped%29.jpg",
                "headline": "Founder & CEO @ NVIDIA",
                "summary": "The driving force behind GPU computing and the modern AI era. Reimagining the future of graphics and computation.",
                "experience": "Founder & CEO @ NVIDIA (1993-Present), Designer @ LSI Logic",
                "education": "Oregon State University (EE), Stanford University (EE)",
                "skills": "GPU Architecture, Parallel Computing, AI Infrastructure, Hardware Design"
            },
            {
                "id": "bill_gates",
                "name": "Bill Gates",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Bill_Gates_2017_%28cropped%29.jpg",
                "headline": "Co-Chair @ Bill & Melinda Gates Foundation | Co-Founder Microsoft",
                "summary": "Dedicated to solving global health, education, and climate challenges through philanthropy and innovation.",
                "experience": "Co-Founder @ Microsoft, Co-Chair @ Gates Foundation, Advisor @ Breakthrough Energy",
                "education": "Harvard University (Honorary Degree)",
                "skills": "Philanthropy, software architecture, global health, climate tech"
            },
            {
                "id": "sam_altman",
                "name": "Sam Altman",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/d/de/Sam_Altman_at_the_2024_World_Economic_Forum_%28cropped%29.jpg",
                "headline": "CEO @ OpenAI",
                "summary": "Advancing artificial intelligence to benefit all of humanity. Entrepreneur, investor, and technologist.",
                "experience": "CEO @ OpenAI (2019-Present), President @ Y Combinator (2014-2019)",
                "education": "Stanford University (Computer Science)",
                "skills": "Artificial Intelligence, Venture Capital, Startup Scaling, Strategic Vision"
            }
        ]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        for ceo in ceos:
            cursor.execute("SELECT id FROM profiles WHERE id = ?", (ceo["id"],))
            if not cursor.fetchone():
                print(f"Seeding profile for {ceo['name']}...")
                conn.close() 
                self.build_profile(
                    ceo["id"], 
                    ceo["name"], 
                    ceo["photo"], 
                    ceo["headline"], 
                    ceo["summary"], 
                    ceo["experience"], 
                    ceo["education"], 
                    ceo["skills"]
                )
                conn = sqlite3.connect(self.db_path)
                cursor = conn.cursor()
        
        conn.close()

    def seed_jobs(self):
        """Seeds the database with some sample job listings matching Google Careers style."""
        jobs = [
            (
                "Third Party Data Center Operations Area Manager", 
                "Google", 
                "Singapore; Tokyo, Japan; +1 more", 
                "Managing large scale data center operations.", 
                "Sundar Pichai", 
                "$150k - $220k",
                "Bachelor's degree in a technical field or equivalent practical experience.|10 years of experience managing technical teams...|5 years of experience in a data center or critical facilities environment.",
                "Advanced"
            ),
            (
                "Cloud Security Product Data Scientist", 
                "Google", 
                "New York, NY, USA", 
                "Using analytics to solve product or business problems.", 
                "Sundar Pichai", 
                "$140k - $190k",
                "Bachelor's degree in Statistics, Mathematics, Data Science, Engineering, Physics, Economics...|8 years of work experience using analytics to solve product or business problems.",
                "Mid"
            ),
            (
                "Group Product Manager, Google Beam", 
                "Google", 
                "Mountain View, CA, USA; Seattle, WA, USA; +1 more", 
                "Leading product management for next-gen beam tech.", 
                "Sundar Pichai", 
                "$200k - $300k",
                "Bachelor's degree or equivalent practical experience.|Experience in product management or related technical field.",
                "Advanced"
            ),
            ("Senior AI Research Scientist", "OpenAI", "San Francisco, CA, USA", "Leading research on large language models.", "Elon Musk", "$250k - $500k", "PhD in CS or similar experience.|Proven track record in LLM research.", "Advanced"),
            ("Software Engineer, Full Stack", "Tesla", "Austin, TX, USA", "Working on manufacturing software.", "Elon Musk", "$120k - $180k", "Bachelor's in CS.|3+ years experience in React/Python.", "Early"),
            ("Director of Engineering", "Microsoft", "Redmond, WA, USA", "Leading large scale engineering teams.", "Satya Nadella", "$300k - $450k", "15+ years engineering experience.|Experience leading 100+ person teams.", "Director+"),
            ("MLOps Engineer", "NVIDIA", "Santa Clara, CA, USA", "Optimizing AI pipelines.", "Jensen Huang", "$180k - $250k", "Strong background in CUDA.|Experience with Kubernetes.", "Mid")
        ]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM jobs")
        if cursor.fetchone()[0] == 0:
            cursor.executemany('''
                INSERT INTO jobs (title, company, location, description, posted_by, salary_range, qualifications, level)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', jobs)
            conn.commit()
        conn.close()

    def search_jobs(self, query, filters=None):
        """Search for job listings in the database with optional filters."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        base_query = "SELECT title, company, location, description, posted_by, salary_range, qualifications, level FROM jobs WHERE (title LIKE ? OR company LIKE ? OR description LIKE ?)"
        params = [f"%{query}%", f"%{query}%", f"%{query}%"]
        
        if filters:
            # Add Location filters
            if filters.get('Locations') and len(filters['Locations']) > 0:
                loc_conditions = []
                for loc in filters['Locations']:
                    loc_conditions.append("location LIKE ?")
                    params.append(f"%{loc}%")
                base_query += f" AND ({' OR '.join(loc_conditions)})"
            
            # Add Experience (Level) filters
            if filters.get('Experience') and len(filters['Experience']) > 0:
                lvl_conditions = []
                for lvl in filters['Experience']:
                    lvl_conditions.append("level LIKE ?")
                    params.append(f"%{lvl}%")
                base_query += f" AND ({' OR '.join(lvl_conditions)})"
            
            # Add Organization filters
            if filters.get('Organizations') and len(filters['Organizations']) > 0:
                org_conditions = []
                for org in filters['Organizations']:
                    org_conditions.append("company LIKE ?")
                    params.append(f"%{org}%")
                base_query += f" AND ({' OR '.join(org_conditions)})"
            
        cursor.execute(base_query, params)
        rows = cursor.fetchall()
        conn.close()
        
        return [
            {
                "title": r[0],
                "company": r[1],
                "location": r[2],
                "description": r[3],
                "posted_by": r[4],
                "salary_range": r[5],
                "qualifications": r[6],
                "level": r[7]
            } for r in rows
        ]
    def post_job(self, title, company, location, description, posted_by, salary_range, qualifications=None, level=None):
        """Adds a new job listing to the database."""
        print(f"--- Posting job: {title} at {company} by {posted_by} ---")
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO jobs (title, company, location, description, posted_by, salary_range, qualifications, level)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (title, company, location, description, posted_by, salary_range, qualifications, level))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"Error posting job: {e}")
            return False
    def build_profile(self, user_id, name, photo_url, headline, summary, experience, education, skills):
        """
        Saves a professional LinkedIn-style profile directly with real data.
        Generates a Markdown summary for display.
        """
        print(f"--- Creating profile for {name} ({user_id}) ---")
        
        # Construct the JSON manually
        profile_data = {
            "name": name,
            "headline": headline,
            "summary": summary,
            "experience": experience,
            "education": education,
            "skills": skills
        }
        json_part = json.dumps(profile_data)

        # Generate a beautiful Markdown summary using AI (but based strictly on provided data)
        prompt = f"""
        Format this real professional data into a beautiful LinkedIn Markdown profile.
        DO NOT add or invent any information. Use ONLY the data provided.
        
        Name: {name}
        Headline: {headline}
        Summary: {summary}
        Experience: {experience}
        Education: {education}
        Skills: {skills}
        
        Use bold headers, bullet points, and professional formatting.
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a professional profile formatter. You only format given data, never invent it."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1 # Low temperature to prevent hallucination
            )
            markdown_part = response.choices[0].message.content.strip()

            # Save to Database
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT OR REPLACE INTO profiles 
                (id, name, headline, summary, experience, education, skills, photo_url, profile_json, profile_markdown)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (user_id, name, headline, summary, experience, education, skills, photo_url, json_part, markdown_part))
            conn.commit()
            conn.close()

            return {
                "name": name,
                "photo_url": photo_url,
                "markdown": markdown_part
            }
        except Exception as e:
            print(f"Error generating profile: {e}")
            return None

    def get_profile(self, user_id):
        """
        Retrieves a stored profile from the database.
        """
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name, photo_url, profile_json, profile_markdown FROM profiles WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return {
                "name": row[0],
                "photo_url": row[1],
                "json": json.loads(row[2]),
                "markdown": row[3]
            }
        return None

    def send_inmail(self, sender, recipient, context):
        """
        Generates a personalized InMail message and creates a connection edge.
        """
        print(f"--- Sending InMail from {sender} to {recipient} ---")
        prompt = f"""
        Write a personalized LinkedIn InMail from {sender} to {recipient}.
        Reference this context: {context}. 
        Keep it professional and concise (under 100 words).
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}]
            )
            message = response.choices[0].message.content
            
            # Save to Graph (In-Memory)
            self.network.add_edge(sender, recipient, message=message)
            
            # Save to Database (Persistent)
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO messages (sender, recipient, message)
                VALUES (?, ?, ?)
            ''', (sender, recipient, message))
            conn.commit()
            conn.close()
            
            return message
        except Exception as e:
            print(f"Error sending InMail: {e}")
            return None

    def connect(self, sender, recipient):
        """
        Creates a connection between two profiles without a custom message.
        """
        print(f"--- Connecting {sender} to {recipient} ---")
        try:
            message = f"SYSTEM_CONN: {sender} established a neural link with {recipient}."
            
            # Save to Graph
            self.network.add_edge(sender, recipient, type="connection")
            
            # Save to Database
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO messages (sender, recipient, message)
                VALUES (?, ?, ?)
            ''', (sender, recipient, message))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"Error connecting: {e}")
            return False

    def save_item(self, user_id, item_id, item_type, item_data):
        """Saves an item (job or profile) to the user's vault."""
        print(f"--- Saving {item_type} for {user_id} ---")
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO saved_items (user_id, item_id, item_type, item_data)
                VALUES (?, ?, ?, ?)
            ''', (user_id, item_id, item_type, json.dumps(item_data)))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"Error saving item: {e}")
            return False

    def get_vault(self, user_id):
        """Retrieves all saved items for a user."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT item_type, item_data FROM saved_items WHERE user_id = ?", (user_id,))
        rows = cursor.fetchall()
        
        # Also get user's own synthesized profiles
        cursor.execute("SELECT name, photo_url, profile_markdown FROM profiles WHERE id = ?", (user_id,))
        own_profile = cursor.fetchone()
        conn.close()
        
        vault = {
            "saved_jobs": [],
            "saved_profiles": [],
            "saved_content": [],
            "own_profile": None
        }
        
        if own_profile:
            vault["own_profile"] = {
                "name": own_profile[0],
                "photo_url": own_profile[1],
                "markdown": own_profile[2]
            }
            
        for row in rows:
            item_type = row[0]
            item_data = json.loads(row[1])
            if item_type == "job":
                vault["saved_jobs"].append(item_data)
            elif item_type == "profile":
                vault["saved_profiles"].append(item_data)
            elif item_type == "content":
                vault["saved_content"].append(item_data)
        return vault

    def advanced_search(self, query, filters):
        """
        Simulates an advanced search by checking the local database and asking Groq to synthesis 
        professional intelligence for famous personalities or mock professionals.
        """
        print(f"--- Searching for: {query} with filters: {filters} ---")
        
        results = {"items": []}
        
        # 1. Search Local Database
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("""
            SELECT name, headline, summary, experience, education, skills, photo_url, profile_markdown 
            FROM profiles 
            WHERE name LIKE ? OR headline LIKE ? OR skills LIKE ?
        """, (f"%{query}%", f"%{query}%", f"%{query}%"))
        db_profiles = cursor.fetchall()
        conn.close()
        
        for name, headline, summary, experience, education, skills, photo, p_markdown in db_profiles:
            results["items"].append({
                "name": name,
                "headline": headline,
                "summary": summary,
                "experience": experience,
                "education": education,
                "skills": skills,
                "photo_url": photo,
                "markdown": p_markdown,
                "source": "local"
            })

        # 2. Strategic Intelligence Synthesis (Famous Personalities or Market Mockups)
        prompt = f"""
        Search your internal knowledge (Internet Synthesis) for personalities matching: '{query}'.
        If '{query}' is a famous personality, provide a comprehensive LinkedIn-style professional profile.
        If not, suggest 3-5 mock professionals.
        
        Output MUST be a JSON object with a key "items" containing a list of profiles.
        Each profile MUST have:
        - name: Full Name
        - headline: Current significant role or legacy
        - summary: An EXHAUSTIVE, multi-paragraph professional narrative (at least 200 words) including their global impact and core philosophy.
        - experience: A comprehensive, multi-paragraph chronological dossier of major roles, companies, and specific landmark achievements.
        - education: Degrees, institutions, and notable academic honors.
        - skills: A dense matrix of technical, leadership, and strategic expertise.
        - photo_url: A high-quality public image URL if famous (prefer official Wikimedia Commons links), else 'https://ui-avatars.com/api/?name=' + encodedName
        - markdown: A beautiful, ultra-detailed professional dossier of at least 1000 words. Use # for Title, ## for sections, and ### for specific career stages. Include exhaustive bullet points for achievements, key projects, leadership style, and industry contributions.
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a professional profile synthesizer with access to global networking intelligence. Output valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            ai_data = json.loads(response.choices[0].message.content)
            
            if "items" in ai_data:
                existing_names = [item["name"].lower() for item in results["items"]]
                for item in ai_data["items"]:
                    if item["name"].lower() not in existing_names:
                        item["source"] = "neural_search"
                        # Ensure photo_url is somewhat valid
                        if not item.get("photo_url") or "ui-avatars" not in item.get("photo_url"):
                            if "photo_url" not in item:
                                item["photo_url"] = f"https://ui-avatars.com/api/?name={item['name'].replace(' ', '+')}&background=random"
                        results["items"].append(item)
            
            return results
        except Exception as e:
            print(f"Error in neural search: {e}")
            return results  # Return whatever we have (even if empty) instead of None
    def get_search_suggestions(self, query):
        """Returns name, photo, and headline for autocomplete suggestions, enriched with AI if local results are few."""
        if not query or len(query) < 1:
            return []
            
        # 1. Local Database Lookup
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name, photo_url, headline, id FROM profiles WHERE name LIKE ? LIMIT 5", (f"%{query}%",))
        rows = cursor.fetchall()
        conn.close()
        
        suggestions = [{"name": r[0], "photo_url": r[1], "headline": r[2], "id": r[3], "source": "local"} for r in rows]
        
        # 2. Add AI-driven personality anticipation if results are low
        if len(suggestions) < 3:
            prompt = f"Anticipate the full name of a famous professional or personality starting with or matching '{query}'. Suggest 3 names with their current likely headline. Output as JSON list with 'name' and 'headline'."
            try:
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": "You are a professional directory assistant. Output JSON only."},
                        {"role": "user", "content": prompt}
                    ],
                    response_format={"type": "json_object"}
                )
                ai_suggestions = json.loads(response.choices[0].message.content)
                if "items" in ai_suggestions:
                    for item in ai_suggestions["items"]:
                        if not any(s["name"].lower() == item["name"].lower() for s in suggestions):
                            item["photo_url"] = f"https://ui-avatars.com/api/?name={item['name'].replace(' ', '+')}&background=random"
                            item["id"] = "ai_" + item["name"].replace(" ", "_")
                            item["source"] = "ai"
                            suggestions.append(item)
            except:
                pass
                
        return suggestions[:5]
    def sync_geo(self, location):
        """
        Retrieves extensive details about a place and generates neural intelligence reports.
        """
        print(f"--- Synchronizing Geo-Location: {location} ---")
        prompt = f"""
        Provide a comprehensive professional and technical intelligence report about '{location}'. 
        Include:
        1. Key industries and major tech hubs.
        2. Economic significance and infrastructure.
        3. Professional networking opportunities and major companies headquartered there.
        4. Notable landmarks and cultural professional atmosphere.
        5. Future growth prospects for tech workers.

        Also, provide its approximate latitude and longitude coordinates.
        Output MUST be in valid JSON format:
        {{
            "location": "{location}",
            "summary": "1 sentence brief summary",
            "report": "A detailed multi-paragraph report formatted in Markdown (using # for headers, bullet points, etc.)",
            "lat": float,
            "lon": float
        }}
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a geospatial neural intelligence agent. Output valid JSON only. Provide deep, professional insights."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            raw_content = response.choices[0].message.content
            data = json.loads(raw_content)
            
            # Handle cases where the model might wrap the object in a list
            if isinstance(data, list):
                data = data[0]
                
            data["type"] = "geo"
            return data
        except Exception as e:
            print(f"Error in geo sync: {e}")
            if 'raw_content' in locals():
                print(f"Raw response was: {raw_content}")
            return None

    def generate_content(self, content_type, topic, length=None):
        """
        Generates LinkedIn content like posts, polls, newsletters, blogs, or event descriptions.
        """
        print(f"--- Generating {content_type} about {topic} ---")
        blog_length_map = {
            "short": "approx 300 words",
            "medium": "approx 600 words",
            "long": "approx 1000 words"
        }
        actual_length = blog_length_map.get(length, "approx 500 words")

        prompts = {
            "post": f"Write an engaging LinkedIn post about {topic}. Include relevant hashtags.",
            "poll": f"Create a LinkedIn poll about {topic} with 4 options to drive engagement.",
            "newsletter": f"Draft the introductory edition of a professional newsletter on {topic}.",
            "event": f"Provide a title, description, and agenda for a virtual LinkedIn event on {topic}.",
            "blog": f"Write a detailed, professional blog post titled '{topic}'. The length should be {actual_length}. Use Markdown for formatting with clear headings and a concluding summary."
        }
        
        target_prompt = prompts.get(content_type, prompts["post"])
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": target_prompt}]
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Error generating content: {e}")
            return None

    def generate_synthetic_job(self, title_hint):
        """
        Generates realistic synthetic job data based on a title hint.
        """
        print(f"--- Generating Synthetic Job: {title_hint} ---")
        prompt = f"""
        Generate realistic professional job details for a position related to '{title_hint}'.
        Output MUST be in valid JSON format:
        {{
            "title": "Full job title",
            "company": "Fictional but realistic tech company name",
            "location": "Realistic tech hub city",
            "salary_range": "Realistic salary range (e.g. $120k - $180k)",
            "description": "Comprehensive 3-4 sentence role description"
        }}
        """
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a corporate recruitment AI. Output valid JSON only."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            data = json.loads(response.choices[0].message.content)
            return data
        except Exception as e:
            print(f"Error generating synthetic job: {e}")
            return None

if __name__ == "__main__":
    # Quick test for Profile Tools
    try:
        app = LinkedInClone()
        user_input = "Software engineer with 5 years in Python, seeking AI roles."
        profile = app.build_profile("alice_smith", user_input)
        if profile:
            print(json.dumps(profile, indent=2))
    except Exception as e:
        print(f"Setup error: {e}")
