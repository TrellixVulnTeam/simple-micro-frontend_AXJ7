import { BehaviorSubject } from "rxjs";

const productSubject = new BehaviorSubject(null);

export const update = (product) => {
  productSubject.next(product);
};

export const subscribe = (listener) => productSubject.subscribe(listener);
