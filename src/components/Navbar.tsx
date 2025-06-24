import { SidebarTrigger } from "@/components/ui/sidebar"
import { Link } from "react-router"
export default function Nav() {
    return (
        <div className="w-full h-fit flex justify-between ">
            <div className="w-full sticky top-0 z-50 ">
                <SidebarTrigger />
            </div>
            <div className="w-full p-2 inline-flex justify-end gap-x-5 ">
                <Link to="/app/" className="hover:font-bold hover:underline">Home</Link>
                <Link to="/app/LLM" className="hover:font-bold hover:underline">LLM</Link>
                <Link to="/app/DeepFake" className="hover:font-bold hover:underline">DeepFake</Link>
                <Link to="/app/TTS" className="hover:font-bold hover:underline">TTS</Link>
                <Link to="/app/ImageGen" className="hover:font-bold hover:underline">ImageGen</Link>



            </div>
        </div>
    )
}