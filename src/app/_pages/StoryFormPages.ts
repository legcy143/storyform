import { lazy } from "react";


export const StoryFormPages = {
    landing: lazy(() => import("./landing")),
    paragraphForm: lazy(() => import("./paragraphForm")),
    paragraphView: lazy(() => import("./paragraphView")),
    cameraInstruction: lazy(() => import("./cameraInstruction")),
    disclaimer: lazy(() => import("./disclaimer")),
    camera: lazy(() => import("./camera")),
    informationForm: lazy(() => import("./informationForm")),
    finish: lazy(() => import("./finish")),
}

export type StoryFormPageType = keyof typeof StoryFormPages;