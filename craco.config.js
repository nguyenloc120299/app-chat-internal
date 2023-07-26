module.exports = {
    style: {
        modules: {
            localIdentName: '[local]_[hash:base64:5]',
        },
        css: {
            loaderOptions: {
                // Less configuration for Ant Design customization
                less: {
                    javascriptEnabled: true,
                },
            },
        },
    },
};
