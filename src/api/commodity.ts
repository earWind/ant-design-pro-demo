import request from '@/utils/request';
import { TableListParams } from '@/types/commodity';

export async function queryCommodityList(params?: TableListParams) {
  return request('/querycommodity/list', {
    params,
  });
}
