import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CvListener {
  @OnEvent('added-cv')
  onCvAdded(cv) {
    console.log('i m listening to the added-cv event', cv);
  }
}
