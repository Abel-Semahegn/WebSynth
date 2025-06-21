import { Button } from "@/components/ui/button"
import Thumbnail from "@/Thumbnail.png"
export default function App() {
  return (
    <main className='w-full min-h-screen p-10 flex flex-col items-center justify-center'>
      <div className="max-w-4xl flex flex-row gap-4 h-full">
        <img
          src={Thumbnail}
          alt="Web Synth Logo"
          className="w-2/3  md:visible invisible"
        />
        <div className="w-full flex flex-col  justify-center">

          <div className="md:text-6xl text-lg font-bold text-green-200">Stupid Simple TTS </div>
          <div className="md:text-6xl text-lg font-bold">for your needs</div>
          <div className="font-thin ">
            If you wanted a simple platform to create a custom tts  you have come to the right place.
            Web Synth Provides you all you need to create your own custom tts in your browser FOR FREE.
          </div>
          <div className="inline-flex gap-2">

            <Button variant="ghost" className="bg-green-200 text-accent ">Start </Button>
            <Button variant="outline" className="bg-green-200  ">Support 🥸</Button>
          </div>
        </div>

      </div>
    </main>
  )
}