import {
  Component,
  forwardRef,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


const SCOPE_SELECTOR_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ScopeSelectorComponent),
  multi: true
};

@Component({
  selector: 'app-scope-selector',
  providers: [SCOPE_SELECTOR_ACCESSOR],
  templateUrl: './scope-selector.component.html',
  styleUrls: ['./scope-selector.component.scss']
})
export class ScopeSelectorComponent implements ControlValueAccessor {

  public value: string[] = [];
  public scopes = [{value: 'customer', displayName: 'Customer'}, {value: 'event-managers', displayName: 'Event Manager'}];

  onChange: any = () => {
  };
  onTouch: any = () => {
  };

  registerOnChange(fn: (...args) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: (...args) => void) {
    this.onTouch = fn;
  }

  writeValue(value: string[]) {
    this.value = value || [];
  }

  public selectVal(scope: string) {
    if (this.isSelected(scope)) {
      this.value = this.value.filter(val => val !== scope);
    } else {
      this.value = this.value.concat(scope);
    }
    this.onTouch();
    this.onChange(this.value);
  }

  private isSelected(scope: string): boolean {
    return this.value.some(val => val === scope);
  }


}
