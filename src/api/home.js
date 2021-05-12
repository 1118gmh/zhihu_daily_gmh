import axios from '@/utils/ajaxRequest';

export const fetchContent = () => axios.request({
  url: '/news/latest',
});

export const fetchList = (id) => axios.request({
  url: `/news/before/${id}`,
});
