/* eslint-disable @typescript-eslint/no-explicit-any */
export default class GeneralApi {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  thenFunction(res: any) {
    return {
      isSuccess: true,
      ...res,
    };
  }

  catchFunction() {
    return { isSuccess: false };
  }

  async generateApi({
    headers = {},
    newUrl,
    method = 'GET',
    data,
  }: {
    headers?: HeadersInit;
    newUrl: string;
    method?: string;
    data?: any;
    errorMsg?: string;
  }) {
    let result;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${newUrl}`,
        {
          method,
          body: data,
          headers: {
            'content-type': 'application/json',
            ...headers,
          },
        }
      );

      const res = await response.json();
      if (response.status > 201) {
        result = this.catchFunction();
      } else result = this.thenFunction(res);
    } catch (error) {
      console.log(error);

      result = this.catchFunction();
    }
    return result;
  }

  async postData(data: any) {
    return this.generateApi({
      newUrl: this.url,
      method: 'POST',
      data: JSON.stringify(data),
      errorMsg: 'Error Submit Data',
    });
  }

  async getData(params: any) {
    return this.generateApi({
      newUrl: `${this.url}?${new URLSearchParams(params)}`,
      errorMsg: 'Error Get Data',
    });
  }

  async getOption(params = {}) {
    return this.generateApi({
      newUrl: `${this.url}/opsi?${new URLSearchParams(params)}`,
      errorMsg: 'Error Get Data',
    });
  }
}
