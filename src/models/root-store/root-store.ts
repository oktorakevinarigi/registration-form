import { Instance, SnapshotOut, types, applySnapshot } from 'mobx-state-tree';
import * as store from '../store';

export const RootStoreModel = types
  .model('RootStore')
  .props({
    app: store.App.createAppStoreDefaultModel(),
  })
  .actions((self) => {
    return {
      reset: () => {
        applySnapshot(self, {});
      },
    };
  });

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
