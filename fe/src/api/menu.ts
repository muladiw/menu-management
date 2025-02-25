import GeneralApi from '@/api/GeneralApi';
const url = '/menu';

class ApiMenu extends GeneralApi {
  constructor() {
    super(url);
  }

  async getLastDepth(params: any) {
    return this.generateApi({
      newUrl: `${this.url}/last-depth`,
      errorMsg: 'Error Get Data',
    });
  }
}

const apiMenu = new ApiMenu();

export default apiMenu;
