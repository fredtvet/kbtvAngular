import { Pipe, PipeTransform } from '@angular/core';
import { Immutable } from 'global-types';
import { OptimisticHttpRequest, SupportedContentTypes } from 'optimistic-http';
import { RequestDescriberMap } from '../interfaces/request-describer-map.interface';

type RequestWithType = Omit<OptimisticHttpRequest<SupportedContentTypes>, "type"> & {type: string};

@Pipe({name: 'requestDescription'})
export class RequestDescriptionPipe implements PipeTransform {

  transform(
    request: Immutable<OptimisticHttpRequest<SupportedContentTypes>>, 
    descriptions: RequestDescriberMap<RequestWithType>
  ): string {
    if(request.type){
      const describer = descriptions[request.type];
      if(describer) return describer(<Immutable<RequestWithType>> request);
    }
    return "Mangler beskrivelse"
  }
}
