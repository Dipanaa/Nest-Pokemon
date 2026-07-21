

export interface HttpAdapter{

    HttpGet<T>(url: string): Promise<T>;

}