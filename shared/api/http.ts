import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from "axios";

class Http {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      headers: {
        Authorization: process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? "",
      },
    });
    this.http.interceptors.request.use(this.handleRequest);
    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleRequest = (config: InternalAxiosRequestConfig) => {
    return config;
  };

  private handleSuccess = (response: AxiosResponse) => {
    return response;
  };

  private handleError = (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  };

  public get<T = unknown>(path: string, config?: AxiosRequestConfig) {
    return this.http.get<T>(path, config);
  }

  public post<T = unknown>(
    path: string,
    payload?: unknown,
    config?: AxiosRequestConfig,
  ) {
    return this.http.post<T>(path, payload, config);
  }
}

export default Http;
