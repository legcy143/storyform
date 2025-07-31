import { lazy } from "react";


export const StoryFormPages = {
    landing: lazy(() => import("./landing")),
    paragraphForm: lazy(() => import("./paragraphForm")),
    paragraphView: lazy(() => import("./paragraphView")),
    cameraInstruction: lazy(() => import("./cameraInstruction")),
    disclaimer: lazy(() => import("./disclaimer")),
    camera: lazy(() => import("./camera")),
    informationForm: lazy(() => import("./informationForm")),
    submitted: lazy(() => import("./submitted")),
}

export type StoryFormPageType = keyof typeof StoryFormPages;