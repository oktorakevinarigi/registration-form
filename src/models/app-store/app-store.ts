import { Instance, SnapshotOut, types, flow } from 'mobx-state-tree';

import { withEnvironment } from '../extensions/with-environment';

export const AppStoreModel = types
  .model('AppStore')
  .props({
    isLoading: types.optional(types.boolean, false),
    isError: types.optional(types.boolean, false),
    msgError: types.optional(types.string, ''),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setLoading(value: boolean) {
      self.isLoading = value
    },
  }))
  .actions((self) => ({
    getData: flow(function* () {
      // self.setLoading(true)
      // const result = yield self.environment.api.getData();
      // self.setLoading(false)
      // if (result.kind === 'ok') {

      // } else {

      // }
    }),
  }))

type AppStoreType = Instance<typeof AppStoreModel>;
export interface AppStore extends AppStoreType { }
type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>;
export interface AppStoreSnapshot extends AppStoreSnapshotType { }
export const createAppStoreDefaultModel = () => types.optional(AppStoreModel, {});
