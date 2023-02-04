import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { updateSettings } from '../store/settings.actions';
import { selectSettingsState } from '../store/settings.selectors';

export interface Settings {
  language: FormControl<string>;
  timezone: FormControl<string>;
}

@Component({
  selector: 'powerdey-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<any>, private store: Store) {}
  languages = [
    { name: 'Pidgin English', value: 'en-NG' },
    { name: 'English', value: 'en-GB' },
  ];

  timezones = [
    { name: 'US Eastern Time (New York)', value: 'America/New_York' },
    { name: 'West African Time (Lagos)', value: 'Africa/Lagos' },
  ];

  form = new FormGroup<Settings>({
    language: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    timezone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.store
      .select(selectSettingsState)
      .pipe(
        tap(({ language, timezone }) =>
          this.form.patchValue({ language, timezone })
        )
      )
      .subscribe();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const language = this.form.value.language ?? '';
    const timezone = this.form.value.timezone ?? '';

    this.store.dispatch(updateSettings({ language, timezone }));
    this.dialogRef.close();
  }
}
