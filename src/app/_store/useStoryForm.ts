import axios from "axios";
import { create } from "zustand"

interface Prompt {
    name: string;
    jobTitle: string;
    signatureAchievement: string;
    challenge: string;
}

interface Payload {
    email: string;
    prompt: Prompt,
    inputImage: string;
}

interface Portrait {
    taskId: string;
    status: string;
    resultImage: string;
    inputImage: string;
    completedAt: string;
}

interface StoryFormState {
    word: string;
    setWord: (word: string) => void;
    resetWord: () => void;
    payload: Payload;
    setEmail: (email: string) => void;
    setImage: (image: string) => void;
    parseWord: () => {
        text: string;
        prompt: Prompt;
    }

    isCreateLoading: boolean;
    createStoryForm: () => Promise<boolean>;

    portrait: Portrait | null;
    portraitFetchError: string | null;
    fetchPortrait: (taskId: string) => Promise<boolean>;

    portraits: any[] | null;
    fetchPortraits: () => Promise<boolean>;


}

const BASE_API_URL = "https://storyfrom.gokapturehub.com"

const promptKeys: Record<string, keyof Prompt> = {
    "NAME": "name",
    "JOB_TITLE/TEAM": "jobTitle",
    "CHALLENGE/GOAL": "challenge",
    "SIGNATURE_ACHIEVEMENT/IMPACT": "signatureAchievement"
}

const initialWord = "%l=NAME,v=% , a %l=JOB_TITLE/TEAM,v=% star , is known for %l=SIGNATURE_ACHIEVEMENT/IMPACT,v=% at Cisco. Their bold work addressed %l=CHALLENGE/GOAL,v=% , earning praise from %l=TEAM/COMPANY/INDUSTRY_FIGURE,v=% ."

export const useStoryForm = create<StoryFormState>((set, get) => ({
    word: initialWord,
    setWord: (word) => set({ word }),
    resetWord: () => set({ word: initialWord }),
    payload: {
        email: "",
        prompt: {
            name: "",
            jobTitle: "",
            signatureAchievement: "",
            challenge: "",
        },
        inputImage: "",
    },
    setEmail: (email) => set((state) => ({
        payload: {
            ...state.payload,
            email,
        }
    })),

    setImage: (image: string) => set((state) => ({
        payload: {
            ...state.payload,
            inputImage: image,
        }
    })),

    parseWord: () => {
        const word = get().word;
        const prompt = {
            name: "",
            jobTitle: "",
            signatureAchievement: "",
            challenge: ""
        }

        const text = word.split(" ").map(e => {
            if (e.startsWith("%")) {
                const inputVal = e.replaceAll("%", "").split(",")
                const label = inputVal?.[0].replace("l=", "")
                const value = inputVal?.[1].replace("v=", "").replaceAll("_space_", " ");
                let key = promptKeys[label];
                if (key) {
                    prompt[key] = value;
                }
                return value ? value : "N/A";
            }
            return e;
        }).join(" ")

        return { text, prompt }
    },

    isCreateLoading: false,
    createStoryForm: async () => {
        try {
            set({ isCreateLoading: true });
            const payload = get().payload
            const prompt = get().parseWord().prompt;

            const requestPayload: Payload = {
                ...payload,
                prompt,
            }
            console.log("Request Payload:", requestPayload);

            const res = await axios.post(`${BASE_API_URL}/create`, requestPayload);
            console.log("Story form created successfully", res.data);
            return true;
        } catch (error) {
            console.log(error)
            return false;
        } finally {
            set({ isCreateLoading: false });
        }
    },

    portrait: null,
    portraitFetchError: null,
    fetchPortrait: async (taskId) => {
        try {
            const res = await axios.get(`${BASE_API_URL}/image/${taskId}`);
            // console.log("Fetched portrait:", res.data);
            set({ portrait: res.data });
            return true;
        } catch (error) {
            console.error("Error fetching portrait:", error);
            set({ portraitFetchError: "Failed to fetch portrait. Please try again later." });
            return false;
        }
    },
    portraits: null,
    fetchPortraits: async () => {
        try {
            const res = await axios.get(`${BASE_API_URL}/data`);
            set({ portraits: res.data.data });
            return true;
        } catch (error) {
            console.error("Error fetching portraits:", error);
            return false;
        }
    },

}));