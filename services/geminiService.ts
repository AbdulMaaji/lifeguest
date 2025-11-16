import { GoogleGenAI, Type } from "@google/genai";
import { Quest, QuestApiResponse, UserInput } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const questSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "A short, catchy title (2-4 words)." },
    category: { type: Type.STRING, description: "Category: Fitness, Learning, Social, Kindness, Productivity, Wellness, Creativity, or Random." },
    difficulty: { type: Type.STRING, description: "Difficulty: Easy, Medium, or Hard." },
    time_minutes: { type: Type.INTEGER, description: "Estimated time in minutes to complete." },
    quest: { type: Type.STRING, description: "The quest description (1-2 sentences)." },
    proof: { type: Type.STRING, description: "Proof needed: photo, audio, or text." },
    reward: {
      type: Type.OBJECT,
      properties: {
        xp: { type: Type.INTEGER, description: "Experience points awarded." },
        badge: { type: Type.STRING, description: "A fun, creative reward description or badge name." },
      },
      required: ["xp", "badge"],
    },
  },
  required: ["title", "category", "difficulty", "time_minutes", "quest", "proof", "reward"],
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    quests: {
      type: Type.ARRAY,
      items: questSchema,
      description: "An array of exactly 3 personalized quests.",
    },
    daily_message: {
      type: Type.STRING,
      description: "A motivational one-sentence message for the user.",
    },
  },
  required: ["quests", "daily_message"],
};

const constructPrompt = (userInput: UserInput): string => {
    const goalsStatement = userInput.goals.length > 0 
      ? `Their goals are: ${userInput.goals.join(', ')}.`
      : "They have not specified any goals, so create three surprising and varied quests. Make one of them a 'WOW' quest that is particularly creative or unexpected.";

    return `
You are LifeQuests AI, an agent that creates highly engaging, fun, psychology-backed real-world quests for users. 
Your goal is to design *3 personalized quests per day* that follow the Trigger → Action → Reward loop, and feel meaningful, surprising, and achievable.

User's current state:
- Energy Level: ${userInput.energy}
- Mood: ${userInput.mood}
- ${goalsStatement}

Follow these rules strictly:

1. QUEST STRUCTURE:
Each quest must include: Title, Category, Difficulty, Estimated Time, The Quest, Proof Needed, and Reward (XP + badge).

2. PSYCHOLOGY REQUIREMENTS:
- Use micro-actions (small steps) to reduce friction.
- Use dopamine triggers: novelty, surprise, fun wording.
- Give instant emotional reward through positive language.
- Avoid boring tasks or lectures — keep things playful.

3. QUEST DESIGN RULES:
- Never repeat quests.
- Adapt to the user’s time, energy, goals, and mood.
- Quests must be real-world actions. Easy/Medium quests should be under 10 minutes.
- If no goals are provided, ensure one quest is a creative/unexpected "WOW" quest.

4. SAFETY:
Do NOT suggest unsafe, illegal, dangerous, or harmful actions.

5. OUTPUT FORMAT:
Return ONLY JSON matching the provided schema.
`;
}


export const generateQuests = async (userInput: UserInput): Promise<QuestApiResponse> => {
  try {
    const prompt = constructPrompt(userInput);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      }
    });
    
    const jsonText = response.text.trim();
    const data: QuestApiResponse = JSON.parse(jsonText);

    // Basic validation
    if (!data.quests || !Array.isArray(data.quests) || data.quests.length === 0) {
      throw new Error("Invalid response format from AI: 'quests' array is missing or empty.");
    }

    return data;
  } catch (error) {
    console.error("Error generating quests:", error);
    if (error instanceof Error && error.message.includes("429")) {
        throw new Error("The request was blocked. This may be due to rate limiting. Please try again later.");
    }
    throw new Error("Failed to generate quests from the AI service.");
  }
};


export const generateQuestDetails = async (quest: Quest): Promise<string> => {
    const prompt = `
You are a helpful psychology and productivity coach. 
For the following quest, provide a brief, easy-to-understand explanation of the psychological principle it uses, and one actionable "Pro Tip" for completing it.

**Quest Title:** "${quest.title}"
**Quest Description:** "${quest.quest}"

**Format your response like this:**
**The Why:** [Explain the psychological principle here in 1-2 sentences.]
**Pro Tip:** [Provide a helpful tip here in 1 sentence.]

Make the tone encouraging and positive. Do not add any extra text or greetings.
`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating quest details:", error);
        throw new Error("Failed to get details from the AI service.");
    }
};
