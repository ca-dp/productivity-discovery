import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface NewsItem {
    title: string;
    date: Date;
}

const news: NewsItem[] = [
    {
        title: "Linearがおすすめツールに認定",
        date: new Date("2024-03-15"),
    },
    {
        title: "Claude 3.5が多くのユースケースでChatGPTを上回る性能を示す",
        date: new Date("2024-03-10"),
    },
    {
        title: "推奨ツールのセキュリティ審査基準が厳格化",
        date: new Date("2024-03-05"),
    },
    {
        title: "新しい開発者向けツール「DevBoost」が試験運用開始",
        date: new Date("2024-03-01"),
    },
    {
        title: "AIツール導入により生産性が平均30%向上したことが社内調査で判明",
        date: new Date("2024-02-28"),
    }
];

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
        month: 'short',
        day: 'numeric'
    }).format(date);
};

const isNew = (date: Date) => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return date > oneMonthAgo;
};

const LastMinuteNews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        controls.start({ x: `${-currentIndex * 100}%` });
    }, [currentIndex, controls]);

    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center mr-4">
                        <span className="text-xs font-bold">最新ニュース</span>
                    </div>
                    <div className="relative flex-grow overflow-hidden h-6">
                        <motion.div
                            className="absolute w-full flex"
                            animate={controls}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            style={{ width: `${news.length * 100}%` }}
                        >
                            {news.map((item, index) => (
                                <div key={item.title} className="w-full flex items-center">
                                    <span className="text-2xs mr-2 flex-shrink-0">{formatDate(item.date)}</span>
                                    {isNew(item.date) && (
                                        <span className="bg-red-500 text-white text-2xs px-1 py-0.5 rounded-sm font-bold mr-2 flex-shrink-0">NEW</span>
                                    )}
                                    <p className="text-xs truncate">{item.title}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastMinuteNews;