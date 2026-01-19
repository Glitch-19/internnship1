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
        self.seed_ceos()
        self.seed_jobs()

    def _init_db(self):
        """Initializes the SQLite database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS profiles (
                id TEXT PRIMARY KEY,
                name TEXT,
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
                salary_range TEXT
            )
        ''')
        conn.commit()
        conn.close()

    def seed_ceos(self):
        """Seeds the database with well-known CEOs if they don't exist."""
        ceos = [
            {
                "id": "elon_musk",
                "name": "Elon Musk",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
                "input": "CEO of Tesla, SpaceX, and X. Focused on sustainable energy, multi-planetary life, and AI."
            },
            {
                "id": "satya_nadella",
                "name": "Satya Nadella",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/7/78/MS-Project_Oxford-Satya_Nadella1.jpg",
                "input": "CEO of Microsoft. Transformed the company with cloud-first, mobile-first strategy and AI integration."
            },
            {
                "id": "sundar_pichai",
                "name": "Sundar Pichai",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Sundar_Pichai_-_2023_%28cropped%29.jpg",
                "input": "CEO of Alphabet and Google. Leading innovations in search, Android, and AI-first future."
            },
            {
                "id": "jensen_huang",
                "name": "Jensen Huang",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Jensen_Huang_%2853755452292%29_%28cropped%29.jpg",
                "input": "Founder and CEO of NVIDIA. Pioneer in GPU computing and the driving force behind the AI revolution."
            },
            {
                "id": "mark_zuckerberg",
                "name": "Mark Zuckerberg",
                "photo": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Mark_Zuckerberg_at_the_37th_Annual_PaleyMediaCouncil_Full_Frontal_2.jpg",
                "input": "Founder and CEO of Meta. Focused on building the future of social connection and the metaverse."
            }
        ]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        for ceo in ceos:
            cursor.execute("SELECT id FROM profiles WHERE id = ?", (ceo["id"],))
            if not cursor.fetchone():
                print(f"Seeding profile for {ceo['name']}...")
                conn.close() # Close to allow build_profile to open it
                self.build_profile(ceo["id"], ceo["name"], ceo["photo"], ceo["input"])
                conn = sqlite3.connect(self.db_path)
                cursor = conn.cursor()
        
        conn.close()

    def seed_jobs(self):
        """Seeds the database with some sample job listings."""
        jobs = [
            ("AI Research Scientist", "OpenAI", "San Francisco, CA", "Leading research on large language models.", "Elon Musk", "$250k - $500k"),
            ("Senior Software Engineer", "Tesla", "Austin, TX", "Working on Autopilot and full self-driving systems.", "Elon Musk", "$180k - $250k"),
            ("Cloud Architect", "Microsoft", "Seattle, WA", "Designing next-gen Azure infrastructure.", "Satya Nadella", "$200k - $300k"),
            ("Product Manager", "Google", "Mountain View, CA", "Leading Google Search innovation.", "Sundar Pichai", "$190k - $280k"),
            ("GPU Kernel Engineer", "NVIDIA", "Santa Clara, CA", "Optimizing CUDA kernels for AI workloads.", "Jensen Huang", "$220k - $350k")
        ]
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM jobs")
        if cursor.fetchone()[0] == 0:
            cursor.executemany('''
                INSERT INTO jobs (title, company, location, description, posted_by, salary_range)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', jobs)
            conn.commit()
        conn.close()

    def search_jobs(self, query):
        """Search for job listings in the database."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT title, company, location, description, posted_by, salary_range 
            FROM jobs 
            WHERE title LIKE ? OR company LIKE ? OR description LIKE ?
        ''', (f"%{query}%", f"%{query}%", f"%{query}%"))
        rows = cursor.fetchall()
        conn.close()
        
        return [
            {
                "title": r[0],
                "company": r[1],
                "location": r[2],
                "description": r[3],
                "posted_by": r[4],
                "salary_range": r[5]
            } for r in rows
        ]
    def post_job(self, title, company, location, description, posted_by, salary_range):
        """Adds a new job listing to the database."""
        print(f"--- Posting job: {title} at {company} by {posted_by} ---")
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO jobs (title, company, location, description, posted_by, salary_range)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (title, company, location, description, posted_by, salary_range))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"Error posting job: {e}")
            return False
    def build_profile(self, user_id, name, photo_url, user_input):
        """
        Uses Groq to generate a professional LinkedIn-style profile in both JSON and Markdown.
        """
        print(f"--- Generating profile for {name} ({user_id}) ---")
        
        prompt = f"""
        User Name: {name}
        Input Data: {user_input}
        
        Task: Create a professional LinkedIn-style profile.
        
        1. Create a detailed JSON structure including: headline, summary, experience[], education[], and skills[]. (Don't include the photo_url in JSON).
        2. Create a beautiful Markdown summary of this profile. Use bold headers, bullet points, and professional formatting.
        
        Return your response in this EXACT format:
        ---JSON---
        [Your JSON here]
        ---MARKDOWN---
        [Your Markdown here]
        """
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a professional LinkedIn profile architect."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            content = response.choices[0].message.content
            parts = content.split("---MARKDOWN---")
            json_part = parts[0].replace("---JSON---", "").strip()
            markdown_part = parts[1].strip() if len(parts) > 1 else "Failed to generate markdown."

            # Save to Database
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT OR REPLACE INTO profiles (id, name, photo_url, profile_json, profile_markdown)
                VALUES (?, ?, ?, ?, ?)
            ''', (user_id, name, photo_url, json_part, markdown_part))
            conn.commit()
            conn.close()

            return {
                "name": name,
                "photo_url": photo_url,
                "json": json.loads(json_part) if json_part else {},
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

    def advanced_search(self, query, filters):
        """
        Simulates an advanced search by checking the local database and asking Groq to suggest professionals.
        """
        print(f"--- Searching for: {query} with filters: {filters} ---")
        
        results = {"items": []}
        
        # 1. Search Local Database
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        # Search by name (case insensitive)
        cursor.execute("SELECT name, photo_url, profile_json, profile_markdown FROM profiles WHERE name LIKE ?", (f"%{query}%",))
        db_profiles = cursor.fetchall()
        conn.close()
        
        for name, photo, p_json, p_markdown in db_profiles:
            try:
                p_data = json.loads(p_json)
                results["items"].append({
                    "name": name,
                    "headline": p_data.get("headline", "Professional"),
                    "location": p_data.get("location", "Global"),
                    "photo_url": photo,
                    "markdown": p_markdown,
                    "source": "local"
                })
            except:
                continue

        # 2. Get AI results if we need more or as alternative
        prompt = f"List 3-5 mock professionals matching '{query}' with filters: {filters}. Output as a JSON list of objects with 'name', 'headline', and 'location'."
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a recruitment assistant. Output in valid JSON format."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )
            ai_results = json.loads(response.choices[0].message.content)
            if "items" in ai_results:
                # Add AI results, avoid duplicates if they happen to have the same name as local
                existing_names = [item["name"].lower() for item in results["items"]]
                for item in ai_results["items"]:
                    if item["name"].lower() not in existing_names:
                        item["source"] = "ai"
                        results["items"].append(item)
            elif isinstance(ai_results, list):
                # Handle direct list response
                for item in ai_results:
                    item["source"] = "ai"
                    results["items"].append(item)
                    
            return results
        except Exception as e:
            print(f"Error in search: {e}")
            return results if results["items"] else None

    def generate_content(self, content_type, topic):
        """
        Generates LinkedIn content like posts, polls, newsletters, or event descriptions.
        """
        print(f"--- Generating {content_type} about {topic} ---")
        prompts = {
            "post": f"Write an engaging LinkedIn post about {topic}. Include relevant hashtags.",
            "poll": f"Create a LinkedIn poll about {topic} with 4 options to drive engagement.",
            "newsletter": f"Draft the introductory edition of a professional newsletter on {topic}.",
            "event": f"Provide a title, description, and agenda for a virtual LinkedIn event on {topic}."
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
