import { Video } from "@/lib/types";

type VideoPlayerProps = {
    video: Video;
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
    return (
        <div className="aspect-video w-full bg-black rounded-xl flex items-center justify-center text-white relative overflow-hidden">
            <video
                src={video.videoUrl}
                controls
                className="w-full h-full"
                autoPlay
            />
        </div>
    )
}
