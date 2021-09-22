module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        ignored: "**/node_modules"
    }
};
