import { NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST(req) {

    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });
    
    try {
        const data = await req.text();
        const {subject, number, topics} = JSON.parse(data);
       
        const systemPrompt = `
        1. Present the question on the front of the flashcard with the answer hidden until the user chooses to reveal it.
        2. Allow the user time to attempt to recall the answer before revealing it.
        3. Upon the user's request, reveal the answer on the back of the flashcard.
        4. Provide options for the user to mark whether they answered correctly or incorrectly.
        5. Record the user's response (correct/incorrect) for each flashcard and update their progress, tracking which flashcards need more review.
        6. In each study session, present a mix of new flashcards and those previously marked incorrect, adjusting the frequency based on user performance.
        7. At the end of each session, provide a summary of the user's performance, highlighting areas of strength and those needing improvement.
        8. Track and display the user's progress over multiple sessions, showing trends and improvements.
        9. Only generate ${number} flashcards.
        
        Remember the goal of flashcards is to facilitate effective learning and retention of information through these flashcards.
        
        Return in the following JSON format without any additional information:
        {
            "flashcards" :[
            {
                "front" : str,
                "back" : str    
            }
            ]
        }
        `;
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: "Generate flashcards for a " + subject + " course with " + number + " flashcards on the topics: " + topics}
            ],
            model: "meta-llama/llama-3.1-8b-instruct:free",
            response_format: {type: 'json_object'}
        })
        const startIndex = completion.choices[0].message.content.indexOf('{');
        const endIndex = completion.choices[0].message.content.lastIndexOf('}');
        console.log(completion.choices[0].message.content.slice(startIndex, endIndex + 1));
        const flashcards = JSON.parse(completion.choices[0].message.content.substring(startIndex, endIndex + 1));
        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error("Error generating flashcards:", error);
        return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
    }
}
