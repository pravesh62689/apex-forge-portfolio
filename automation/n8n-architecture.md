# n8n AUTOMATION WORKFLOW: LEAD ENGINE

**Core Philosophy:** 100% Free Stack (n8n self-hosted or local desktop app + Google Sheets + Gmail Node). No expensive APIs.

## Workflow 1: Google Maps Extraction -> Google Sheets
1. **Trigger:** Manual or Cron Schedule (e.g., Every Monday at 9 AM).
2. **HTTP Request Node:** Ping Google Maps/Places API (or use SerpAPI free tier / Outscraper free exports) for query: "Gyms in Noida without website".
3. **Item Lists Node:** Split the JSON response into individual business items.
4. **Filter Node:** 
   - Rule: `website` exists? == `false`
   - Rule: `rating` >= `3.5`
5. **Set Node:** Map data to schema (Name, Phone, Rating, Address).
6. **Google Sheets Node:** Append row to "Master Leads" sheet.

## Workflow 2: Automated Email Outreach (For leads with Emails)
1. **Trigger:** Google Sheets Node (On Row Added).
2. **Filter Node:** Does `Email` exist?
3. **AI Agent Node (Gemini/OpenAI):** 
   - Prompt: "Write a 3-sentence casual email to {Business Name} in {Area}. Mention their {Rating} star rating on Google. Tell them a simple one-page website can increase their walk-ins. Sign off as Pravesh."
4. **Gmail Node:** Send Email.
5. **Google Sheets Node:** Update "Outreach Status" to `EMAILED`.
