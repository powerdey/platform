import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import * as fromDevice from './device.reducer';
import * as fromSettings from './settings.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DeviceEffects } from './device.effects';
import { SettingsEffects } from './settings.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDevice.deviceFeatureKey, fromDevice.reducer),
    StoreModule.forFeature(
      fromSettings.settingsFeatureKey,
      fromSettings.reducer
    ),
    EffectsModule.forFeature([DeviceEffects, SettingsEffects]),
  ],
})
export class PowerdeyStoreModule {}
