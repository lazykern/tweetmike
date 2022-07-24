export interface EndpointParamInterface {
  name: string;
  role: string;
  description: string;
  type: string;
  multiline?: boolean;
  radio?: boolean;
  required: boolean;
  properties?: EndpointParamInterface[];
  allowedValues?: string[] | undefined;
}
export interface EndpointInterface {
  id: string;
  name: string;
  scopes: string[];
  method: string;
  url: string;
  params: EndpointParamInterface[] | [];
  docsUrl: string;
}
[];
