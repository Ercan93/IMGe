import PreProcess from "./views/PreProcess"
import FileChooser from "./views/FileChooser"
const routes = [
        { path: "/", component: FileChooser, name: "file-chooser" },
        { path: "/preprocess", component: PreProcess, name: "pre-process" }
]

export default routes;