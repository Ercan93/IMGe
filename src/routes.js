import PreProcess from "./views/PreProcess"
import FileChooser from "./views/FileChooser"
import FilteringMenu from "./views/FilteringMenu"
const routes = [
        { path: "/", component: FileChooser, name: "file-chooser" },
        { path: "/preprocess", component: PreProcess, name: "pre-process" },
        { path: "/filteringMenu", component: FilteringMenu, name: "filtering-menu" }
]

export default routes;