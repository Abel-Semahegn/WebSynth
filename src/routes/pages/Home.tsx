import { Button } from "@/components/ui/button"
import Thumbnail from "@/Thumbnail.png"
import { Link } from "react-router"
export default function App() {
  return (
    <main className='w-full min-h-screen p-10 flex flex-col items-center justify-center'>
      <div className="w-full md:max-w-4xl flex flex-row gap-4 h-full items-center justify-center">
        <img
          src={Thumbnail}
          alt="Web Synth Logo"
          className="md:w-2/3 w-0  md:visible invisible"
        />
        <div className="w-full flex flex-col md:items-start  items-center justify-center">

          <div className="md:text-6xl text-3xl font-bold text-green-200">Stupid Simple TTS </div>
          <div className="md:text-6xl text-3xl font-bold">for your needs</div>
          <div className="font-thin ">
            If you wanted a simple platform to create a custom tts  you have come to the right place.
            Web Synth Provides you all you need to create your own custom tts in your browser FOR FREE.
          </div>
          <div className="inline-flex gap-2">
            <Link to="/Dashboard" className="text-accent -">
              <Button variant="ghost" className="bg-green-200 text-accent ">Start </Button>
            </Link>
            <Link to="https://archiveneet.org" className="">

              <Button variant="outline" className=" ">Support 🥸</Button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}