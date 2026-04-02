
import React, { useRef } from 'react';

interface BulkImportProps {
  onImport: (data: any[]) => void;
  fields: string[];
  title: string;
}

const BulkImport: React.FC<BulkImportProps> = ({ onImport, fields, title }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      // Basic CSV parsing (handles simple CSV without quoted commas)
      const lines = text.split(/\r?\n/);
      if (lines.length < 2) return;

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const data = lines.slice(1).filter(line => line.trim()).map(line => {
        // Simple split by comma, ignoring quoted commas for now as it's a basic implementation
        // For a more robust solution, a CSV library would be better, but we'll stick to basic for now
        const values = line.split(',');
        const obj: any = {};
        headers.forEach((header, index) => {
          // Map Vietnamese/Friendly headers to internal keys if needed
          let key = header;
          if (header === 'tên' || header === 'name') key = 'name';
          if (header === 'mô tả' || header === 'description' || header === 'desc') key = 'description';
          if (header === 'danh mục' || header === 'category') key = 'category';
          if (header === 'trạng thái' || header === 'status') key = 'status';
          if (header === 'tiêu đề' || header === 'title') key = 'title';
          if (header === 'mã' || header === 'code') key = 'code';
          if (header === 'nhãn' || header === 'label') key = 'label';
          if (header === 'liên kết' || header === 'link') key = 'link';
          if (header === 'cửa hàng' || header === 'storeid') key = 'storeId';

          if (fields.includes(key)) {
            let val = values[index]?.trim();
            // Handle boolean
            if (val?.toLowerCase() === 'true' || val === '1') val = true as any;
            if (val?.toLowerCase() === 'false' || val === '0') val = false as any;
            // Handle number
            if (val !== '' && !isNaN(Number(val))) val = Number(val) as any;
            
            obj[key] = val;
          }
        });
        return obj;
      });

      onImport(data);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".csv" 
        className="hidden" 
      />
      <button 
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-6 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition active:scale-95"
        title={`Nhập ${title} từ file CSV`}
      >
        <span className="material-icons-round text-lg">upload_file</span>
        Nhập hàng loạt
      </button>
    </div>
  );
};

export default BulkImport;
