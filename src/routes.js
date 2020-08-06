import FileChooser from "./views/FileChooser";
import PreProcessMenu from "./views/PreProcessMenu";
import FilteringMenu from "./views/FilteringMenu";
import MorphologicalMenu from "./views/MorphologicalMenu";
import SegmentationMenu from "./views/SegmentationMenu";
import Features from "./views/Features";
import About from "./views/About";

const routes = [
  { path: "/", component: FileChooser, name: "file-chooser" },
  {
    path: "/preprocessMenu",
    component: PreProcessMenu,
    name: "pre-process-menu"
  },
  { path: "/filteringMenu", component: FilteringMenu, name: "filtering-menu" },
  {
    path: "/morphologicalMenu",
    component: MorphologicalMenu,
    name: "morphological-menu"
  },
  {
    path: "/segmentationMenu",
    component: SegmentationMenu,
    name: "segmentation-menu"
  },
  { path: "/features", component: Features, name: "features" },
  { path: "/about", component: About, name: "about" }
];

export default routes;
