import React from 'react';
import FeaturePanel from './components/FeaturePanel/FeaturePanel';
import { mockItems } from './components/FeaturePanel/mockItems';

function App() {
  const handleSelect = (item: any) => {
    console.log('选择了:', item);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FeaturePanel 演示</h1>
          <p className="text-gray-600 mt-2">这是一个可复用的功能面板组件</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <FeaturePanel
            items={mockItems}
            onSelect={handleSelect}
            className="h-[500px]"
          />
        </div>

        <div className="mt-8 text-gray-600 text-sm">
          <p>提示：尝试在搜索框输入关键词，或使用状态筛选功能</p>
        </div>
      </div>
    </div>
  );
}

export default App;
