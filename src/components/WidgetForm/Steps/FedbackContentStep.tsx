import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import CloseButton from "../../CloseButton";
import ScreenshotButton from "../ScreenShotButton";


interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export default function FeedbackContentStep({feedbackType,
    onFeedbackRestartRequested, onFeedbackSent}: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState <string |null>(null); //Sabe quando o print foi tirado
    const [comment, setComment] = useState(""); // Quando é digitado qualquer coisa na textarea o valor desse estado é atualizado

    const feedbackTypeInfo = feedbackTypes[feedbackType];
        
       function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();

                console.log({
                    screenshot,
                    comment,
                })
                onFeedbackSent()
            }

    return (
        <>
        <header>
            <button type="button" className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
             onClick={onFeedbackRestartRequested}
            >
                <ArrowLeft weight="bold" className="w-4 h-4"/>
            </button>
        <span className="flex items-center gap-2 text-xl leading-6">
            <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
            {feedbackTypeInfo.title}
        </span>
         <CloseButton/>
        </header>
        <form onSubmit={(handleSubmitFeedback)} className="w-full my-4">
            <textarea
            className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent  rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
            placeholder="Conte com detalhes o que esta acontecendo..."
            onChange={event => setComment(event.target.value)} // Me traz o texto da textarea
            />
            <footer className="flex gap-2 mt-2">
               <ScreenshotButton
                screenshot={screenshot}
                onScreenshotTook ={setScreenshot}
               />
                <button
                type="submit"
                disabled={!comment}
                className="flex items-center justify-center flex-1 p-2 text-sm border-transparent rounded-md bg-brand-500 hover:bg-brand-300 focus-outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offfset-zinc-900 focus:ring-brand-500 transittion-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                >
                    Enviar Feedback  
                </button>
            </footer>
        </form>
        </>
    )
} 