import { Instance, SnapshotOut, types, flow, applySnapshot } from 'mobx-state-tree';

import { withEnvironment } from '../extensions/with-environment';
import { SwalError } from '../../utils/Sweetalert'

const SourceDropdown = types.model('SourceDropdown').props({
  id: types.optional(types.number, 0),
  label: types.optional(types.string, ''),
  text: types.optional(types.string, ''),
});

const Form = types.model('Form').props({
  firstName: types.optional(types.string, ''),
  lastName: types.optional(types.string, ''),
  email: types.optional(types.string, ''),
  phone: types.optional(types.string, ''),
  password: types.optional(types.string, ''),
  province: types.optional(types.number, 0),
  regency: types.optional(types.number, 0),
  district: types.optional(types.number, 0),
  village: types.optional(types.number, 0),
  address: types.optional(types.string, ''),
  postCode: types.optional(types.string, ''),
});

export const AppStoreModel = types
  .model('AppStore')
  .props({
    isLoading: types.optional(types.boolean, false),
    isError: types.optional(types.boolean, false),
    msgError: types.optional(types.string, ''),

    srcProvinces: types.optional(types.array(SourceDropdown), []),
    srcRegencies: types.optional(types.array(SourceDropdown), []),
    srcDistricts: types.optional(types.array(SourceDropdown), []),
    srcVillages: types.optional(types.array(SourceDropdown), []),
    form: types.optional(Form, {}),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    setLoading(value: boolean) {
      self.isLoading = value
    },
    handleState(field: string, value: string | number) {
      applySnapshot(self, { ...self, form: { ...self.form, [field]: value } })
    },
    clearForm() {
      applySnapshot(self, { ...self, form: {} })
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
        SwalError({ text: result.message })
      }
    }),
    getRegency: flow(function* (provinceId: number) {
      self.setLoading(true)
      self.form.province = provinceId
      self.form.regency = 0
      self.form.district = 0
      self.form.village = 0
      self.form.postCode = ''
      const result = yield self.environment.regFormApi.regency(provinceId);
      self.setLoading(false)
      if (result.kind === 'ok') {
        self.srcRegencies = result.data
      } else {
        SwalError({ text: result.message })
      }
    }),
    getDistrict: flow(function* (regencyId: number) {
      self.setLoading(true)
      self.form.regency = regencyId
      self.form.district = 0
      self.form.village = 0
      self.form.postCode = ''
      const result = yield self.environment.regFormApi.district(regencyId);
      self.setLoading(false)
      if (result.kind === 'ok') {
        self.srcDistricts = result.data
      } else {
        SwalError({ text: result.message })
      }
    }),
    getVillage: flow(function* (districtId: number) {
      self.setLoading(true)
      self.form.district = districtId
      self.form.village = 0
      self.form.postCode = ''
      const result = yield self.environment.regFormApi.village(districtId);
      self.setLoading(false)
      if (result.kind === 'ok') {
        self.srcVillages = result.data
      } else {
        SwalError({ text: result.message })
      }
    }),
    getPostCode: flow(function* (villageId: number) {
      self.setLoading(true)
      self.form.village = villageId
      const province = self.srcProvinces.find(x => x.id === self.form.province)
      const district = self.srcDistricts.find(x => x.id === self.form.district)
      const village = self.srcVillages.find(x => x.id === villageId)
      const param = { province, district, village }
      const result = yield self.environment.regFormApi.postCode(param);
      self.setLoading(false)
      if (result.kind === 'ok') {
        self.form.postCode = result.data
      } else {
        SwalError({ text: result.message })
      }
    }),
    submit: flow(function* () {
      self.setLoading(true)
      const result = yield self.environment.regFormApi.submit(self.form);
      self.setLoading(false)
      if (result.kind === 'ok') {
      } else {
        SwalError({ text: result.message })
      }
    })
  }))

export interface IGetSorceDropdown {
  id: number;
  label: string;
  text: string;
}

type AppStoreType = Instance<typeof AppStoreModel>;
export interface AppStore extends AppStoreType { }
type AppStoreSnapshotType = SnapshotOut<typeof AppStoreModel>;
export interface AppStoreSnapshot extends AppStoreSnapshotType { }
export const createAppStoreDefaultModel = () => types.optional(AppStoreModel, {});
