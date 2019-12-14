import FileChooser from "./views/FileChooser"
import PreProcessMenu from "./views/PreProcessMenu"
import FilteringMenu from "./views/FilteringMenu"
import MorphologicalMenu from "./views/MorphologicalMenu"
import SegmentationMenu from "./views/SegmentationMenu"

const routes = [
        { path: "/", component: FileChooser, name: "file-chooser" },
        { path: "/preprocessMenu", component: PreProcessMenu, name: "pre-process-menu" },
        { path: "/filteringMenu", component: FilteringMenu, name: "filtering-menu" },
        { path: "/morphologicalMenu", component: MorphologicalMenu, name: "morphological-menu" },
        { path: "/segmentationMenu", component: SegmentationMenu, name: "segmentation-menu" }
]

export default routes;