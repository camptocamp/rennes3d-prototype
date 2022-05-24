// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Collection, contextIdSymbol, makeOverrideCollection, OverrideCollection } from '@vcmap/core';
import { VcsUiApp, createContentTreeCollection, isValidPackageName, serializePlugin, deserializePlugin } from '@vcmap/ui';
import { loadPlugin } from './pluginHelper';
import RennesWindowManager from './WindowManager';


class RennesAppBis extends VcsUiApp {
  constructor() {
    super();

    this._windowManager = new RennesWindowManager();
    this._contentTree = createContentTreeCollection(this);

    this._plugins = makeOverrideCollection(
      new Collection(),
      () => this.dynamicContextId,
      serializePlugin,
      deserializePlugin,
    );
  }

  private _windowManager: RennesWindowManager;
  private _contentTree: any;
  private _plugins: OverrideCollection<unknown>;

  get windowManager() { return this._windowManager; }

  async _parseContext(context: any) {
    const { config } = context;
    if (Array.isArray(config.plugins)) {
      const plugins = await Promise.all(config.plugins.map(async (pluginConfig) => {
        const plugin = await loadPlugin(this, pluginConfig.name, pluginConfig);
        if (!plugin) {
          return null;
        }
        if (!isValidPackageName(plugin.name)) {
          getLogger().warning(`plugin ${plugin.name} has no valid package name!`);
        }
        plugin[contextIdSymbol] = context.id;
        return plugin;
      }));

      plugins
        .filter(p => p)
        .map(p => this._plugins.override(p))
        .filter(p => p);
    }
    await this._coreParseContext(context);
    await this._contentTree.parseItems(config.contentTree, context.id);
  }

  async _coreParseContext(context) {
    const { config } = context;
    // if (config.projection) { // XXX this needs fixing. this should be _projections_ and there should be a `defaultProjection`
    //   setDefaultProjectionOptions(config.projection);
    // }

    await this._styles.parseItems(config.styles, context.id);
    await this._layers.parseItems(config.layers, context.id);
    // TODO add flights & ade here

    await this._obliqueCollections.parseItems(config.obliqueCollections, context.id);
    await this._viewPoints.parseItems(config.viewpoints, context.id);
    await this._maps.parseItems(config.maps, context.id);

    if (Array.isArray(config.categories)) {
      await Promise.all((config.categories).map(async ({ name, items }) => {
        await this._categories.parseCategoryItems(name, items, context.id);
      }));
    }
  }
}

export default RennesAppBis;