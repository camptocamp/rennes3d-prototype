// import { Component } from 'vue';
// import { loadPlugin } from './pluginHelper';

// declare type PluginConfig = {
//   name: string,
//   entry: string
// }

// export default async function(config: PluginConfig[]): Promise<Component[]|undefined> {
//   const plugins: Component[] = [];

//   config.forEach( async (p) => {
//     const plugin = await loadPlugin(p);
//     if(plugin) {
//       plugins.push(plugin);
//     }
//   })

//   return plugins;
// }


// const _load = async (pluginConfig: PluginConfig): Promise<Component|undefined> => {
//   try {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     const plugin = await import('../vcmPlugins/city-search/src/index.js');

//     if(!plugin.default || typeof plugin.default !== 'function') {
//       console.error(`Cannot import ${pluginConfig.name}, plugin must export default function`);
//       return;
//     }

//     const pluginInstance = await plugin.default({});

//     if(pluginInstance.initialize && typeof pluginInstance.initialize === 'function') {
//       pluginInstance.initialize(window.rennesApp);
//     }

//     if (!pluginInstance.name) {
//       console.error(`plugin ${pluginConfig.name} does not expose a name`);
//       if (pluginInstance.destroy) {
//         pluginInstance.destroy();
//       }
//       return;
//     }

//     window.rennesApp.addPlugin(pluginInstance);
//     return pluginInstance;
//   }
//   catch(err) {
//     console.error(`failed to load plugin ${pluginConfig.name}`);
//     console.error(err);
//   }
// }