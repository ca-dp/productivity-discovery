import React, { useState, useEffect } from 'react';

interface SearchBoxProps {
    categories: {
        name: string;
        featuredTool: string;
    }[];
}

const SearchBox: React.FC<SearchBoxProps> = ({ categories }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const categoryItems = document.querySelectorAll('.category-item');

        categoryItems.forEach((item) => {
            const category = item.querySelector('.category-preview');
            const categoryName = category?.querySelector('h3')?.textContent?.toLowerCase() || '';
            const featuredTool = category?.querySelector('.featured-tool')?.textContent?.toLowerCase() || '';

            if (categoryName.includes(searchTerm) || featuredTool.includes(searchTerm)) {
                (item as HTMLElement).style.display = '';
            } else {
                (item as HTMLElement).style.display = 'none';
            }
        });
    }, [searchTerm]);

    return (
        <input
            type="text"
            placeholder="ツールを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
};

export default SearchBox;