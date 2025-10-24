import { Video } from "@/lib/types";
import { PlayCircle } from "lucide-react";

type VideoPlayerProps = {
    video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
    return (
        <div className="aspect-video w-full bg-black rounded-xl flex items-center justify-center text-white relative overflow-hidden">
            {/* In a real app, this would be a <video> tag or a player component like ReactPlayer */}
            <h2 className="z-10 text-2xl font-bold">This is where the video would play.</h2>
            <PlayCircle className="absolute h-24 w-24 text-white/30" />
        </div>
    )
}
