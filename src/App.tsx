import { ImageArea } from "./components/ImageArea"
import { PanelControl } from "./components/PanelControl"

function App() {

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <div className="w-[800px] flex flex-col gap-6">
        <ImageArea />
        <PanelControl />
      </div>
    </main>
  )
}

export default App