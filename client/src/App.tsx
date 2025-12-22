import { Toaster } from "sonner"
import { AppContext } from "./context/AppContext"
import Router from "./routes/route"

const App = () => {
  return (
    <AppContext>
      <Toaster richColors expand={true} closeButton />
      <Router />
    </AppContext>
  )
}

export default App
