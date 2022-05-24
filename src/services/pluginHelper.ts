
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { getLogger as getLoggerByName } from '@vcsuite/logger';

/**
 * @returns {Logger}
 */
function getLogger() {
  return getLoggerByName('plugin-helpers');
}

export const pluginFactorySymbol = Symbol('pluginFactory');

/**
 * @param {VcsUiApp} app
 * @param {string} name
 * @param {PluginConfig} config
 * @param {string} [registry='https://plugins.virtualcitymap.de/']
 * @returns {Promise<VcsPlugin|null>}
 */
export async function loadPlugin(app, name, config, registry = 'https://plugins.virtualcitymap.de/') {
  const module = config.entry;
  // const pl = await import('../../plugins/@vcmap/pluginExample/index.js');
  // console.log(pl);
  try {
    let plugin;
    if (window.VcsPluginLoaderFunction) { // TODO PluginLoaderfunction needs to be documented.
      plugin = await window.VcsPluginLoaderFunction(name, module);
    } else {
      const test = "../../" + module;
      console.log(test === "../../plugins/@vcmap/pluginExample/index.js")
      plugin = await import("../../plugins/@vcmap/pluginExample/index.js");
      console.log(plugin)
    }
    if (plugin.default == null || typeof plugin.default !== 'function') {
      getLogger().error(`plugin ${name} does not provide a default exported function`);
      return null;
    }

    const pluginInstance = await plugin.default(config);

    if (!pluginInstance.name) {
      getLogger().error(`plugin ${name} does not expose a name`);
      if (pluginInstance.destroy) {
        pluginInstance.destroy();
      }
      return null;
    }
    pluginInstance[pluginFactorySymbol] = plugin.default;
    console.log("pluginInstance", pluginInstance)
    return pluginInstance;
  } catch (err) {
    getLogger().error(`failed to load plugin ${name}`);
    getLogger().error(err);
  }
  return null;
}