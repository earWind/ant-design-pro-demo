import request from '@/utils/request';

export async function getMenuData(): Promise<any> {
  return request('/api/get_menu', {
    method: 'POST',
  });
}
