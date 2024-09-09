import { createStore } from "zustand/vanilla";

const assetsToLoad = [
  {
    id:'avatar',
    path:'/models/avatar.glb',
    type: 'model' 
  },
  {
    id:'environment',
    path:'/models/Final Scene4/Final Scene4.gltf',
    type: 'model'
  },
  
];

const assetStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addLoadedAsset: (asset, id) =>
    set((state) => ({
      loadedAssets: {
        ...state.loadedAssets,
        [id]: asset,
      },
    })),
}));

export default assetStore;
