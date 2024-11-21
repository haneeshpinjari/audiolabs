import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function AudioLabs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const textToSpeech = (text, voice) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      }, 1500);
    });
  };

  const handleGenerate = async (text, voice) => {
    if (!text) return alert("Please enter some text");
    setIsGenerating(true);
    try {
      const url = await textToSpeech(text, voice);
      setAudioUrl(url);
      setShowPlayer(true);
    } catch (error) {
      alert("Error generating audio. Please try again.");
    }
    setIsGenerating(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = "audio.mp3";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
      <header className="py-4 px-6 bg-white/25 backdrop-blur-lg border border-white/20">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="text-2xl font-bold">
            <span className="text-indigo-600">AudioLabs</span>
            <span className="text-gray-600">.ai</span>
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setModalType("Login");
                setIsModalOpen(true);
              }}
              variant="default"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                setModalType("Sign Up");
                setIsModalOpen(true);
              }}
              variant="outline"
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/25 backdrop-blur-lg rounded-xl p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4">Create Your Audio</h2>
          <Textarea
            id="textInput"
            className="mb-4"
            placeholder="Enter your text here..."
            rows={4}
          />
          
          <div className="flex flex-wrap gap-4">
            <Select defaultValue="female1">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female1">Female Voice 1</SelectItem>
                <SelectItem value="male1">Male Voice 1</SelectItem>
                <SelectItem value="female2">Female Voice 2</SelectItem>
                <SelectItem value="male2">Male Voice 2</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              disabled={isGenerating}
              onClick={() =>
                handleGenerate(
                  document.getElementById("textInput").value,
                  "female1"
                )
              }
            >
              {isGenerating ? "Generating..." : "Generate Audio"}
            </Button>
          </div>
        </div>

        {showPlayer && (
          <div className="bg-white/25 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="wave-animation mb-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="wave-bar"
                  style={{ animationDelay: `-${1.2 - i * 0.1}s` }}
                />
              ))}
            </div>
            <audio controls className="w-full mb-4" src={audioUrl} />
            <div className="flex justify-between">
              <Button
                variant="secondary"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Try Different Voice
              </Button>
              <Button onClick={handleDownload} variant="default">
                Download Audio
              </Button>
            </div>
          </div>
        )}
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalType}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full">
              Continue with Facebook
            </Button>
            <Button variant="outline" className="w-full">
              Continue with LinkedIn
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .wave-animation {
          position: relative;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wave-bar {
          width: 3px;
          height: 20px;
          margin: 0 2px;
          background: #4F46E5;
          animation: wave 1s ease-in-out infinite;
        }
        @keyframes wave {
          0% { height: 20px; }
          50% { height: 40px; }
          100% { height: 20px; }
        }
      `}</style>
    </div>
  );
}