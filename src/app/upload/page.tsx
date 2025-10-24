import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
    return (
        <main className="container mx-auto p-4 md:p-8 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Upload a new video</CardTitle>
                    <CardDescription>Fill out the details below to publish your video.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="video-file">Video File</Label>
                             <div className="flex items-center justify-center w-full">
                                <label htmlFor="video-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">MP4, MOV, or WEBM (MAX. 2GB)</p>
                                    </div>
                                    <Input id="video-file" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="e.g., My Awesome Cat Video" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Tell viewers about your video" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input id="tags" placeholder="cat, funny, fail (comma-separated)" />
                            <p className="text-xs text-muted-foreground">
                                Tags can help viewers find your video.
                            </p>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">Publish Video</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}
