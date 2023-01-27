import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import * as fromDevice from './device.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DeviceEffects } from './device.effects';
import { localStorageSync } from 'ngrx-store-localstorage';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDevice.deviceFeatureKey, fromDevice.reducer),
    EffectsModule.forFeature([DeviceEffects]),
  ],
})
export class PowerdeyStoreModule {}
