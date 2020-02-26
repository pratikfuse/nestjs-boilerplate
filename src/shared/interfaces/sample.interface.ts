import { Observable } from "rxjs";

export interface SampleService {
    sendRequest: (data: SampleRequest) => Observable<SampleResponse>;
}

export interface SampleRequest {
    message: string;
}

export interface SampleResponse {
    response: string;
}
