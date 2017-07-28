import {TestBed, async, inject} from '@angular/core/testing';
import {MasterUiApiUrlService} from './master-ui-api-url.service';

describe('MasterUiApiUrlService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MasterUiApiUrlService]
    });
  });

  beforeEach(inject([MasterUiApiUrlService], s => {
    service = s;
  }));

  it('should test for UmsBaseUrl', () => {
    expect(service.getUmsBaseUrl()).toEqual(service.urls.get('UmsBaseUrl'));
  });

});
