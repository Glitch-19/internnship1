from linkedin_clone import LinkedInClone
import json

def run_demo():
    print("Initializing LinkedIn Prototype with Groq API...")
    try:
        app = LinkedInClone()
    except ValueError as e:
        print(f"Configuration Error: {e}")
        return

    # 1. Profile Tools
    print("\n--- STEP 1: Building Profile ---")
    user_input = "Software engineer with 5 years in Python, seeking AI roles."
    profile = app.build_profile("alice_dev", user_input)
    if profile:
        print("Profile Generated Successfully:")
        print(json.dumps(profile, indent=2))

    # 2. Networking Features
    print("\n--- STEP 2: Networking (InMail) ---")
    inmail = app.send_inmail("Alice Smith", "Bob Johnson", "shared interest in AI startups")
    if inmail:
        print(f"Generated InMail:\n{inmail}")

    # 3. Search Simulation
    print("\n--- STEP 3: Advanced Search ---")
    results = app.advanced_search("Machine Learning Engineer", "Location: San Francisco")
    if results:
        print("Search Results:")
        print(json.dumps(results, indent=2))

    # 4. Content and Engagement
    print("\n--- STEP 4: Content Generation ---")
    post = app.generate_content("post", "The future of Generative AI in 2026")
    if post:
        print(f"LinkedIn Post Draft:\n{post}")

    poll = app.generate_content("poll", "Which AI framework is most productive?")
    if poll:
        print(f"\nLinkedIn Poll Draft:\n{poll}")

    print("\n--- Demo Completed ---")

if __name__ == "__main__":
    run_demo()
