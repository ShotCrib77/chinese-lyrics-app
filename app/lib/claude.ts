import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY })

export async function getLyricsTranslations(artist: string, song_name: string, lyrics_zh: string) {
    const res = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        system: `You are a Chinese-English translator specializing in song lyrics and pinyin romanization.
            Given a song's artist, name, and Chinese lyrics, return ONLY a JSON object with this exact structure:
            {
            "song_name": string,
            "song_name_pn": string,
            "artist": string,
            "artist_pn": string,
            "lyrics_zh": string,
            "lyrics_pn": string,
            "lyrics_en": string
            }

            Rules:
            - If the input is non-chinese or its chinese characters strung together with no real meaning set all values of the json to empty strings.
            - lyrics_zh: the original Chinese lyrics, unchanged, with line breaks preserved as \\n
            - If the input lyrics contain no line breaks, infer natural line divisions based on rhyme, meter, and phrasing, and insert \n into lyrics_zh accordingly
            - lyrics_pn: pinyin romanization with tone marks, one line per original line, matching lyrics_zh line-for-line
            - lyrics_en: natural, idiomatic English translation, one line per original line, preserving meaning and tone
            - song_name_pn / artist_pn: pinyin romanization of the song name / artist. If the song name or artist is already in English (or contains no Chinese characters), set to an empty string ""
            - Output raw JSON only — no markdown code fences, no commentary, no explanation
        `,
        messages: [
            { role: "user", content: `${song_name} by ${artist}\n\n${lyrics_zh}` },
        ],
    });

    const block = res.content[0];
    if (block.type !== "text") {
        throw new Error(`Expected block type "text", got: ${block.type}`);
    }

    let jsonText = block.text.trim();

    if (jsonText.startsWith("```")) {
        jsonText = jsonText.replace(/^```(?:json)?\n/, "").replace(/\n?```$/, "");
    }

    return jsonText;
}