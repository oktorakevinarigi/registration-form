import { Instance, SnapshotOut, types, flow, applySnapshot } from 'mobx-state-tree';

import { withEnvironment } from '../extensions/with-environment';

const Provinces = types.model('Provinces').props({
  id: types.optional(types.number, 0),
  label: types.optional(types.string, ''),
  text: types.optional(types.string, ''),
});

const Form = types.model('Form').props({
  id: types.optional(types.number, 0),
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
  email: types.optional(types.string, ''),
  phone: types.optional(types.string, ''),
  password: types.optional(types.string, ''),
  province: types.optional(types.string, ''),
  regency: types.optional(types.string, ''),
  district: types.optional(types.string, ''),
  village: types.optional(types.string, ''),
  address: types.optional(types.string, ''),
  postCode: types.optional(types.string, ''),
});

export const AppStoreModel = types
  .model('AppStore')
  .props({
    isLoading: types.optional(types.boolean, false),
    isError: types.optional(types.boolean, false),
    msgError: types.optional(types.string, ''),

    srcProvinces: types.optional(types.array(Provinces), []),
    form: types.optional(Form, {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setLoading(value: boolean) {
      self.isLoading = value
    },
    handleState(field: string, value: string | number) {
      applySnapshot(self, { ...self, form: { ...self.form, [field]: value } })
    }
  }))
  .actions((self) => ({
    getProvince: flow(function* () {
      self.setLoading(true)
      const result = yield self.environment.regFormApi.province();
      self.setLoading(false)
      if (result.kind === 'ok') {
        self.srcProvinces = result.data
      } else {

      }
    }),
  }))

export interface IGetProvinces {
  id: number;
  label: string;
  text: string;
}

type AppStoreType = Instance<typeof AppStoreModel>;
export interface AppStore extends AppStoreType { }
type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>;
export interface AppStoreSnapshot extends AppStoreSnapshotType { }
export const createAppStoreDefaultModel = () => types.optional(AppStoreModel, {});
