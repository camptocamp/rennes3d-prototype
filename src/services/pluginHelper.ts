
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
  try {
    let plugin;
    if (window.VcsPluginLoaderFunction) { // TODO PluginLoaderfunction needs to be documented.
      plugin = await window.VcsPluginLoaderFunction(name, module);
    } else {
      const modulePath = `../../${module}`;
      plugin = await import(modulePath);
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
    return pluginInstance;
  } catch (err) {
    getLogger().error(`failed to load plugin ${name}`);
    getLogger().error(err);
  }
  return null;
}