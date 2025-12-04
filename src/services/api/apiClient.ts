import axios, { AxiosInstance, AxiosError } from 'axios';
import { BASE_URL } from '../../endpoint/endpoint';

const TIMEOUT = 30000;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string = BASE_URL, timeout: number = TIMEOUT) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers: { 'Content-Type': 'application/json' },
    });

    // error interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const message = (error.response?.data as any)?.message || error.message || 'Request failed';
        throw new ApiError(message, error.response?.status, error.response?.data);
      }
    );

    // Request interceptor for auth token
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  async get<T>(endpoint: string): Promise<T> {
    const { data } = await this.client.get<T>(endpoint);
    return data;
  }

  async post<T>(endpoint: string, body?: any): Promise<T> {
    const { data } = await this.client.post<T>(endpoint, body);
    return data;
  }

  async put<T>(endpoint: string, body?: any): Promise<T> {
    const { data } = await this.client.put<T>(endpoint, body);
    return data;
  }

  async patch<T>(endpoint: string, body?: any): Promise<T> {
    const { data } = await this.client.patch<T>(endpoint, body);
    return data;
  }

  async delete<T>(endpoint: string): Promise<T> {
    const { data } = await this.client.delete<T>(endpoint);
    return data;
  }

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const { data } = await this.client.post<T>(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }

  async putFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const { data } = await this.client.put<T>(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }
}

export const apiClient = new ApiClient();

