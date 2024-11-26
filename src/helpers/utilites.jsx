

const utils = {

    generateChartConfig: (chartType, data, keyMapping = {}) => {
        // Default mapping for keys if not provided
        const defaultMapping = {
            labelKey: "month", // Default key for labels
            valueKeys: ["desktop", "mobile"], // Default keys for values
        };

        // Merge provided key mappings with defaults
        const { labelKey, valueKeys, icons } = { ...defaultMapping, ...keyMapping };

        // Base configuration applicable across all charts
        const baseConfig = {
            [labelKey]: { label: labelKey.charAt(0).toUpperCase() + labelKey.slice(1) },
        };

        // Add dynamic configurations based on data and valueKeys
        valueKeys.forEach((key, index) => {
            baseConfig[key] = {
                label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the key for display
                color: `hsl(var(--chart-${index + 1}))`,
                // icon: icons[key] || null, // Include icon if it exists in keyMapping.icons
            };
        });

        // Additional configuration for specific chart types
        if (chartType === "PieChart") {
            data.forEach((item, index) => {
                const monthValue = item[labelKey]?.toLowerCase();
                // console.log(monthValue)
                if (monthValue) {
                    baseConfig[monthValue] = {
                        label: item[labelKey],
                        color: `hsl(var(--chart-${index + 1}))`,
                    };
                }
            });
        }

        return baseConfig;
    },

    addColorsToData: (data, colorPalette) => {
        return data.map((item, index) => ({
            ...item,
            fill: colorPalette[index % colorPalette.length], // Cycle through colors
        }));
    },


}


export default utils