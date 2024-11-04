import React from "react";

export const FeatureCard = ({
    icon: Icon,
    title,
    description,
}: {
    icon: any;
    title: string;
    description: string;
}) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
        <Icon className="w-8 h-8 text-blue-500 mb-2" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);