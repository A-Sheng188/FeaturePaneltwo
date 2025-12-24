import { FeatureItem } from './types';

export const mockItems: FeatureItem[] = [
  {
    id: '1',
    title: '用户管理',
    description: '管理系统用户的增删改查功能',
    tags: ['后台', '管理'],
    status: 'active',
  },
  {
    id: '2',
    title: '数据分析',
    description: '展示业务数据统计图表',
    tags: ['前端', '图表'],
    status: 'active',
  },
  {
    id: '3',
    title: '邮件通知',
    description: '发送系统通知邮件给用户',
    tags: ['后台', '邮件'],
    status: 'disabled',
  },
  {
    id: '4',
    title: '移动端适配',
    description: '优化移动设备显示效果',
    tags: ['前端', '响应式'],
    status: 'active',
  },
  {
    id: '5',
    title: '第三方登录',
    description: '集成微信和QQ登录功能',
    tags: ['安全', '登录'],
    status: 'disabled',
  },
];
