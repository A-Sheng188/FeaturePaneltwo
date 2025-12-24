import React, { useState } from 'react';
import { FeaturePanelProps, FeatureItem } from './types';

const FeaturePanel: React.FC<FeaturePanelProps> = ({
  items,
  loading = false,
  error,
  onSelect,
  initialFilter = { query: '', status: 'all' },
  className = '',
}) => {
  const [filter, setFilter] = useState(initialFilter);
  const [selectedItem, setSelectedItem] = useState<FeatureItem | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.target.value });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ ...filter, status: e.target.value as 'all' | 'active' | 'disabled' });
  };

  const handleItemClick = (item: FeatureItem) => {
    setSelectedItem(item);
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleCloseDrawer = () => {
    setSelectedItem(null);
  };

  const filteredItems = items.filter((item) => {
    const matchesQuery = filter.query
      ? item.title.toLowerCase().includes(filter.query.toLowerCase()) ||
        item.description.toLowerCase().includes(filter.query.toLowerCase())
      : true;
    
    const matchesStatus = filter.status === 'all' 
      ? true 
      : item.status === filter.status;
    
    return matchesQuery && matchesStatus;
  });

  if (loading) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600 font-medium">加载失败</div>
            <div className="ml-2 text-red-500 text-sm">{error}</div>
          </div>
          <button 
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
            onClick={() => window.location.reload()}
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className={`p-4 ${className}`}>
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">暂无数据</h3>
          <p className="text-gray-500 mb-4">未找到匹配的功能项</p>
          <button
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            onClick={() => setFilter({ query: '', status: 'all' })}
          >
            清空筛选
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex gap-4 p-4 border-b bg-white">
        <div className="flex-1">
          <input
            type="text"
            placeholder="搜索功能..."
            value={filter.query}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <select
          value={filter.status}
          onChange={handleStatusChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">全部状态</option>
          <option value="active">启用中</option>
          <option value="disabled">已停用</option>
        </select>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer bg-white"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg">{item.title}</h3>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  item.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.status === 'active' ? '启用中' : '已停用'}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{item.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="flex-1 bg-black bg-opacity-50"
            onClick={handleCloseDrawer}
          ></div>
          
          <div className="w-96 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
                <button
                  onClick={handleCloseDrawer}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">描述</h3>
                  <p>{selectedItem.description}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">标签</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">状态</h3>
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      selectedItem.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium">
                      {selectedItem.status === 'active' ? '启用中' : '已停用'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturePanel;
